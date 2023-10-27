import { Outlet } from "react-router-dom";
import Header from "./Header.jsx";
import Footer from "./Footer.jsx";
import { BoxContext } from "../utils/context/fetchContext.jsx";
import { useContext } from "react";
import { Navigate } from "react-router-dom";

const Layout = () => {
	const { currentBox } = useContext(BoxContext);
	if (currentBox == null) {
		return <Navigate to="/box-choice" />;
	} else {
		return (
			<>
				<Header />
				<Outlet />
				<Footer />
			</>
		);
	}
};

export default Layout;
