import { useRef } from "react";
import { useInit } from "../hooks/useInit";
import { Iframe, type Props as IframeProps } from "./Iframe";
import { PostMessagePopup } from "./PostMessagePopup";

type Props = IframeProps;

export function MicroAppPortal({ ...rest }: Props) {
	const ref = useRef<HTMLIFrameElement>(null);

	useInit({
		iframe: ref,
		app: rest.app
	});

	return (
		<>
			<Iframe
				{...rest}
				ref={ref}
			/>
			<PostMessagePopup iframe={ref.current} />
		</>
	);
}
