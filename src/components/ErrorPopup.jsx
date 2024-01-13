import { useContext } from 'react'
import { renderText } from '../utils'
import { ErrorContext } from '../utils/context/fetchContext'
import Cross from "../assets/icons/Icon_Cross-white.svg";

const ErrorPopup = () => {
  const { errorPopup, errorMsg, clearError } = useContext(ErrorContext)

  const renderErrorPopup = () => 
    <div className="modal-objectif__background">
        <div className="modal-objectif__box">
          <button className="modal-objectif__icon--container">
            <img
              className="modal-objectif__icon"
              src={Cross}
              onClick={clearError}
              alt=""
            />
          </button>
          <h2 className="modal-objectif__title">
            Erreur : 
          </h2>
          <div>{renderText(errorMsg)}</div>
          <button className="modal-objectif__button button--red" onClick={clearError}>
            Fermer
          </button>
        </div>
      </div>

  return (
    <>
      {errorPopup && renderErrorPopup()}
    </>    
  )
}

export default ErrorPopup