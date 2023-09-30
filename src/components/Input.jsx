const Input = ({ type, label, name, placeholder, setValue }) => {
	return (
		<div className="input-wrapper">
			{type == "texte" ? (
				<label>
					{label}
					<input
						className="input-texte"
						type="texte"
						name={name}
						maxLength="60"
						placeholder={placeholder}
						onChange={(e) => setValue(e.target.value)}
					/>
				</label>
			) : (
				<label>
					<input className="input-radio" type="radio" value={label} name={name} onChange={(e) => setValue(e.target.value)} />
					{label}
				</label>
			)}
		</div>
	);
};

export default Input;
