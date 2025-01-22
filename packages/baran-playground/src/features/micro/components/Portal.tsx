import { forwardRef, useImperativeHandle, useRef } from "react";
import { useInit } from "../hooks/useInit";
import { Iframe, type Props as IframeProps } from "./Iframe";
import { PostMessagePopup } from "./PostMessagePopup";

type Props = IframeProps;
export type Handlers = {
	reload: () => void;
};

export const MicroAppPortal = forwardRef<Handlers, Props>(function MicroAppPortal(props, ref) {
	const internalRef = useRef<HTMLIFrameElement | null>(null);

	useInit({
		iframe: internalRef,
		app: props.app
	});

	useImperativeHandle(ref, () => ({
		reload: () => {
			internalRef.current && (internalRef.current.src += "");
		}
	}));

	return (
		<>
			<Iframe
				{...props}
				ref={internalRef}
			/>
			<PostMessagePopup iframe={internalRef.current} />
		</>
	);
});
