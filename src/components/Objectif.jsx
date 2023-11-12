// EXPLICATION : Ce composant est très complexe et important : il permet de rendre les objectifs
// EXPLICATION : Il affiche egalement toute la logique de validation des objectifs
// EXPLICATION : Il affiche egalement toute la logique des différents événements de l'application

import PropTypes from "prop-types";
import {useState, useEffect} from "react";
import Check from "../assets/icons/Icon_Check-green.svg";
import LockClosed from "../assets/icons/Icon_Lock-closed-red.svg";
import LockOpen from "../assets/icons/Icon_Lock-open-black.svg";
import Input from "./Input.jsx";
import Cross from "../assets/icons/Icon_Cross-white.svg";
import Video from "../components/Video";
import Document from "../components/Document";
import Audio from "../components/Audio";
import {urlApi} from "../utils/const/urlApi";
// import { dataHelp } from "../utils/const/dataHelp";
import {useNavigate} from "react-router-dom";
import {BoxContext, AuthContext, DataContext} from "../utils/context/fetchContext";
import {useContext} from "react";
import {
    updateHelp,
    getEventByBox,
    updateEvent,
    getHistoryByBox,
    getHelpByBox,
    updateHistory,
    updateObjectives,
    updateBox,
    getObjectivesByBox,
    getHistories,
} from "../utils/hooks/useApi.js";

