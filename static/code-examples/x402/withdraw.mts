// withdraw.mts — status is read-only; initiate/finalize each send one transaction.
import { readFileSync } from "node:fs";
import { createPublicClient, createWalletClient, http, parseAbi } from "viem";
import { base, mainnet, bsc } from "viem/chains";
import { privateKeyToAccount } from "viem/accounts";
import { computeChannelId } from "@x402/evm/batch-settlement/client";

const action = process.argv[2] ?? "status";
if (!["status", "initiate", "finalize"].includes(action)) throw new Error("Use status, initiate or finalize");
if (!process.env.CHANNEL || !process.env.RPC_URL) throw new Error("Set CHANNEL and RPC_URL");
const saved = JSON.parse(readFileSync(process.env.CHANNEL, "utf8"));
const { network, channelConfig: config } = saved;
const chain = [base, mainnet, bsc].find(c => network === `eip155:${c.id}`);
if (!chain) throw new Error("Unsupported payment chain");
const channelId = computeChannelId(config, network);
if (saved.channelId && saved.channelId.toLowerCase() !== channelId.toLowerCase()) throw new Error("Channel configuration mismatch");
const ESCROW: `0x${string}` = "0x4020074e9dF2ce1deE5A9C1b5c3f541D02a10003";
const abi = parseAbi([
  "struct ChannelConfig { address payer; address payerAuthorizer; address receiver; address receiverAuthorizer; address token; uint40 withdrawDelay; bytes32 salt; }",
  "function channels(bytes32 channelId) view returns (uint128 balance, uint128 totalClaimed)",
  "function pendingWithdrawals(bytes32 channelId) view returns (uint128 amount, uint40 initiatedAt)",
  "function initiateWithdraw(ChannelConfig config, uint128 amount)",
  "function finalizeWithdraw(ChannelConfig config)",
]);
const publicClient = createPublicClient({ chain, transport: http(process.env.RPC_URL) });
if (await publicClient.getChainId() !== chain.id) throw new Error("RPC_URL points to the wrong chain");
const block = await publicClient.getBlock();
const [balance, totalClaimed] = await publicClient.readContract({ address: ESCROW, abi, functionName: "channels", args: [channelId], blockNumber: block.number });
const [requested, initiatedAt] = await publicClient.readContract({ address: ESCROW, abi, functionName: "pendingWithdrawals", args: [channelId], blockNumber: block.number });
const finalizeAt = initiatedAt ? BigInt(initiatedAt) + BigInt(config.withdrawDelay) : null;
console.log({ channelId, balanceAtomic: balance.toString(), claimedAtomic: totalClaimed.toString(), requestedAtomic: requested.toString(), finalizeAt: finalizeAt ? new Date(Number(finalizeAt) * 1000).toISOString() : null });

if (action !== "status") {
  const account = privateKeyToAccount(process.env.PRIVATE_KEY as `0x${string}`);
  if (![config.payer, config.payerAuthorizer].some((a: string) => a.toLowerCase() === account.address.toLowerCase())) throw new Error("Wrong payer key");
  const wallet = createWalletClient({ account, chain, transport: http(process.env.RPC_URL) });
  if (action === "initiate") {
    if (initiatedAt) throw new Error("Withdrawal already pending");
    if (balance <= totalClaimed) throw new Error("Nothing remains to withdraw");
  } else {
    if (!finalizeAt || block.timestamp < finalizeAt) throw new Error("No pending withdrawal, or its on-chain delay has not elapsed");
  }
  const fees = await publicClient.estimateFeesPerGas({ type: "eip1559" });
  const floor = chain.id === 8453 ? 1_000_000n : chain.id === 56 ? 50_000_000n : 100_000_000n;
  const extraTip = fees.maxPriorityFeePerGas < floor ? floor - fees.maxPriorityFeePerGas : 0n;
  const pricing = { maxPriorityFeePerGas: fees.maxPriorityFeePerGas + extraTip, maxFeePerGas: fees.maxFeePerGas + extraTip };
  let hash: `0x${string}`;
  if (action === "initiate") {
    const call = { address: ESCROW, abi, functionName: "initiateWithdraw", args: [config, balance - totalClaimed], account } as const;
    await publicClient.simulateContract(call);
    hash = await wallet.writeContract({ ...call, ...pricing });
  } else {
    const call = { address: ESCROW, abi, functionName: "finalizeWithdraw", args: [config], account } as const;
    await publicClient.simulateContract(call);
    hash = await wallet.writeContract({ ...call, ...pricing });
  }
  console.log({ action, transaction: hash }); // Keep this hash if receipt waiting times out.
  const receipt = await publicClient.waitForTransactionReceipt({ hash, timeout: 60_000 });
  if (receipt.status !== "success") throw new Error(`Transaction reverted: ${hash}`);
  console.log({ status: receipt.status, transaction: hash });
}
