import { create } from "zustand";

type PrivateState = {
	isInitialized: boolean;
};

type PublicState = {
	baseUrl: string;
};

type Actions = {
	init: (config: PublicState) => void;
};

type ApiConfig = PublicState & PrivateState & Actions;

export const useApiConfig = create<ApiConfig>((set, get) => ({
	isInitialized: false,
	baseUrl: "",
	init: (config) => {
		if (get().isInitialized) {
			console.warn("trying to re-initialize api config");
			return;
		}
		set((prev) => {
			return { ...prev, ...config };
		});
	}
}));
