import {
	ConfirmUpgradeForLevelTwoCommand as AgriConfirmUpgradeForLevelTwoCommand,
	RequestUpgradeForLevelTwoCommand as AgriRequestUpgradeForLevelTwoCommand,
	PreRegisterCommand,
	RegisterCommand,
	VerifyRegisterOtpCommand
} from "$/services/.generated/customer-management/zod/schemas";
import { z } from "zod";
import { requestSchema as LoginRequestCommand } from "../services/login";

export const RequestUpgradeForLevelTwoCommand = AgriRequestUpgradeForLevelTwoCommand.extend({
	cardNumber: z
		.string()
		.transform((v) => v.replaceAll("-", ""))
		.pipe(z.number({ coerce: true }))
		.optional()
});

export const ConfirmUpgradeForLevelTwoCommand = AgriConfirmUpgradeForLevelTwoCommand.extend({
	cardNumber: z
		.string()
		.transform((v) => v.replaceAll("-", ""))
		.pipe(z.number({ coerce: true }))
		.optional()
});

export const schema = z.object({
	preRegister: PreRegisterCommand.optional(),
	verifyRegister: VerifyRegisterOtpCommand.optional(),
	register: RegisterCommand.optional(),
	login: LoginRequestCommand.optional(),
	upgradeLevel2OtpRequest: RequestUpgradeForLevelTwoCommand.optional(),
	upgradeLevel2Confirm: ConfirmUpgradeForLevelTwoCommand.optional()
});
