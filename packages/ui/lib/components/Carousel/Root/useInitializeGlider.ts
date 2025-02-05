import type { Callback, GlideEvents } from "$components/Carousel/events";
import type { GlideOptions } from "$components/Carousel/options";
import type { RefObject } from "react";

import { addEventListener } from "$components/Carousel/events";
import Glide from "@glidejs/glide";
import { useEffect, useState } from "react";

export function useInitializeGlider(
	element: RefObject<HTMLElement | null>,
	options: GlideEvents & GlideOptions
) {
	const [glide, setGlide] = useState<Glide | null>(null);

	useEffect(() => {
		const glide = new Glide(element.current!, options);

		const events = Object.entries(options).filter(([key, _]) => {
			return key.startsWith("on");
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
		}) as any as [keyof GlideEvents, Callback][];

		events.forEach(([key, value]) => {
			addEventListener(glide, key, value);
		});

		glide.mount();
		setGlide(glide);

		return () => {
			glide.destroy();
			setGlide(null);
		};
	}, [element.current]);

	return { glide };
}
