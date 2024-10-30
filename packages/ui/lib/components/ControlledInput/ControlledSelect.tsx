import { type FieldValues } from "react-hook-form";
import type { FormControlProps } from "$components/ControlledInput/Controlled";
import { Controlled } from "$components/ControlledInput/Controlled";
import { SelectAdapter } from "$components/SelectAdapter";
import type { Props as SelectAdapterProps } from "$lib/components/SelectAdapter/types";

export type Props<TFieldValues extends FieldValues, TContext> = FormControlProps<
	TFieldValues,
	TContext
> &
	SelectAdapterProps;

export function ControlledSelect<TFieldValues extends FieldValues, TContext>(
	props: Props<TFieldValues, TContext>
) {
	return (
		<Controlled<SelectAdapterProps, TFieldValues, TContext>
			element={(props) => {
				return <SelectAdapter {...props} />;
			}}
			{...props}
		/>
	);
}
