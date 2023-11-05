import PropTypes from "prop-types";
import { useState, createContext } from "react";

// EXPLICATION : Context pour avoir la bonne boîte utilisée

export const BoxContext = createContext("");

export const BoxProvider = ({ children }) => {
	const [currentBox, setCurrentBox] = useState(null);
	const fetchCurrentBox = (value) => {
		setCurrentBox(value);
	};

	return <BoxContext.Provider value={{ fetchCurrentBox, currentBox }}>{children}</BoxContext.Provider>;
};

// EXPLICATION : Context pour avoir le token dans le local storage et gérer l'accès aux différentes pages de l'application.

export const AuthContext = createContext("");

const getInitialState = () => {
	const token = localStorage.getItem("token");
	return token ? JSON.parse(token) : null;
};

const getInitialLogin = () => {
	const token = localStorage.getItem("token");
	return token ? true : false;
};

export const AuthProvider = ({ children }) => {
	const [loggedIn, setLoggedIn] = useState(getInitialLogin);
	const [token, setToken] = useState(getInitialState);

	// useEffect(() => {
	// 	const existingCredentials = localStorage.getItem("credentials");
	// 	if (existingCredentials) {
	// 		setLoggedIn(true);
	// 		setCredentials(JSON.parse(existingCredentials));
	// 	} else {
	// 		setLoggedIn(false);
	// 		setCredentials(null);
	// 	}
	// }, []);

	// useEffect(() => {
	// 	const checkExistingData = () => {
	// 		const existingcrednetials = localStorage.getItem("credentials");
	// 		// console.log(credentials);
	// 		if (existingcrednetials) {
	// 			setLoggedIn(true);
	// 			setCredentials(existingcrednetials);
	// 		}
	// 	};
	// 	window.addEventListener("storage", checkExistingData);

	// 	return () => {
	// 		// When the component unmounts remove the event listener
	// 		window.removeEventListener("storage", checkExistingData);
	// 	};
	// }, []);

	// useEffect(() => {
	// 	const existingcrednetials = localStorage.getItem("credentials");
	// 	// console.log(credentials);
	// 	if (existingcrednetials) {
	// 		setLoggedIn(true);
	// 	}
	// }, [credentials]);

	const login = (token) => {
		localStorage.setItem("token", JSON.stringify(token));
		// localStorage.setItem("token", dataToken.body.token);
		setToken(token);
		setLoggedIn(true);
	};

	const logout = () => {
		localStorage.clear();
		setLoggedIn(false);
	};

	return (
		<AuthContext.Provider value={{ setLoggedIn, loggedIn, setToken, token, login, logout }}>
			{children}
		</AuthContext.Provider>
	);
};

// EXPLICATION : Context pour activer et désactiver la nappe d'ambiance

export const AmbianceContext = createContext("");

export const AmbianceProvider = ({ children }) => {
	const [nappeMute, setNappeMute] = useState(true);
	const [ispreviouslyMuted, setIsPreviouslyMuted] = useState(true);
	// console.log(nappeMute);

	const fetchNappeMute = (value) => {
		setNappeMute(value);
	};

	const fetchPreviousStateNappe = () => {
		if (nappeMute) {
			setIsPreviouslyMuted(true);
		} else {
			setIsPreviouslyMuted(false);
		}
		setNappeMute(true);
	};

	const fetchResumeNappe = () => {
		console.log(ispreviouslyMuted);
		if (!ispreviouslyMuted) {
			setNappeMute(false);
		}
	};

	return (
		<AmbianceContext.Provider value={{ fetchNappeMute, fetchPreviousStateNappe, fetchResumeNappe, nappeMute }}>
			{children}
		</AmbianceContext.Provider>
	);
};

// EXPLICATION : Context pour activer et désactiver la nappe d'ambiance

export const DataContext = createContext("");

export const DataProvider = ({ children }) => {
	const [toggleDataAdele, setToggleDataAdele] = useState(true);
	const [toggleDataCeline, setToggleDataCeline] = useState(true);
	const [toggleDataLauren, setToggleDataLauren] = useState(true);
	const [toggleDataRaphaelle, setToggleDataRaphaelle] = useState(true);
	const [toggleDataTim, setToggleDataTim] = useState(true);
	const [toggleDataEvent, setToggleDataEvent] = useState(true);
	const [toggleDataHelp, setToggleDataHelp] = useState(true);
	const [toggleDataHistory, setToggleDataHistory] = useState(true);
	const [toggleDataObjectif, setToggleDataObjectif] = useState(true);

	const actionToggleDataAdele = () => {
		setToggleDataAdele(!toggleDataAdele);
	};
	const actionToggleDataCeline = () => {
		setToggleDataCeline(!toggleDataCeline);
	};
	const actionToggleDataLauren = () => {
		setToggleDataLauren(!toggleDataLauren);
	};
	const actionToggleDataRaphaelle = () => {
		setToggleDataRaphaelle(!toggleDataRaphaelle);
	};
	const actionToggleDataTim = () => {
		setToggleDataTim(!toggleDataTim);
	};
	const actionToggleDataEvent = () => {
		setToggleDataEvent(!toggleDataEvent);
	};
	const actionToggleDataHelp = () => {
		setToggleDataHelp(!toggleDataHelp);
	};
	const actionToggleDataHistory = () => {
		setToggleDataHistory(!toggleDataHistory);
	};
	const actionToggleDataObjectif = () => {
		setToggleDataObjectif(!toggleDataObjectif);
	};

	return (
		<DataContext.Provider
			value={{
				actionToggleDataAdele,
				toggleDataAdele,
				actionToggleDataCeline,
				toggleDataCeline,
				actionToggleDataLauren,
				toggleDataLauren,
				actionToggleDataRaphaelle,
				toggleDataRaphaelle,
				actionToggleDataTim,
				toggleDataTim,
				actionToggleDataEvent,
				toggleDataEvent,
				actionToggleDataHelp,
				toggleDataHelp,
				actionToggleDataHistory,
				toggleDataHistory,
				actionToggleDataObjectif,
				toggleDataObjectif,
			}}
		>
			{children}
		</DataContext.Provider>
	);
};

BoxProvider.propTypes = {
	children: PropTypes.any,
};
AuthProvider.propTypes = {
	children: PropTypes.any,
};
AmbianceProvider.propTypes = {
	children: PropTypes.any,
};
DataProvider.propTypes = {
	children: PropTypes.any,
};
