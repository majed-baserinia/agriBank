import { type FieldValues } from "react-hook-form";
import type { FormControlProps } from "$components/ControlledInput/Controlled";
import { Controlled } from "$components/ControlledInput/Controlled";
import { InputAdapter } from "$lib/components/InputAdapter/InputAdapter";
import type { InputAdapterProps } from "$lib/components/InputAdapter/types";

export type Props<TFieldValues extends FieldValues, TContext> = FormControlProps<
	TFieldValues,
	TContext
> &
	InputAdapterProps;

export function ControlledInput<TFieldValues extends FieldValues, TContext>(
	props: Props<TFieldValues, TContext>
) {
	return (
		<Controlled<InputAdapterProps, TFieldValues, TContext>
			element={(props) => {
				return <InputAdapter {...props} />;
			}}
			{...props}
		/>
	);
}
