import PropTypes from "prop-types";

const Input = ({ type, label, name, placeholder, setValue, value }) => {
	//Penser à rajouter pattern ?
	// Au clic du label sur radio : changer input
	return (
		<>
			{type == "texte" ? (
				<div className="input-wrapper-text">
					<label className="input-wrapper__label">{label}</label>
					<input
						className="input-texte"
						type="texte"
						name={name}
						maxLength="60"
						placeholder={placeholder}
						value={value}
						onChange={(e) => setValue(e.target.value)}
					/>
				</div>
			) : (
				<div className="input-wrapper-radio">
					<input className="input-radio" type="radio" value={label} name={name} onChange={(e) => setValue(e.target.value)} />
					<label className="input-wrapper__label">{label}</label>
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
};

export default Input;
