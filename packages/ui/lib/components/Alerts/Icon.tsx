import { useEffect, useState } from "react";

import errorIcon from "$assets/icons/alerts/error.png";
import infoIcon from "$assets/icons/alerts/info.png";
import successIcon from "$assets/icons/alerts/success.png";
import warningIcon from "$assets/icons/alerts/warning.png";
import type { Props } from "./types";

const iconMap = {
	success: successIcon,
	info: infoIcon,
	warning: warningIcon,
	error: errorIcon
};

export function Icon(props: Props) {
	const { type } = props;
	const [selectedIcon, setSelectedIcon] = useState(errorIcon);

	useEffect(() => {
		setSelectedIcon(iconMap[type] || errorIcon);
	}, [type]);

	return (
		<>
			<img
				style={{ width: "64px", height: "64px" }}
				src={selectedIcon}
				alt={`${type} icon`}
			/>
		</>
	);
}
