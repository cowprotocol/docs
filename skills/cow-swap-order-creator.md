---
name: cow-swap-order-creator
description: Create and manage CoW Swap orders through the Order Book API, including quote-to-order conversion, fee=0 signing, slippage and partner-fee adjustments, EIP-712/ERC-1271/PreSign requirements, submission, status checks, and cancellation. Use when an agent needs to place, debug, or automate CoW Protocol orders from backend or script workflows.
---

# CoW Swap Order Creator

Create CoW Swap orders safely from API quotes. Apply mandatory amount adjustments before signing, use the correct signing scheme, then submit and monitor orders.

The CoW Protocol API is public with no authentication required. Rate limits are generous for normal order flow (a few requests per second).

## Environment

| Variable | Description |
|---|---|
| `PRIVATE_KEY` | Hex-encoded private key of the trading EOA (with or without `0x` prefix) |
| `ETH_RPC_URL` | (Optional) RPC endpoint. Defaults to public RPCs below |

The `from` address is derived from `PRIVATE_KEY`. No API keys needed.

## API Endpoints

| Network | Base URL | Chain ID |
|---|---|---|
| Mainnet | `https://api.cow.fi/mainnet/api/v1` | 1 |
| Gnosis Chain | `https://api.cow.fi/xdai/api/v1` | 100 |
| Arbitrum One | `https://api.cow.fi/arbitrum_one/api/v1` | 42161 |
| Base | `https://api.cow.fi/base/api/v1` | 8453 |
| Sepolia | `https://api.cow.fi/sepolia/api/v1` | 11155111 |

Routes: `POST /quote` · `POST /orders` · `GET /orders/{uid}` · `DELETE /orders/{uid}`

## Contract Addresses (same on all chains)

| Contract | Address |
|---|---|
| Settlement | `0x9008D19f58AAbD9eD0D60971565AA8510560ab41` |
| VaultRelayer | `0xC92E8bdf79f0507f65a392b0ab4667716BFE0110` |

## Common Token Addresses

### Mainnet (chain ID 1)

| Token | Address | Decimals |
|---|---|---|
| WETH | `0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2` | 18 |
| USDC | `0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48` | 6 |
| USDT | `0xdAC17F958D2ee523a2206206994597C13D831ec7` | 6 |
| DAI | `0x6B175474E89094C44Da98b954EedeAC495271d0F` | 18 |
| WBTC | `0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599` | 8 |
| COW | `0xDEf1CA1fb7FBcDC777520aa7f396b4E015F497aB` | 18 |

### Gnosis Chain (chain ID 100)

| Token | Address | Decimals |
|---|---|---|
| WXDAI | `0xe91D153E0b41518A2Ce8Dd3D7944Fa863463a97d` | 18 |
| WETH | `0x6A023CCd1ff6F2045C3309768eAd9E68F978f6e1` | 18 |
| USDC | `0xDDAfbb505ad214D7b80b1f830fcCc89B60fb7A83` | 6 |
| USDT | `0x4ECaBa5870353805a9F068101A40E0f32ed605C6` | 6 |
| COW | `0x177127622c4A00F3d409B75571e12cB3c8973d3c` | 18 |

### Arbitrum One (chain ID 42161)

| Token | Address | Decimals |
|---|---|---|
| WETH | `0x82aF49447D8a07e3bd95BD0d56f35241523fBab1` | 18 |
| USDC | `0xaf88d065e77c8cC2239327C5EDb3A432268e5831` | 6 |
| USDT | `0xFd086bC7CD5C481DCC9C85ebE478A1C0b69FCbb9` | 6 |
| ARB | `0x912CE59144191C1204E64559FE8253a0e49E6548` | 18 |

### Base (chain ID 8453)

| Token | Address | Decimals |
|---|---|---|
| WETH | `0x4200000000000000000000000000000000000006` | 18 |
| USDC | `0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913` | 6 |

If the token is not listed, query `decimals()` on the contract (selector `0x313ce567`) via RPC.

