---
sidebar_position: 7
---
# Set Up Free Cancellation

Set `softCancellations=true` in the URL and then send a transaction to self with the same nonce as the one you want to cancel.


Note: This will stop MEV Blocker from broadcasting your previous transaction (it may still get included in rare conditions if it has been broadcasted before). This can be enabled only on `/noreverts` or `/fullprivacy` endpoints, soft cancellations won't work on `/fast` (the default).