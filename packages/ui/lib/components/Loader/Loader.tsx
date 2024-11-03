import logoLoader from "$assets/images/logo-loader.gif";
import type { Props } from "./types";

export const Loader = ({ showLoader }: Props) => {
	if (!showLoader) return null;
	return (
		<div
			id="Loader"
			className="flex flex-col"
			style={{
				width: "100%",
				opacity: "1",
				position: "fixed",
				top: "0px",
				left: "0px",
				right: "0px",
				bottom: "0px",
				zIndex: "999",
				backgroundColor: "rgba(78,78,82,0.85)"
				// display: `${!show ? 'none' : null}`
			}}
		>
			<div
				style={{
					marginTop: "35vh",
					textAlign: "center",
					display: "flex",
					alignItems: "center",
					flexDirection: "column"
				}}
			>
				<div>
					<img
						src={logoLoader}
						alt="logoLoader"
						className="col-12 m-0 p-0"
					/>
				</div>
			</div>
		</div>
	);
};
