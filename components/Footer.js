import Link from "next/link";

const Footer = () => {
	return (
		<nav className="navbar fixed-bottom bg-dark text-secondary">
			<div className="container-fluid">
						<span className="navbar-text">
							Copywrite 2021 - {new Date().getUTCFullYear()}
						</span>
						<Link href="/">
							<a className="nav-link link-secondary">
								<span className="navbar-text">Support - </span>
								<i className="fab fa-discord fa-lg"></i>
							</a>
						</Link>
			</div>
		</nav>
	);
}

export default Footer;