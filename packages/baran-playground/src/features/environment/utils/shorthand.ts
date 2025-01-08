import type { Environments } from "./environment-to-url";
export function shorthand(environment: Environments) {
	switch (environment) {
		case "test":
			return "tst";
		case "pilot":
			return "plt";
	}
	// eslint-disable-next-line @typescript-eslint/restrict-template-expressions
	throw new Error(`shorthand for ${environment} not created`);
}
