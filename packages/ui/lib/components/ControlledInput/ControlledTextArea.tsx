import type { FormControlProps } from "$components/ControlledInput/Controlled";
import type { TextareaAdapterProps } from "$lib/components/TextAreaAdapter/types";

import { Controlled } from "$components/ControlledInput/Controlled";
import { TextAreaAdapter } from "$components/TextAreaAdapter";
import { type FieldValues } from "react-hook-form";

export type Props<TFieldValues extends FieldValues, TContext> = FormControlProps<
	TFieldValues,
	TContext
> &
	TextareaAdapterProps;

export function ControlledTextArea<TFieldValues extends FieldValues, TContext>(
	props: Props<TFieldValues, TContext>
) {
	return (
		<Controlled<TextareaAdapterProps, TFieldValues, TContext>
			element={(props) => {
				return <TextAreaAdapter {...props} />;
			}}
			{...props}
		/>
	);
}
