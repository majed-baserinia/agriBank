export type StepperProps = { list: string[]; active: number };

export type step = {
	index: number;
	title: string;
	active: boolean;
	completed: boolean;
};
