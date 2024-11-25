# Communication

In order to communicate with `super-app` we must have defined post-message protocols and message types. All supported
messages are included within this package.

# Examples

```ts
usePostMessage({
	callback: (response) => {
		console.log(response);
	},
	message: "readSMS"
});
```
