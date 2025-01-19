export type useRouter = () => {
	currentPath: string;
	searchParams: unknown;
	canGoBack: boolean;
} & (
	| {
			type: "tanstack";
			goBack: () => void;
	  }
	| {
			type: "react-router";
			goBack: () => Promise<void>;
	  }
);
