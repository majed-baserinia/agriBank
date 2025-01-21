# Ignite

This package is responsible for initializing the whole app. Which includes:

1. reading config files (using fetch requests to config files)
2. reading config params (from search params)
3. initializing language and global setting stores
4. getting auth tokens
5. getting theme and palette

all of these happen by calling the `useInit` hook which returns the `ready` boolean status.

# Examples:

```ts
import { searchParamsConfigSchema, useInit, useIgniteStore } from "@agribank/ignite";
function App() {
	const isReady = useInit({
		onInitializationFailed: (message) => {
			pushAlert({
				hasConfirmAction: true,
				messageText: message,
				type: "error"
			});
			return false;
		}
	});
	const theme = useIgniteStore((state) => state.settings.theme);

	return (
        {isReady ? <YouApp theme={theme} /> : "loading"}
	);
}
```

- calling `useIgniteStore` without the `useInit` is useless (just once in the tree), because it never fills the values.
