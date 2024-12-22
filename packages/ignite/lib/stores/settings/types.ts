import type { PostMessageOutputSubType } from "node_modules/@agribank/post-message";

export type InitialSetting = PostMessageOutputSubType<"iFrameReady", "initiateIFrame">;

export type InitialSettingStore = {
	settings: InitialSetting;
	setSettings: (setting: Partial<InitialSetting>) => void;
	clearSetting: () => void;
};
