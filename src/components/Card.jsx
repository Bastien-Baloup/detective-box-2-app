import PropTypes from "prop-types";
//state may not be necessary : make a if statement on Home : if event occured, then rendre other card option

const Card = ({ srcImg, srcIcon, name, contentButton, actionButton, state }) => {
	return (
		<div className="card">
			<div className={"card__contentImg" + (state == "unavailable" ? "--unavailable" : "")}>
				<img className="card__portrait" src={srcImg} />
			</div>
			<div className="card__contentText">
				<img className="card__icon" src={srcIcon} />
				<p className="card__name">{name}</p>
				<button className="card__button button--red" onClick={actionButton}>
					{contentButton}
				</button>
			</div>
		</div>
	);
};

Card.propTypes = {
	srcImg: PropTypes.string,
	srcIcon: PropTypes.string,
	name: PropTypes.string,
	contentButton: PropTypes.string,
	actionButton: PropTypes.func,
	state: PropTypes.string,
};

export default Card;
