// inspect.mjs — read-only; no private key, SDK, signature or payment.
const response = await fetch("https://x402.cow.fi/mainnet/api/v1/quote", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: "{}",
});
const header = response.headers.get("PAYMENT-REQUIRED");
if (response.status !== 402 || !header) throw new Error("No payment challenge received");
const challenge = JSON.parse(Buffer.from(header, "base64").toString("utf8"));
const option = challenge.accepts.find(r =>
  r.scheme === "batch-settlement" && r.network === "eip155:8453" &&
  r.asset.toLowerCase() === "0x833589fcd6edb6e08f4c7c32d4f71b54bda02913"
);
if (!option) throw new Error("Base USDC is not currently offered");
function usdc(atomic) {
  if (typeof atomic !== "string" || !/^\d+$/.test(atomic)) throw new Error("Invalid amount");
  const digits = BigInt(atomic).toString().padStart(7, "0");
  return (digits.slice(0, -6) + "." + digits.slice(-6)).replace(/\.?0+$/, "") + " USDC";
}
console.table({
  payment: "USDC on Base",
  quotePrice: usdc(option.amount),
  minimumDepositOrTopUp: usdc(option.extra.minDeposit),
  newChannelWithdrawalDelay: option.extra.withdrawDelay / 3600 + " hours",
  depositAuthorizationValidity: option.maxTimeoutSeconds + " seconds",
});
