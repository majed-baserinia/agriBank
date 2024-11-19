import type { CameraType } from "react-camera-pro";

import { useRef, useState } from "react";
import { Camera } from "react-camera-pro";

import type { Props } from "./types";

import "./styles.css";

// https://www.npmjs.com/package/react-camera-pro?activeTab=readme

export function PhotoCamera(props: Props) {
	const { onTakePhoto } = props;

	const [image, setImage] = useState<null | string>(null);
	const [showImage, setShowImage] = useState<boolean>(false);
	const camera = useRef<CameraType>(null);

	return (
		<div className="container">
			<div
				className="corner"
				id="top-left"
			/>
			<div
				className="corner"
				id="top-right"
			/>
			<div
				className="corner"
				id="bottom-right"
			/>
			<div
				className="corner"
				id="bottom-left"
			/>
			<div className="wrapper">
				{showImage ? (
					<div
						className="fullScreenImagePreview"
						onClick={() => {
							setShowImage(!showImage);
						}}
						style={{ backgroundImage: image ? `url(${image})` : "" }}
					/>
				) : (
					<Camera
						aspectRatio={"cover"}
						errorMessages={{
							noCameraAccessible:
								"No camera device accessible. Please connect your camera or try a different browser.",
							permissionDenied: "Permission denied. Please refresh and give camera permission.",
							switchCamera:
								"It is not possible to switch camera to different one because there is only one video device accessible.",
							canvas: "Canvas is not supported."
						}}
						facingMode="environment"
						ref={camera}
					/>
				)}
				<button
					className="takePhotoButton"
					onClick={() => {
						if (camera.current) {
							const photo = camera.current.takePhoto();
							setImage(photo as string);
							onTakePhoto(photo as string);
							setShowImage(true);
						}
					}}
				/>
			</div>
		</div>
	);
}
