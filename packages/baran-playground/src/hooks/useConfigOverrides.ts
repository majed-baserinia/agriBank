import { convert } from "$/features/environment";
import { useAppStore } from "$/stores";
import { useMemo } from "react";

export function useConfigOverrides() {
	const settings = useAppStore();
	const configOverrides = useMemo(() => {
		return { baseApiUrl: convert(settings.environment.active) };
	}, [settings.environment.active]);
	return configOverrides;
}
