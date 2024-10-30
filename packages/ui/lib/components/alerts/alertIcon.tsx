import { useEffect, useState } from "react";

import errorIcon from "../../../public/icons/alerts/error.png";
import infoIcon from "../../../public/icons/alerts/info.png";
import successIcon from "../../../public/icons/alerts/success.png";
import warningIcon from "../../../public/icons/alerts/warning.png";
import type { props } from "./type";

const iconMap = {
	success: successIcon,
	info: infoIcon,
	warning: warningIcon,
	error: errorIcon
};

export default function AlertIcon(props: props) {
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
