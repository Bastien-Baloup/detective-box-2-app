import { MarzipanoInit } from '../../utils/const/marzipanoInit'
import { useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import '../../assets/fouilles/planque/style.css'
import data from '../../assets/fouilles/planque/data'

function ChantierModal({ onClose }) {
  const panoRef = useRef(null)
  const viewerRef = useRef(null)
  const arrivalPlanque = useRef(sessionStorage.getItem('arrival_planque'))

  const songStarter = () => {
    if (!arrivalPlanque.current) {
      setTimeout(() => document.getElementById('arrival').play(), 1500)
    }
    document.getElementById('song').play()
    document.getElementById('song').volume = 0.2
  }

  const clicHandle = async () => {
    document.getElementById('comment').setAttribute('src', '')

    const token = localStorage.getItem('token')
    if (!token) {
      alert("Erreur de communication avec l'app détectivebox : Token vide")
      return
    }
    const response = await fetch(
      'https://api2.detectivebox.fr/history/1?id=box1document6',
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({ status: true }),
      }
    )
    console.table(response)
    if (!response.ok) {
      alert(
        'Erreur de comunication avec le serveur: ' +
          response.status +
          (response.statusText !== '' ? ' - ' + response.statusText : '')
      )
    } else {
      alert("Rendez-vous sur l'application pour la suite de l'enquête")
    }
  }

  const planqueInit = () => {
    document.querySelectorAll('.close-img').forEach((element) => {
      element.addEventListener('click', () => {
        document.querySelectorAll('.img').forEach((imgElement) => {
          imgElement.style.display = 'none'
        })
      })
    })

    document.querySelectorAll('.watch').forEach((element) => {
      element.addEventListener('click', () => {
        document.querySelectorAll('.img').forEach((imgElement) => {
          imgElement.style.display = 'none'
        })
        const id = element.getAttribute('id')
        document.getElementById('img-' + id).style.display = 'block'

        if (id == 'see6') {
          document.getElementById('arrival').volume = 0

          if (document.getElementById('comment').getAttribute('src') !== '') {
            document.getElementById('comment').play()
          }

          document.getElementById('comment').onended = clicHandle
        }
      })
    })

    sessionStorage.setItem('arrival_planque', '1')
  }

  useEffect(() => MarzipanoInit(panoRef, viewerRef, data, 'planque'), [])
  useEffect(planqueInit, [])
  useEffect(songStarter, [])

  return (
    <div
      id='modal-planque'
      style={{
        position: 'fixed',
        height: '100%',
        width: '100%',
        top: '0',
        left: '0',
        zIndex: 1000,
        overflow: 'hidden',
      }}
    >
      <div id='fouille' className='multiple-scenes'>
        <div id='pano' ref={panoRef}></div>
        <div id='sceneList'>
          <ul className='scenes'>
            <a href='#' className='scene' data-id='0-103_planque_grnier_1'>
              <li className='text'>103_planque_grnier_1</li>
            </a>

            <a href='#' className='scene' data-id='1-103_planque_grnier_2'>
              <li className='text'>103_planque_grnier_2</li>
            </a>
          </ul>
        </div>
        <div className='img' id='img-see1' style={{ display: 'none' }}>
          <span className='close-img'>X</span>
          <img
            src={`${
              import.meta.env.BASE_URL
            }fouilles/planque/assets/carte-5.jpg`}
            className='img-see'
          />
        </div>
        <div className='img' id='img-see2' style={{ display: 'none' }}>
          <span className='close-img'>X</span>
          <img
            src={`${
              import.meta.env.BASE_URL
            }fouilles/planque/assets/carte-3.jpg`}
            className='img-see'
          />
        </div>
        <div className='img' id='img-see3' style={{ display: 'none' }}>
          <span className='close-img'>X</span>
          <img
            src={`${
              import.meta.env.BASE_URL
            }fouilles/planque/assets/carte-4.jpg`}
            className='img-see'
          />
        </div>

        <div className='img' id='img-see4' style={{ display: 'none' }}>
          <span className='close-img'>X</span>
          <img
            src={`${
              import.meta.env.BASE_URL
            }fouilles/planque/assets/carte-1.jpg`}
            className='img-see'
          />
        </div>
        <div className='img' id='img-see5' style={{ display: 'none' }}>
          <span className='close-img'>X</span>
          <img
            src={`${
              import.meta.env.BASE_URL
            }fouilles/planque/assets/carte-2.jpg`}
            className='img-see'
          />
        </div>
        <div className='img' id='img-see6' style={{ display: 'none' }}>
          <span className='close-img'>X</span>
          <img
            src={`${import.meta.env.BASE_URL}fouilles/planque/assets/mot.jpg`}
            className='img-see'
          />
        </div>

        <audio id='song' loop controls style={{ display: 'none' }}>
          <source
            src={`${import.meta.env.BASE_URL}fouilles/planque/assets/music.mp3`}
            type='audio/mpeg'
          />
          Your browser does not support the audio element.
        </audio>
        <audio id='comment' controls style={{ display: 'none' }}>
          <source
            src={`${
              import.meta.env.BASE_URL
            }fouilles/planque/assets/comment.mp3`}
            type='audio/mpeg'
          />
          Your browser does not support the audio element.
        </audio>
        <audio id='arrival' controls style={{ display: 'none' }}>
          <source
            src={`${
              import.meta.env.BASE_URL
            }fouilles/planque/assets/arrival.mp3`}
            type='audio/mpeg'
          />
          Your browser does not support the audio element.
        </audio>
        <button
          className='modal-objectif__button button--red'
          style={{
            position: 'fixed',
            bottom: '0.5rem',
            left: '0.5rem',
            zIndex: 10000,
          }}
          onClick={onClose}
        >
          fermer
        </button>
      </div>
    </div>
  )
}

ChantierModal.propTypes = {
  onClose: PropTypes.func.isRequired,
}

export default ChantierModal

/*
<button
  className='modal-objectif__button button--red'
  onClick={onClose}
>
  fermer
</button>
*/
