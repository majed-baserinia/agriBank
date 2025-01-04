import { DefaultError } from "./DefaultError";
import { GenericError } from "./GenericError";
export * from "./types";

export const Error = {
	Generic: GenericError,
	Default: DefaultError
};
