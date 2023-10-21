import PropTypes from "prop-types";

const Input = ({ label, name, placeholder, setValue, value, pattern, type }) => {
	//Penser à rajouter pattern ?
	return (
		<>
			{type == "radio" ? (
				<div className="input-wrapper-radio">
					<input
						className="input-radio"
						type="radio"
						value={label}
						name={name}
						id={label}
						onChange={(e) => setValue(e.target.value)}
					/>
					<label className="input-wrapper__label" htmlFor={label}>
						{label}
					</label>
				</div>
			) : (
				<div className="input-wrapper-text">
					<label className="input-wrapper__label">{label}</label>
					<input
						className="input-texte"
						name={name}
						maxLength="60"
						placeholder={placeholder}
						value={value}
						pattern={pattern}
						type={type}
						onChange={(e) => setValue(e.target.value)}
					/>
				</div>
			)}
		</>
	);
};

Input.propTypes = {
	type: PropTypes.string,
	label: PropTypes.string,
	name: PropTypes.string,
	placeholder: PropTypes.string,
	setValue: PropTypes.func,
	value: PropTypes.string,
	pattern: PropTypes.string,
};

export default Input;
