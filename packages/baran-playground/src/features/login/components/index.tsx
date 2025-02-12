import { zodResolver } from "@hookform/resolvers/zod";
import { Divider, Grid2, Typography } from "@mui/material";
import { FormProvider, useForm } from "react-hook-form";
import type { z } from "zod";
import { schema } from "../schemas";
import { RefreshLoginButton } from "./RefreshLoginButton";
import { Register } from "./Register";
import { Result } from "./Result";
import { UpgradeLevel2 } from "./UpgradeLevel2";
import { UsersSlot } from "./UsersSlot";

export type RegisterInput = z.infer<typeof schema>;

export function Login() {
	const form = useForm<z.infer<typeof schema>>({
		resolver: zodResolver(schema)
	});

	return (
		<FormProvider {...form}>
			<Grid2
				container
				flexDirection={"column"}
			>
				<Typography
					variant="h1Md"
					marginBottom={10}
				>
					Registration form
				</Typography>
				<Register />
				<UpgradeLevel2 />
				<UsersSlot />
				<Divider sx={{ marginBottom: 20, marginTop: 20 }} />
				<Grid2
					container
					alignItems={"center"}
					marginBottom={10}
				>
					<Typography variant="h1Md">Registration result</Typography>
					<RefreshLoginButton />
				</Grid2>
				<Result />
			</Grid2>
		</FormProvider>
	);
}
