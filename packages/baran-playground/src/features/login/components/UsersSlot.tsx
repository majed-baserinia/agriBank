import { useCurrentEnvironmentUsers } from "$/features/login";
import { useAppStore } from "$/stores";
import { ChipsAdapter } from "@agribank/ui/components/ChipsAdapter";
import { Grid2 } from "@mui/material";
export function UsersSlot() {
	const activatedUserAccountNumber = useAppStore((s) => s.users.activatedUserAccountNumber);
	const setActiveUser = useAppStore((s) => s.setActiveUser);
	const users = useCurrentEnvironmentUsers();

	return (
		<Grid2
			container
			gap={10}
		>
			{Array.from(users.entries()).map(([accountNumber, _]) => {
				return (
					<ChipsAdapter
						key={accountNumber}
						label={accountNumber}
						variant={activatedUserAccountNumber === accountNumber ? "filled" : "outlined"}
						onClick={() => setActiveUser(accountNumber)}
					/>
				);
			})}
		</Grid2>
	);
}
