export const environments = ["test", "pilot"] as const;
export type Environments = (typeof environments)[number];

export function convert(environment: Environments & {}) {
	switch (environment) {
		case "pilot":
			return "https://dgbankmb-pilot.bki.ir";
		case "test":
		default:
			return "https://digitalbanking-tst.bki.ir";
	}
}
