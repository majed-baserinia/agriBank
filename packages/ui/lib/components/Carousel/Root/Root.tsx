import type Glide from "@glidejs/glide";
import type { Theme } from "@mui/material";
import { useTheme } from "@mui/material";
import type React from "react";
import { useRef } from "react";
import { OptionsContext } from "$components/Carousel/Context/OptionsContext";
import { useInitializeGlider } from "$components/Carousel/Root/useInitializeGlider";
import { Track } from "$components/Carousel/Track/Track";
import type { GlideEvents } from "$components/Carousel/events";
import type { GlideOptions } from "$components/Carousel/options";
import styles from "./styles.module.css";

export type Props = GlideOptions &
	GlideEvents & {
		className?: string;
		children: React.ReactNode;
	};

export function Root({ className, setDefaultOptions = true, children, ...options }: Props) {
	const rootRef = useRef<HTMLDivElement>(null);
	const theme = useTheme();
	useInitializeGlider(rootRef, getGliderOptions(theme, options, setDefaultOptions));

	if (options.focusActiveSlide?.enabled) {
		className += ` ${styles["focus-center"]}`;
	}

	return (
		<OptionsContext.Provider value={options}>
			<div
				className="glide"
				ref={rootRef}
				style={
					{
						"--inactive-slide-opacity": options.focusActiveSlide?.inactiveSlideOpacity ?? 0.5,
						"--scaling-factor": options.focusActiveSlide?.scalingFactor ?? 1.2
					} as React.CSSProperties
				}
			>
				<Track className={className}>{children}</Track>
			</div>
		</OptionsContext.Provider>
	);
}

function getGliderOptions(
	theme: Theme,
	options: Partial<Glide.Options>,
	setDefaultOptions: boolean
) {
	return setDefaultOptions
		? {
				direction: theme.direction,
				...options
			}
		: options;
}
