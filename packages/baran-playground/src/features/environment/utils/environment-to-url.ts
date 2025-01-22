export const environments = ["test", "pilot", "production"] as const;
export type Environments = (typeof environments)[number];

export function convert(environment: Environments & {}) {
	switch (environment) {
		case "production":
			return "https://digitalbanking.bki.ir";
		case "pilot":
			return "https://dgbankmb-pilot.bki.ir";
		case "test":
		default:
			return "https://digitalbanking-tst.bki.ir";
	}
}
