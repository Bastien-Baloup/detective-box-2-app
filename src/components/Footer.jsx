/* eslint-disable react-hooks/exhaustive-deps */
// EXPLICATION : Ce composant permet de rendre le footer qui contient les objectifs

import Paper from '../assets/img/Paper.png'
import Objectif from './Objectif'
import { BoxContext, DataContext } from '../utils/context/fetchContext.jsx'
import { useContext, useMemo } from 'react'
import EventHandler from './EventHandler.jsx'

const Footer = () => {
	const { currentBox } = useContext(BoxContext)
	const { dataObjectif } = useContext(DataContext)

	const dataObjectif_ = useMemo(() => dataObjectif[currentBox]?.data, [currentBox, dataObjectif])

	return (
		<footer>
			<EventHandler />
			<div className='footer__topSection'>
				<div className='footer__paper--container'>
					<img className='footer__paper' src={Paper} alt='' />
				</div>
				<div className='footer__title--container'>
					<p className='footer__title'>Vos objectifs</p>
				</div>
			</div>
			<div className='footer__bottomSection'>
				<div className='objectif__wrapper'>
					{dataObjectif_?.map((objectif, index) => (
						<Objectif data={objectif} key={`objectifKey-${index}`} />
					))}
				</div>
			</div>
		</footer>
	)
}
export default Footer
