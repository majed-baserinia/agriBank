import type { Props as SvgToIconProps } from "$lib/components/SvgToIcon";
export type HookProps = {
	/**
	 * initial 6 digits of card number
	 */
	cardNumber: string;
};

export type ComponentProps = HookProps & SvgToIconProps;