const Objectif = ({data}) => {
    const [modal, setModal] = useState(false);
    const [modalAnswer, setModalAnswer] = useState(false);
    const [modalAnswerBis, setModalAnswerBis] = useState(false);
    const [modalBis, setModalBis] = useState(false);
    const [errorMessage, setErrorMessage] = useState(false);
    const [value, setValue] = useState("");
    const [nextStep, setNextStep] = useState(false);

    const {currentBox} = useContext(BoxContext);
    const {token} = useContext(AuthContext);
    const {
        actionToggleDataEvent,
        toggleDataEvent,
        actionToggleDataHelp,
        toggleDataHelp,
        actionToggleDataHistory,
        toggleDataHistory,
        actionToggleDataObjectif,
        toggleDataObjectif,
    } = useContext(DataContext);
    const navigate = useNavigate();

    const setEvents = (events) => {
        if (currentBox === 2) {
            const event25 = events.data.find((event) => event.id === 25);
            setEvent25(event25.status);
        }
        if (currentBox === 3) {
            const event35 = events.data.find((event) => event.id === 35);
            setEvent35(event35.status);
        }
    }

    const startHistoryPolling = () => {
        setInterval(async () => {
            const data = await getHistories(
                token,
                ['box1document1', 'box1document6', 'box1video2', 'box2document6', 'box3document2']
            ).then(res => res.json())
            if (data['box1document1'] && event25.status) {
                setModaleMalle(true)
            }

            if (data['box1document6']) {

            }
            if (data['box1video2']) {

            }

            if (data['box2document6']) {

            }

            if (data['box3document2']) {

            }
        }, 5000)
    }

    useEffect(() => {
        (async () => {
            const events = await getEventByBox(token, currentBox)
            setEvents(events)
            startHistoryPolling()
        })()

    }, [])

    // EXPLICATION : UseEffect pour récupérer l'état des événements
    /*useEffect(() => {
        const fetchData = async () => {
            const events = await getEventByBox(token, currentBox);
            console.log(events);
            if (currentBox == 2) {
                const event25 = events.data.find((event) => event.id == 25);
                setEvent25(event25.status);
            }
            if (currentBox == 3) {
                const event35 = events.data.find((event) => event.id == 35);
                setEvent35(event35.status);
            }
        };
        fetchData();
    }, [token, currentBox, toggleDataEvent]);*/

    const [event25, setEvent25] = useState("");
    const [event35, setEvent35] = useState("");

    // EXPLICATION : UseEffect pour récupérer l'état de l'historique
    useEffect(() => {
        const fetchData = async () => {
            const clues = await getHistoryByBox(token, currentBox);
            if (currentBox == 1) {
                const box1lieu2 = clues.data.find((event) => event.id == "box1lieu2");
                setBox1Lieu2(box1lieu2.status);
            }
            if (currentBox == 2) {
                const box2lieu1 = clues.data.find((event) => event.id == "box2lieu1");
                setBox1Lieu1(box2lieu1.status);
                const box2video5 = clues.data.find((event) => event.id == "box2video5");
                setBox2Video5(box2video5.status);
            }
            if (currentBox == 3) {
                const box3audio3 = clues.data.find((event) => event.id == "box3audio3");
                setBox3Audio3(box3audio3.status);
                const box3lieu2 = clues.data.find((event) => event.id == "box3lieu2");
                setBox3Lieu2(box3lieu2.status);
                const box3lieu3 = clues.data.find((event) => event.id == "box3lieu3");
                setBox3Lieu3(box3lieu3.status);
            }
        };
        fetchData();
    }, [token, currentBox, toggleDataHistory]);

    const [box1lieu2, setBox1Lieu2] = useState(false);
    const [box2lieu1, setBox1Lieu1] = useState(false);
    const [box2video5, setBox2Video5] = useState(false);
    const [box3audio3, setBox3Audio3] = useState(false);
    const [box3lieu2, setBox3Lieu2] = useState(false);
    const [box3lieu3, setBox3Lieu3] = useState(false);

    // EXPLICATION : UseEffect pour récupérer l'état des renforts (help)
    useEffect(() => {
        const fetchData = async () => {
            const help = await getHelpByBox(token, currentBox);
            if (currentBox == 3) {
                const box3help5 = help.data.find((event) => event.id == "box3help5");
                setBox3Help5(box3help5.status);
                const box3help4 = help.data.find((event) => event.id == "box3help4");
                setBox3Help4(box3help4.status);
            }
        };
        fetchData();
    }, [token, currentBox, toggleDataHelp]);

    const [box3help4, setBox3Help4] = useState("");
    const [box3help5, setBox3Help5] = useState("");

    // EXPLICATION : UseEffect pour récupérer l'état des objectifs
    useEffect(() => {
        const fetchData = async () => {
            const objectifs = await getObjectivesByBox(token, currentBox);
            if (currentBox == 1) {
                const objectif12 = objectifs.data.find((event) => event.id == 12);
                setObjectif12(objectif12.status);
                const objectif11 = objectifs.data.find((event) => event.id == 11);
                setObjectif11(objectif11.status);
                const objectif13 = objectifs.data.find((event) => event.id == 13);
                setObjectif13(objectif13.status);
            }
            if (currentBox == 3) {
                const objectif34 = objectifs.data.find((event) => event.id == 34);
                setObjectif34(objectif34.status);
            }
        };
        fetchData();
    }, [token, currentBox, toggleDataObjectif]);

    const [objectif11, setObjectif11] = useState("");
    const [objectif12, setObjectif12] = useState("");
    const [objectif13, setObjectif13] = useState("");
    const [objectif34, setObjectif34] = useState("");

    // EXPLICATION : Event pour Box 1 lieu 1
    /*useEffect(() => {
        const token = localStorage.getItem("token").replace(/"/g, ""); //XXX: Need to trim quotes from LocalStorage oO
        const sse = new EventSource("https://api.detectivebox.remimichel.fr/events/stream?token=" + token);
        sse.addEventListener("update", (event) => {
            const data = JSON.parse(event.data);
            if (data.id === "box1document1") {
                //&& event 13 == "closed"
                setModaleMalle(true);
                // await updateEvent(token, 1, 13, "done");
            }
        });
        sse.addEventListener("error", () => {
            sse.close();
        });
    }, []);

    // EXPLICATION : Event pour Box 1 lieu 2
    useEffect(() => {
        const token = localStorage.getItem("token").replace(/"/g, ""); //XXX: Need to trim quotes from LocalStorage oO
        const sse = new EventSource("https://api.detectivebox.remimichel.fr/events/stream?token=" + token);
        sse.addEventListener("update", (event) => {
            const data = JSON.parse(event.data);
            if (data.id === "box1document2") {
                //&& event 14 == "closed"
                setModaleVHS(true);
                // await updateEvent(token, 1, 14, "done");
            }
        });
        sse.addEventListener("error", () => {
            sse.close();
        });
    }, []);

    // EXPLICATION : Event pour Box 1 lieu 3
    useEffect(() => {
        const token = localStorage.getItem("token").replace(/"/g, ""); //XXX: Need to trim quotes from LocalStorage oO
        const sse = new EventSource("https://api.detectivebox.remimichel.fr/events/stream?token=" + token);
        sse.addEventListener("update", (event) => {
            const data = JSON.parse(event.data);
            if (data.id === "box1document6") {
                //&& event 15 == "closed"
                setModaleInterrogatoireGarraud(true);
                // await updateEvent(token, 1, 15, "done");
            }
        });
        sse.addEventListener("error", () => {
            sse.close();
        });
    }, []);

    // EXPLICATION : Event pour Box 2 lieu 2
    useEffect(() => {
        const token = localStorage.getItem("token").replace(/"/g, ""); //XXX: Need to trim quotes from LocalStorage oO
        const sse = new EventSource("https://api.detectivebox.remimichel.fr/events/stream?token=" + token);
        sse.addEventListener("update", (event) => {
            const data = JSON.parse(event.data);
            if (data.id === "box2document4") {
                // && event 23 == "closed"
                setMailLauren1(true);
                // await updateEvent(token, 2, 23, "done");
            }
        });
        sse.addEventListener("error", () => {
            sse.close();
        });
    }, []);

    // EXPLICATION : Event pour Box 3 lieu 1
    useEffect(() => {
        const token = localStorage.getItem("token").replace(/"/g, ""); //XXX: Need to trim quotes from LocalStorage oO
        const sse = new EventSource("https://api.detectivebox.remimichel.fr/events/stream?token=" + token);
        sse.addEventListener("update", (event) => {
            const data = JSON.parse(event.data);
            if (data.id === "box3document2") {
                //if && objectif31 == "closed"
                // await updateObjectives(token, 3, 31, "open");
                // await updateObjectives(token, 3, 34, "open");
                // await updateHelp(token, 3, "box3help3", "open");
                // await updateHelp(token, 3, "box3help6", "open");
                //toggleObjectives ? toggleHelp ?
            }
        });
        sse.addEventListener("error", () => {
            sse.close();
        });
    }, []);*/

    useEffect(() => {
        const fetchEvent = async () => {
            if (currentBox == 2) {
                // Pour faire le lien entre le composant Home (carte Lauren) et ici
                if (event25 == "open" && box2video5 == false) {
                    setVideoBureauLauren(true);
                    await updateEvent(token, 2, 25, "done");
                    // actionToggleDataEvent();
                }
            }
            if (currentBox == 3) {
                // Pour faire le lien entre le composant Header (timer) et ici
                if (event35 == "open") {
                    setTempsEcoule(true);
                    await updateEvent(token, 3, 35, "done");
                    // actionToggleDataEvent();
                }
            }
        };
        fetchEvent();
    }, [box2video5, box3help5, currentBox, event25, event35, token]);

    // --- CONDITIONS SPE OBJECTIF 14 --- //

    const [victime1, setVictime1] = useState("");
    const [victime2, setVictime2] = useState("");
    const [victime3, setVictime3] = useState("");
    const [victime4, setVictime4] = useState("");
    const [victime5, setVictime5] = useState("");
    const [victime6, setVictime6] = useState("");

    const getVictimesValue = () => {
        let allVictimes = [victime1, victime2, victime3, victime4, victime5, victime6];
        setValue(allVictimes);
    };

    const handleSubmit14 = () => {
        getVictimesValue();
        if (JSON.stringify(data.answer) == JSON.stringify(value)) {
            setErrorMessage("");
            setValue("");
            setModal(false);
            setModalAnswer(true);
            return;
        } else {
            setErrorMessage(data.errorMessage);
        }
    };

    // --- CONDITIONS SPE OBJECTIF 21 --- //

    const [intVictimes, setIntVictimes] = useState({
        "Aaron King": false,
        "Ainmire Oconradh": false,
        "Annelijn Dikboom": false,
        "Annina Kurschner": false,
        "Augustas Alsys": false,
        "Bogdana Nikol": false,
        "Daisy Vandenbulcke": false,
        "Dimosthenis Rigas": false,
        "Dominik Jele": false,
        "Edvard Kallio": false,
        "Elias Varelas": false,
        "Elimena Furino": false,
        "Eliza Gaewska": false,
        "Ere Jakobson": false,
        "Horasiu Prunea": false,
        "Imelda Tuzzolino": false,
        "Ivar Mortensen": false,
        "Janina Muster": false,
        "Jörn Frenzel": false,
        "Karina Galicka": false,
        "Konstantin Wallner": false,
        "Lina Syren": false,
        "Marian Bilek": false,
        "Marike Vonbraun": false,
        "Petar Cojocaru": false,
        "Riano Della Valle": false,
        "Taneli Tuominen": false,
        "Timo Sladie": false,
    });

    const getIntVictimesValue = () => {
        let allIntVictimesTrue = Object.keys(intVictimes).filter((el) => {
            return intVictimes[el];
        });
        setValue(allIntVictimesTrue);
    };

    const handleSubmit21 = () => {
        getIntVictimesValue();
        if (value.length > 8) {
            setErrorMessage(
                "Il nous faut éliminer encore des victimes si l'on veut avancer dans l'enquête et revenir voir Garraud avec de nouveaux éléments…"
            );
            return;
        }
        if (value.length < 8) {
            setErrorMessage(
                "Vous y êtes allés un peu fort sur ce premier tri ! On devrait en garder plus pour être certain de ne pas en oublier en route"
            );
            return;
        }
        if (JSON.stringify(data.answer) == JSON.stringify(value)) {
            setErrorMessage("");
            setValue("");
            setModal(false);
            setModalAnswer(true);
            return;
        } else {
            setErrorMessage(data.errorMessage);
        }
    };

    const toggleIntVictime = (el) => {
        if (intVictimes[el] == false) {
            setIntVictimes((prevState) => ({...prevState, [el]: true}));
        } else {
            setIntVictimes((prevState) => ({...prevState, [el]: false}));
        }
    };

    // --- CONDITIONS SPE OBJECTIF 23 --- //

    const [finalVictimes, setFinalVictimes] = useState({
        "Aaron King": false,
        "Annina Kurschner": false,
        "Daisy Vandenbulcke": false,
        "Elimena Furino": false,
        "Horasiu Prunea": false,
        "Jörn Frenzel": false,
        "Konstantin Wallner": false,
        "Riano Della Valle": false,
    });

    const getFinalVictimesValue = () => {
        let allFinalVictimesTrue = Object.keys(finalVictimes).filter((el) => {
            return finalVictimes[el];
        });
        setValue(allFinalVictimesTrue);
    };

    const handleSubmit23 = () => {
        getFinalVictimesValue();
        console.log(value);
        console.log(data.answer);
        if (value.length > 5 || value.length < 5) {
            setErrorMessage("Nous avons 5 cartes, il nous faut 5 victimes");
            return;
        }
        if (JSON.stringify(data.answer) == JSON.stringify(value)) {
            setErrorMessage("");
            setValue("");
            setModal(false);
            setModalAnswer(true);
            return;
        } else {
            setErrorMessage(data.errorMessage);
        }
    };

    const toggleFinalVictime = (el) => {
        if (finalVictimes[el] == false) {
            setFinalVictimes((prevState) => ({...prevState, [el]: true}));
        } else {
            setFinalVictimes((prevState) => ({...prevState, [el]: false}));
        }
    };

    // -- CONDITIONS SPE OBJECTIF 33 -- //

    const [victimeSaved, setVictimeSaved] = useState("");

    const handleVictimeChoice = (choice) => {
        setVictimeSaved(choice);
        setModal(false);
        setModalAnswer(true);
    };

    const handleFinalStep = async () => {
        setModalAnswer(false);
        setModalBis(!modalBis);
        setNextStep(true);
        await updateHelp(token, 3, "box3help4", "done");
        await updateHelp(token, 3, "box3help5", "open");
        await updateEvent(token, 3, 33, "open");
        actionToggleDataHelp();
        actionToggleDataEvent();
    };

    const handleSubmitCity = async (e) => {
        e.preventDefault();
        setErrorMessage("");
        if (slugify(value) == "milan" && victimeSaved == "maria") {
            setErrorMessage(
                "Bon, j'ai fait quelques recherches rapidement sur cette Maria Gruber... malheureusement c'est un prénom très répandu, surtout en Autriche, difficile de cibler correctement l'endroit qu'on cherche... mais ça vous aidera peut-être"
            );
        }
        if (slugify(value) == "milan" && victimeSaved == "giuseppe") {
            setMauvaiseFin1(true);
        }
        if (slugify(value) == "graz" && victimeSaved == "maria") {
            setResolution(true);
        }
        if (slugify(value) == "graz" && victimeSaved == "giuseppe") {
            setMauvaiseFin2(true);
        } else {
            setErrorMessage("Je ne trouve aucune personne à se nom dans cette ville. On doit s'être trompé quelque part");
        }
    };

    // -- GENERIQUE -- //

    const handleModal = () => {
        setModal(!modal);
        setErrorMessage("");
        setValue("");
    };

    const handleModalBis = () => {
        setModalBis(!modalBis);
        setErrorMessage("");
        setValue("");
    };

    const slugify = (input) => {
        let inputSlugified = input
            .replace(/\s/g, "")
            .toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .replace(/[^a-z0-9]/g, "");
        return inputSlugified;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (data.id == 31) {
            if (slugify(value) == "aussichtspavillion" || slugify(value) == "wutoschingen") {
                setErrorMessage("Je pense qu'on approche, mais elle parle d'un lieu préhistorique, non ?");
                setValue("");
                return;
            }
        }
        if (data.id == 32) {
            if (slugify(value) == "arbailles" || slugify(value) == "arbaille") {
                setErrorMessage(
                    "La forêt des Arbailles... C'est grand. Il me faudrait plus d'informations, quelque chose qui m'aiderait à situer un point dans la forêt. Peut-être que Lauren savait ?"
                );
                setValue("");
                return;
            }
        }
        if (data.id == 34) {
            if (data.answer.includes(slugify(value))) {
                if (box3audio3 == true) {
                    setErrorMessage("Si on allait plutôt chez elle pour voir de quoi il en retourne ?");
                    setValue("");
                    return;
                }
                if (box3lieu2 == true) {
                    setErrorMessage("Cet arbre généalogique ne joue pas en sa faveur, mais ça ne veut pas tout dire.");
                    setValue("");
                    return;
                }
                if (box3help4 != "done") {
                    setErrorMessage("");
                    setValue("");
                    setModal(false);
                    setModalAnswer(true);
                    return;
                } else {
                    setErrorMessage("C'est un peu léger d'inculper quelqu'un avec le peu d'infos qu'on a");
                    setValue("");
                    return;
                }
            } else {
                setErrorMessage(data.errorMessage);
                setValue("");
            }
        }
        if (data.answer.includes(slugify(value))) {
            if (data.id == 11) {
                await updateHistory(token, 1, "box1document3");
                actionToggleDataHistory();
                console.log("document 3 dans l'historique !");
            }
            if (data.id == 13 && box1lieu2 == false) {
                setErrorMessage("Je pense que nous avons trop peu d'éléments pour tirer une conclusion pour cette piste");
                setValue("");
                return;
            }
            setErrorMessage("");
            setValue("");
            setModal(false);
            setModalAnswer(true);
            return;
        } else {
            setErrorMessage(data.errorMessage);
            setValue("");
        }
    };

    const handleModalAnswer = async () => {
        if (data.newdetail) {
            setModalAnswer(false);
            setModalBis(true);
            setNextStep(true);
        } else {
            setModalAnswer(false);
            if (data.id == 12) {
                await updateObjectives(token, 1, 12, "done");
                await updateHelp(token, 1, "box1help2", "done");
                if (objectif11 == "done" && objectif13 == "done") {
                    await updateObjectives(token, 1, 14, "open");
                    await updateHelp(token, 1, "box1help4", "open");
                }
                setModaleHacking(true);
                actionToggleDataObjectif();
                actionToggleDataHelp();
                console.log("objectif12 terminé");
            }
            if (data.id == 13) {
                await updateObjectives(token, 1, 13, "done");
                await updateHelp(token, 1, "box1help3", "done");
                if (objectif11 == "done" && objectif12 == "done") {
                    await updateObjectives(token, 1, 14, "open");
                    await updateHelp(token, 1, "box1help4", "open");
                }
                actionToggleDataObjectif();
                actionToggleDataHelp();
                console.log("objectif13 terminé");
            }
            if (data.id == 14) {
                await updateObjectives(token, 1, 14, "done");
                await updateHelp(token, 1, "box1help4", "done");
                actionToggleDataObjectif();
                actionToggleDataHelp();
                console.log("objectif14 terminé");
            }
            if (data.id == 21) {
                await updateObjectives(token, 2, 21, "done");
                await updateHelp(token, 2, "box2help1", "done");
                setAudioSamuel(true);
                actionToggleDataObjectif();
                actionToggleDataHelp();
                console.log("objectif21 terminé");
            }
            if (data.id == 23) {
                await updateObjectives(token, 2, 23, "done");
                await updateHelp(token, 2, "box2help3", "done");
                await updateObjectives(token, 2, 24, "open");
                await updateHelp(token, 2, "box2help4", "open");
                setMailLauren2(true);
                actionToggleDataObjectif();
                actionToggleDataHelp();
                console.log("objectif23 terminé");
            }
            if (data.id == 24) {
                await updateObjectives(token, 2, 24, "done");
                await updateHelp(token, 2, "box2help4", "done");
                await updateHelp(token, 2, "box2help5", "open");
                actionToggleDataHelp();
                console.log("objectif24 terminé");
            }
            if (data.id == 31) {
                await updateObjectives(token, 3, 31, "done");
                await updateHelp(token, 3, "box3help1", "done");
                actionToggleDataObjectif();
                actionToggleDataHelp();
                console.log("objectif31 terminé");
            }
            if (data.id == 32) {
                await updateObjectives(token, 3, 32, "done");
                await updateHelp(token, 3, "box3help2", "done");
                actionToggleDataObjectif();
                actionToggleDataHelp();
                console.log("objectif32 terminé");
            }
            if (data.id == 34) {
                await updateObjectives(token, 3, 34, "done");
                await updateHelp(token, 3, "box3help6", "done");
                actionToggleDataObjectif();
                actionToggleDataHelp();
                console.log("objectif34 terminé");
            }
            if (data.id == 33) {
                await updateHelp(token, 3, "box3help4", "done");
                actionToggleDataHelp();
                console.log("objectif33 etape 1 terminé");
            }
        }
    };

    const handleSubmitBis = (e) => {
        e.preventDefault();
        if (data.newanswer.includes(slugify(value))) {
            setErrorMessage("");
            setValue("");
            setModalBis(false);
            setModalAnswerBis(true);
            return;
        } else {
            setErrorMessage(data.newerrorMessage);
            setValue("");
        }
    };

    const handleModalAnswerBis = async () => {
        setModalAnswerBis(false);
        setNextStep(false);
        if (data.id == 11) {
            await updateObjectives(token, 1, 11, "done");
            await updateHelp(token, 1, "box1help1", "done");
            if (objectif12 == "done" && objectif13 == "done") {
                await updateObjectives(token, 1, 14, "open");
                await updateHelp(token, 1, "box1help4", "open");
            }
            actionToggleDataObjectif();
            actionToggleDataHelp();
            console.log("objectif11 terminé");
        }
        if (data.id == 22) {
            await updateObjectives(token, 2, 22, "done");
            await updateHelp(token, 2, "box2help2", "done");
            await updateObjectives(token, 2, 23, "open");
            await updateHelp(token, 2, "box2help3", "open");
            actionToggleDataObjectif();
            actionToggleDataHelp();
            console.log("objectif22 terminé");
        }
    };

    const renderModal = () => {
        if (data.id == 14) {
            return (
                <div className="modal-objectif__background">
                    <div className="modal-objectif__box">
                        <button className="modal-objectif__icon--container">
                            <img className="modal-objectif__icon" src={Cross} onClick={handleModal}/>
                        </button>
                        <h2 className="modal-objectif__title">
                            Objectif : <br></br> {data.title}
                        </h2>
                        <div className="modal-objectif__errorMessage">{errorMessage}</div>
                        <div>{renderText(data.detail)}</div>
                        <div>
                            {data.victimes.map((el, i) => {
                                return (
                                    <div key={i}>
                                        <img className="modal-objectif__victimes" src={urlApi.apiRemi() + el.img}/>
                                        <p className="modal-objectif__victimes">{el.name}</p>
                                    </div>
                                );
                            })}
                        </div>
                        <div>
                            <select name="victime1" onChange={(e) => setVictime1(e.target.value)}>
                                {data.choices.map((el, i) => {
                                    return (
                                        <option value={el} key={i}>
                                            {el}
                                        </option>
                                    );
                                })}
                            </select>
                            <select name="victime2" onChange={(e) => setVictime2(e.target.value)}>
                                {data.choices.map((el, i) => {
                                    return (
                                        <option value={el} key={i}>
                                            {el}
                                        </option>
                                    );
                                })}
                            </select>
                            <select name="victime3" onChange={(e) => setVictime3(e.target.value)}>
                                {data.choices.map((el, i) => {
                                    return (
                                        <option value={el} key={i}>
                                            {el}
                                        </option>
                                    );
                                })}
                            </select>
                            <select name="victime4" onChange={(e) => setVictime4(e.target.value)}>
                                {data.choices.map((el, i) => {
                                    return (
                                        <option value={el} key={i}>
                                            {el}
                                        </option>
                                    );
                                })}
                            </select>
                            <select name="victime5" onChange={(e) => setVictime5(e.target.value)}>
                                {data.choices.map((el, i) => {
                                    return (
                                        <option value={el} key={i}>
                                            {el}
                                        </option>
                                    );
                                })}
                            </select>
                            <select name="victime6" onChange={(e) => setVictime6(e.target.value)}>
                                {data.choices.map((el, i) => {
                                    return (
                                        <option value={el} key={i}>
                                            {el}
                                        </option>
                                    );
                                })}
                            </select>
                        </div>
                        <button className="modal-objectif__button button--red" onClick={handleSubmit14}>
                            Valider
                        </button>
                    </div>
                </div>
            );
        }
        if (data.id == 21) {
            return (
                <div className="modal-objectif__background">
                    <div className="modal-objectif__box">
                        <button className="modal-objectif__icon--container">
                            <img className="modal-objectif__icon" src={Cross} onClick={handleModal}/>
                        </button>
                        <h2 className="modal-objectif__title">
                            Objectif : <br></br> {data.title}
                        </h2>
                        <div className="modal-objectif__errorMessage">{errorMessage}</div>
                        <div>{renderText(data.detail)}</div>
                        <div>
                            {data.victimes.map((el, i) => {
                                return (
                                    <div key={i}>
                                        <img
                                            className="modal-objectif__victimes"
                                            src={urlApi.apiRemi() + el.img}
                                            onClick={() => toggleIntVictime(el.name)}
                                        />
                                        <p className="modal-objectif__victimes">{el.name}</p>
                                    </div>
                                );
                            })}
                        </div>
                        <button className="modal-objectif__button button--red" onClick={handleSubmit21}>
                            Valider
                        </button>
                    </div>
                </div>
            );
        }
        if (data.id == 23) {
            return (
                <div className="modal-objectif__background">
                    <div className="modal-objectif__box">
                        <button className="modal-objectif__icon--container">
                            <img className="modal-objectif__icon" src={Cross} onClick={handleModal}/>
                        </button>
                        <h2 className="modal-objectif__title">
                            Objectif : <br></br> {data.title}
                        </h2>
                        <div className="modal-objectif__errorMessage">{errorMessage}</div>
                        <div>{renderText(data.detail)}</div>
                        <div>
                            {data.victimes.map((el, i) => {
                                return (
                                    <div key={i}>
                                        <img
                                            className="modal-objectif__victimes"
                                            src={urlApi.apiRemi() + el.img}
                                            onClick={() => toggleFinalVictime(el.name)}
                                        />
                                        <p className="modal-objectif__victimes">{el.name}</p>
                                    </div>
                                );
                            })}
                        </div>
                        <button className="modal-objectif__button button--red" onClick={handleSubmit23}>
                            Valider
                        </button>
                    </div>
                </div>
            );
        }
        if (data.id == 24 && box2lieu1 == false) {
            return (
                <div className="modal-objectif__background">
                    <div className="modal-objectif__box">
                        <button className="modal-objectif__icon--container">
                            <img className="modal-objectif__icon" src={Cross} onClick={handleModal}/>
                        </button>
                        <h2 className="modal-objectif__title">
                            Objectif : <br></br> {data.title}
                        </h2>
                        <div>{renderText(data.predetail)}</div>
                        <button className="modal-objectif__button button--red" onClick={handleModal}>
                            Valider
                        </button>
                    </div>
                </div>
            );
        }
        if (data.id == 33 && objectif34 != "done") {
            return (
                <div className="modal-objectif__background">
                    <div className="modal-objectif__box">
                        <button className="modal-objectif__icon--container">
                            <img className="modal-objectif__icon" src={Cross} onClick={handleModal}/>
                        </button>
                        <h2 className="modal-objectif__title">
                            Objectif : <br></br> {data.title}
                        </h2>
                        <p className="modal-objectif__subtitle">
                            Il nous manque des informations sur l&apos;identité du tueur pour aller plus loin
                        </p>
                        <button className="modal-objectif__button button--red" onClick={handleModal}>
                            Continuer l&apos;enquête
                        </button>
                    </div>
                </div>
            );
        }
        if (data.id == 33 && objectif34 == "done") {
            if (box3lieu3 == false) {
                setVideoSauverLauren(true);
                return;
            }
            if (box3lieu3 == true) {
                return (
                    <div className="modal-objectif__background">
                        <div className="modal-objectif__box">
                            <button className="modal-objectif__icon--container">
                                <img className="modal-objectif__icon" src={Cross} onClick={handleModal}/>
                            </button>
                            <h2 className="modal-objectif__title">
                                Objectif : <br></br> {data.title}
                            </h2>
                            <p className="modal-objectif__subtitle">
                                On a le nom des deux dernières cibles, mais il n&apos;en reste plus qu&apos;une en vie,
                                il faut qu&apos;on la
                                trouve pour pouvoir la sauver.
                            </p>
                            <p className="modal-objectif__subtitle">Qui est la dernière cible encore vivante ?</p>
                            <button className="modal-objectif__button button--red"
                                    onClick={() => handleVictimeChoice("maria")}>
                                Maria Gruber
                            </button>
                            <button className="modal-objectif__button button--red"
                                    onClick={() => handleVictimeChoice("giuseppe")}>
                                Giuseppe Rossi
                            </button>
                        </div>
                    </div>
                );
            }
        }
        return (
            <div className="modal-objectif__background">
                <div className="modal-objectif__box">
                    <button className="modal-objectif__icon--container">
                        <img className="modal-objectif__icon" src={Cross} onClick={handleModal}/>
                    </button>
                    <h2 className="modal-objectif__title">
                        Objectif : <br></br> {data.title}
                    </h2>
                    <div className="modal-objectif__errorMessage">{errorMessage}</div>
                    <div>{renderText(data.detail)}</div>
                    <form className="modal-objectif__form" onSubmit={handleSubmit}>
                        <Input
                            type="texte"
                            label={data.label}
                            name="objectif"
                            placeholder="Ce champ est vide"
                            value={value}
                            setValue={setValue}
                        />
                        <button className="modal-objectif__button button--red">Valider</button>
                    </form>
                </div>
            </div>
        );
    };

    const renderModalBis = () => {
        if (data.id == 33) {
            return (
                <div className="modal-objectif__background">
                    <div className="modal-objectif__box">
                        <button className="modal-objectif__icon--container">
                            <img className="modal-objectif__icon" src={Cross} onClick={handleModalBis}/>
                        </button>
                        <h2 className="modal-objectif__title">
                            Objectif : <br></br> {data.title}
                        </h2>
                        <div className="modal-objectif__errorMessage">{errorMessage}</div>
                        <p className="modal-objectif__subtitle">Les choses s&apos;accélèrent, elle nous a mis un
                            ultimatum !</p>
                        <p className="modal-objectif__subtitle">
                            Il faut qu&apos;on sache où est cette personne pour intervenir à temps, on ne peut pas se
                            permettre de se tromper
                        </p>
                        <form className="modal-objectif__form" onSubmit={handleSubmitCity}>
                            <Input
                                type="texte"
                                label={data.newlabel}
                                name="objectifbis"
                                placeholder="Ce champ est vide"
                                value={value}
                                setValue={setValue}
                            />
                            <button className="modal-objectif__button button--red">Valider</button>
                        </form>
                    </div>
                </div>
            );
        }
        return (
            <div className="modal-objectif__background">
                <div className="modal-objectif__box">
                    <button className="modal-objectif__icon--container">
                        <img className="modal-objectif__icon" src={Cross} onClick={handleModalBis}/>
                    </button>
                    <h2 className="modal-objectif__title">
                        Objectif : <br></br> {data.title}
                    </h2>
                    <div className="modal-objectif__errorMessage">{errorMessage}</div>
                    <div>{renderText(data.newdetail)}</div>
                    <form className="modal-objectif__form" onSubmit={handleSubmitBis}>
                        <Input
                            type="texte"
                            label={data.newlabel}
                            name="objectifbis"
                            placeholder="Ce champ est vide"
                            value={value}
                            setValue={setValue}
                        />
                        <button className="modal-objectif__button button--red">Valider</button>
                    </form>
                </div>
            </div>
        );
    };

    const renderModalAnswer = () => {
        if (data.id == 33) {
            return (
                <div className="modal-objectif__background">
                    <div className="modal-objectif__box">
                        <h2 className="modal-objectif__title">
                            Objectif : <br></br> {data.title}
                        </h2>
                        {victimeSaved == "Maria" ? (
                            <audio autoPlay>
                                <source src={urlApi.apiRemi() + "sounds/304-dernier-objectif-rempli-maria.wav"}
                                        type="audio/wav"/>
                                Votre navigateur ne prend pas en charge ce format
                            </audio>
                        ) : (
                            <audio autoPlay>
                                <source src={urlApi.apiRemi() + "sounds/304-dernier-objectif-rempli-giuseppe.wav"}
                                        type="audio/wav"/>
                                Votre navigateur ne prend pas en charge ce format
                            </audio>
                        )}
                        <p className="modal-objectif__subtitle">“Le jeu n&apos;est pas fini, Raph…”</p>
                        <button className="modal-objectif__button button--red" onClick={handleFinalStep}>
                            Continuer l&apos;enquête
                        </button>
                    </div>
                </div>
            );
        }
        return (
            <div className="modal-objectif__background">
                <div className="modal-objectif__box">
                    <h2 className="modal-objectif__title">
                        Objectif : <br></br> {data.title}
                    </h2>
                    {data.answersrc ? (
                        <audio autoPlay>
                            <source src={urlApi.apiRemi() + data.answersrc} type="audio/wav"/>
                            Votre navigateur ne prend pas en charge ce format
                        </audio>
                    ) : (
                        ""
                    )}
                    <div>{renderText(data.answertext)}</div>
                    <button className="modal-objectif__button button--red" onClick={handleModalAnswer}>
                        Continuer l&apos;enquête
                    </button>
                </div>
            </div>
        );
    };

    const renderModalAnswerBis = () => {
        return (
            <div className="modal-objectif__background">
                <div className="modal-objectif__box">
                    <h2 className="modal-objectif__title">
                        Objectif : <br></br> {data.title}
                    </h2>
                    {data.newanswersrc ? (
                        <audio autoPlay>
                            <source src={urlApi.apiRemi() + data.newanswersrc} type="audio/wav"/>
                            Votre navigateur ne prend pas en charge ce format
                        </audio>
                    ) : (
                        ""
                    )}
                    <div>{renderText(data.newanswertext)}</div>
                    <button className="modal-objectif__button button--red" onClick={handleModalAnswerBis}>
                        Continuer l&apos;enquête
                    </button>
                </div>
            </div>
        );
    };

    const renderText = (data) => {
        const text = data.map((el, i) => {
            return (
                <p className="modal-objectif__subtitle" key={i}>
                    {el}
                </p>
            );
        });
        return text;
    };

    // -- RENDER DES BOUTONS OBJECTIFS -- //

    const renderObjectif = () => {
        if (data.status == "done") {
            return (
                <>
                    <button className="objectif objectif--done">
                        <div className="objectif__mainInfo">
                            <div className="objectif__icon-wrapper">
                                <img src={Check} className="objectif__icon"/>
                            </div>
                            <h3 className="objectif__title">{data.title}</h3>
                        </div>
                        <div className="objectif__subInfo">
                            <p className="objectif__subtitle">{data.subtitle}</p>
                        </div>
                    </button>
                </>
            );
        }
        if (data.status == "open") {
            return (
                <>
                    <button className="objectif objectif--open" onClick={nextStep ? handleModalBis : handleModal}>
                        <div className="objectif__mainInfo">
                            <div className="objectif__icon-wrapper">
                                <img src={LockOpen} className="objectif__icon"/>
                            </div>
                            <h3 className="objectif__title">{data.title}</h3>
                        </div>
                        <div className="objectif__subInfo">
                            <p className="objectif__subtitle">{data.subtitle}</p>
                        </div>
                    </button>
                </>
            );
        }
        if (data.status == "closed") {
            return (
                <>
                    <button className="objectif objectif--closed">
                        <div className="objectif__icon-wrapper--closed">
                            <img src={LockClosed} className="objectif__icon"/>
                        </div>
                        <h3 className="objectif__title--closed">Cet objectif est bloqué pour le moment</h3>
                    </button>
                </>
            );
        }
    };

    // --- LOGIQUE EVENT BOX 1 --- //

    const [modaleHacking, setModaleHacking] = useState(false);
    const [modaleMailHacking, setModaleMailHacking] = useState(false);
    const [modaleMalle, setModaleMalle] = useState(false);
    const [modaleRebecca, setModaleRebecca] = useState(false);
    const [modaleVHS, setModaleVHS] = useState(false);
    const [modaleInterrogatoireGarraud, setModaleInterrogatoireGarraud] = useState(false);
    const [videoInterrogatoireGarraud, setVideoInterrogatoireGarraud] = useState(false);
    const [endGameModale, setEndGameModale] = useState(false);

    const displayHacking = () => {
        return (
            <div className="modal-objectif__background">
                <div className="modal-objectif__box">
                    <audio autoPlay>
                        <source src={urlApi.apiRemi() + "sounds/103-hacking-tueur.wav"} type="audio/wav"/>
                        Votre navigateur ne prend pas en charge ce format
                    </audio>
                    <div>Vous avez un mail</div>
                    <button className="modal-objectif__button button--red" onClick={handleOpenMailHacking}>
                        Valider
                    </button>
                </div>
            </div>
        );
    };

    const handleOpenMailHacking = () => {
        setModaleHacking(false);
        setModaleMailHacking(true);
    };

    const handleCloseMailHacking = async () => {
        await updateHistory(token, 1, "box1document5");
        actionToggleDataHistory();
        setModaleMailHacking(false);
    };

    const displayMailHacking = () => {
        return (
            <>
                <audio autoPlay>
                    <source src={urlApi.apiRemi() + "sounds/musiques-db-s2-theme-tueur.wav"} type="audio/wav"/>
                    Votre navigateur ne prend pas en charge ce format
                </audio>
                <Document
                    title="Email du tueur"
                    srcElement={urlApi.apiRemi() + "assets/document/125_Email_Tueur_Oublie.png"}
                    handleModalDocument={handleCloseMailHacking}
                />
            </>
        );
    };

    const displayEndGameModale = () => {
        return (
            <div className="modal-objectif__background">
                <div className="modal-objectif__box">
                    {renderEndText}
                    <button className="modal-objectif__button button--red" onClick={handleEndGameModale}>
                        Retour au menu
                    </button>
                </div>
            </div>
        );
    };

    const renderEndText = () => {
        if (currentBox == 1) {
            return (
                <div>
                    <p>Vous avez finit la première partie</p>
                    <p>Rendez-vous en box 2 pour la suite de l&apos;enquête</p>
                </div>
            );
        }
        if (currentBox == 2) {
            return (
                <div>
                    <p>Vous avez finit la seconde partie</p>
                    <p>Rendez-vous en box 3 pour la suite de l&apos;enquête</p>
                </div>
            );
        }
        if (currentBox == 3) {
            return (
                <div>
                    <p>Vous avez finit l&apos;enquête, bravo Agent !</p>
                    <p>Au plaisir de vous retrouver sur de prochaines enquêtes.</p>
                </div>
            );
        }
    };

    const displayContentMalle = () => {
        return (
            <div className="modal-objectif__background">
                <div className="modal-objectif__box">
                    <p>
                        Je vous transmets l&apos;enregistrement qu&apos;on a trouvé dans la malle pour que vous puissiez
                        l&apos;écouter.
                    </p>
                    <p> Tim nous confirme que c&apos;est bien la voix de Rebecca.</p>
                    <p>
                        Attention, j&apos;ai écouté l&apos;enregistrement et il est assez dur. Pour les âmes sensibles,
                        cliquez sur la
                        transcription.
                    </p>
                    <p> On a aussi un médaillon, difficile de dire à quoi il sert. </p>
                    <p>
                        Quant aux inscriptions, je vous laisse me dire ce que ça vous inspire... tous les éléments sont
                        dans
                        l&apos;historique
                    </p>
                    <button className="modal-objectif__button button--red" onClick={handleOpenRebeccaAudio}>
                        Ecouter l&apos;enregistrement
                    </button>
                </div>
            </div>
        );
    };

    const handleOpenRebeccaAudio = () => {
        setModaleMalle(false);
        setModaleRebecca(true);
    };

    const displayAudioRebecca = () => {
        <Audio
            title="Derniers mots de Rebecca"
            srcImg1={urlApi.apiRemi() + "assets/photos-personnages/rebecca_dumont.jpg"}
            srcImg2={null}
            srcTranscription={urlApi.apiRemi() + "assets/transcripts/102_Derniers_mots_Rebecca_transcript.pdf"}
            handleModalAudio={closeAudioRebecca}
            srcAudio={urlApi.apiRemi() + "sounds/102-derniers-mots-rebecca.wav"}
        />;
    };

    const closeAudioRebecca = async () => {
        await updateHistory(token, 1, "box1audio1");
        actionToggleDataHistory();
        setModaleRebecca(false);
    };

    const displayModaleVHS = () => {
        return (
            <div className="modal-objectif__background">
                <div className="modal-objectif__box">
                    <p>Voilà ce qu&apos;on a retrouvé dans le coffre: une lettre et une cassette VHS.</p>
                    <p>La lettre est disponible dans l&apos;onglet Historique</p>
                    <p>
                        Il y a deux passages intéressants dans la video: un vers 15min où on voit Charles Garraud et un
                        autre à la
                        fin...Si vous voulez plus d&apos;informations sur la cassette, n&apos;hésitez pas à consulter
                        Tim en lui demandant
                        une analyse VHS.
                    </p>
                    <p>
                        Il y avait aussi ce plan étrange, il n&apos;a pas l&apos;air bien vieux, il a dû être accroché à
                        la maison il
                        n&apos;y a pas longtemps.
                    </p>
                    <p>Ça ne correspond à aucune des adresses qu&apos;on a trouvées jusqu&apos;ici...</p>
                    <p>Vous pouvez l&apos;étudier depuis l&apos;Historique</p>
                    <button className="modal-objectif__button button--red" onClick={handleCloseModaleVHS}>
                        Continuer l&apos;enquête
                    </button>
                </div>
            </div>
        );
    };

    const handleCloseModaleVHS = () => {
        setModaleVHS(false);
    };

    const displayModaleInterrogatoireGarraud = () => {
        return (
            <div className="modal-objectif__background">
                <div className="modal-objectif__box">
                    <p>
                        Ça fait de sacrées révélations tout ça... Je pense qu&apos;avec ce qu&apos;on a là, on devrait
                        pouvoir interroger
                        Charles Garraud.
                    </p>
                    <button className="modal-objectif__button button--red" onClick={handleOpenInterrogatoire}>
                        Passer à l&apos;interrogatoire
                    </button>
                </div>
            </div>
        );
    };

    const handleOpenInterrogatoire = () => {
        setModaleInterrogatoireGarraud(false);
        setVideoInterrogatoireGarraud(true);
    };

    const displayVideoInterrogatoireGarraud = () => {
        return (
            <Video
                title="Interrogatoire de Charles Garraud"
                srcVideo={urlApi.apiRemi() + "videos/db-s02-104-vdef.mp4"}
                handleModalVideo={handleCloseVideoInterrogatoire}
                delayedButton={true}
            />
        );
    };

    const handleCloseVideoInterrogatoire = async () => {
        setVideoInterrogatoireGarraud(false);
        await updateHistory(token, 1, "box1video4");
        setEndGameModale(true);
    };

    const handleEndGameModale = async () => {
        if (currentBox == 1) {
            await updateBox(token, 1, "done");
            await updateBox(token, 2, "open");
        }
        if (currentBox == 2) {
            await updateBox(token, 2, "done");
            await updateBox(token, 3, "open");
        }
        if (currentBox == 3) {
            await updateBox(token, 3, "done");
        }
        navigate("/box-choice");
    };

    // --- LOGIQUE EVENT BOX 2 --- //

    const [mailLauren1, setMailLauren1] = useState(false);
    const [mailLauren2, setMailLauren2] = useState(false);
    const [audioSamuel, setAudioSamuel] = useState(false);
    const [audioBreakingNews, setAudioBreakingNews] = useState(false);
    const [videoBreakingNews, setVideoBreakingNews] = useState(false);
    const [videoBureauLauren, setVideoBureauLauren] = useState(false);
    const [audioEndBreakingNews, setAudioEndBreakingNews] = useState(false);

    const displayVideoBureauLauren = () => {
        return (
            <Video
                title="Bureau de Lauren Fraser"
                srcVideo={urlApi.apiRemi() + "videos/db-s02-209-vdef.mp4"}
                handleModalVideo={handleCloseVideoBureau}
                delayedButton={true}
            />
        );
    };

    const handleCloseVideoBureau = async () => {
        await updateHistory(token, 2, "box2video5");
        actionToggleDataHistory();
        setEndGameModale(true);
    };

    const displayMailLauren1 = () => {
        return (
            <Document
                title="Email de Lauren Fraser"
                srcElement={urlApi.apiRemi() + "assets/document/219_Message_Lauren_#1.jpg"}
                handleModalDocument={handleCloseMail1}
            />
        );
    };

    const handleCloseMail1 = async () => {
        await updateHistory(token, 2, "box2document8");
        actionToggleDataHistory();
        setMailLauren1(false);
    };

    const displayMailLauren2 = () => {
        return (
            <Document
                title="Email de Lauren Fraser"
                srcElement={urlApi.apiRemi() + "assets/document/219_Message_Lauren_#2.jpg"}
                handleModalDocument={handleCloseMail2}
            />
        );
    };

    const handleCloseMail2 = async () => {
        await updateHistory(token, 2, "box2document9");
        actionToggleDataHistory();
        setMailLauren1(false);
    };

    const displayAudioSamuel = () => {
        return (
            <Audio
                title="Echanges Samuel Perry & Raphaëlle Sanchez"
                srcImg1={urlApi.apiRemi() + "assets/photos-personnages/Samuel Perry.jpg"}
                srcImg2={urlApi.apiRemi() + "assets/photos-personnages/raphaelle.jpg"}
                srcTranscription={urlApi.apiRemi() + "assets/transcripts/207_Echanges_Samuel_Perry-Raphaelle_transcript.pdf"}
                handleModalAudio={closeAudioSamuel}
                srcAudio={urlApi.apiRemi() + "sounds/207-echanges-samuel-perry-raphaelle.wav"}
            />
        );
    };

    const closeAudioSamuel = async () => {
        await updateHistory(token, 2, "box2audio3");
        actionToggleDataHistory();
        setAudioSamuel(false);
        setAudioBreakingNews(true);
    };

    const displayAudioBreakingNews = () => {
        return (
            <div className="modal-objectif__background">
                <div className="modal-objectif__box">
                    <audio autoPlay>
                        <source src={urlApi.apiRemi() + "sounds/203-commentaires-raphaelle-breaking-news-1.wav"}
                                type="audio/wav"/>
                        Votre navigateur ne prend pas en charge ce format
                    </audio>
                    <p>Attendez, allumez la TV ! </p>
                    <button className="modal-objectif__button button--red" onClick={handleCloseAudioBreakingNews}>
                        Passer à l&apos;interrogatoire
                    </button>
                </div>
            </div>
        );
    };

    const handleCloseAudioBreakingNews = () => {
        setAudioBreakingNews(false);
        setVideoBreakingNews(true);
    };

    const displayVideoBreakingNews = () => {
        return (
            <>
                {audioEndBreakingNews ? (
                    <audio autoPlay onEnded={() => setVideoBreakingNews(false)}>
                        <source src={urlApi.apiRemi() + "sounds/203-commentaires-raphaelle-breaking-news-2.wav"}
                                type="audio/wav"/>
                        Votre navigateur ne prend pas en charge ce format
                    </audio>
                ) : null}
                <Video
                    title="Flash Info"
                    srcVideo={urlApi.apiRemi() + "videos/db-s02-203-vdef.mp4"}
                    handleModalVideo={handleCloseVideoBreakingNews}
                    delayedButton={true}
                />
            </>
        );
    };

    const handleCloseVideoBreakingNews = async () => {
        setAudioEndBreakingNews(true);
        await updateHistory(token, 2, "box2video3");
        actionToggleDataHistory();
    };

    // --- LOGIQUE EVENT BOX 3 --- //

    const [videoSauverLauren, setVideoSauverLauren] = useState(false);
    const [debriefLauren, setDebriefLauren] = useState(false);
    const [tempsEcoule, setTempsEcoule] = useState(false);
    const [mauvaiseFin1, setMauvaiseFin1] = useState(false);
    const [mauvaiseFin2, setMauvaiseFin2] = useState(false);
    const [resolution, setResolution] = useState(false);
    const [interrogatoireFinal, setInterrogatoireFinal] = useState(false);

    const displayVideoSauverLauren = () => {
        return (
            <Video
                title="Cave de Céline"
                srcVideo={urlApi.apiRemi() + "videos/db-s02-302-def.mp4"}
                handleModalVideo={handleCloseVideoSauverLauren}
                delayedButton={true}
            />
        );
    };

    const handleCloseVideoSauverLauren = async () => {
        setDebriefLauren(true);
        await updateHistory(token, 3, "box3video2");
        actionToggleDataHistory();
    };

    const displayDebriefLauren = () => {
        return (
            <Audio
                title="Debrief Lauren"
                srcImg1={urlApi.apiRemi() + "assets/photos-personnages/lauren.jpg"}
                srcImg2={null}
                srcTranscription={urlApi.apiRemi() + "assets/photos-personnages/raphaelle.jpg"}
                handleModalAudio={closeDebriefLauren}
                srcAudio={urlApi.apiRemi() + "sounds/303-debrief-lauren.wav"}
            />
        );
    };

    const closeDebriefLauren = async () => {
        await updateHistory(token, 3, "box3audio1");
        await updateHistory(token, 3, "box3lieu1");
        actionToggleDataHistory();
        setDebriefLauren(false);
        window.open("https://fouille.foret.detectivebox.fr/?token=" + token, "_blank");
    };

    const displayModaleTempsEcoule = () => {
        return (
            <div className="modal-objectif__background">
                <div className="modal-objectif__box">
                    <audio autoPlay>
                        <source src={urlApi.apiRemi() + "sounds/306-fin-du-temps.wav"} type="audio/wav"/>
                        Votre navigateur ne prend pas en charge ce format
                    </audio>
                    <p>Le temps est écoulé, nous n&apos;avons pas pu sauver la victime à temps !</p>
                    <p>Souhaitez-vous réessayer ou passer à l&apos;épilogue ?</p>
                    <button className="modal-objectif__button button--red" onClick={handleReset}>
                        Recommencer
                    </button>
                    <button className="modal-objectif__button button--red" onClick={handleGoToResolution}>
                        Résolution de l&apos;enquête
                    </button>
                </div>
            </div>
        );
    };

    const handleReset = async () => {
        setTempsEcoule(false);
        setMauvaiseFin1(false);
        setMauvaiseFin2(false);
        setValue("");
        setVictimeSaved("");
        setNextStep(false);
        await updateEvent(token, 3, 35, "closed");
        await updateHelp(token, 3, "box3help5", "closed");
        await updateHelp(token, 3, "box3help4", "open");
        actionToggleDataEvent();
        actionToggleDataHelp();
    };

    const handleGoToResolution = async () => {
        setTempsEcoule(false);
        setMauvaiseFin1(false);
        setMauvaiseFin2(false);
        setResolution(true);
    };

    const displayModaleResolution = () => {
        return (
            <div className="modal-objectif__background">
                <div className="modal-objectif__box">
                    <audio autoPlay>
                        <source src={urlApi.apiRemi() + "sounds/307-bonne-fin.wav"} type="audio/wav"/>
                        Votre navigateur ne prend pas en charge ce format
                    </audio>
                    <p>Bravo, grâce à vous, nous avons réussi à sauver la dernière cible et à arrêter Céline !</p>
                    <p>Il est temps de tout lui faire avouer.</p>
                    <button className="modal-objectif__button button--red" onClick={handleInterrogatoireFinal}>
                        Voir l&apos;interrogatoire
                    </button>
                </div>
            </div>
        );
    };

    const handleInterrogatoireFinal = () => {
        setResolution(false);
        setInterrogatoireFinal(true);
    };

    const displayInterrogatoireFinal = () => {
        return (
            <Video
                title="Interrogatoire de Céline Valluy"
                srcVideo={urlApi.apiRemi() + "videos/db-s02-309-def.mp4"}
                handleModalVideo={handleEndBox3}
                delayedButton={true}
            />
        );
    };

    const handleEndBox3 = () => {
        setInterrogatoireFinal(false);
        setEndGameModale(true);
    };

    const displayModaleMauvaiseFin1 = () => {
        return (
            <div className="modal-objectif__background">
                <div className="modal-objectif__box">
                    <audio autoPlay>
                        <source src={urlApi.apiRemi() + "sounds/308-mauvaise-fin-1.wav"} type="audio/wav"/>
                        Votre navigateur ne prend pas en charge ce format
                    </audio>
                    <p>
                        Ce n&apos;était pas la bonne cible, nous nous sommes trompés... Céline est malheureusement dans
                        la nature et elle
                        a réussi son grand œuvre.{" "}
                    </p>
                    <p>Souhaitez-vous réessayer ou passer à l&apos;épilogue ?</p>
                    <button className="modal-objectif__button button--red" onClick={handleReset}>
                        Recommencer
                    </button>
                    <button className="modal-objectif__button button--red" onClick={handleGoToResolution}>
                        Résolution de l&apos;enquête
                    </button>
                </div>
            </div>
        );
    };

    const displayModaleMauvaiseFin2 = () => {
        return (
            <div className="modal-objectif__background">
                <div className="modal-objectif__box">
                    <audio autoPlay>
                        <source src={urlApi.apiRemi() + "sounds/309-mauvaise-fin-2.wav"} type="audio/wav"/>
                        Votre navigateur ne prend pas en charge ce format
                    </audio>
                    <p>Le temps est écoulé, nous n&apos;avons pas pu sauver la victime à temps !</p>
                    <p>Souhaitez-vous réessayer ou passer à l&apos;épilogue ?</p>
                    <button className="modal-objectif__button button--red" onClick={handleReset}>
                        Recommencer
                    </button>
                    <button className="modal-objectif__button button--red" onClick={handleGoToResolution}>
                        Résolution de l&apos;enquête
                    </button>
                </div>
            </div>
        );
    };

    return (
        <>
            {renderObjectif()}
            {modal ? renderModal() : ""}
            {modalBis ? renderModalBis() : ""}
            {modalAnswer ? renderModalAnswer() : ""}
            {modalAnswerBis ? renderModalAnswerBis() : ""}
            {modaleHacking ? displayHacking() : null}
            {modaleMailHacking ? displayMailHacking() : null}
            {modaleMalle ? displayContentMalle() : null}
            {modaleRebecca ? displayAudioRebecca() : null}
            {modaleVHS ? displayModaleVHS() : null}
            {modaleInterrogatoireGarraud ? displayModaleInterrogatoireGarraud() : null}
            {videoInterrogatoireGarraud ? displayVideoInterrogatoireGarraud() : null}
            {mailLauren1 ? displayMailLauren1() : null}
            {mailLauren2 ? displayMailLauren2() : null}
            {audioSamuel ? displayAudioSamuel() : null}
            {audioBreakingNews ? displayAudioBreakingNews() : null}
            {videoBreakingNews ? displayVideoBreakingNews() : null}
            {videoBureauLauren ? displayVideoBureauLauren() : null}
            {videoSauverLauren ? displayVideoSauverLauren() : null}
            {debriefLauren ? displayDebriefLauren() : null}
            {tempsEcoule ? displayModaleTempsEcoule() : null}
            {mauvaiseFin1 ? displayModaleMauvaiseFin1() : null}
            {mauvaiseFin2 ? displayModaleMauvaiseFin2() : null}
            {resolution ? displayModaleResolution() : null}
            {interrogatoireFinal ? displayInterrogatoireFinal() : null}
            {endGameModale ? displayEndGameModale() : null}
        </>
    );
};

Objectif.propTypes = {
    data: PropTypes.object,
};

export default Objectif;
