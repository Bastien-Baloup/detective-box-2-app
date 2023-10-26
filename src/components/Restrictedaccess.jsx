import { Outlet } from "react-router-dom";
import { AuthContext, BoxContext } from "../utils/context/fetchContext.jsx";
import { useContext } from "react";
import { Navigate } from "react-router-dom";

const Restrictedaccess = () => {
	const { loggedIn } = useContext(AuthContext);
	const { currentBox } = useContext(BoxContext);

	if (!loggedIn) {
		return <Navigate to="/sign-in" />;
	}
	if (currentBox == null) {
		return <Navigate to="/box-choice" />;
	} else {
		return (
			<>
				<Outlet />
			</>
		);
	}
};

export default Restrictedaccess;
