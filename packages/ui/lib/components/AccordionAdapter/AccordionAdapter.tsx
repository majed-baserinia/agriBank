import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";

import type { Props } from "./types";

export function AccordionAdapter(props: Props) {
	const { expanded, onChange, id, details, summery } = props;

	return (
		<Accordion
			disableGutters
			expanded={expanded}
			onChange={(e) => onChange?.(e, id)}
			sx={(theme) => ({
				borderRadius: "8px",
				overflow: "hidden",
				border: `1px solid ${theme.palette.grey[50]}`,
				boxShadow: "none"
			})}
		>
			<AccordionSummary
				aria-controls={`${id}-content`}
				expandIcon={<ExpandMoreIcon />}
				id={`${id}-header`}
			>
				{summery}
			</AccordionSummary>
			<AccordionDetails>{details}</AccordionDetails>
		</Accordion>
	);
}
