import type { Application } from "$/features/apps";
import { createAppUrl } from "$/features/apps";
import type { Ref } from "react";
import { forwardRef } from "react";

export type Props = {
	app: Application;
	className?: string;
};

export const Iframe = forwardRef(function Iframe(
	{ app, className }: Props,
	ref: Ref<HTMLIFrameElement>
) {
	return (
		<iframe
			title={app.title}
			ref={ref}
			className={`${className}`}
			allow="*"
			src={createAppUrl(app)}
			scrolling="auto"
			allowFullScreen
		/>
	);
});
