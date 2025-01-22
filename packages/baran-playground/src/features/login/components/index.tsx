import {
	PreRegisterCommand,
	RegisterCommand,
	VerifyRegisterOtpCommand
} from "$/services/.generated/customer-management/zod/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Divider, Grid2, Typography } from "@mui/material";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";
import { requestSchema as LoginRequestCommand } from "../services/login";
import { RefreshLogin } from "./RefreshLogin";
import { Register } from "./Register";
import { Result } from "./Result";

export const schema = z.object({
	preRegister: PreRegisterCommand.optional(),
	verifyRegister: VerifyRegisterOtpCommand.optional(),
	register: RegisterCommand.optional(),
	login: LoginRequestCommand.optional()
});

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
				<Divider sx={{ marginBottom: 20, marginTop: 20 }} />
				<Grid2
					container
					alignItems={"center"}
					marginBottom={10}
				>
					<Typography variant="h1Md">Registration result</Typography>
					<RefreshLogin />
				</Grid2>
				<Result />
			</Grid2>
		</FormProvider>
	);
}
