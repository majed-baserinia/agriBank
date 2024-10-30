import type { Props } from "./types";

export function ChipsWrapperForSelect(props: Props) {
	const { children } = props;
	return (
		<div
			className="clickedNotClose"
			style={{ margin: "5px", display: "flex", gap: "8px", flexWrap: "wrap" }}
		>
			{children}
		</div>
	);
}
