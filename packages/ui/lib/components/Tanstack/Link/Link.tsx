import { Link as MuiLink, type LinkProps as MuiLinkProps } from "@mui/material";
import { Link as TanstackLink, type LinkProps } from "@tanstack/react-router";

export function Link({ children, ...restProps }: LinkProps & Omit<MuiLinkProps, "to">) {
	return (
		<MuiLink
			component={TanstackLink}
			{...restProps}
		>
			{children}
		</MuiLink>
	);
}
