import type { Application } from "../stores";

export function findApp(apps: Application[], title: string | undefined) {
	return title ? apps.find((app) => app.title === title) : undefined;
}
