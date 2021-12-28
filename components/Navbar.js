import Image from 'next/image'
import Link from 'next/link'
import { useMoralis } from 'react-moralis'

import logo from '../public/Navbar 130h bg-dark.png'

const Navbar = () => {
	const { isAuthenticated, authenticate, logout, user } = useMoralis();

	function wcLogin () {
		authenticate({ provider: "walletconnect" })
	}

	return (
		<nav className="navbar fixed-top navbar-expand-md navbar-dark bg-dark">
			<div className="container-fluid">
				<Link href="/">
					<a className="navbar-brand" style={{height:"75px"}}>
						<Image src={logo} alt="Willpower Logo" width={270} height={65} className="d-inline-block align-text-top" />
					</a>
				</Link>
				<button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
					<span className="navbar-toggler-icon"></span>
				</button>
				<div className="collapse navbar-collapse" id="navbarCollapse">
					<ul className="navbar-nav me-auto mb-2 mb-md-0">
						<li className="nav-item">
							<Link href="/">
								<a className="nav-link" aria-current="page">{ "Home" }</a>
							</Link>
						</li>
						<li className="nav-item">
							<Link href="/stats">
								<a className="nav-link">{ "Stats" }</a>
							</Link>
						</li>
						{/* <li className="nav-item">
							<Link href="/instructions">
								<a className="nav-link">Instructions</a>
							</Link>
						</li> */}
						{/* <li className="nav-item">
							<Link href="/faqs">
								<a className="nav-link">FAQs</a>
							</Link>
						</li> */}
					</ul>
					{/* <span className={ isAuthenticated ? 'navbar-text me-2' : "d-none" }>{ user.get('ethAddress') }</span> */}
					<button className={ !isAuthenticated ? "btn btn-outline-danger me-2" : "d-none" } id="btn-login" onClick={authenticate}>{ "MetaMask Login" }</button>
					<button className={ !isAuthenticated ? "btn btn-outline-danger" : "d-none" } id="btn-wallet-connect" onClick={wcLogin}>{ "Wallet Connect" }</button>
					<button className={ isAuthenticated ? "btn btn-outline-danger" : "d-none" } id="btn-logout" onClick={logout}>{ "Logout" }</button>

				</div>
			</div>
		</nav>
	);
}

export default Navbar;