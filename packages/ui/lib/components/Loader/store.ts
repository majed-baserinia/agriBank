import { useEffect } from "react";
import { create } from "zustand";

interface LoadingState {
	loading: boolean;
	loadingCounter: number;
	incrementLoading: () => void;
	decrementLoading: () => void;
}

export const useLoading = create<LoadingState>((set) => ({
	loading: false,
	loadingCounter: 0,
	incrementLoading: () =>
		set((state) => {
			const newCounter = state.loadingCounter + 1;
			return {
				loadingCounter: newCounter,
				loading: newCounter > 0
			};
		}),
	decrementLoading: () =>
		set((state) => {
			const newCounter = state.loadingCounter > 0 ? state.loadingCounter - 1 : 0;
			return {
				loadingCounter: newCounter,
				loading: newCounter > 0
			};
		})
}));

export const useLoadingHandler = (isLoading: boolean) => {
	const incrementLoading = useLoading((state) => state.incrementLoading);
	const decrementLoading = useLoading((state) => state.decrementLoading);

	useEffect(() => {
		if (isLoading) {
			incrementLoading();
		} else {
			decrementLoading();
		}
		// Clean up by decrementing if the component unmounts while still loading
		return () => {
			if (isLoading) decrementLoading();
		};
	}, [isLoading, incrementLoading, decrementLoading]);
};
