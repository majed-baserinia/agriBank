import type { Config } from "$lib/config/loaders/useConfigLoader";
import type { PostMessageOutputSubType } from "@agribank/post-message";
import type { ThemeOptions } from "@mui/material";

export type AcceptedLanguages = "fa-IR" | "en-GB";

export type Settings = PostMessageOutputSubType<"iFrameReady", "initiateIFrame">["data"] & {
	language: AcceptedLanguages;
	themeName: string;
	theme: ThemeOptions;
	config: Config;
	appVersion: string;
	osType: number;
};

type SettingsState = {
	settings: Settings;
};

type SettingsActions = {
	updateSettings: (setting: Partial<Settings>) => void;
	resetSettings: () => void;
};

export type SettingsSlice = SettingsState & SettingsActions;
