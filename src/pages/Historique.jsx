/* eslint-disable react-hooks/exhaustive-deps */
// EXPLICATION : Page Historique qui permet d'afficher toutes les preuves + les filtres de tri pour trier ces mêmes preuves en fonction de leur type et des boxs.

import { useMemo, useState } from 'react'
import Filter from '../components/Filter'
import Preuve from '../components/Preuve'
import Document from '../components/Document'
import Audio from '../components/Audio'
import Video from '../components/Video'
import { urlApi } from '../utils/const/urlApi'
import Cross from '../assets/icons/Icon_Cross-white.svg'
import { BoxContext, DataContext, AmbianceContext, CompteContext } from '../utils/context/fetchContext'
import { useContext } from 'react'
import useLieu from '../utils/hooks/useLieu.jsx'

function Historique() {
	const filtersType = ['Document', 'Vidéo', 'Audio', 'Lieu', 'Archive']
	const filterBox = ['Box 1', 'Box 2', 'Box 3']
	const { currentBox } = useContext(BoxContext)
	const { fetchPreviousStateNappe } = useContext(AmbianceContext)
	const { dataHistory } = useContext(DataContext)
	const { renderLieu, setLieu, setLieuModalOpen } = useLieu()
	const { closeCompte } = useContext(CompteContext)

	const openLieu = (lieu) => {
		setLieu(lieu)
		setLieuModalOpen(true)
		setModal(false)
	}

	const dataHistory1 = useMemo(() => (dataHistory[1]?.data ? dataHistory[1].data : []), [dataHistory])
	const dataHistory2 = useMemo(() => (dataHistory[2]?.data ? dataHistory[2].data : []), [dataHistory])
	const dataHistory3 = useMemo(() => (dataHistory[3]?.data ? dataHistory[3].data : []), [dataHistory])

	const initialFilterBox = () => {
		if (currentBox === 1) {
			return ['Box 1']
		}
		if (currentBox === 2) {
			return ['Box 2']
		}
		if (currentBox === 3) {
			return ['Box 3']
		}
		return []
	}

	const [selectedCategory, setSelectedCategory] = useState([])
	const [selectedBox, setselectedBox] = useState(() => initialFilterBox())

	const [modal, setModal] = useState(false)
	const [selectedClue, setSelectedClue] = useState('')

	// EXPLICATION : cette fonction va créer un nouvel array avec l'ensemble des filtres de catégorie
	const handleFilterCategory = (selectedFilter_) => {
		let selectedFilter
		if (selectedFilter_ === 'Vidéo') {
			selectedFilter = 'Video'
		} else {
			selectedFilter = selectedFilter_
		}
		if (selectedCategory.includes(selectedFilter)) {
			const filters = selectedCategory.filter((element) => element !== selectedFilter)
			setSelectedCategory(filters)
		} else {
			setSelectedCategory([...selectedCategory, selectedFilter])
		}
	}

	// EXPLICATION : cette fonction va créer un nouvel array avec l'ensemble des filtres de box
	const handleFilterBox = (selectedFilter) => {
		if (selectedBox.includes(selectedFilter)) {
			const filters = selectedBox.filter((element) => element !== selectedFilter)
			setselectedBox(filters)
		} else {
			setselectedBox([...selectedBox, selectedFilter])
		}
	}

	// EXPLICATION : cette fonction va filtrer les data en fonction des arrays filtres créés plus haut
	const filterClues = (data) => {
		if (data.length > 0) {
			if (selectedCategory.length === 0 && selectedBox.length === 0) {
				return data.map((clue, index) => (
					<Preuve data={clue} key={`clueKey-${index}`} openModal={() => openModal(clue)} />
				))
			}
			if (selectedCategory.length === 0 && selectedBox.length !== 0) {
				return data
					.filter((clue) => selectedBox.includes(clue.box))
					.map((clue, index) => <Preuve data={clue} key={`clueKey-${index}`} openModal={() => openModal(clue)} />)
			}
			if (selectedBox.length === 0 && selectedCategory.length !== 0) {
				return data
					.filter((clue) => selectedCategory.includes(clue.category))
					.map((clue, index) => <Preuve data={clue} key={`clueKey-${index}`} openModal={() => openModal(clue)} />)
			}
			return data
				.filter((clue) => selectedCategory.includes(clue.category))
				.filter((clue) => selectedBox.includes(clue.box))
				.map((clue, index) => <Preuve data={clue} key={`clueKey-${index}`} openModal={() => openModal(clue)} />)
		}
	}

	// EXPLICATION : cette fonction indique quelle data utiliser en fonction de la current box PUIS elle appelle la fonction filter pour display les bonnes preuves
	// Les preuves des boxs précédentes sont toujours toutes affichées. En revanche, seulement celles dont status = true de la current box sont affichées
	const displayClue = () => {
		if (currentBox === 1) {
			const cluesCurrentBoxTrue = dataHistory1?.filter((clue) => clue.status === true)
			const allClues = [cluesCurrentBoxTrue].flat()
			if (!dataHistory1) {
				//actionToggleDataHistory()
				return []
			}
			//console.log(filterClues(allClues))
			return filterClues(allClues)
		}
		if (currentBox === 2 && dataHistory1) {
			const cluesCurrentBoxTrue = dataHistory2?.filter((clue) => clue.status === true)
			const allClues = [cluesCurrentBoxTrue, dataHistory1].flat()
			return filterClues(allClues)
		}
		if (currentBox === 3 && dataHistory1 && dataHistory2) {
			const cluesCurrentBoxTrue = dataHistory3?.filter((clue) => clue.status === true)
			const allClues = [cluesCurrentBoxTrue, dataHistory2, dataHistory1].flat()
			return filterClues(allClues)
		}
	}

	const openModal = (clue) => {
		if (clue.category === 'Audio' || clue.category === 'vidéo') {
			fetchPreviousStateNappe()
		}
		setModal(true)
		setSelectedClue(clue)
	}

	const closeModaleAudio = () => {
		setModal(false)
	}

	// EXPLICATION : cette fonction indique quelle modale afficher au clic d'une preuve en fonction de sa catégorie
	const displayCorrespondingModal = (clue) => {
		closeCompte()
		//console.log(clue)
		if (clue.category === 'Archive') {
			return (
				<Document
					title={clue.title}
					srcElement={urlApi.cdn() + clue.src}
					message={clue?.message}
					handleModalDocument={() => setModal(false)}
				/>
			)
		}
		if (clue.category === 'Document') {
			return (
				<Document
					title={clue.title}
					srcElement={urlApi.cdn() + clue.src}
					message={clue?.message}
					handleModalDocument={() => setModal(false)}
				/>
			)
		}
		if (clue.category === 'Audio') {
			return (
				<Audio
					title={clue.title}
					srcImg1={urlApi.cdn() + clue.img1}
					srcImg2={urlApi.cdn() + clue.img2}
					srcTranscription={urlApi.cdn() + clue.srcTranscript}
					srcAudio={urlApi.cdn() + clue.srcAudio}
					handleModalAudio={closeModaleAudio}
				/>
			)
		}
		if (clue.category === 'Lieu') {
			return (
				<div className='modal-objectif__background'>
					<div className='modal-objectif__box'>
						<button type='button' className='modal-objectif__icon--container'>
							<img className='modal-objectif__icon' src={Cross} onClick={() => setModal(false)} alt='' />
						</button>
						<p className='modal-objectif__title'>Vous êtes sur de vouloir retourner sur le lieu {clue.title} ?</p>
						<button type='button' className='modal-objectif__button button--red' onClick={() => openLieu(clue.id)}>
							Explorer de nouveau
						</button>
					</div>
				</div>
			)
		}
		if (clue.category === 'Video') {
			return <Video title={clue.title} srcVideo={urlApi.cdn() + clue.src} handleModalVideo={() => setModal(false)} />
		}
	}

	const displayFilterBox = () => {
		if (currentBox === 1) {
			return filterBox.map((category, index) => (
				<Filter
					category={category}
					key={`filterBox-${index}`}
					handleSearch={() => handleFilterBox(category)}
					activebyDefault={category === 'Box 1' ? true : false}
				/>
			))
		}
		if (currentBox === 2) {
			return filterBox.map((category, index) => (
				<Filter
					category={category}
					key={`filterBox-${index}`}
					handleSearch={() => handleFilterBox(category)}
					activebyDefault={category === 'Box 2' ? true : false}
				/>
			))
		}
		if (currentBox === 3) {
			return filterBox.map((category, index) => (
				<Filter
					category={category}
					key={`filterBox-${index}`}
					handleSearch={() => handleFilterBox(category)}
					activebyDefault={category === 'Box 3' ? true : false}
				/>
			))
		}
	}

	const displayFilterType = () => {
		return filtersType.map((category, index) => (
			<Filter
				category={category}
				key={`filterType-${index}`}
				handleSearch={() => handleFilterCategory(category)}
				activebyDefault={false}
			/>
		))
	}

	return (
		<main className='main__history'>
			{modal ? displayCorrespondingModal(selectedClue) : null}
			{renderLieu()}
			<div className='filter__wrapper'>
				<div className='filter--type__container'>{displayFilterType()}</div>
				<div className='filter--box__container'>{displayFilterBox()}</div>
			</div>
			<div className='clue__wrapper'>{displayClue()}</div>
		</main>
	)
}
export default Historique
