import type { BaseErrorProps } from "$lib/components/Error/types";
import { useTranslation } from "react-i18next";
import { GenericError } from "./GenericError";

export function DefaultError({ error, reset }: BaseErrorProps) {
	const { t } = useTranslation("base");
	return (
		<GenericError
			// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
			error={error}
			reset={reset}
			title={t("error")}
			message={t("init-error-text")}
		/>
	);
}
