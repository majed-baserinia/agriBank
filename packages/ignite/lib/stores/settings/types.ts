export type InitialSetting = {
	language: "fa-IR" | "en-GB";
	themeName: string;
	theme: object;
	idToken?: string;
	refreshToken?: string;
	osType: number;
	[key: string]: unknown;
};

export type InitialSettingStore = {
	settings: InitialSetting;
	setSettings: (setting: Partial<InitialSetting>) => void;
	clearSetting: () => void;
};
