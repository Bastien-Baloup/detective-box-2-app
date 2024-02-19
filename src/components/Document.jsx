// EXPLICATION : Ce composant permet de rendre la modale Document.

import PropTypes from 'prop-types'

const Document = ({ title, srcElement, handleModalDocument, message }) => {
	// EXPLICATION : Cette fonction permet d'ouvrir le document dans un nouvel onglet (pour le voir en plus grand)
	const openInNewTab = () => {
		window.open(srcElement, '_blank')
	}

	// EXPLICATION : Cette fonction permet d'afficher une img ou un iframe dans la modale en fonction de si le document est un pdf ou un png/jpeg
	const mediaFactory = (src) => {
		const extension = src.slice(((src.lastIndexOf('.') - 1) >>> 0) + 2)
		if (extension === 'pdf') {
			return <iframe title='document' className='modal-document__element' src={src} allowfullscreen={true} border='0' />
		}
		return <img className='modal-document__element' src={src} alt='document' />
	}

	const renderText = (data) => {
		const text = data.map((el, i) => {
			return (
				<p className='modal-objectif__subtitle' key={i}>
					{el}
				</p>
			)
		})
		return text
	}

	return (
		<div className='modal-document__background'>
			<div className='modal-document__box'>
				<p className='modal-document__title'>{title}</p>
				{message && renderText(message)}
				<div className='modal-document__element-container'>{mediaFactory(srcElement)}</div>
				<div className='modal-document__buttons'>
					<button type='button' className='modal-document__button button--red' onClick={handleModalDocument}>
						Continuer l&apos;enquête
					</button>
					<button type='button' className='modal-document__button button--white' onClick={openInNewTab}>
						Ouvrir
					</button>
				</div>
			</div>
		</div>
	)
}

Document.propTypes = {
	title: PropTypes.string,
	srcElement: PropTypes.string,
	handleModalDocument: PropTypes.func,
	message: PropTypes.array
}

export default Document
