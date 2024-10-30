import { type FieldValues } from "react-hook-form";
import type { FormControlProps } from "$components/ControlledInput/Controlled";
import { Controlled } from "$components/ControlledInput/Controlled";
import TextAreaAdapater from "$components/TextareaAdapter";
import type { TextareaAdapterProps } from "$components/TextareaAdapter/type";

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
				return <TextAreaAdapater {...props} />;
			}}
			{...props}
		/>
	);
}
