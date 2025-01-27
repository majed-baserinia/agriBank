import { useAppStore } from "$/stores";

export const environments = ["test", "pilot", "production", "custom"] as const;
export type Environments = (typeof environments)[number];

export function convert(environment: Environments & {}) {
	switch (environment) {
		case "production":
			return "https://digitalbanking.bki.ir";
		case "pilot":
			return "https://dgbankmb-pilot.bki.ir";
		case "test":
			return "https://digitalbanking-tst.bki.ir";
		case "custom":
			return useAppStore.getState().environment.customUrl ?? "";
		default:
			throw new Error("environment mapped url is not implemented");
	}
}
