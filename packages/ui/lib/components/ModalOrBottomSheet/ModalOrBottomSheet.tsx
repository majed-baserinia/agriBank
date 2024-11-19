import CloseIcon from "@mui/icons-material/Close";
import {
	Dialog,
	DialogContent,
	DialogTitle,
	Grid,
	IconButton,
	Typography,
	useMediaQuery,
	useTheme
} from "@mui/material";
import Sheet from "react-modal-sheet";

import type { Props } from "./types";

export function ModalOrBottomSheet(props: Props) {
	const {
		breackpoint,
		children,
		snapPoints = [450, 0],
		ModalpaperProps,
		open,
		setOpen,
		title
	} = props;
	const theme = useTheme();
	const isMatched = useMediaQuery(theme.breakpoints.down(breackpoint));

	return isMatched ? (
		<Sheet
			isOpen={open}
			onClose={() => setOpen(false)}
			snapPoints={snapPoints}
		>
			<Sheet.Container style={{ backgroundColor: theme.palette.background.paper, padding: "16px" }}>
				<Sheet.Header style={{ marginBottom: "16px" }}>
					<Typography
						fontWeight={"bold"}
						variant="bodyLg"
					>
						{title}
					</Typography>
				</Sheet.Header>
				<Sheet.Content>{children}</Sheet.Content>
			</Sheet.Container>
			<Sheet.Backdrop />
		</Sheet>
	) : (
		<Dialog
			fullWidth
			onClose={() => setOpen(false)}
			open={open}
			PaperProps={ModalpaperProps}
		>
			<DialogTitle>
				<Grid
					alignItems={"center"}
					container
					justifyContent={"space-between"}
				>
					<Typography
						fontWeight={"bold"}
						variant="bodyLg"
					>
						{title}
					</Typography>
					<IconButton onClick={() => setOpen(false)}>
						<CloseIcon />
					</IconButton>
				</Grid>
			</DialogTitle>
			<DialogContent>{children}</DialogContent>
		</Dialog>
	);
}
