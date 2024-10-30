import { Slides } from "$components/Carousel/Slide/Slides";

export type Props = {
	className?: string;
	children: React.ReactNode;
};

export function Track({ className = "", children }: Props) {
	return (
		<div
			className={`glide__track ${className}`}
			data-glide-el="track"
		>
			<Slides>{children}</Slides>
		</div>
	);
}
