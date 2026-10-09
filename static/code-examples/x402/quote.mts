import { randomUUID } from "node:crypto";
import { decodePaymentRequiredHeader, decodePaymentResponseHeader } from "@x402/core/http";
import { mkdirSync, writeFileSync } from "node:fs";
import { x402Client, wrapFetchWithPayment } from "@x402/fetch";
import { BatchSettlementEvmScheme, computeChannelId } from "@x402/evm/batch-settlement/client";
import { FileClientChannelStorage } from "@x402/evm/batch-settlement/client/file-storage";
import { privateKeyToAccount } from "viem/accounts";
import { createPublicClient, formatUnits, http, parseUnits } from "viem";
import { base } from "viem/chains";
import { toClientEvmSigner } from "@x402/evm";

const NETWORK = "eip155:8453";
const ASSET = "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913";
const PAY_TO = "0xaa0a2b5E68351C46474f4CE142A1357e25EedBA9";
const RECEIVER_AUTHORIZER = "0x0DA62b1f9904AB97be179579A32533210d7ebBA5";
function usdcLimit(name: string, fallback: string) {
  const value = process.env[name] ?? fallback;
  if (!/^\d+(\.\d{1,6})?$/.test(value)) throw new Error(`Set ${name} in USDC (up to 6 decimals)`);
  return parseUnits(value, 6);
}
const maxQuote = usdcLimit("MAX_QUOTE_USDC", "0.001");
const maxDeposit = usdcLimit("MAX_DEPOSIT_USDC", "1");
const maxDelay = Number(process.env.MAX_WITHDRAW_DELAY_HOURS ?? "24") * 3600;
if (maxQuote <= 0n || maxDeposit < maxQuote || !Number.isSafeInteger(maxDelay) || maxDelay <= 0) {
  throw new Error("Set your quote, deposit and withdrawal-delay limits");
}

if (!process.env.RPC_URL) throw new Error("Set RPC_URL for Base");
if (!/^0x[0-9a-fA-F]{64}$/.test(process.env.PRIVATE_KEY ?? "")) throw new Error("Set PRIVATE_KEY securely in .env");
const account = privateKeyToAccount(process.env.PRIVATE_KEY as `0x${string}`);
const publicClient = createPublicClient({ chain: base, transport: http(process.env.RPC_URL) });
if (await publicClient.getChainId() !== base.id) throw new Error("RPC_URL points to the wrong chain");
const signer = toClientEvmSigner(account, publicClient);
const client = new x402Client().register(
  NETWORK,
  new BatchSettlementEvmScheme(signer, {
    storage: new FileClientChannelStorage({ directory: "./x402-state" }),
    depositStrategy: ({ depositAmount }) => {
      if (BigInt(depositAmount) > maxDeposit) throw new Error("Deposit exceeds your limit");
      return depositAmount;
    },
  }),
);
// Sign only the terms you expect.
client.registerPolicy((_version, requirements) =>
  requirements.filter(
    (r) =>
      r.scheme === "batch-settlement" &&
      r.network === NETWORK &&
      r.asset.toLowerCase() === ASSET.toLowerCase() &&
      r.payTo.toLowerCase() === PAY_TO.toLowerCase() &&
      typeof r.extra?.receiverAuthorizer === "string" &&
      r.extra.receiverAuthorizer.toLowerCase() === RECEIVER_AUTHORIZER.toLowerCase() &&
      BigInt(r.amount) > 0n && BigInt(r.amount) <= maxQuote &&
      typeof r.extra?.minDeposit === "string" &&
      /^\d+$/.test(r.extra.minDeposit) &&
      BigInt(r.extra.minDeposit) > 0n && BigInt(r.extra.minDeposit) <= maxDeposit &&
      typeof r.extra?.withdrawDelay === "number" &&
      Number.isSafeInteger(r.extra.withdrawDelay) &&
      r.extra.withdrawDelay > 0 && r.extra.withdrawDelay <= maxDelay,
  ),
);
// Allow the selected token; the policy caps quote prices and withdrawal delay.
// depositStrategy checks the actual deposit amount before signing it.
client.setSpendControls({
  allowedAssets: [{ network: NETWORK, asset: ASSET, maxAmountPerPayment: maxDeposit.toString() }],
});
// Save the original configuration and signed attempt before sending.
let latestAttemptFile: string | undefined;
let latestChannelFile: string | undefined;
client.onAfterPaymentCreation(async ({ paymentPayload }) => {
  const config = paymentPayload.payload.channelConfig as Parameters<typeof computeChannelId>[0];
  const network = paymentPayload.accepted.network;
  const channelId = computeChannelId(config, network);
  mkdirSync("./x402-channels", { recursive: true, mode: 0o700 });
  mkdirSync("./x402-attempts", { recursive: true, mode: 0o700 });
  latestAttemptFile = `./x402-attempts/${randomUUID()}.json`;
  writeFileSync(latestAttemptFile, JSON.stringify(paymentPayload), { mode: 0o600, flag: "wx" });
  latestChannelFile = `./x402-channels/${channelId}.json`;
  writeFileSync(latestChannelFile, JSON.stringify({ network, channelId, channelConfig: config }, null, 2), { mode: 0o600 });
});
const paidFetch = wrapFetchWithPayment(fetch, client);

try {
  const res = await paidFetch("https://x402.cow.fi/mainnet/api/v1/quote", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      sellToken: "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2", // WETH
      buyToken: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48", // USDC
      from: "0x0000000000000000000000000000000000000000",
      receiver: "0x0000000000000000000000000000000000000000",
      kind: "sell",
      sellAmountBeforeFee: "1000000000000000000",
    }),
  });
  const requiredHeader = res.headers.get("PAYMENT-REQUIRED");
  const responseHeader = res.headers.get("PAYMENT-RESPONSE");
  const challenge = requiredHeader ? decodePaymentRequiredHeader(requiredHeader) : undefined;
  const receipt = responseHeader ? decodePaymentResponseHeader(responseHeader) : undefined;
  const body = await res.text();
  if (res.status !== 200 || receipt?.success !== true) {
    console.error({
      status: res.status,
      error: receipt?.errorReason ?? challenge?.error,
      transaction: receipt?.transaction,
      savedAttempt: latestAttemptFile,
      body,
    });
    throw new Error("Payment outcome needs checking; follow Troubleshooting before retrying");
  }
  const result = JSON.parse(body);
  if (!result.quote) throw new Error("Expected a quote in the successful response");
  const charged = receipt.extra?.chargedAmount ?? "0";
  if (typeof charged !== "string" || !/^\d+$/.test(charged)) throw new Error("Invalid receipt charge");
  console.log({
    status: res.status,
    quoteReceived: true,
    paymentNetwork: receipt.network,
    chargedUSDC: formatUnits(BigInt(charged), 6),
    channelFile: latestChannelFile,
  });
  console.log(result);
} catch (error) {
  console.error({ savedAttempt: latestAttemptFile, message: "Keep state and check Troubleshooting before rerunning an unresolved attempt." });
  throw error;
}
