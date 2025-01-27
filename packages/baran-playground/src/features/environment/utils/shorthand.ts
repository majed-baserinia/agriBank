import type { Environments } from "./environment-to-url";
export function shorthand(environment: Environments) {
	switch (environment) {
		case "production":
			return "prod";
		case "test":
			return "tst";
		case "pilot":
			return "plt";
		case "custom":
			return "cstm";
	}
	// eslint-disable-next-line @typescript-eslint/restrict-template-expressions
	throw new Error(`shorthand for ${environment} not created`);
}
