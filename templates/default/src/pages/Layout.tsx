import { useInit } from "@htsc/ignite";
import { Alerts } from "@htsc/ui/components/Alerts";
import { Loader } from "@htsc/ui/components/Loader";
import { MaterialThemeProvider } from "@htsc/ui/components/MaterialThemeProvider";
import { Outlet } from "react-router-dom";

export const Layout = () => {
	const isReady = useInit();

	return isReady ? (
		<MaterialThemeProvider>
			<>
				<Alerts />
				<Outlet />
			</>
		</MaterialThemeProvider>
	) : (
		<Loader showLoader />
	);
};
