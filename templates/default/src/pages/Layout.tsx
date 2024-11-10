import { useInit, useInitialSettingStore } from "@htsc/ignite";
import { Alerts } from "@htsc/ui/components/Alerts";
import { Loader } from "@htsc/ui/components/Loader";
import { MaterialThemeProvider } from "@htsc/ui/components/MaterialThemeProvider";
import { RootStyles } from "@htsc/ui/components/RootStyles";
import { Outlet } from "react-router-dom";

export const Layout = () => {
	const isReady = useInit();
	const theme = useInitialSettingStore((state) => state.settings.theme);
	return isReady ? (
		<RootStyles>
			<MaterialThemeProvider theme={theme}>
				<Alerts />
				<Outlet />
			</MaterialThemeProvider>
		</RootStyles>
	) : (
		<Loader showLoader />
	);
};
