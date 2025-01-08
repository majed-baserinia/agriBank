import type { PostMessageOutputSubType } from "@agribank/post-message";
import type { ThemeOptions } from "@mui/material";

export type AcceptedLanguages = "fa-IR" | "en-GB";

export type InitialSetting = PostMessageOutputSubType<"iFrameReady", "initiateIFrame"> & {
	language: AcceptedLanguages;
	themeName: string;
	theme: ThemeOptions;
};

export type InitialSettingStore = {
	settings: InitialSetting;
	setSettings: (setting: Partial<InitialSetting>) => void;
	clearSetting: () => void;
};
