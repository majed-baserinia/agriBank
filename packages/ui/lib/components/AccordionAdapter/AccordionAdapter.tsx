import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Accordion, AccordionDetails, AccordionSummary, useTheme } from "@mui/material";
import type { Props } from "./types";

export function AccordionAdapter(props: Props) {
	const { expanded, onChange, id, details, summery } = props;
	const theme = useTheme();

	return (
		<Accordion
			disableGutters
			expanded={expanded}
			onChange={(e) => onChange?.(e, id)}
			sx={{
				borderRadius: "8px",
				overflow: "hidden",
				border: `1px solid ${theme.palette.grey[50]}`,
				boxShadow: "none"
			}}
		>
			<AccordionSummary
				expandIcon={<ExpandMoreIcon />}
				aria-controls={`${id}-content`}
				id={`${id}-header`}
			>
				{summery}
			</AccordionSummary>
			<AccordionDetails>{details}</AccordionDetails>
		</Accordion>
	);
}
