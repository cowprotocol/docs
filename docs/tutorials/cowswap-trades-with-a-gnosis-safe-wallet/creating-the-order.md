---
draft: true
---

# Creating the order

Let’s do an intermediate step and create a method to submit the order. The gist of the process is the following:

- Get the quote of the trade to do
- Create an order through the api and get an order id
- Use the order id to set a flag on-chain, saying you are ok with that trade

I tried adding comments around the code

```python
from time import time
import requests
import web3
def cowswap_sell(safe, sell_token, buy_token):
    # Contract used to sign the order
    gnosis_settlement = safe.contract("0x9008D19f58AAbD9eD0D60971565AA8510560ab41")
    amount = sell_token.balanceOf(safe.address)

    # get the fee + the buy amount after fee
    fee_and_quote = "https://api.cow.fi/mainnet/api/v1/feeAndQuote/sell"
    get_params = {
        "sellToken": sell_token.address,
        "buyToken": buy_token.address,
        "sellAmountBeforeFee": amount
    }
    r = requests.get(fee_and_quote, params=get_params)
    assert r.ok and r.status_code == 200

    # These two values are needed to create an order
    fee_amount = int(r.json()['fee']['amount'])
    buy_amount_after_fee = int(r.json()['buyAmountAfterFee'])
    assert fee_amount > 0
    assert buy_amount_after_fee > 0

    # Pretty random order deadline :shrug:
    deadline = chain.time() + 60*60*24*100 # 100 days

    # Submit order
    order_payload = {
        "sellToken": sell_token.address,
        "buyToken": buy_token.address,
        "sellAmount": str(amount-fee_amount), # amount that we have minus the fee we have to pay
        "buyAmount": str(buy_amount_after_fee), # buy amount fetched from the previous call
        "validTo": deadline,
        "appData": web3.Web3.keccak(text="yearn goes moooooo").hex(), # required field, do not change :)
        "feeAmount": str(fee_amount),
        "kind": "sell",
        "partiallyFillable": False,
        "receiver": safe.address,
        "signature": "0x",
        "from": safe.address,
        "sellTokenBalance": "erc20",
        "buyTokenBalance": "erc20",
        "signingScheme": "presign" # Very important. this tells the api you are going to sign on chain
    }
    orders_url = f"https://protocol-mainnet.gnosis.io/api/v1/orders"
    r = requests.post(orders_url, json=order_payload)
    assert r.ok and r.status_code == 201
    order_uid = r.json()
    print(f"Payload: {order_payload}")
    print(f"Order uid: {order_uid}")

    # With the order id, we set the flag, basically signing as the gnosis safe.
    gnosis_settlement.setPreSignature(order_uid, True)
```
