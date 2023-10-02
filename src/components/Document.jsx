// Pop-up document
const Document = ({ title, srcElement, handleModalDocument }) => {
	const openInNewTab = () => {
		window.open(srcElement, "_blank");
	};

	return (
		<div className="modal-document__background">
			<div className="modal-document__box">
				<p className="modal-document__title">{title}</p>
				<div className="modal-document__element-container">
					<img className="modal-document__element" src={srcElement} />
				</div>
				<div className="modal-document__buttons">
					<button className="modal-document__button button--red" onClick={handleModalDocument}>
						Reprendre l'enquête
					</button>
					<button className="modal-document__button button--white" onClick={openInNewTab}>
						Ouvrir
					</button>
				</div>
			</div>
		</div>
	);
};

export default Document;
