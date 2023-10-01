const Nappe = ({ activateNappe, desactivateNappe }) => {
	//https://github.com/bjrshussain/audio_player_in_react/blob/master/src/App.js
		return (
		<div className="modal-nappe__background">
			<div className="modal-nappe__box">
				<p className="modal-nappe__text">Voulez-vous lancer la musique d'ambiance pour rendre votre jeu plus immersif ?</p>
				<div className="modal-nappe__buttons">
					<button className="modal-nappe__button button" onClick={activateNappe}>
						Oui
					</button>
					<button className="modal-nappe__button button" onClick={desactivateNappe}>
						Non
					</button>
				</div>
			</div>
		</div>
	);
};

export default Nappe;
