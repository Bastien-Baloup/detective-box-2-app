import PropTypes from "prop-types";

import { useState } from "react";
// A modifier une fois les JSON créés

const Filter = ({ category, handleSearch }) => {
	const [isActive, setIsActive] = useState(false);

	const handleClick = () => {
		setIsActive(!isActive);
		handleSearch();
	};

	return (
		<>
			<button onClick={handleClick} className={`filter__button ${isActive ? " filter--active" : ""}`}>
				{category}
			</button>
		</>
	);
};

Filter.propTypes = {
	category: PropTypes.string,
	handleSearch: PropTypes.func,
};

export default Filter;
