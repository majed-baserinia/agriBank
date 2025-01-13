import { useAppStore } from "$/stores";
import { ButtonAdapter } from "@agribank/ui/components/ButtonAdapter";
import { Controlled } from "@agribank/ui/components/ControlledInput";
import { zodResolver } from "@hookform/resolvers/zod";
import { Grid2 } from "@mui/material";
import { useForm } from "react-hook-form";
import type { z } from "zod";
import { appSchema as schema } from "../utils";

export function CreateApp() {
	const form = useForm<z.infer<typeof schema>>({
		resolver: zodResolver(schema)
	});

	const store = useAppStore();

	function handleCreateApp(data: z.infer<typeof schema>) {
		store.addApplication(data);
	}

	return (
		<Grid2
			container
			flexDirection={"column"}
			gap={10}
		>
			<Grid2
				container
				flexDirection={"row"}
				flexWrap={"nowrap"}
				gap={10}
			>
				<Controlled.Input
					control={form.control}
					name="title"
					label="title"
					type="text"
					helperText={form.formState.errors.title?.message}
					error={!!form.formState.errors.title?.message}
					sx={{
						flexGrow: 1
					}}
				/>
				<Controlled.Input
					control={form.control}
					name="url"
					label="url"
					type="text"
					helperText={form.formState.errors.url?.message}
					error={!!form.formState.errors.url?.message}
					sx={{
						flexGrow: 1
					}}
				/>
			</Grid2>

			<Grid2
				container
				flexDirection={"row"}
				flexWrap={"nowrap"}
				gap={10}
			>
				<Controlled.Input
					control={form.control}
					name="searchParams"
					label="search params"
					type="text"
					helperText={form.formState.errors.searchParams?.message}
					error={!!form.formState.errors.searchParams?.message}
					sx={{
						flexGrow: 1,
						flexShrink: 0,
						flexBasis: 0
					}}
				/>
				<ButtonAdapter
					onClick={form.handleSubmit(handleCreateApp)}
					variant="contained"
					muiButtonProps={{
						sx: {
							flexGrow: 1,
							flexShrink: 0,
							flexBasis: 0,
							padding: 0,
							height: "2.9rem"
						}
					}}
				>
					create app
				</ButtonAdapter>
			</Grid2>
		</Grid2>
	);
}
