import { Link } from "@tanstack/react-router";

export function Navbar() {
	return (
		<>
			<Link to="/">home</Link>
			<Link to="/info">info</Link>
		</>
	);
}
