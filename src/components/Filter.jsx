import { useState } from "react";
// A modifier une fois les JSON créés
//https://codesandbox.io/s/multifilters-t8vb0r?file=/src/MultiFilters.js

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

export default Filter;
