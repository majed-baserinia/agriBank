import { useAppStore } from "$/stores";
import { ButtonAdapter } from "@agribank/ui/components/ButtonAdapter";
import { zodResolver } from "@hookform/resolvers/zod";
import { Delete as DeleteIcon, Edit as EditIcon } from "@mui/icons-material";
import { Card, CardActionArea, CardContent, Grid2, IconButton } from "@mui/material";
import { useState } from "react";
import { useForm } from "react-hook-form";
import type { z } from "zod";
import { useSelectedApplication } from "../hooks";
import { type Application } from "../stores";
import { appSchema } from "../utils";
import { EditableInput } from "./EditableInput";

type Props = {
	app: Application;
};

export function App({ app }: Props) {
	const form = useForm<z.infer<typeof appSchema>>({
		resolver: zodResolver(appSchema)
	});

	const store = useAppStore();
	const selectedApplication = useSelectedApplication();
	const [isEditing, setIsEditing] = useState(false);

	function handleEdit() {
		setIsEditing(true);
	}

	function handleRemove() {
		store.removeApplication(app.title);
	}

	function handleSave(editedApp: Application) {
		setIsEditing(false);
		store.updateApplication(app.title, editedApp);
	}

	function handleCancel() {
		setIsEditing(false);
	}

	return (
		<Card key={app.title}>
			<CardActionArea
				onClick={() => store.setSelectedApp(app)}
				data-active={selectedApplication?.title === app.title ? "" : undefined}
				sx={{
					height: "100%",
					"&[data-active]": {
						backgroundColor: "action.selected",
						"&:hover": {
							backgroundColor: "action.selectedHover"
						}
					}
				}}
			>
				<CardContent
					sx={{
						height: "100%",
						display: "flex",
						flexDirection: "column",
						justifyContent: "space-between",
						minHeight: "10rem"
					}}
				>
					<Grid2
						container
						gap={10}
						marginBottom={10}
						flexDirection={"column"}
					>
						<EditableInput
							muiTypographyProps={{ variant: "h5", component: "div" }}
							form={form}
							name="title"
							label="title"
							isEditing={isEditing}
							text={app.title}
						/>
						<EditableInput
							muiTypographyProps={{ variant: "body2", color: "text.secondary" }}
							form={form}
							name="url"
							label="url"
							isEditing={isEditing}
							text={app.url}
						/>
						<EditableInput
							muiTypographyProps={{ variant: "body2", color: "text.secondary" }}
							form={form}
							name="searchParams"
							label="search params"
							isEditing={isEditing}
							text={app.searchParams ?? ""}
						/>
					</Grid2>

					<Grid2>
						{!isEditing ? (
							<Grid2 container>
								<IconButton
									aria-label="edit"
									title="edit"
									color="primary"
									onClick={handleEdit}
								>
									<EditIcon />
								</IconButton>
								<IconButton
									aria-label="remove"
									title="remove"
									color="error"
									onClick={handleRemove}
								>
									<DeleteIcon />
								</IconButton>
							</Grid2>
						) : (
							<Grid2
								container
								gap={10}
							>
								<ButtonAdapter
									muiButtonProps={{
										variant: "contained",
										size: "small",
										color: "success",
										sx: {
											flexGrow: 1,
											flexShrink: 0,
											flexBasis: 0
										}
									}}
									onClick={form.handleSubmit(handleSave)}
								>
									save
								</ButtonAdapter>
								<ButtonAdapter
									muiButtonProps={{
										variant: "contained",
										size: "small",
										color: "warning",
										sx: {
											flexGrow: 1,
											flexShrink: 0,
											flexBasis: 0
										}
									}}
									onClick={handleCancel}
								>
									cancel
								</ButtonAdapter>
							</Grid2>
						)}
					</Grid2>
				</CardContent>
			</CardActionArea>
		</Card>
	);
}
