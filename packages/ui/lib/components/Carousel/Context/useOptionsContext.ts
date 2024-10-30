import { useContext } from "react";
import OptionsContext from "$components/Carousel/Context/OptionsContext";

export function useOptionsContext() {
	const context = useContext(OptionsContext);

	if (!context) {
		throw new Error("glider options context doesn't have a value");
	}

	return context;
}
