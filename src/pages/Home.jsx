/* eslint-disable react-hooks/exhaustive-deps */
// EXPLICATION : Page Home pour afficher les cartes personnages + les formulaires personnages pour les requêtes

import Card from '../components/Card'
import IconLauren from '../assets/icons/Logo_Lauren.svg'
import IconRaphaelle from '../assets/icons/Logo_Raphaelle.svg'
import IconCeline from '../assets/icons/Logo_Celine.svg'
import IconTim from '../assets/icons/Logo_Tim.svg'
import IconAdele from '../assets/icons/Logo_Adele.svg'
import Tim from './Tim'
import Adele from './Adele'
import Lauren from './Lauren'
import Raphaelle from './Raphaelle'
import Celine from './Celine'
import { BoxContext, DataContext } from '../utils/context/fetchContext'
import { useState, useContext, useMemo } from 'react'
import { urlApi } from '../utils/const/urlApi'
import useApi from '../utils/hooks/useApi.js'
import useEvent from '../utils/hooks/useEvent.js'

function Home() {
	const [characterDisplayed, setCharacterDisplayed] = useState(null)
	const [modalLaurenGone, setModalLaurenGone] = useState(false)
	const [modalCelineGone, setModalCelineGone] = useState(false)
	const { updateEvent } = useApi()
	const { dispatch } = useEvent()

	const { currentBox } = useContext(BoxContext)
	const token = localStorage.getItem('token')
	const { actionToggleDataEvent, dataHistory } = useContext(DataContext)

	const box2document6 = useMemo(
		() =>
			currentBox === 2 &&
			dataHistory[currentBox]?.data &&
			dataHistory[currentBox]?.data.find((event) => event.id === 'box2document6')?.status,
		[currentBox, dataHistory]
	)
	const box3audio3 = useMemo(
		() =>
			currentBox === 3 &&
			dataHistory[currentBox]?.data &&
			dataHistory[currentBox]?.data.find((event) => event.id === 'box3audio3')?.status,
		[currentBox, dataHistory]
	)

	const specificCardActionLauren = () => {
		setModalLaurenGone(true)
	}

	const launchEventGoToDB = async () => {
		setModalLaurenGone(false)
		await updateEvent(token, 2, 25, 'open')
		dispatch({
			type: 'setEvent',
			id: 'event25'
		})
		actionToggleDataEvent()
	}

	// EXPLICATION : Quand le personnage de Lauren a disparu, alors on affiche cette modale pour afficher la video à l'agence (event 25)
	const displayModalLaurenGone = () => {
		return (
			<div className='modal-boxdone__background'>
				<div className='modal-boxdone__box'>
					<audio autoPlay>
						<source src={`${urlApi.cdn()}sounds/210-commentaires-raphaelle-absence-lauren.mp3`} type='audio/mpeg' />
						Votre navigateur ne prend pas en charge ce format
					</audio>
					<p className='modal-boxdone__text'>Agents, voici le numéro de portable de Lauren : +33 7 69 57 00 27.</p>
					<p className='modal-boxdone__text'>Essayez de la joindre directement pour nous assurer que tout va bien.</p>
					<p className='modal-boxdone__text'>
						De mon côté, je me mets en route pour l&apos;agence. Retrouvez moi là-bas !
					</p>
					<button type='button' className='modal-boxdone__button button--red' onClick={launchEventGoToDB}>
						Se rendre au bureau
					</button>
				</div>
			</div>
		)
	}

	const specificCardActionCeline = () => {
		setModalCelineGone(!modalCelineGone)
	}

	// EXPLICATION : Quand le personnage de Céline a disparu, alors on affiche cette modale
	const displayModalCelineGone = () => {
		return (
			<div className='modal-boxdone__background'>
				<div className='modal-boxdone__box'>
					<audio autoPlay>
						<source src={`${urlApi.cdn()}sounds/300-commentaires-sanchez-1.mp3`} type='audio/mpeg' />
						Votre navigateur ne prend pas en charge ce format
					</audio>
					<p className='modal-boxdone__text'>
						Oh non ! <br /> Maintenant c&apos;est Céline que j&apos;arrive plus à joindre... <br />
						On devrait aller chez elle pour vérifier que tout va bien !
					</p>
					<button type='button' className='modal-boxdone__button button--red' onClick={specificCardActionCeline}>
						Continuer l&apos;enquête
					</button>
				</div>
			</div>
		)
	}

	const renderLaurenCard = () => {
		if (currentBox === 3) {
			return (
				<Card
					srcImg='https://db2cdn.fra1.cdn.digitaloceanspaces.com/assets/photos-personnages/raphaelle.jpg'
					srcIcon={IconLauren}
					name='Raphaëlle Sanchez'
					contentButton='Demander un interrogatoire'
					actionButton={() => setCharacterDisplayed('lauren')}
					state=''
				/>
			)
		}
		if (currentBox === 2 && box2document6 === true) {
			return (
				<Card
					srcImg='https://db2cdn.fra1.cdn.digitaloceanspaces.com/assets/photos-personnages/lauren.jpg'
					srcIcon={IconLauren}
					name='Lauren Fraser'
					contentButton='Demander un interrogatoire'
					actionButton={specificCardActionLauren}
					state='unavailable'
				/>
			)
		}
		return (
			<Card
				srcImg='https://db2cdn.fra1.cdn.digitaloceanspaces.com/assets/photos-personnages/lauren.jpg'
				srcIcon={IconLauren}
				name='Lauren Fraser'
				contentButton='Demander un interrogatoire'
				actionButton={() => setCharacterDisplayed('lauren')}
				state=''
			/>
		)
	}

	const renderCelineCard = () => {
		if (currentBox === 3 && box3audio3 === true) {
			return (
				<Card
					srcImg='https://db2cdn.fra1.cdn.digitaloceanspaces.com/assets/photos-personnages/celine.jpg'
					srcIcon={IconCeline}
					name='Céline Valluy'
					contentButton='Demander un dossier de police'
					actionButton={specificCardActionCeline}
					state='unavailable'
				/>
			)
		}
		return (
			<Card
				srcImg='https://db2cdn.fra1.cdn.digitaloceanspaces.com/assets/photos-personnages/celine.jpg'
				srcIcon={IconCeline}
				name='Céline Valluy'
				contentButton='Demander un dossier de police'
				actionButton={() => setCharacterDisplayed('celine')}
				state=''
			/>
		)
	}

	// EXPLICATION : Fonction pour afficher tout les personnages
	const displayAllCharacters = () => {
		return (
			<>
				<div className='card__wrapper'>
					<Card
						srcImg='https://db2cdn.fra1.cdn.digitaloceanspaces.com/assets/photos-personnages/raphaelle.jpg'
						srcIcon={IconRaphaelle}
						name='Raphaëlle Sanchez'
						contentButton='Explorer un lieu'
						actionButton={() => setCharacterDisplayed('raphaelle')}
						state=''
					/>
					{renderLaurenCard()}
					{renderCelineCard()}
					<Card
						srcImg='https://db2cdn.fra1.cdn.digitaloceanspaces.com/assets/photos-personnages/tim.jpg'
						srcIcon={IconTim}
						name='Tim Lonewood'
						contentButton='Demander une analyse informatique'
						actionButton={() => setCharacterDisplayed('tim')}
						state=''
					/>
					<Card
						srcImg='https://db2cdn.fra1.cdn.digitaloceanspaces.com/assets/photos-personnages/adele.jpg'
						srcIcon={IconAdele}
						name='Adèle Leinu'
						contentButton='Demander une analyse scientifique'
						actionButton={currentBox === 1 ? null : () => setCharacterDisplayed('adele')}
						state={currentBox === 1 ? 'unavailable' : ''}
					/>
				</div>
				{modalLaurenGone && displayModalLaurenGone()}
				{modalCelineGone && displayModalCelineGone()}
			</>
		)
	}

	// EXPLICATION : Afficher de nouveau tout les personnages
	const backToHome = () => {
		setCharacterDisplayed(null)
	}

	// EXPLICATION : Fonctions pour afficher tout les différents personnages
	const displayLauren = () => {
		return <Lauren closeAgentPage={backToHome} />
	}

	const displayRaphaelle = () => {
		return <Raphaelle closeAgentPage={backToHome} />
	}

	const displayCeline = () => {
		return <Celine closeAgentPage={backToHome} />
	}

	const displayTim = () => {
		return <Tim closeAgentPage={backToHome} />
	}

	const displayAdele = () => {
		return <Adele closeAgentPage={backToHome} />
	}

	return (
		<main className='main__home'>
			{characterDisplayed == null ? displayAllCharacters() : null}
			{characterDisplayed === 'lauren' ? displayLauren() : null}
			{characterDisplayed === 'raphaelle' ? displayRaphaelle() : null}
			{characterDisplayed === 'celine' ? displayCeline() : null}
			{characterDisplayed === 'tim' ? displayTim() : null}
			{characterDisplayed === 'adele' ? displayAdele() : null}
		</main>
	)
}
export default Home
