// When document seen, update state to put it into historique
import PropTypes from "prop-types";

const Document = ({ title, srcElement, handleModalDocument }) => {
	const openInNewTab = () => {
		window.open(srcElement, "_blank");
	};

	const mediaFactory = (src) => {
		const extension = src.slice(((src.lastIndexOf(".") - 1) >>> 0) + 2);
		if (extension == "pdf") {
			return <iframe className="modal-document__element" src={src} allowfullscreen={true} border="0"></iframe>;
		} else {
			return <img className="modal-document__element" src={src} />;
		}
	};

	return (
		<div className="modal-document__background">
			<div className="modal-document__box">
				<p className="modal-document__title">{title}</p>
				<div className="modal-document__element-container">{mediaFactory(srcElement)}</div>
				<div className="modal-document__buttons">
					<button className="modal-document__button button--red" onClick={handleModalDocument}>
						Continuer l&apos;enquête
					</button>
					<button className="modal-document__button button--white" onClick={openInNewTab}>
						Ouvrir
					</button>
				</div>
			</div>
		</div>
	);
};

Document.propTypes = {
	title: PropTypes.string,
	srcElement: PropTypes.string,
	handleModalDocument: PropTypes.func,
};

export default Document;
