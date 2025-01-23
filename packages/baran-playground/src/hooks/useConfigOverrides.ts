import { convert } from "$/features/environment";
import { useAppStore } from "$/stores";
import { useMemo } from "react";

export function useConfigOverrides() {
	const settings = useAppStore();
	const configOverrides = useMemo(() => {
		return { apiBaseUrl: convert(settings.environment) };
	}, [settings.environment]);
	return configOverrides;
}
