import PropTypes from "prop-types";
import { useState, createContext } from "react";

export const BoxContext = createContext();

export const BoxProvider = ({ children }) => {
	const [currentBox, setCurrentBox] = useState(1);
	const fetchCurrentBox = (value) => {
		setCurrentBox(value);
	};

	return <BoxContext.Provider value={{ fetchCurrentBox, currentBox }}>{children}</BoxContext.Provider>;
};

BoxProvider.propTypes = {
	children: PropTypes.any,
};
