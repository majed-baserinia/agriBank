import logoLoader from "$assets/images/logo.webp";
import logoLoaderDots from "$assets/images/logoDots.svg";
import { useTheme } from "@mui/material";
import type { Props } from "./types";

export const Controlled = ({ showLoader }: Props) => {
	if (!showLoader) return null;
	const theme = useTheme()
	const bgColor = theme.palette.mode == "light" ? "rgba(255,255,255,0.8)" : "rgba(0,0,0,0.8)"
	const wrapperStyle: React.CSSProperties = {
		position: "fixed",
		top: 0,
		left: 0,
		width: "100%",
		height: "100%",
		backgroundColor: bgColor,
		zIndex: 999,
	};

	const ringContainerStyle: React.CSSProperties = {
		position: "absolute",
		top: "50%",
		left: "50%",
		transform: "translate(-50%, -50%)",
		width: "200px",
		height: "200px",
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
	};

	const rotatingStyle: React.CSSProperties = {
		width: "100%",
		height: "100%",
		animation: "spin 1.5s linear infinite",
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
	};

	const innerBoxStyle: React.CSSProperties = {
		position: "absolute",
		top: "50%",
		left: "50%",
		transform: "translate(-50%, -50%)",
		width: "150px",
		height: "150px",
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
	};

	const imgStyle: React.CSSProperties = {
		width: "100%",
		height: "100%",
		objectFit: "contain",
	};

	return (
		<>
			<style>
				{`
          @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
        `}
			</style>

			<div style={wrapperStyle}>
				<div style={ringContainerStyle}>
					<div style={rotatingStyle}>
						<img alt="logo spinning ring" src={logoLoaderDots} style={imgStyle} />
					</div>
				</div>
				<div style={innerBoxStyle}>
					<img alt="logo static center" src={logoLoader} style={imgStyle} />
				</div>
			</div>
		</>
	);
};

export default Controlled;



// export const Controlled = ({ showLoader }: Props) => {
// 	if (!showLoader) return null;
// 	return (
// 		<div
// 			className="flex flex-col"
// 			id="Loader"
// 			style={{
// 				width: "100%",
// 				opacity: "1",
// 				position: "fixed",
// 				top: "0px",
// 				left: "0px",
// 				right: "0px",
// 				bottom: "0px",
// 				zIndex: "999",
// 				backgroundColor: "rgba(78,78,82,0.85)"
// 				// display: `${!show ? 'none' : null}`
// 			}}
// 		>
// 			<div
// 				style={{
// 					marginTop: "35vh",
// 					textAlign: "center",
// 					display: "flex",
// 					alignItems: "center",
// 					flexDirection: "column"
// 				}}
// 			>
// 				<div>
// 					<img
// 						alt="logoLoader"
// 						className="col-12 m-0 p-0"
// 						src={logoLoader}
// 					/>
// 				</div>
// 				<div>
// 					<img
// 						alt="logoLoader"
// 						className="col-12 m-0 p-0"
// 						src={logoLoaderDots}
// 					/>
// 				</div>
// 			</div>
// 		</div>
// 	);
// };
