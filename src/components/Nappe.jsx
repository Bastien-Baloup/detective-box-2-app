const Nappe = ({ activateNappe, desactivateNappe }) => {
	//https://github.com/bjrshussain/audio_player_in_react/blob/master/src/App.js
	return (
		<div className="modal__background">
			<div className="modal__box">
				<p className="modal__text">Voulez-vous lancer la musique d'ambiance pour rendre votre jeu plus immersif ?</p>
				<button className="modal__button" onClick={activateNappe}>
					Oui
				</button>
				<button className="modal__button" onClick={desactivateNappe}>
					Non
				</button>
			</div>
		</div>
	);
};

export default Nappe;
