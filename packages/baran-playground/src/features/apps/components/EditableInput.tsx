import type { appSchema } from "$/features/apps";
import { Controlled } from "@agribank/ui/components/ControlledInput";
import type { TypographyProps } from "@mui/material";
import { Typography } from "@mui/material";
import type { FieldPath, UseFormReturn } from "react-hook-form";
import type { z } from "zod";

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
		<Typography
			sx={{
				wordBreak: "break-all",
				display: "-webkit-box",
				overflow: "hidden",
				textOverflow: "ellipsis",
				WebkitLineClamp: "3",
				WebkitBoxOrient: "vertical"
			}}
			{...muiTypographyProps}
		>
			{text}
		</Typography>
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
