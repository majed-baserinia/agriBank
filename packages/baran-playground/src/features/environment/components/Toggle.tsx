import { useAppStore } from "$/stores/app";
import { type SxProps, Typography } from "@mui/material";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup, { type ToggleButtonGroupProps } from "@mui/material/ToggleButtonGroup";
import { useEffect, useState } from "react";
import { type Environments, environments, shorthand } from "../utils";

type Props = {
	sx?: SxProps;
	orientation?: ToggleButtonGroupProps["orientation"];
};

export function Toggle({ orientation, sx }: Props) {
	const settings = useAppStore();
	const [view, setView] = useState<Environments>(settings.environment.active);

	useEffect(() => {
		setView(settings.environment.active);
	}, [settings.environment.active]);

	const handleChange = (_: unknown, next: Environments | null) => {
		if (!next) {
			return;
		}
		settings.setEnvironment(next);
	};

	return (
		<ToggleButtonGroup
			orientation={orientation}
			value={view}
			exclusive
			sx={{
				...sx,
				padding: 0.5,
				marginBottom: 10
			}}
			onChange={handleChange}
		>
			{environments.map((environment) => (
				<ToggleButton
					key={environment}
					value={environment}
					fullWidth
					aria-label={environment}
					sx={{ paddingX: 1.5, paddingY: 1 }}
				>
					{orientation === "vertical" ? (
						<Typography sx={{ wordBreak: "break-all", color: "white" }} fontSize={12} >{shorthand(environment)}</Typography>
					) : (
						<Typography>{environment}</Typography>
					)}
				</ToggleButton>
			))}
		</ToggleButtonGroup>
	);
}
