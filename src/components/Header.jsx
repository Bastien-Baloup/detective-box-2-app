/* eslint-disable react-hooks/exhaustive-deps */
// EXPLICATION : Ce composant permet de rendre le header de l'application.
// EXPLICATION : Le header comprend le logo / le composant Progression / le composant Compte / le composant Nav
// EXPLICATION : Il contient aussi le timer de fin de 30 minutes
// EXPLICATION : Il contient aussi les modales Tutoriel / Quizz / Nappe d'ambiance

import Logo from '../assets/img/DB-Logo-DetectiveBox_AgenceDBBlanc.png'
import Progression from '../components/Progression.jsx'
import Compte from '../components/Compte.jsx'
import Nav from '../components/Nav.jsx'
import Nappe from '../components/Nappe.jsx'
import Quizz from '../components/Quizz.jsx'
import Timer from './Timer.jsx'
import Video from '../components/Video.jsx'
import { Link } from 'react-router-dom'
import { urlApi } from '../utils/const/urlApi'
import { AmbianceContext, BoxContext, DataContext, CompteContext } from '../utils/context/fetchContext.jsx'
import { useEffect, useState, useRef, useContext, useMemo } from 'react'
import useApi from '../utils/hooks/useApi.js'
import useEvent from '../utils/hooks/useEvent.js'

