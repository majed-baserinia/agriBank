import { GlobalStyles as MuiGlobalStyles } from "@mui/material";
import { memo } from "react";

type Props = {
	direction: string;
	fontFamily?: string;
};

export const GlobalStyles = memo(function GlobalStyles({ direction, fontFamily }: Props) {
	if (!direction.includes("noflip")) {
		direction += "/* @noflip */";
	}
	return (
		<MuiGlobalStyles
			styles={{
				html: {
					direction
				},
				body: {
					fontFamily,
					direction
				}
			}}
		/>
	);
});
