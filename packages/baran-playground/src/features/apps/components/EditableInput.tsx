import { appSchema } from "$/features/apps/utils";
import { Controlled } from "@agribank/ui/components/ControlledInput";
import { Typography, TypographyProps } from "@mui/material";
import { FieldPath, UseFormReturn } from "react-hook-form";
import { z } from "zod";

type Props = {
	muiTypographyProps: TypographyProps;
	text: string;
	isEditing: boolean;
	label: string;
	name: FieldPath<z.infer<typeof appSchema>>;
	form: UseFormReturn<z.infer<typeof appSchema>>;
};

export function EditableInput({ muiTypographyProps, text, label, form, name, isEditing }: Props) {
	return !isEditing ? (
		<Typography {...muiTypographyProps}>{text}</Typography>
	) : (
		<Controlled.Input
			control={form.control}
			name={name}
			type="text"
			label={label}
			defaultValue={text}
		/>
	);
}
