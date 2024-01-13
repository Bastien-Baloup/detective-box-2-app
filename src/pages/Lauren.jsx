/* eslint-disable react-hooks/exhaustive-deps */
// EXPLICATION : Page pour faire les requêtes auprès du personnage de Lauren
// EXPLICATION : Les validations des requêtes sont faites ici

import Input from "../components/Input.jsx";
import Audio from "../components/Audio.jsx";
import Cross from "../assets/icons/Icon_Cross-white.svg";
import PropTypes from "prop-types";
import { urlApi } from "../utils/const/urlApi";
import {
  BoxContext,
  DataContext,
  AmbianceContext,
  CompteContext,
} from "../utils/context/fetchContext";
import { useContext, useState, useMemo } from "react";
// import { dataLauren } from "../utils/const/dataLauren";
import useApi from "../utils/hooks/useApi.js";
import useEvent from "../utils/hooks/useEvent.js";
import { slugify, renderText } from "../utils"

const Lauren = ({ closeAgentPage }) => {
  const { currentBox } = useContext(BoxContext);
  const { fetchPreviousStateNappe } = useContext(AmbianceContext);
  const token = localStorage.getItem("token");
  const {
    actionToggleDataLauren,
    dataLauren,
    actionToggleDataHistory,
    dataHistory
  } = useContext(DataContext);
  const {
    updateCharactersById,
    updateHistory,
  } = useApi();
  const { dispatch } = useEvent();
  const { closeCompte } = useContext(CompteContext);

  const box2document6 = useMemo(() => currentBox == 2 && dataHistory?.data.find((event) => event.id == "box2document6")?.status, [currentBox, dataHistory])

  const [value, setValue] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [modal, setModal] = useState(false);
  const [modalMedia, setModalMedia] = useState(false);
  const [answer, setAnswer] = useState("");

  //EXPLICATION : Fonction pour sortir les joueurs de la page de Lauren si elle vient de se faire enlever (box2document6 dans historique)
  if (currentBox == 2 && box2document6) {
    closeAgentPage();
  }

  const thisBox = useMemo(() => dataLauren.find((element) => element.box_id == currentBox)?.data, [currentBox, dataLauren])
  const box1    = useMemo(() => dataLauren.find((element) => element.box_id == 1)?.data, [dataLauren])
  const box2    = useMemo(() => dataLauren.find((element) => element.box_id == 2)?.data, [dataLauren])
  const generic = useMemo(() => dataLauren.find((element) => element.box_id == 4)?.data, [dataLauren])

  // EXPLICATION : Les réponses peuvent être trouvées dans la box actuelle ou les boxs précédentes
  // EXPLICATION : Les réponses du personnage dépendent de la location de la réponse (générique, box précedente ou box actuelle) et du status de la réponse (déjà demandé ou pas)
  // EXPLICATION : Celine et Lauren sont les seules à avoir des boxs génériques
  const handleSubmit = (e) => {
    e.preventDefault();
    
    const answerInThisBox             = thisBox.find((element) => element.ask.includes(slugify(value)))
    const previouslyAnsweredInThisBox = answerInThisBox && answerInThisBox.status
    const answerInFailedInterview     = generic.find((element) => element.ask.includes(slugify(value)))
    const answerInBox1                = box1.some((element) => element.ask.includes(slugify(value)))
    const answerInBox2                = box2.some((element) => element.ask.includes(slugify(value)))
    if (value == "") {
      setErrorMessage("Il me faut l'identité de la personne à interroger");
      setValue("");
      return;
    }
    if (previouslyAnsweredInThisBox) {
      setValue("");
      setErrorMessage(
        "Vous m'avez dejà demandé d'interroger cette personne. Rendez-vous dans l'Historique pour réécouter l'interview."
      );
      return;
    }
    if (answerInThisBox) {
      setAnswer(answerInThisBox);
      setModal(true);
      setValue("");
      setErrorMessage("");
      return;
    }
    if (answerInFailedInterview) {
      setAnswer(answerInFailedInterview);
      setModal(true);
      setValue("");
      setErrorMessage("");
      return;
    }
    if (currentBox == 2 && answerInBox1) {
      setValue("");
      setErrorMessage(
        "Vous avez déjà interrogé cette personne lors d'une box précédente. Rendez-vous dans l'Historique pour réécouter l'interview."
      );
      return;
    }
    if (currentBox == 3 && (answerInBox2 || answerInBox1)) {
      setValue("");
      setErrorMessage(
        "Vous avez déjà interrogé cette personne lors d'une box précédente. Rendez-vous dans l'Historique pour réécouter l'interview."
      );
      return;
    }
    setValue("");
    setErrorMessage("Je n'ai pas pu joindre la personne dont vous me parlez.");
  };

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
    fetchPreviousStateNappe();
    validateModal();
    setModalMedia(true);
  };

  const renderModalMedia = () => {
    closeCompte();
    return (
      <Audio
        title={answer.title}
        srcImg1={urlApi.cdn() + answer.img1}
        srcImg2={urlApi.cdn() + answer.img2}
        srcTranscription={urlApi.cdn() + answer.srcTranscript}
        srcAudio={urlApi.cdn() + answer.srcAudio}
        handleModalAudio={() => closeModalMedia(answer.id, answer.ask)}
      />
    );
  };

  const closeModalMedia = async (answerId, asnwerAsk) => {
    await updateCharactersById(token, 2, currentBox, asnwerAsk);
    await updateHistory(token, currentBox, answerId);
    dispatch({
      type: "setEvent",
      id: answerId,
    });
    if (answerId == "box2audio1") {
      await updateHistory(token, 2, "box2document3");
      dispatch({
        type: "setEvent",
        id: "box2document3",
      });
    }
    actionToggleDataLauren();
    actionToggleDataHistory();
    setModalMedia(false);
  };

  const catchphraseLauren = [
    "sounds/402-repliques-lauren-1.mp3",
    "sounds/402-repliques-lauren-2.mp3",
    "sounds/402-repliques-lauren-3.mp3",
    "sounds/402-repliques-lauren-4.mp3",
    "sounds/402-repliques-lauren-5.mp3",
    "sounds/402-repliques-lauren-6.mp3",
    "sounds/402-repliques-lauren-7.mp3",
  ];
  const catchphraseRaphaelle = [
    "sounds/401-repliques-raphaelle-1.mp3",
    "sounds/401-repliques-raphaelle-2.mp3",
    "sounds/401-repliques-raphaelle-3.mp3",
    "sounds/401-repliques-raphaelle-5.mp3",
    "sounds/401-repliques-raphaelle-6.mp3",
    "sounds/401-repliques-raphaelle-7.mp3",
  ];

  const randomNumberLauren = Math.floor(
    Math.random() * catchphraseLauren.length
  );
  const randomNumberRaphaelle = Math.floor(
    Math.random() * catchphraseRaphaelle.length
  );

  return (
    <>
      {modal ? renderModal() : ""}
      {modalMedia ? renderModalMedia() : ""}
      <audio autoPlay>
        <source
          src={
            currentBox == 3
              ? urlApi.cdn() + catchphraseRaphaelle[randomNumberRaphaelle]
              : urlApi.cdn() + catchphraseLauren[randomNumberLauren]
          }
          type="audio/mpeg"
        />
        Votre navigateur ne prend pas en charge ce format
      </audio>
      <div className="agent">
        <div className="agent__portrait--container">
          <img
            className="agent__portrait"
            src={
              currentBox == 3
                ? "https://db2cdn.fra1.cdn.digitaloceanspaces.com/assets/photos-personnages/raphaelle.jpg"
                : "https://db2cdn.fra1.cdn.digitaloceanspaces.com/assets/photos-personnages/lauren.jpg"
            }
            alt={currentBox == 3 ? "Photo de Raphaelle" : "Photo de Lauren"}
          />
        </div>
        <div className="agent__main">
          <div className="agent__title--container">
            <p className="agent__title">Qui souhaitez-vous interroger ?</p>
          </div>
          <div className="agent__errorMessage">{errorMessage}</div>
          <form className="agent__form" onSubmit={handleSubmit}>
            <Input
              type="texte"
              label="Prénom et Nom"
              name="lauren"
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

Lauren.propTypes = {
  closeAgentPage: PropTypes.func,
};

export default Lauren;
