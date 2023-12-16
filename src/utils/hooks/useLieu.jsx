import { useState } from 'react';

import ChantierModal from '../../components/fouilles/ChantierModal.jsx'
import TerrainModal from '../../components/fouilles/TerrainModal.jsx'
import PlanqueModal from '../../components/fouilles/PlanqueModal.jsx'
import MasonModal from '../../components/fouilles/MasonModal.jsx'
import AppartemenModal from '../../components/fouilles/AppartementModal.jsx'
import PrisonModal from '../../components/fouilles/PrisonModal.jsx'
import ForetModal from '../../components/fouilles/ForetModal.jsx'

export const useLieu = () => {
  const [LieuModalOpen, setLieuModalOpen] = useState(false)
  const [Lieu, setLieu] = useState('')

  const renderLieu = () => {
    let LieuModal
    switch (Lieu) {
      case 'box1lieu1':
        LieuModal = ChantierModal
        break
      case 'box1lieu2':
        LieuModal = TerrainModal
        break
      case 'box1lieu3':
        LieuModal = PlanqueModal
        break
      case 'box2lieu1':
        LieuModal = MasonModal
        break
      case 'box2lieu2': 
        LieuModal = AppartemenModal
        break
      case 'box2lieu3':
        LieuModal = PrisonModal
        break
      case 'box3lieu1':
        LieuModal = ForetModal
        break
      case 'box3lieu2':
        //LieuModal = PrisonModal
        break
      case 'box3lieu3':
        //LieuModal = PrisonModal
        break
    }
    return (
      LieuModalOpen && <LieuModal onClose={() => setLieuModalOpen(false)} />
      
    )
  }

  return { renderLieu, setLieu, setLieuModalOpen }
}