import errorIcon from "$assets/icons/alerts/error.svg";
import infoIcon from "$assets/icons/alerts/info.svg";
import phoneIcon from "$assets/icons/alerts/phone.svg";
import smsIcon from "$assets/icons/alerts/sms.svg";
import successIcon from "$assets/icons/alerts/success.svg";
import warningIcon from "$assets/icons/alerts/warning.svg";
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
