import errorIcon from "$assets/icons/alerts/error.webp";
import infoIcon from "$assets/icons/alerts/info.webp";
import phoneIcon from "$assets/icons/alerts/phone.webp";
import smsIcon from "$assets/icons/alerts/sms.webp";
import successIcon from "$assets/icons/alerts/success.webp";
import warningIcon from "$assets/icons/alerts/warning.webp";
import { useEffect, useState } from "react";

import type { Props } from "./types";

const iconMap = {
	success: successIcon,
	info: infoIcon,
	warning: warningIcon,
	error: errorIcon,
	"phone-voice-otp": phoneIcon,
	"phone-sms-otp": smsIcon
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
				alt={`${type} icon`}
				src={selectedIcon}
				style={{ width: "64px", height: "64px" }}
			/>
		</>
	);
}
