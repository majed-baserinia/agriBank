import type { SliceCreator } from "$/stores/types";

type DialogStatus = "opened" | "closed";

type State = {
	micro: {
		dialogStatus: DialogStatus;
		iframeId: string;
	};
};

type Actions = {
	changeDialogVisibility: (status: DialogStatus) => void;
	updateIframeId: (id: string) => void;
};

export type MicroSlice = State & Actions;

const initial: State = { micro: { dialogStatus: "closed", iframeId: "baran-playground-iframe" } };

export const createMicroSlice: SliceCreator<MicroSlice> = (set) => ({
	...initial,
	changeDialogVisibility(status) {
		set((state) => {
			state.micro.dialogStatus = status;
		});
	},
	updateIframeId(id) {
		set((state) => {
			state.micro.iframeId = id;
		});
	}
});
