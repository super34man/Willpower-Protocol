import { useMoralis } from "react-moralis"

const Login = () => {
	const { isAuthenticated, authenticate, logout, user } = useMoralis();
	const signingMess = "Willpower Protocol Authentication"

	function loginClicked (w3) {
		if (w3 == 'mm') {
			authenticate({signingMessage: signingMess})
		}
		else if (w3 == 'wc') {
			authenticate({ provider: "walletconnect", signingMesssage: signingMess })
		}
	}

	function getShortAddress () {
		let longAddress = user.get('ethAddress')
		return `${longAddress.slice(0,5)}...${longAddress.slice(longAddress.length-4)}`
	}

	if (!isAuthenticated) {
		return (
			<div className="d-flex align-items-center">
				<button className="btn btn-outline-danger me-2" id="btn-login" onClick={() => loginClicked('mm')}>{ "MetaMask Login" }</button>
				<button className="btn btn-outline-danger" id="btn-wallet-connect" onClick={() => loginClicked('wc')}>{ "Wallet Connect" }</button>
			</div>
		)
	}

	return (
		<div className="d-flex align-items-center">
			<i className="navbar-text me-2 gradientText fas fa-id-badge fa-2x"></i>
			<span className='navbar-text me-3 gradientText'>{ getShortAddress() }</span>
			<button className="btn btn-outline-danger" id="btn-logout" onClick={logout}>{ "Logout" }</button>
		</div>
	)
}

export default Login
