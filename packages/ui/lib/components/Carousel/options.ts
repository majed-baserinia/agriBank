export type GlideOptions = {
	/**
	 * creates a focus effect on the active slide by reducing the opacity of none-active slides and
	 * scaling the active one
	 * * this will wrap `Slide` components in an additional div
	 */
	focusActiveSlide?: {
		enabled: true;
		inactiveSlideOpacity?: number;
		/**
		 * the scaling factor of active element
		 */
		scalingFactor?: number;
	};
	/**
	 * sets sensible defaults for the carousel root.
	 * for instance sets the direction based on theme
	 */
	setDefaultOptions?: boolean;
} & Partial<Glide.Options>;
