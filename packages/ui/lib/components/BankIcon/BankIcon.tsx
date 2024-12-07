import { useBankIcon, type ComponentProps } from "$lib/components/BankIcon";
import { SvgToIcon } from "$lib/components/SvgToIcon";

export function BankIcon({ cardNumber, width, height, ...restProps }: ComponentProps) {
	const icon = useBankIcon({ cardNumber });

	return icon ? (
		<SvgToIcon
			{...restProps}
			icon={icon}
			width={width}
			height={height}
		/>
	) : (
		<span style={{ width: width, height: height }} />
	);
}
