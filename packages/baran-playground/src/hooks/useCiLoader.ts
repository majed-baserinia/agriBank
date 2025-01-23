import { navigateToActiveApplication } from "$/features/apps";
import { useAppStore } from "$/stores";
import { useNavigate, useSearch } from "@tanstack/react-router";
import { useEffect, useRef } from "react";

export function useCiLoader() {
	const store = useAppStore();
	const navigate = useNavigate({});
	const search = useSearch({ from: "__root__" });
	const alreadyNavigated = useRef(false);

	useEffect(() => {
		if (!search.ci || !alreadyNavigated.current) {
			return;
		}
		void navigateToActiveApplication(navigate);
	}, [search.ci, navigate]);

	if (!search.ci) {
		return;
	}

	if (!alreadyNavigated.current) {
		store.setEnvironment(search.microEnv);
		store.addApplication(
			{
				title: search.microAppName,
				url: `${search.microBaseUrl}:${search.microPort}/${search.microAppName}`,
				searchParams: search.microSearchParams
			},
			false
		);
		store.setPreRegisterRequest({
			key: search.microUsername,
			data: {
				accOrCifNum: search.microUsername
			}
		});
		store.setLoginRequest({
			key: search.microUsername,
			data: {
				username: search.microUsername,
				password: search.microPassword
			}
		});

		store.setActiveUser(search.microUsername);
		search.microIframeId && store.updateIframeId(search.microIframeId);
		store.setSelectedApp({ title: search.microAppName });

		alreadyNavigated.current = true;
	}
}
