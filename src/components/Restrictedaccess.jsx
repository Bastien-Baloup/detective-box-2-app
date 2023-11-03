// EXPLICATION : Ce composant permet d'encapsuler l'application + la page Parametre + la page Credit.
// EXPLICATION : Si l'utilisateur n'est pas connecté, alors on retourne sur la page Sign-in

import { Outlet } from "react-router-dom";
import { AuthContext } from "../utils/context/fetchContext.jsx";
import { useContext } from "react";
import { Navigate } from "react-router-dom";

const Restrictedaccess = () => {
	const { loggedIn } = useContext(AuthContext);

	if (!loggedIn) {
		return <Navigate to="/sign-in" />;
	}

	return (
		<>
			<Outlet />
		</>
	);
};

export default Restrictedaccess;
