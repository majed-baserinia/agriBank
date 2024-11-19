export type Props = {
	breadcrumbs: link[];
};

type link = {
	href: string;
	key: string;
	onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
	title: string;
};
