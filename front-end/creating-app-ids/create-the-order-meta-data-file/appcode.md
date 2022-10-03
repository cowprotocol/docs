# AppCode

**What is the AppCode?**&#x20;

The code identifying the CLI, UI, service generating the order. It would be an UTF8 string of up to 50 chars

**How to get your own AppCode**

Assuming you are building a tool to interact with the protocol without using one of the existing UIs/interfaces, you are free to pick one for yourself.

Just make sure you reach out to CoW Swap team before using it to avoid picking an invalid or already existing **AppCode**.

For example, to use the AppCode "MyAwesomeUi" the JSON would look like:

```
{
  "version": "0.4.0",
  "appCode": "MyAwesomeUi",
  "metadata": {}
}
```

On the next step you'll see what to do with this JSON.
