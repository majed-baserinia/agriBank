import type { AppStore, Mutators } from "$/stores/types";
import type { StateCreator } from "zustand";

type DialogStatus = "opened" | "closed";

type State = {
	micro: {
		dialogStatus: DialogStatus;
	};
};

type Actions = {
	changeDialogVisibility: (status: DialogStatus) => void;
};

export type MicroSlice = State & Actions;

const initial: State = { micro: { dialogStatus: "closed" } };

export const createMicroSlice: StateCreator<AppStore, Mutators, [], MicroSlice> = (set) => ({
	...initial,
	changeDialogVisibility(status) {
		set((state) => {
			state.micro.dialogStatus = status;
		});
	}
});
