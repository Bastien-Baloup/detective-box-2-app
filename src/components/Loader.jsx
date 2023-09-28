/**
 * Loader Component
 * @returns {JSX} React component
 */

import Logo from "../assets/icons/DB-Logo-DetectiveBox.svg";

const Loader = () => {
	return (
		<>
		<div className="loader">
			<img className="loader__logo" src={Logo} alt="Logo Detective Box" />
		</div>
		</>
	)
}

export default Loader;