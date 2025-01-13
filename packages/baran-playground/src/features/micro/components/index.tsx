import { useRef } from "react";
import { useInit } from "../hooks/useInit";
import { Iframe, type Props as IframeProps } from "./Iframe";

type Props = IframeProps;
export function MicroAppPortal({ ...rest }: Props) {
	const ref = useRef<HTMLIFrameElement>(null);
	useInit(ref.current);

	return (
		<Iframe
			{...rest}
			ref={ref}
		/>
	);
}
