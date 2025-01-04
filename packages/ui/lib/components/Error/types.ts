export type BaseErrorProps = {
	error?: any;
	reset?: () => void;
};

export type Props = {
	title?: string;
	message: string;
} & BaseErrorProps;
