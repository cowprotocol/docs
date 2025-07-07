# eth_cancelBundle

Clarification for eth_cancelBundle we support only receiving empty bundle with uuid they want to cancel.

we'll broadcast both eth_cancelBundle and eth_sendBundle to all connected builders with that uuid

Example of request

```jsx
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "eth_cancelBundle",
  "params": [
    {
      "replacementUuid": "mevblocker",   // String, any arbitrary string that can be used to replace or cancel this bundle
    }
  ]
}
```

Example response

```jsx
{
    "id": 1,
    "jsonrpc": "2.0",
    "result": 200
}
```