import { useAppStore } from "$/stores/app";
import { SxProps, Typography } from "@mui/material";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup, { type ToggleButtonGroupProps } from "@mui/material/ToggleButtonGroup";
import { useEffect, useState } from "react";
import { shorthand } from "../utils";
import { type Environments, environments } from "../utils/environment-to-url";

type Props = {
	sx?: SxProps;
	orientation?: ToggleButtonGroupProps["orientation"];
};

export function Toggle({ orientation, sx }: Props) {
	const settings = useAppStore();
	const [view, setView] = useState<Environments>(settings.environment);

	useEffect(() => {
		setView(settings.environment);
	}, [settings.environment]);

	const handleChange = (_: unknown, next: Environments) => {
		settings.setEnvironment(next);
	};

	return (
		<ToggleButtonGroup
			orientation={orientation}
			value={view}
			exclusive
			sx={{
				...sx,
				padding: 5
			}}
			onChange={handleChange}
		>
			{environments.map((environment) => (
				<ToggleButton
					key={environment}
					value={environment}
					fullWidth
					aria-label={environment}
				>
					{orientation === "vertical" ? (
						<Typography sx={{ wordBreak: "break-all" }}>{shorthand(environment)}</Typography>
					) : (
						<Typography>{environment}</Typography>
					)}
				</ToggleButton>
			))}
		</ToggleButtonGroup>
	);
}
