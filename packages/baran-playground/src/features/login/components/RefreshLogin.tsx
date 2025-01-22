import { useRefreshLogin } from "$/features/login";
import RefreshIcon from "@mui/icons-material/Refresh";
import { IconButton } from "@mui/material";

export function RefreshLogin() {
	const { mutate, isPending } = useRefreshLogin();
	return (
		<IconButton
			color="primary"
			aria-label="refresh login"
			title="refresh login"
			onClick={mutate}
			size="large"
			disabled={isPending}
		>
			<RefreshIcon />
		</IconButton>
	);
}
