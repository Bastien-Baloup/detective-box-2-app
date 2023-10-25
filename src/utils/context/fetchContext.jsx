import PropTypes from "prop-types";
import { useState, createContext, useEffect } from "react";

// EXPLICATION : Context pour avoir la bonne boîte utilisée

export const BoxContext = createContext("");

export const BoxProvider = ({ children }) => {
	const [currentBox, setCurrentBox] = useState(1);
	const fetchCurrentBox = (value) => {
		setCurrentBox(value);
		console.log(value);
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

	useEffect(() => {
		localStorage.getItem("credentials", JSON.stringify(credentials));
		console.log(credentials);
		if (credentials) {
			setLoggedIn(true);
		}
	}, [credentials]);

	const login = (credentials) => {
		setCredentials(credentials);
		setLoggedIn(true);
	};

	const logout = () => {
		localStorage.clear();
		setLoggedIn(false);
		setCredentials(null);
	};

	return (
		<AuthContext.Provider value={{ setLoggedIn, loggedIn, setCredentials, credentials, login, logout }}>
			{children}
		</AuthContext.Provider>
	);
};

BoxProvider.propTypes = {
	children: PropTypes.any,
};
AuthProvider.propTypes = {
	children: PropTypes.any,
};
