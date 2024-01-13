/* eslint-disable react-hooks/exhaustive-deps */
// EXPLICATION : Page pour faire les requêtes auprès du personnage de Céline
// EXPLICATION : Les validations des requêtes sont faites ici

import Input from "../components/Input.jsx";
import Document from "../components/Document.jsx";
import Cross from "../assets/icons/Icon_Cross-white.svg";
import PropTypes from "prop-types";
import { urlApi } from "../utils/const/urlApi";
import {
  BoxContext,
  DataContext,
  CompteContext,
} from "../utils/context/fetchContext";
import { useContext, useState, useMemo } from "react";
import useApi from "../utils/hooks/useApi.js";
import useEvent from "../utils/hooks/useEvent.js";
import { slugify, renderText } from "../utils"

const Celine = ({ closeAgentPage }) => {
  const { currentBox } = useContext(BoxContext);
  const token = localStorage.getItem("token");
  const { actionToggleDataCeline, dataCeline, dataHistory } = useContext(DataContext);
  const {updateCharactersById, updateHistory} = useApi()
  const { dispatch } = useEvent()
  const { closeCompte } = useContext(CompteContext)

  const box3audio3 = useMemo(() => currentBox == 3 && dataHistory[currentBox]?.data.find((event) => event.id == "box3audio3")?.status, [currentBox, dataHistory])

  const [value, setValue] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [modal, setModal] = useState(false);
  const [modalMedia, setModalMedia] = useState(false);
  const [answer, setAnswer] = useState("");

  //EXPLICATION : Fonction pour sortir les joueurs de la page de Celine si elle vient de se faire enlever (box3audio3 dans historique)
  if (box3audio3) {
    closeAgentPage();
  }
  const thisBox = useMemo(() => dataCeline.find((element) => element.box_id == currentBox)?.data, [currentBox, dataCeline])
  const box1    = useMemo(() => dataCeline.find((element) => element.box_id == 1)?.data, [dataCeline])
  const box2    = useMemo(() => dataCeline.find((element) => element.box_id == 2)?.data, [dataCeline])
  const generic = useMemo(() => dataCeline.find((element) => element.box_id == 4)?.data, [dataCeline])

  // EXPLICATION : Les réponses peuvent être trouvées dans la box actuelle ou les boxs précédentes
  // EXPLICATION : Les réponses du personnage dépendent de la location de la réponse (générique, box précedente ou box actuelle) et du status de la réponse (déjà demandé ou pas)
  // EXPLICATION : Celine et Lauren sont les seules à avoir des boxs génériques
  const handleSubmit = (e) => {
    e.preventDefault();
    
    const answerInThisBox = thisBox.find((element) => element.ask.includes(slugify(value)))
    const previouslyAnsweredInThisBox = answerInThisBox && answerInThisBox.status
    const answerInFailedInterview = generic.find((element) => element.ask.includes(slugify(value)))
    const answerInBox1 = box1.some((element) => element.ask.includes(slugify(value)))
    const answerInBox2 = box2.some((element) => element.ask.includes(slugify(value)))

    if (value == "") {
      setErrorMessage("Je ne peux pas fouiller les archives sans un nom !");
      setValue("");
      return;
    }
    if (previouslyAnsweredInThisBox) {
      setValue("")
      setErrorMessage(
        "Vous m'avez dejà demandé le dossier cette personne. Rendez-vous dans l'Historique pour le consulter de nouveau."
      )
      return
    }
    if (answerInThisBox) {
      setAnswer(answerInThisBox)
      setModal(true)
      setValue("")
      setErrorMessage("")
      return
    }
    if (answerInFailedInterview) {
      setAnswer(answerInFailedInterview)
      setModal(true)
      setValue("")
      setErrorMessage("")
      return
    }
    if (currentBox == 2 && answerInBox1) {
      setValue("")
      setErrorMessage(
        "Vous avez déjà demandé le dossier de cette personne lors d'une box précédente. Rendez-vous dans l'Historique pour le consulter de nouveau."
      )
      return
    }
    if (currentBox == 3 && (answerInBox2 || answerInBox1)) {
      setValue("")
      setErrorMessage(
        "Vous avez déjà demandé le dossier de cette personne lors d'une box précédente. Rendez-vous dans l'Historique pour le consulter de nouveau."
      )
      return
    }
    setValue("")
    setErrorMessage("Je ne trouve pas cette personne.")
  }

  const renderModal = () => {
    closeCompte();
    return (
      <div className="modal-objectif__background">
        <div className="modal-objectif__box">
          {answer.srcComment ? (
            <audio autoPlay>
              <source
                src={urlApi.cdn() + answer.srcComment}
                type="audio/mpeg"
              />
              Votre navigateur ne prend pas en charge ce format
            </audio>
          ) : (
            ""
          )}
          <div>{renderText()}</div>
          {answer.id ? (
            <button
              className="modal-objectif__button button--red"
              onClick={openMedia}
            >
              Voir l&apos;élément
            </button>
          ) : (
            <button
              className="modal-objectif__button button--red"
              onClick={validateModal}
            >
              Nouvelle requête
            </button>
          )}
        </div>
      </div>
    );
  };

  const validateModal = () => {
    setModal(false);
  };

  const openMedia = () => {
    validateModal();
    setModalMedia(true);
  };

  const renderModalMedia = () => {
    closeCompte();
    return (
      <Document
        title={answer.title}
        srcElement={urlApi.cdn() + answer.src}
        handleModalDocument={() => closeModalMedia(answer.id, answer.ask)}
      />
    );
  };

  // EXPLICATION : Précision particuilère pour le personnage de Xavier Monrency (archive 23) qui fait apparaitre un deuxième document dans l'historique
  const closeModalMedia = async (answerId, asnwerAsk) => {
    await updateCharactersById(token, 3, currentBox, asnwerAsk);
    await updateHistory(token, currentBox, answerId);
    dispatch({
      type: "setEvent",
      id: answerId,
    });
    if (answerId == "box1archive23") {
      await updateHistory(token, 1, "box1document4");
      dispatch({
        type: "setEvent",
        id: "box1document4",
      });
    }
    actionToggleDataCeline();
    setModalMedia(false);
  };

  const catchphrase = [
    "sounds/403-repliques-celine-1.mp3",
    "sounds/403-repliques-celine-2.mp3",
    "sounds/403-repliques-celine-3.mp3",
    "sounds/403-repliques-celine-4.mp3",
    "sounds/403-repliques-celine-5.mp3",
    "sounds/403-repliques-celine-6.mp3",
    "sounds/403-repliques-celine-7.mp3",
  ];

  const randomNumber = Math.floor(Math.random() * catchphrase.length);

  return (
    <>
      {modal ? renderModal() : ""}
      {modalMedia ? renderModalMedia() : ""}
      <audio autoPlay>
        <source
          src={urlApi.cdn() + catchphrase[randomNumber]}
          type="audio/mpeg"
        />
        Votre navigateur ne prend pas en charge ce format
      </audio>
      <div className="agent">
        <div className="agent__portrait--container">
          <img
            className="agent__portrait"
            src="https://db2cdn.fra1.cdn.digitaloceanspaces.com/assets/photos-personnages/celine.jpg"
            alt="photo de celine"
          />
        </div>
        <div className="agent__main">
          <div className="agent__title--container">
            <p className="agent__title">Quel dossier cherchez-vous ?</p>
          </div>
          <div className="agent__errorMessage">{errorMessage}</div>
          <form className="agent__form" onSubmit={handleSubmit}>
            <Input
              type="texte"
              label="Prénom et Nom"
              name="celine"
              placeholder="Ce champ est vide"
              value={value}
              setValue={setValue}
            />
            <button className="agent__form__button button--red">Valider</button>
          </form>
        </div>
        <button
          className="agent__closeButton--container"
          onClick={closeAgentPage}
        >
          <img src={Cross} className="agent__closeButton" alt="fermer" />
        </button>
      </div>
    </>
  );
};

Celine.propTypes = {
  closeAgentPage: PropTypes.func,
};

export default Celine;