## Converting Human Amounts to Atomic Units

`atomicAmount = humanAmount × 10^decimals`

Examples: 10 USDC → `10000000` · 0.5 WETH → `500000000000000000` · 1 WBTC → `100000000`

Use integer arithmetic only. Truncate (floor), do not round.

## appData

All agent-created orders must include `"appCode": "agent"` in their appData document.

| Field | Value |
|---|---|
| Document | `{"appCode":"agent","metadata":{},"version":"1.6.0"}` |
| Hash | `0x6a45ce6deb3a32a35a97afa44fd544c8ebc355edc10b2a8e52ef0356b804df45` |
| Registered on | mainnet, xdai, arbitrum_one, base, sepolia |

Use this hash as the `appData` field in every order. No additional registration is needed.

For custom metadata (referral, hooks), compute `keccak256` of the compact JSON string and register via `PUT /api/v1/app_data/{hash}` with body `{"fullAppData": "<json_string>"}`. Always include `"appCode": "agent"`.

---

## Workflow

### Step 0 — Pre-flight: token approval

Before submitting any order, the sell token must be approved for the VaultRelayer. If not, the API rejects with `InsufficientAllowance`.

Check allowance:

```bash
# Encode: allowance(owner, spender)
DATA="0xdd62ed3e$(printf '%064s' "${FROM#0x}" | tr ' ' '0')$(printf '%064s' "C92E8bdf79f0507f65a392b0ab4667716BFE0110" | tr ' ' '0')"

curl -s "$ETH_RPC_URL" -X POST \
  -H "Content-Type: application/json" \
  -d "{\"jsonrpc\":\"2.0\",\"method\":\"eth_call\",\"params\":[{\"to\":\"$SELL_TOKEN\",\"data\":\"$DATA\"},\"latest\"],\"id\":1}"
```

If insufficient, send `approve(vaultRelayer, type(uint256).max)`:

```bash
# Encode: approve(spender, amount)
CALLDATA="0x095ea7b3$(printf '%064s' "C92E8bdf79f0507f65a392b0ab4667716BFE0110" | tr ' ' '0')ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff"
```

Sign and broadcast the approve tx using `$PRIVATE_KEY`. Use EIP-1559 (type 2) transactions with `maxFeePerGas` ≥ 3× current base fee + 2 gwei priority to avoid stuck transactions.

Wait for confirmation before proceeding.

> Native ETH cannot be sold directly. Wrap to WETH first.

### Step 1 — Request a quote

```bash
curl -s -X POST "$API_BASE/quote" \
  -H "Content-Type: application/json" \
  -d '{
    "sellToken": "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
    "buyToken": "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
    "sellAmountBeforeFee": "10000000",
    "kind": "sell",
    "from": "0xYOUR_ADDRESS",
    "receiver": "0xYOUR_ADDRESS",
    "appData": "0x6a45ce6deb3a32a35a97afa44fd544c8ebc355edc10b2a8e52ef0356b804df45",
    "appDataHash": "0x6a45ce6deb3a32a35a97afa44fd544c8ebc355edc10b2a8e52ef0356b804df45",
    "sellTokenBalance": "erc20",
    "buyTokenBalance": "erc20",
    "partiallyFillable": false,
    "signingScheme": "eip712"
  }'
```

- For `sell` orders → send `sellAmountBeforeFee`
- For `buy` orders → send `buyAmountAfterFee`
- Always include `from`
- Keep `quote.id` from the response
- If `receiver` is `null` in the response, default to `from`

### Step 2 — Adjust amounts before signing

**Sell order:**

1. `signingSellAmount = quote.sellAmount + quote.feeAmount`
2. `signingBuyAmount = quote.buyAmount × (10000 − slippageBps) / 10000`
3. Optional partner fee: `signingBuyAmount = signingBuyAmount × (10000 − partnerFeeBps) / 10000`

**Buy order:**

