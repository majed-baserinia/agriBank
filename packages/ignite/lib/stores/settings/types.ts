import type { PostMessageOutputSubType } from "@agribank/post-message";
import type { ThemeOptions } from "@mui/material";

export type InitialSetting = PostMessageOutputSubType<"iFrameReady", "initiateIFrame"> & {
	language: "fa-IR" | "en-GB";
	themeName: string;
	theme: ThemeOptions;
};

export type InitialSettingStore = {
	settings: InitialSetting;
	setSettings: (setting: Partial<InitialSetting>) => void;
	clearSetting: () => void;
};
