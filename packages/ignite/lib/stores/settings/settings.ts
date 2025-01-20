import type { AppStore, Mutators } from "$lib/stores/types";
import type { StateCreator } from "zustand";
import type { Settings, SettingsSlice } from "./types";

const initial: Settings = {
	language: "fa-IR",
	themeName: "light",
	osType: "3",
	theme: {},
	config: {
		apiBaseUrl: "",
		baseThemeUrl: "",
		basePaletteUrl: ""
	}
};

export const createSettingsSlice: StateCreator<AppStore, Mutators, [], SettingsSlice> = (set) => ({
	settings: initial,
	updateSettings: (settings) => {
		if (!settings) {
			return;
		}
		set((store) => {
			store.settings = {
				...settings,
				osType: settings.osType ?? store.settings.osType,
				language: settings.language ?? store.settings.language,
				themeName: settings.themeName ?? store.settings.themeName,
				// @ts-expect-error - probably a bug with types of zustand/immer
				theme: settings.theme ?? store.settings.theme,
				config: { ...store.settings.config, ...settings.config }
			};
		});
	},
	resetSettings: () => {
		set(() => ({
			settings: initial
		}));
	}
});
