// Cartes d'accès aux pages des différents membres
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

export default Card;
