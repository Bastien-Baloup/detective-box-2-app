/* eslint-disable react-hooks/exhaustive-deps */
import PropTypes from "prop-types";
import {useState, createContext, useEffect, useReducer, useContext} from "react";
import useApi from '../hooks/useApi.js';
import eventReducer from '../reducer/eventReducer.js';

// EXPLICATION : Context pour avoir la bonne boîte utilisée

export const BoxContext = createContext("");

export const BoxProvider = ({ children }) => {
	const [currentBox, setCurrentBox] = useState(null);
	const fetchCurrentBox = (value) => {
		setCurrentBox(value);
	};

	return <BoxContext.Provider value={{ fetchCurrentBox, currentBox }}>{children}</BoxContext.Provider>;
};

export const AuthContext = createContext("");

// EXPLICATION : Context pour avoir le token dans le local storage et gérer l'accès aux différentes pages de l'application.

const getInitialState = () => {
	return localStorage.getItem("token");
};

const getInitialLogin = () => {
	return localStorage.getItem("token");
};

export const AuthProvider = ({ children }) => {
	const [loggedIn, setLoggedIn] = useState(getInitialLogin);
	const [token, setToken] = useState(getInitialState);
	const {getMe} = useApi()

	const login = (token) => {
		localStorage.setItem("token", token);
		setToken(token);
		setLoggedIn(true);
	};

	const logout = () => {
		localStorage.clear();
		setLoggedIn(false);
	};

	useEffect(() => {
		(async function(){
			if(!token){
				setLoggedIn(false)
				return
			}
			const res = await getMe(token)
			if(res.status === 401){
				logout()
			}
		})()
	}, [])



	return (
		<AuthContext.Provider value={{ setLoggedIn, loggedIn, setToken, token, login, logout }}>
			{children}
		</AuthContext.Provider>
	);
};

// EXPLICATION : Context pour activer et désactiver la nappe d'ambiance

export const AmbianceContext = createContext("");

export const AmbianceProvider = ({ children }) => {
	const [nappeMute, setNappeMute] = useState(true);
	const [ispreviouslyMuted, setIsPreviouslyMuted] = useState(true);
	// console.log(nappeMute);

	const fetchNappeMute = (value) => {
		setNappeMute(value);
	};

	const fetchPreviousStateNappe = () => {
		if (nappeMute) {
			setIsPreviouslyMuted(true);
		} else {
			setIsPreviouslyMuted(false);
		}
		setNappeMute(true);
	};

	const fetchResumeNappe = () => {
		if (!ispreviouslyMuted) {
			setNappeMute(false);
		}
	};

	return (
		<AmbianceContext.Provider value={{ fetchNappeMute, fetchPreviousStateNappe, fetchResumeNappe, nappeMute }}>
			{children}
		</AmbianceContext.Provider>
	);
};

// EXPLICATION : Context pour activer et désactiver la nappe d'ambiance

export const DataContext = createContext("");