1. `baseSellAmount = quote.sellAmount + quote.feeAmount`
2. `signingSellAmount = baseSellAmount × (10000 + slippageBps) / 10000`
3. Optional partner fee: `signingSellAmount = signingSellAmount × (10000 + partnerFeeBps) / 10000`
4. `signingBuyAmount = quote.buyAmount` (unchanged)

All arithmetic uses integer math in token atoms. Always sign with `feeAmount: "0"`.

### Step 3 — Sign order (EIP-712)

Domain:

```json
{
  "name": "Gnosis Protocol",
  "version": "v2",
  "chainId": 1,
  "verifyingContract": "0x9008D19f58AAbD9eD0D60971565AA8510560ab41"
}
```

Types:

```json
{
  "Order": [
    { "name": "sellToken",         "type": "address" },
    { "name": "buyToken",          "type": "address" },
    { "name": "receiver",          "type": "address" },
    { "name": "sellAmount",        "type": "uint256" },
    { "name": "buyAmount",         "type": "uint256" },
    { "name": "validTo",           "type": "uint32"  },
    { "name": "appData",           "type": "bytes32" },
    { "name": "feeAmount",         "type": "uint256" },
    { "name": "kind",              "type": "string"  },
    { "name": "partiallyFillable", "type": "bool"    },
    { "name": "sellTokenBalance",  "type": "string"  },
    { "name": "buyTokenBalance",   "type": "string"  }
  ]
}
```

The `appData` field must be passed as raw `bytes32` (not a hex string) in the message dict.

Signing scheme constraints:

| Scheme | Wallet type | `from` must be |
|---|---|---|
| `eip712` | EOA | The signing EOA |
| `ethsign` | EOA | The signing EOA |
| `eip1271` | Smart contract wallet | The signing contract address |
| `presign` | Any (on-chain) | Owner; must also call `setPreSignature` on-chain |

### Step 4 — Submit order

```bash
curl -s -X POST "$API_BASE/orders" \
  -H "Content-Type: application/json" \
  -d '{
    "sellToken": "0x...",
    "buyToken": "0x...",
    "receiver": "0x...",
    "sellAmount": "10000000",
    "buyAmount": "3713691476787213",
    "validTo": 1769119766,
    "appData": "0x6a45ce6deb3a32a35a97afa44fd544c8ebc355edc10b2a8e52ef0356b804df45",
    "feeAmount": "0",
    "kind": "sell",
    "partiallyFillable": false,
    "sellTokenBalance": "erc20",
    "buyTokenBalance": "erc20",
    "from": "0xYOUR_ADDRESS",
    "signingScheme": "eip712",
    "signature": "0x...",
    "quoteId": 123456
  }'
```

The response is the order UID as a plain text string. Store it.

Note: `sellAmount` and `buyAmount` are strings. `validTo` is an integer. `feeAmount` is always `"0"`.

### Step 5 — Monitor

```bash
# Check status
curl -s "$API_BASE/orders/$ORDER_UID"

# Cancel
curl -s -X DELETE "$API_BASE/orders/$ORDER_UID" \
  -H "Content-Type: application/json" \
  -d '{"signature": "0x...", "signingScheme": "eip712"}'
```

Statuses: `open` · `fulfilled` · `cancelled` · `expired` · `presignaturePending`

---

## End-to-End Example: Sell 10 USDC for WETH on Mainnet

This is based on an actual executed order. It uses `curl` for HTTP and Python for signing.

