import {
	PreRegisterCommand,
	RegisterCommand,
	VerifyRegisterOtpCommand
} from "$/services/.generated/customer-management/zod/schemas";
import { z } from "zod";
import { requestSchema as LoginRequestCommand } from "../services/login";

export const schema = z.object({
	preRegister: PreRegisterCommand.optional(),
	verifyRegister: VerifyRegisterOtpCommand.optional(),
	register: RegisterCommand.optional(),
	login: LoginRequestCommand.optional()
});
