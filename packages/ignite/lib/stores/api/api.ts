import { create } from "zustand";

type PrivateState = {
	isInitialized: boolean;
};

type PublicState = {
	baseUrl: string;
};

type Actions = {
	update: (config: PublicState) => void;
};

type ApiConfig = PublicState & PrivateState & Actions;

export const useApiConfig = create<ApiConfig>((set) => ({
	isInitialized: false,
	baseUrl: "",
	update: (config) => {
		set((prev) => {
			return { ...prev, ...config, isInitialized: true };
		});
	}
}));
