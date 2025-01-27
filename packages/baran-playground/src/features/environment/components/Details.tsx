import { useAppStore } from "$/stores/app";
import { ButtonAdapter } from "@agribank/ui/components/ButtonAdapter";
import { Controlled } from "@agribank/ui/components/ControlledInput";
import { zodResolver } from "@hookform/resolvers/zod";
import { Grid2, Typography } from "@mui/material";
import { enqueueSnackbar } from "notistack";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { convert } from "../utils/environment-to-url";

const schema = z.object({
	customUrl: z.string().url()
});

export function Details() {
	const form = useForm<z.infer<typeof schema>>({
		resolver: zodResolver(schema)
	});

	const store = useAppStore();

	function handleSaveCustomUrl(data: z.infer<typeof schema>) {
		store.setCustomEnvironmentUrl(data.customUrl);
		enqueueSnackbar({
			message: "custom url saved",
			variant: "success",
			autoHideDuration: 1000
		});
	}

	return store.environment.active === "custom" ? (
		<Grid2
			container
			flexDirection={"row"}
			gap={10}
		>
			<Controlled.Input
				label="custom url"
				name="customUrl"
				control={form.control}
				error={!!form.formState.errors.customUrl?.message}
				helperText={form.formState.errors.customUrl?.message}
				defaultValue={store.environment.customUrl}
				sx={{
					flexBasis: 0,
					flexShrink: 0,
					flexGrow: 3
				}}
			/>
			<ButtonAdapter
				muiButtonProps={{
					sx: {
						flexBasis: 0,
						flexShrink: 0,
						flexGrow: 1,
						height: "100%"
					}
				}}
				variant="contained"
				onClick={form.handleSubmit(handleSaveCustomUrl)}
			>
				save
			</ButtonAdapter>
		</Grid2>
	) : (
		<pre>
			<Typography variant="bodyLg">{convert(store.environment.active)}</Typography>
		</pre>
	);
}
