import { useAppStore } from "$/stores";
import { sendPostMessageRaw } from "@agribank/post-message";
import { ButtonAdapter } from "@agribank/ui/components/ButtonAdapter";
import { Controlled } from "@agribank/ui/components/ControlledInput";
import { zodResolver } from "@hookform/resolvers/zod";
import { Grid2 } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Paper, { type PaperProps } from "@mui/material/Paper";
import { enqueueSnackbar } from "notistack";
import { Fragment, useRef } from "react";
import Draggable from "react-draggable";
import { useForm } from "react-hook-form";
import { z } from "zod";

const schema = z.object({
	type: z.string(),
	data: z
		.preprocess(
			(params) => (params && typeof params === "string" ? JSON.parse(params) : params),
			z.record(z.string(), z.any())
		)
		.optional()
		.default("{}")
});

type Props = {
	iframe: HTMLIFrameElement | null;
};

function PaperComponent(props: PaperProps) {
	const nodeRef = useRef<HTMLDivElement>(null);
	return (
		<Draggable
			//@ts-expect-error - types of Draggable component are outdated, will have to w8 for fix on their end`
			nodeRef={nodeRef}
			handle="#handle-postmessage"
			cancel={'[class*="MuiDialogContent-root"]'}
		>
			<Paper
				{...props}
				ref={nodeRef}
			/>
		</Draggable>
	);
}

export function PostMessagePopup({ iframe }: Props) {
	const {
		changeDialogVisibility,
		micro: { dialogStatus: dialog }
	} = useAppStore();

	const {
		control,
		handleSubmit,
		formState: { errors }
	} = useForm<z.infer<typeof schema>>({
		resolver: zodResolver(schema)
	});

	const handleClose = () => {
		changeDialogVisibility("closed");
	};

	const handleSend = (data: z.infer<typeof schema>) => {
		if (!iframe?.contentWindow) {
			enqueueSnackbar({
				message: "iframe is not loaded yet",
				variant: "error"
			});
			return;
		}
		sendPostMessageRaw(data, iframe?.contentWindow);
	};

	return (
		<Fragment>
			<Dialog
				open={dialog === "opened"}
				onClose={handleClose}
				PaperComponent={PaperComponent}
				sx={{
					"& .MuiDialog-container": {
						alignItems: "flex-start",
						justifySelf: "flex-start"
					}
				}}
				aria-labelledby="handle-postmessage"
			>
				<DialogTitle
					style={{ cursor: "move" }}
					id="handle-postmessage"
				>
					Send custom post messages
				</DialogTitle>
				<DialogContent>
					<Grid2
						container
						marginTop={10}
						gap={10}
					>
						<Controlled.Input
							control={control}
							name="type"
							type="text"
							label="type"
							helperText={errors.type?.message}
							error={!!errors.type?.message}
						/>
						<Controlled.Input
							control={control}
							name="data"
							type="text"
							label="data"
							placeholder="{}"
							helperText={errors.data?.message?.toString()}
							error={!!errors.data?.message}
						/>
					</Grid2>
				</DialogContent>
				<DialogActions>
					<ButtonAdapter
						muiButtonProps={{ autoFocus: true }}
						onClick={handleSubmit(handleSend, (e) => console.log(e))}
					>
						Send
					</ButtonAdapter>
					<ButtonAdapter onClick={handleClose}>Close</ButtonAdapter>
				</DialogActions>
			</Dialog>
		</Fragment>
	);
}
