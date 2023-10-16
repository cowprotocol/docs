# Verifying with Orderbook API Services



* To check that the invalidation was picked up by our orderbook via the [API service](https://api.cow.fi/mainnet)
* In the Orderbook API, select the appropriate network from the servers dropdown at the top of the page (for this tutorial we have selected our local instance)

![](https://lh6.googleusercontent.com/a\_U3CxRMhCdpcGNUGfXjZBQygC2wP25EItlwLFtqFSaGdhdtf5eQHmlbJwlIjSQsS7cNcAsUowt3uvtgVX8L9DZi7je91GtVndDOm6Ji6erRV24RuCwpf5We6IIyCWDf39\_9hzwO)

* Navigate to GET orders/\{UID\} where you can fetch orders by UID. Click on "Try it out", paste your OrderUid in the corresponding field and click "Execute"

![](https://lh4.googleusercontent.com/TbIx3bgdXqqnf1MHq4z3ZC29q8V2YHuLolAypWl8hTIEZVkqVbxbabjRPGrQeXntxy4gortkdi1KC57gzJeExG5W-fv\_Aymp8IxC1B-I5hR-LwFLMx1h4SBYlibIegyedJvlkkz6)

* You should see your order data and can verify that the order has been invalidated by finding "invalidated": true as part of this order data!

![](https://lh3.googleusercontent.com/\_cbijjah94s6cguOCpaLLTyQWVNt6ndcidcIu23MMJekjji9yb-2tzSqa3e2bV3QL5MZOZ6LAxyLfgwFozaCSvqg7QbFsOaBj1K6yBhh2BLe\_KFyT9zDtMZU4vQLmvzhvcbEDzJ-)

**Congratulations!!** You have successfully **invalidated** your order onchain!
