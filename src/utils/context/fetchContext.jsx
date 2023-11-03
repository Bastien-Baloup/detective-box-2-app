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
	const credentials = localStorage.getItem("credentials");
	return credentials ? JSON.parse(credentials) : null;
};

const getInitialLogin = () => {
	const credentials = localStorage.getItem("credentials");
	return credentials ? true : false;
};

export const AuthProvider = ({ children }) => {
	const [loggedIn, setLoggedIn] = useState(getInitialLogin);
	const [credentials, setCredentials] = useState(getInitialState);

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

	const login = (credentials) => {
		// console.log(credentials);
		localStorage.setItem("credentials", JSON.stringify(credentials));
		setCredentials(credentials);
		setLoggedIn(true);
	};

	const logout = () => {
		localStorage.clear();
		setLoggedIn(false);
	};

	return (
		<AuthContext.Provider value={{ setLoggedIn, loggedIn, setCredentials, credentials, login, logout }}>
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

BoxProvider.propTypes = {
	children: PropTypes.any,
};
AuthProvider.propTypes = {
	children: PropTypes.any,
};
AmbianceProvider.propTypes = {
	children: PropTypes.any,
};
