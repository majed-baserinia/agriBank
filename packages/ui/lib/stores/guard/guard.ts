import { create } from "zustand";
import type { Actions, State } from "./types";

const initialStep: State = {
	fulfilledSteps: new Set()
};

export const useGuardStore = create<State & Actions>()((set) => ({
	...initialStep,
	undo(step) {
		set((store) => {
			if (!store.fulfilledSteps.has(step)) {
				return store;
			}
			const newStore = new Set(store.fulfilledSteps);
			newStore.delete(step);
			return {
				...store,
				fulfilledSteps: newStore
			};
		});
	},
	fullfil(step) {
		set((store) => {
			if (store.fulfilledSteps.has(step)) {
				return store;
			}
			const newStore = new Set(store.fulfilledSteps);
			newStore.add(step);
			return {
				...store,
				fulfilledSteps: newStore
			};
		});
	},
	reset() {
		set((store) => {
			if (store.fulfilledSteps.size === 0) {
				return store;
			}
			return {
				...initialStep
			};
		});
	}
}));