const Header = () => {
	const { closeCompte } = useContext(CompteContext)
	const { fetchNappeMute, nappeMute } = useContext(AmbianceContext)
	const { currentBox } = useContext(BoxContext)
	const token = localStorage.getItem('token')
	const { actionToggleDataEvent, actionToggleDataHistory, dataEvent, dataHistory } = useContext(DataContext)
	const { getQuizzByBox, updateEvent, updateQuizz, updateHistory } = useApi()
	const { dispatch } = useEvent()

	const [tutorialModalIsActive, setTutorialModalIsActive] = useState(false)
	const [tutorialIsActive, setTutorialIsActive] = useState(false)
	const [quizzIsActive, setQuizzIsActive] = useState(false)
	const [nappeModalIsActive, setNappeModalIsActive] = useState(false)
	const [modaleVideo, setModaleVideo] = useState(false)

	const audioElem = useRef()

	// EXPLICATION : Cette fonction récupère l'état de la musique d'ambiance avec Context. Si nappemute, alors la musique d'ambiance est en pause, sinon elle se joue.
	useEffect(() => {
		if (nappeMute) {
			audioElem.current.pause()
		} else {
			audioElem.current.play()
		}
	}, [nappeMute])

	// EXPLICATION : Cette fonction récupère du quizz (il ne se joue qu'une fois par box)
	useEffect(() => {
		const fetchData = async () => {
			if (currentBox !== 1) {
				const quizz = await getQuizzByBox(token, currentBox)
				setDataQuizz(quizz)
			}
		}
		fetchData()
	}, [])



	const event33 = useMemo(
		() =>
			currentBox === 3 &&
			dataEvent[currentBox]?.data &&
			dataEvent[currentBox]?.data.find((event) => event.id === 33)?.status,
		[currentBox, dataEvent]
	)

	const box1video1 = useMemo(
		() =>
			currentBox === 1 &&
			dataHistory[currentBox]?.data &&
			dataHistory[currentBox]?.data.find((event) => event.id === 'box1video1')?.status,
		[currentBox, dataHistory]
	)
	const box2video1 = useMemo(
		() =>
			currentBox === 2 &&
			dataHistory[currentBox]?.data &&
			dataHistory[currentBox]?.data.find((event) => event.id === 'box2video1')?.status,
		[currentBox, dataHistory]
	)
	const box3video1 = useMemo(
		() =>
			currentBox === 3 &&
			dataHistory[currentBox]?.data &&
			dataHistory[currentBox]?.data.find((event) => event.id === 'box3video1')?.status,
		[currentBox, dataHistory]
	)

	// ouvre la popup du tutoriel seulement quand si on à pas encore vu le brief de la box en cours
	useEffect(() => {
		if (currentBox === 1 && box1video1 === false) {
			openTutorialModal()
			return
		}
		if (currentBox === 2 && box2video1 === false) {
			openTutorialModal()
			return
		}
		if (currentBox === 3 && box3video1 === false) {
			openTutorialModal()
			return
		}
	}, [currentBox, box1video1, box2video1, box3video1])

	const [dataQuizz, setDataQuizz] = useState('')

	const openTutorialModal = () => {
		closeCompte()
		setTutorialModalIsActive(true)
	}

	const openTutorial = () => {
		closeCompte()
		setTutorialIsActive(true)
	}

	// EXPLICATION : Le joueur choisi d'activer la musique d'ambiance > son état se met à jour dans le context > ferme la modale.
	const activateNappe = () => {
		fetchNappeMute(false)
		setNappeModalIsActive(false)
	}

	// EXPLICATION : Le joueur choisi de désactiver la musique d'ambiance > son état se met à jour dans le context > ferme la modale.
	const desactivateNappe = () => {
		fetchNappeMute(true)
		setNappeModalIsActive(false)
	}

	const handleModalVideoBrief = async () => {
		if (currentBox === 1) {
			await updateHistory(token, 1, 'box1video1')
			dispatch({
				type: 'setEvent',
				id: 'box1video1'
			})
		}
		if (currentBox === 2) {
			await updateHistory(token, 2, 'box2video1')
			dispatch({
				type: 'setEvent',
				id: 'box2video1'
			})
		}
		if (currentBox === 3) {
			await updateHistory(token, 3, 'box3video1')
			dispatch({
				type: 'setEvent',
				id: 'box3video1'
			})
		}
		actionToggleDataHistory()
		setModaleVideo(false)
		setNappeModalIsActive(true)
	}

	const displayBrief = () => {
		if (currentBox === 1) {
			return (
				<Video
					title='Briefing box 1'
					srcVideo={`${urlApi.cdn()}videos/db-s02-101-def.mp4`}
					handleModalVideo={handleModalVideoBrief}
				/>
			)
		}
		if (currentBox === 2) {
			return (
				<Video
					title='Briefing box 2'
					srcVideo={`${urlApi.cdn()}videos/db-s02-201-vdef.mp4`}
					handleModalVideo={handleModalVideoBrief}
				/>
			)
		}
		if (currentBox === 3) {
			return (
				<Video
					title='Briefing box 3'
					srcVideo={`${urlApi.cdn()}videos/db-s02-301-def.mp4`}
					handleModalVideo={handleModalVideoBrief}
				/>
			)
		}
	}

	// EXPLICATION : On affiche le Quizz en fonction de la box. Box 1 pas de quizz !
	const displayQuizz = () => {
		if (currentBox === 1) {
			handleCloseQuizz()
			return <></>
		}
		if (currentBox === 2 || currentBox === 3) {
			if (dataQuizz && dataQuizz.status === true) {
				handleCloseQuizz()
				return <></>
			}
			if (dataQuizz && dataQuizz.status === false) {
				return <Quizz data={dataQuizz} handleEndQuizz={handleCloseQuizz} url={urlApi.cdn()} />
			}
		}
	}

	// EXPLICATION : On ferme le quizz > affiche la video de briefing en fonction de la box > si briefing déjà vu, on affiche la modale pour choisir si active ou desactive la nappe d'ambiance
	const handleCloseQuizz = async () => {
		if (currentBox === 2 || currentBox === 3) {
			await updateQuizz(token, currentBox)
		}
		setQuizzIsActive(false)
		if (currentBox === 1 && box1video1 === false) {
			setModaleVideo(true)
			return
		}
		if (currentBox === 2 && box2video1 === false) {
			setModaleVideo(true)
			return
		}
		if (currentBox === 3 && box3video1 === false) {
			setModaleVideo(true)
			return
		}
		// setNappeModalIsActive(true)
	}

	// EXPLICATION : On affiche une modale qui propose aux joueurs d'afficher le tutoriel ou non
	const displayTutorial = () => {
		return (
			<div className='tutorial__background'>
				<div className='tutorial'>
					<p className='tutorial__text'>Voulez vous voir le tutoriel ?</p>
					<div className='tutorial__buttons'>
						<button type='button' className='tutorial__button button--red' onClick={handleOpenTutorial}>
							Oui
						</button>
						<button type='button' className='tutorial__button button--white' onClick={handleCloseModalTutorial}>
							Non
						</button>
					</div>
				</div>
			</div>
		)
	}

	// EXPLICATION : On affiche le tutorial en video et on ferme la modale de choix d'affichage du tutorial
	const handleOpenTutorial = () => {
		openTutorial()
		setTutorialModalIsActive(false)
	}

	// EXPLICATION : On ferme la modale de choix d'affichage du tutorial et on affiche le quizz
	const handleCloseModalTutorial = () => {
		setTutorialModalIsActive(false)
		setQuizzIsActive(true)
	}

	// EXPLICATION : On ferme la video du tutorial et on affiche le quizz
	const handleCloseTutorial = () => {
		setTutorialIsActive(false)
		setQuizzIsActive(true)
	}

	// EXPLICATION : Audio pour les nappes d'ambiance en fonction de la box (une box = une musique d'ambiance)
	const displayAudio = () => {
		if (currentBox === 1) {
			return (
				<audio loop preload='auto' ref={audioElem}>
					<source src={`${urlApi.cdn()}sounds/musiques-db-s2-nappe-1.wav`} type='audio/wav' />
					Votre navigateur ne prend pas en charge ce format
				</audio>
			)
		}
		if (currentBox === 2) {
			return (
				<audio loop preload='auto' ref={audioElem}>
					<source src={`${urlApi.cdn()}sounds/musiques-db-s2-nappe-2.wav`} type='audio/wav' />
					Votre navigateur ne prend pas en charge ce format
				</audio>
			)
		}
		if (currentBox === 3) {
			return (
				<audio loop preload='auto' ref={audioElem}>
					<source src={`${urlApi.cdn()}sounds/musiques-db-s2-nappe-3.wav`} type='audio/wav' />
					Votre navigateur ne prend pas en charge ce format
				</audio>
			)
		}
	}

	// EXPLICATION : Le timer de fin s'affiche lors de la dernière étape du jeu. Il est en overlay sur le header pour que le joueur ne puisse pas cliquer sur les autres composants
	const displayTimer = () => {
		fetchNappeMute(true)
		return (
			<>
				<div className='final__timer'>
					<Timer initialMinute={30} initialSecond={0} timerEndedFunction={tooLate} />;
				</div>
				<audio autoPlay>
					<source src={`${urlApi.cdn()}sounds/305-commentaires-pendant-timer.mp3`} type='audio/mpeg' />
					Votre navigateur ne prend pas en charge ce format
				</audio>
			</>
		)
	}

	const tooLate = async () => {
		await updateEvent(token, 3, 33, 'done')
		await updateEvent(token, 3, 35, 'open')
		actionToggleDataEvent()
	}

	// Il manque ici la vidéo du TUTORIEL !! //

	// EXPLICATION : Dans l'ordre : Modale Tutoriel > Si oui > affichage tutoriel video / si non > fermeture modale tutoriel
	// EXPLICATION : PUIS affichage du quizz si box 2 ou box 3
	// EXPLICATION : PUIS affichage de la video de brief si l'event correspondant est initialement "closed".
	// EXPLICATION : PUIS affichage de la modale de choix de l'activation de la musique d'ambiance
	return (
		<header>
			{tutorialModalIsActive && displayTutorial()}
			{tutorialIsActive && (
				<Video
					title='Vidéo du tutoriel'
					srcVideo={`${urlApi.cdn()}videos/tutoriel.mp4`}
					handleModalVideo={handleCloseTutorial}
				/>
			)}
			{quizzIsActive && displayQuizz()}
			{modaleVideo && displayBrief()}
			{nappeModalIsActive && <Nappe activateNappe={activateNappe} desactivateNappe={desactivateNappe} />}
			{displayAudio()}
			{event33 === 'open' && displayTimer()}
			{event33 !== 'open' && (
				<div className='header__topSection'>
					<Link className='header__logo--container' to='/box-choice'>
						<img className='header__logo' src={Logo} alt='' />
					</Link>
					<Progression />
					<Compte openTutorial={openTutorial} />
				</div>
			)}
			<div className='header__bottomSection'>
				<Nav />
			</div>
		</header>
	)
}
export default Header
