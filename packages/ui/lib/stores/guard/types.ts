export type Key = string;

export type State = {
	fulfilledSteps: Set<Key>;
};

export type Actions = {
	reset: () => void;
	fullfil: (step: Key) => void;
	undo: (step: Key) => void;
};