```bash
#!/usr/bin/env bash
set -euo pipefail

# --- Config ---
API="https://api.cow.fi/mainnet/api/v1"
RPC="${ETH_RPC_URL:-https://eth.llamarpc.com}"
SELL_TOKEN="0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48"  # USDC
BUY_TOKEN="0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2"   # WETH
SELL_AMOUNT="10000000"  # 10 USDC in 6-decimal atoms
SLIPPAGE_BPS=50         # 0.5%
APP_DATA="0x6a45ce6deb3a32a35a97afa44fd544c8ebc355edc10b2a8e52ef0356b804df45"
VAULT_RELAYER="0xC92E8bdf79f0507f65a392b0ab4667716BFE0110"

# Derive from address from private key
FROM=$(python3 -c "
from eth_account import Account
a = Account.from_key('$PRIVATE_KEY')
print(a.address)
")
echo "Wallet: $FROM"

# --- Step 0: Check & approve allowance ---
ALLOWANCE_DATA="0xdd62ed3e$(printf '%064s' "${FROM#0x}" | tr ' ' '0')$(printf '%064s' "${VAULT_RELAYER#0x}" | tr ' ' '0')"
ALLOWANCE_HEX=$(curl -s "$RPC" -X POST \
  -H "Content-Type: application/json" \
  -d "{\"jsonrpc\":\"2.0\",\"method\":\"eth_call\",\"params\":[{\"to\":\"$SELL_TOKEN\",\"data\":\"$ALLOWANCE_DATA\"},\"latest\"],\"id\":1}" \
  | python3 -c "import sys,json; print(json.load(sys.stdin)['result'])")

ALLOWANCE=$(python3 -c "print(int('$ALLOWANCE_HEX', 16))")
echo "Current allowance: $ALLOWANCE"

if [ "$ALLOWANCE" -lt "$SELL_AMOUNT" ]; then
  echo "Approving VaultRelayer..."
  APPROVE_CALLDATA="0x095ea7b3$(printf '%064s' "${VAULT_RELAYER#0x}" | tr ' ' '0')ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff"

  # Build, sign, and send approve tx (EIP-1559)
  python3 -c "
import os, json, urllib.request
from eth_account import Account

acct = Account.from_key('$PRIVATE_KEY')
rpc = '$RPC'

def rpc_call(method, params):
    body = json.dumps({'jsonrpc':'2.0','method':method,'params':params,'id':1}).encode()
    req = urllib.request.Request(rpc, body, {'Content-Type':'application/json'})
    return json.loads(urllib.request.urlopen(req).read())['result']

nonce = int(rpc_call('eth_getTransactionCount', [acct.address, 'latest']), 16)
base_fee = int(rpc_call('eth_getBlockByNumber', ['latest', False])['baseFeePerGas'], 16)
max_fee = base_fee * 3 + 2000000000
max_priority = 2000000000

tx = {
    'to': '$SELL_TOKEN',
    'data': '$APPROVE_CALLDATA',
    'nonce': nonce,
    'gas': 60000,
    'maxFeePerGas': max_fee,
    'maxPriorityFeePerGas': max_priority,
    'chainId': 1,
    'type': 2,
}
signed = acct.sign_transaction(tx)
print(signed.raw_transaction.hex())
" > /tmp/cow_raw_tx.txt

  TX_HASH=$(curl -s "$RPC" -X POST \
    -H "Content-Type: application/json" \
    -d "{\"jsonrpc\":\"2.0\",\"method\":\"eth_sendRawTransaction\",\"params\":[\"0x$(cat /tmp/cow_raw_tx.txt)\"],\"id\":1}" \
    | python3 -c "import sys,json; print(json.load(sys.stdin)['result'])")
  echo "Approve tx: $TX_HASH"

  # Wait for confirmation
  echo "Waiting for confirmation..."
  for i in $(seq 1 30); do
    RECEIPT=$(curl -s "$RPC" -X POST \
      -H "Content-Type: application/json" \
      -d "{\"jsonrpc\":\"2.0\",\"method\":\"eth_getTransactionReceipt\",\"params\":[\"$TX_HASH\"],\"id\":1}" \
      | python3 -c "import sys,json; r=json.load(sys.stdin)['result']; print(r['status'] if r else 'pending')")
    [ "$RECEIPT" = "0x1" ] && echo "Approved!" && break
    sleep 4
  done
fi

# --- Step 1: Get quote ---
QUOTE=$(curl -s -X POST "$API/quote" \
  -H "Content-Type: application/json" \
  -d "{
    \"sellToken\": \"$SELL_TOKEN\",
    \"buyToken\": \"$BUY_TOKEN\",
    \"sellAmountBeforeFee\": \"$SELL_AMOUNT\",
    \"kind\": \"sell\",
    \"from\": \"$FROM\",
    \"receiver\": \"$FROM\",
    \"appData\": \"$APP_DATA\",
    \"appDataHash\": \"$APP_DATA\",
    \"sellTokenBalance\": \"erc20\",
    \"buyTokenBalance\": \"erc20\",
    \"partiallyFillable\": false,
    \"signingScheme\": \"eip712\"
  }")

echo "Quote response:"
echo "$QUOTE" | python3 -m json.tool

# --- Step 2: Adjust amounts ---
ADJUSTED=$(python3 -c "
import json
q = json.loads('$QUOTE')['quote']
sell = int(q['sellAmount']) + int(q['feeAmount'])
buy = int(q['buyAmount']) * (10000 - $SLIPPAGE_BPS) // 10000
receiver = q.get('receiver') or '$FROM'
valid_to = q['validTo']
print(json.dumps({'sell': str(sell), 'buy': str(buy), 'receiver': receiver, 'validTo': valid_to}))
")

SIGNING_SELL=$(echo "$ADJUSTED" | python3 -c "import sys,json; print(json.load(sys.stdin)['sell'])")
SIGNING_BUY=$(echo "$ADJUSTED" | python3 -c "import sys,json; print(json.load(sys.stdin)['buy'])")
RECEIVER=$(echo "$ADJUSTED" | python3 -c "import sys,json; print(json.load(sys.stdin)['receiver'])")
VALID_TO=$(echo "$ADJUSTED" | python3 -c "import sys,json; print(json.load(sys.stdin)['validTo'])")
QUOTE_ID=$(echo "$QUOTE" | python3 -c "import sys,json; print(json.load(sys.stdin).get('id',''))")

echo "Signing: sell=$SIGNING_SELL buy=$SIGNING_BUY receiver=$RECEIVER validTo=$VALID_TO"

# --- Step 3: Sign (EIP-712) ---
SIGNATURE=$(python3 -c "
from eth_account import Account
from eth_account.messages import encode_typed_data

order_data = {
    'sellToken':         '$SELL_TOKEN',
    'buyToken':          '$BUY_TOKEN',
    'receiver':          '$RECEIVER',
    'sellAmount':        int('$SIGNING_SELL'),
    'buyAmount':         int('$SIGNING_BUY'),
    'validTo':           $VALID_TO,
    'appData':           bytes.fromhex('${APP_DATA#0x}'),
    'feeAmount':         0,
    'kind':              'sell',
    'partiallyFillable': False,
    'sellTokenBalance':  'erc20',
    'buyTokenBalance':   'erc20',
}
domain = {
    'name':              'Gnosis Protocol',
    'version':           'v2',
    'chainId':           1,
    'verifyingContract':  '0x9008D19f58AAbD9eD0D60971565AA8510560ab41',
}
types = {
    'Order': [
        {'name': 'sellToken',         'type': 'address'},
        {'name': 'buyToken',          'type': 'address'},
        {'name': 'receiver',          'type': 'address'},
        {'name': 'sellAmount',        'type': 'uint256'},
        {'name': 'buyAmount',         'type': 'uint256'},
        {'name': 'validTo',           'type': 'uint32'},
        {'name': 'appData',           'type': 'bytes32'},
        {'name': 'feeAmount',         'type': 'uint256'},
        {'name': 'kind',              'type': 'string'},
        {'name': 'partiallyFillable', 'type': 'bool'},
        {'name': 'sellTokenBalance',  'type': 'string'},
        {'name': 'buyTokenBalance',   'type': 'string'},
    ]
}

acct = Account.from_key('$PRIVATE_KEY')
signed = acct.sign_typed_data(domain, types, order_data)
print(signed.signature.hex())
")

echo "Signature: 0x$SIGNATURE"

# --- Step 4: Submit ---
ORDER_UID=$(curl -s -X POST "$API/orders" \
  -H "Content-Type: application/json" \
  -d "{
    \"sellToken\": \"$SELL_TOKEN\",
    \"buyToken\": \"$BUY_TOKEN\",
    \"receiver\": \"$RECEIVER\",
    \"sellAmount\": \"$SIGNING_SELL\",
    \"buyAmount\": \"$SIGNING_BUY\",
    \"validTo\": $VALID_TO,
    \"appData\": \"$APP_DATA\",
    \"feeAmount\": \"0\",
    \"kind\": \"sell\",
    \"partiallyFillable\": false,
    \"sellTokenBalance\": \"erc20\",
    \"buyTokenBalance\": \"erc20\",
    \"from\": \"$FROM\",
    \"signingScheme\": \"eip712\",
    \"signature\": \"0x$SIGNATURE\",
    \"quoteId\": $QUOTE_ID
  }")

echo "Order UID: $ORDER_UID"

# --- Step 5: Monitor ---
echo "Status: $(curl -s "$API/orders/$ORDER_UID" | python3 -c "import sys,json; print(json.load(sys.stdin).get('status','unknown'))")"
echo "Explorer: https://explorer.cow.fi/orders/$ORDER_UID"
```

