import { AuthTokens, clearAuth, saveAuthTokens } from "$lib/auth";
import { create } from "zustand";
import { InitialSetting, InitialSettingStore } from "./types";

export const useInitialSettingStore = create<InitialSettingStore>((set) => ({
	settings: <InitialSetting>{ language: "fa-IR", themeName: "light", theme: {} },
	setSettings: (newSetting) => {
		if (newSetting) {
			if (newSetting.idToken) {
				saveAuthTokens(<AuthTokens>{
					idToken: newSetting.idToken,
					refreshToken: newSetting.refreshToken
				});
			}
			set((store) => {
				return { settings: { ...store.settings, ...newSetting } };
			});
		}
	},
	clearSetting: () => {
		clearAuth();
		set((prev) => ({
			settings: { ...prev.settings, idToken: undefined, refreshToken: undefined }
		}));
	}
}));

export default useInitialSettingStore;
