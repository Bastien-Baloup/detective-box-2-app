// Cartes d'accès aux pages des différents membres
const Card = ({ srcImg, srcIcon, name, contentButton }) => {
	return (
		<div className="card">
			<div className="card__contentImg">
				<img className="card__portrait" src={srcImg} />
			</div>
			<div className="card__contentText">
				<img className="card__Icon" src={srcIcon} />
				<p className="card__name">{name}</p>
				<button className="card__button">{contentButton}</button>
			</div>
		</div>
	);
};

export default Card;