---

## Safety Rules

- Never submit raw quote values without adjustments.
- Default `receiver` to `from` address unless user explicitly requests a custom receiver.
- Treat signed fields as immutable; recreate order when parameters are wrong.
- Verify allowance and sell-token balance before submission.
- Always use the pre-registered agent `appData` hash. This tags every order with `"appCode": "agent"`.

## Troubleshooting

| Error | Cause | Fix |
|---|---|---|
| `InsufficientAllowance` | Sell token not approved for VaultRelayer | Send `approve` tx (Step 0) |
| `InsufficientBalance` | Wallet lacks sell token balance | Fund the wallet |
| `SellAmountDoesNotCoverFee` | Amount too small to cover protocol fee | Increase sell amount |
| `QuoteNotFound` | Quote expired or invalid parameters | Retry quote request |
| `InvalidSignature` | Wrong signing scheme, domain, or `from` | Check EIP-712 domain, types, and `from` match |
| `insufficient_fee` / validation failure | Signed with non-zero feeAmount | Always sign with `feeAmount: "0"` |

For smart-contract wallets: use `eip1271` with contract as `from`, or `presign` with on-chain `setPreSignature`.

## Tooling Notes

- **Python**: `eth_account.Account.from_key(os.environ["PRIVATE_KEY"])` to load the signer. `.sign_typed_data` for EIP-712. Requires `eth_account >= 0.10`. The `appData` must be `bytes` (`bytes.fromhex(hex_str[2:])`) in the message dict.
- **TypeScript/Node**: `new ethers.Wallet(process.env.PRIVATE_KEY)` or `viem`'s `privateKeyToAccount`. Use `.signTypedData` for EIP-712.
- **Shell/curl**: use `curl` for all HTTP calls and Python/Node inline for signing. Pass `$PRIVATE_KEY` to the signing script.
- Use EIP-1559 (type 2) transactions for on-chain operations (approvals). Legacy transactions with low `gasPrice` get stuck.
- Use `$ETH_RPC_URL` when set, otherwise fall back to public RPCs.

## Public RPC Endpoints

| Network | Public RPC |
|---|---|
| Mainnet | `https://eth.llamarpc.com` or `https://rpc.ankr.com/eth` |
| Gnosis Chain | `https://rpc.gnosischain.com` |
| Arbitrum One | `https://arb1.arbitrum.io/rpc` |
| Base | `https://mainnet.base.org` |
| Sepolia | `https://rpc.sepolia.org` |

## Approval Calldata Reference

| Function | Selector |
|---|---|
| `approve(address,uint256)` | `0x095ea7b3` |
| `allowance(address,address)` | `0xdd62ed3e` |
| `decimals()` | `0x313ce567` |