export const DataProvider = ({ children }) => {
	const { getCharactersById, getHistoryByBox, getObjectivesByBox, getEventByBox, getHelpByBox } = useApi()

	const [toggleDataAdele, setToggleDataAdele] = useState(true);
	const [toggleDataCeline, setToggleDataCeline] = useState(true);
	const [toggleDataLauren, setToggleDataLauren] = useState(true);
	const [toggleDataRaphaelle, setToggleDataRaphaelle] = useState(true);
	const [toggleDataTim, setToggleDataTim] = useState(true);
	const [toggleDataEvent, setToggleDataEvent] = useState(true);
	const [toggleDataHelp, setToggleDataHelp] = useState(true);
	const [toggleDataHistory, setToggleDataHistory] = useState(true);
	const [toggleDataObjectif, setToggleDataObjectif] = useState(true);
	const [dataAdele, setDataAdele] = useState([])
	const [dataCeline, setDataCeline] = useState([])
	const [dataLauren, setDataLauren] = useState([])
	const [dataRaphaelle, setDataRaphaelle] = useState([])
	const [dataTim, setDataTim] = useState([])
	const [dataHistory, setDataHistory] = useState([])
	const [dataObjectif, setDataObjectif] = useState([])
	const [dataEvent, setDataEvent] = useState([])
	const [dataHelp, setDataHelp] = useState([])

	const actionToggleDataAdele = () => {
		setToggleDataAdele(!toggleDataAdele);
	};
	const actionToggleDataCeline = () => {
		setToggleDataCeline(!toggleDataCeline);
	};
	const actionToggleDataLauren = () => {
		setToggleDataLauren(!toggleDataLauren);
	};
	const actionToggleDataRaphaelle = () => {
		setToggleDataRaphaelle(!toggleDataRaphaelle);
	};
	const actionToggleDataTim = () => {
		setToggleDataTim(!toggleDataTim);
	};
	const actionToggleDataEvent = () => {
		setToggleDataEvent(!toggleDataEvent);
	};
	const actionToggleDataHelp = () => {
		setToggleDataHelp(!toggleDataHelp);
	};
	const actionToggleDataHistory = () => {
		setToggleDataHistory(!toggleDataHistory);
	};
	const actionToggleDataObjectif = () => {
		setToggleDataObjectif(!toggleDataObjectif);
	};

	const { token } = useContext(AuthContext); // Access the token from the AuthContext

  const fetchInitialData = async () => {
    if (!token) {
      return; // Exit early if no token is available
    }

    // Fetch data for Adele
    const resultAdele = await getCharactersById(token, 1);
    setDataAdele(resultAdele);

    // Fetch data for Celine
    const resultCeline = await getCharactersById(token, 3);
    setDataCeline(resultCeline);

    // Fetch data for Lauren
    const resultLauren = await getCharactersById(token, 2);
    setDataLauren(resultLauren);

    // Fetch data for Raphaelle
    const resultRaphaelle = await getCharactersById(token, 4);
    setDataRaphaelle(resultRaphaelle);

    // Fetch data for Tim
    const resultTim = await getCharactersById(token, 5);
    setDataTim(resultTim);

    // Fetch data for History
    const resultHistory = [
      await getHistoryByBox(token, 1),
      await getHistoryByBox(token, 2),
      await getHistoryByBox(token, 3),
    ];
    setDataHistory(resultHistory);

    // Fetch data for Objectif
    const resultObjectif = [
      await getObjectivesByBox(token, 1),
      await getObjectivesByBox(token, 2),
      await getObjectivesByBox(token, 3),
    ];
    setDataObjectif(resultObjectif);

    // Fetch data for Event
    const resultEvent = [
      await getEventByBox(token, 1),
      await getEventByBox(token, 2),
      await getEventByBox(token, 3),
    ];
    setDataEvent(resultEvent);

    // Fetch data for Help
    const resultHelp = [
      await getHelpByBox(token, 1),
      await getHelpByBox(token, 2),
      await getHelpByBox(token, 3),
    ];
    setDataHelp(resultHelp);
  };

  useEffect(() => {
    fetchInitialData(); // Call fetchInitialData when the token changes
  }, [token]);
	
	//EXPLICATION : Adele est le personnage "1"
	useEffect(() =>{
		const fetchDataAdele = async () => {
      const result = await getCharactersById(token, 1)
      setDataAdele(result)
    }
    fetchDataAdele()
	},[toggleDataAdele])

  //EXPLICATION : Celine est le personnage "3"
	useEffect(() => {
		const fetchDataCeline = async () => {
      const result = await getCharactersById(token, 3)
      setDataCeline(result)
    }
    fetchDataCeline()
	},[toggleDataCeline])

	useEffect(() => {
		const fetchDataLauren = async () => {
      const result = await getCharactersById(token, 2)
      setDataLauren(result)
    }
    fetchDataLauren()
	},[toggleDataLauren])

  //EXPLICATION : Raphaelle est le personnage '4'
	useEffect(() => {
		const fetchDataRaphaelle = async () => {
      const result = await getCharactersById(token, 4)
			setDataRaphaelle(result)
    }
    fetchDataRaphaelle()
	},[toggleDataRaphaelle])

  //EXPLICATION : Tim est le personnage "5"
	useEffect(() => {
		const fetchDataTim = async () => {
      const result = await getCharactersById(token, 5)
      setDataTim(result)
    }
    fetchDataTim()
	},[toggleDataTim])

	useEffect(() => {
		const fetchDataHistory = async () => {
			const result = []
			result[1] = await getHistoryByBox(token, 1)
			result[2] = await getHistoryByBox(token, 2)
			result[3] = await getHistoryByBox(token, 3)
			setDataHistory(result)
		}
		fetchDataHistory()
	}, [toggleDataHistory])

	useEffect(() => {
		const fetchDataObjectif = async () => {
			const result = []
			result[1] = await getObjectivesByBox(token, 1)
			result[2] = await getObjectivesByBox(token, 2)
			result[3] = await getObjectivesByBox(token, 3)
			setDataObjectif(result)
		}
		fetchDataObjectif()
	}, [toggleDataObjectif])

	useEffect(() => {
		const fetchDataEvent = async () => {
			const result = []
			result[1] = await getEventByBox(token, 1)
			result[2] = await getEventByBox(token, 2)
			result[3] = await getEventByBox(token, 3)
			setDataEvent(result)
		}
		fetchDataEvent()
	}, [toggleDataEvent])

	useEffect(() => {
		const fetchDataHelp = async () => {
			const result = []
			result[1] = await getHelpByBox(token, 1)
			result[2] = await getHelpByBox(token, 2)
			result[3] = await getHelpByBox(token, 3)
			setDataHelp(result)
		}
		fetchDataHelp()
	}, [toggleDataHelp])

	return (
		<DataContext.Provider
			value={{
				actionToggleDataAdele,
				dataAdele,
				actionToggleDataCeline,
				dataCeline,
				actionToggleDataLauren,
				dataLauren,
				actionToggleDataRaphaelle,
				dataRaphaelle,
				actionToggleDataTim,
				dataTim,
				actionToggleDataEvent,
				toggleDataEvent,
				dataEvent,
				actionToggleDataHelp,
				dataHelp,
				actionToggleDataHistory,
				dataHistory,
				actionToggleDataObjectif,
				dataObjectif
			}}
		>
			{children}
		</DataContext.Provider>
	);
};

export const EventContext = createContext()

const initialState = {
	id: '',
	toogleEvent: false
}

export const EventProvider = ({ children }) => {
  const [state, dispatch] = useReducer(eventReducer, initialState);

  return (
    <EventContext.Provider value={{ state, dispatch }}>
      {children}
    </EventContext.Provider>
  );
};

export const CompteContext = createContext()

export const CompteProvider = ({ children }) => {
	const [active, setActive] = useState(false);
	const closeCompte = () => {
    setActive(false)
  }

	return(
		<CompteContext.Provider value={{ active, setActive, closeCompte }}>
			{children}
		</CompteContext.Provider>
	)
}

BoxProvider.propTypes = {
	children: PropTypes.any,
};
AuthProvider.propTypes = {
	children: PropTypes.any,
};
AmbianceProvider.propTypes = {
	children: PropTypes.any,
};
DataProvider.propTypes = {
	children: PropTypes.any,
};
EventProvider.propTypes = {
	children: PropTypes.any,
};
CompteProvider.propTypes = {
	children: PropTypes.any,
};
