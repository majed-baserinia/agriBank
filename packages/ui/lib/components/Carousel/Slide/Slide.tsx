import { useOptionsContext } from "$components/Carousel/Context/useOptionsContext";

export type Props = {
	className?: string;
	children: React.ReactNode;
};

export function Slide({ className, children }: Props) {
	const options = useOptionsContext();

	return options.focusActiveSlide?.enabled ? (
		<li className={`glide__slide ${className}`}>
			<div data-slide-is-root="true">{children}</div>
		</li>
	) : (
		<li className={`glide__slide ${className}`}>{children}</li>
	);
}
