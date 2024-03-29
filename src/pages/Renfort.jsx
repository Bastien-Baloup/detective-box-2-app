/* eslint-disable react-hooks/exhaustive-deps */
// EXPLICATION : Page pour afficher les renforts

import { useMemo, useState, useContext } from 'react'
import Slider from '../components/Slider'
import Check from '../assets/icons/Icon_Check-green.svg'
import LockClosed from '../assets/icons/Icon_Lock-closed-red.svg'
import LockOpen from '../assets/icons/Icon_Lock-open-black.svg'
import { urlApi } from '../utils/const/urlApi'
import { BoxContext, DataContext } from '../utils/context/fetchContext'

function Renfort() {
	const { currentBox, currentBoxStatus } = useContext(BoxContext)
	const { dataHelp } = useContext(DataContext)

	const clues = useMemo(() => (dataHelp ? dataHelp[currentBox]?.data : []), [dataHelp, currentBox])

	const [sliderActivated, setSliderActivated] = useState(false)
	const [menuActivated, setmenuActivated] = useState(true)
	const [helpSelected, setHelpSelected] = useState(null)

	// EXPLICATION : Fonction pour retourner au choix des renforts
	const backToHome = () => {
		setSliderActivated(false)
		setmenuActivated(true)
	}

	// EXPLICATION : Fonction pour ouvrir le slider avec le renfort selectionné
	const openSlider = (data) => {
		setHelpSelected(data)
		setSliderActivated(true)
		setmenuActivated(false)
	}

	// EXPLICATION : Afficher le composant Slider
	const displaySlider = (data) => {
		return <Slider data={data} handleModal={backToHome} url={urlApi.cdn()} />
	}

	// EXPLICATION : Afficher le choix des renforts (etat en fonction de leur statut)
	const displayMenu = () => {
		const menuChoices = clues?.map((help, index) => {
			if (help.status === 'done' || currentBoxStatus === 'done') {
				return (
					<>
						<button
							type='button'
							className='menu__choice menu__choice--done'
							onClick={() => openSlider(help)}
							key={`helpKey1-${index}-${help.id}`}
						>
							<div className='menu__choice__content'>
								<div className='menu__choice__icon-wrapper'>
									<img src={Check} className='menu__choice__icon' alt='Box terminée' />
								</div>
								<h3 className='menu__choice__title'>{help.title}</h3>
							</div>
						</button>
					</>
				)
			}
			if (help.status === 'open') {
				return (
					<>
						<button
							type='button'
							className='menu__choice menu__choice--open'
							onClick={() => openSlider(help)}
							key={`helpKey2-${index}`}
						>
							<div className='menu__choice__content'>
								<div className='menu__choice__icon-wrapper'>
									<img src={LockOpen} className='menu__choice__icon' alt='Box ouverte' />
								</div>
								<h3 className='menu__choice__title'>{help.title}</h3>
							</div>
						</button>
					</>
				)
			}
			if (help.status === 'closed') {
				return (
					<>
						<button type='button' className='menu__choice menu__choice--closed' key={`helpKey3-${index}`}>
							<div className='menu__choice__icon-wrapper--closed'>
								<img src={LockClosed} className='menu__choice__icon' alt='Box fermée' />
							</div>
							<h3 className='menu__choice__title--closed'>Ce renfort est bloqué pour le moment</h3>
						</button>
					</>
				)
			}
		})
		return (
			<>
				<p className='help__title'> Choisissez le sujet sur lequel vous avez besoin de renfort :</p>
				<div className='help__menu'>{menuChoices}</div>
			</>
		)
	}

	return (
		<div className='main__help'>
			{menuActivated ? displayMenu() : null}
			{sliderActivated ? displaySlider(helpSelected) : null}
		</div>
	)
}
export default Renfort
