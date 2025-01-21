import type { SliceCreator } from "$/stores/types";

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

export const createMicroSlice: SliceCreator<MicroSlice> = (set) => ({
	...initial,
	changeDialogVisibility(status) {
		set((state) => {
			state.micro.dialogStatus = status;
		});
	}
});
