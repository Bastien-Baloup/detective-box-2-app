import { urlApi } from "../const/urlApi";

/**
 * Service to fetch Token with API
 * @param {object} credentials email and password used to connect
 * @returns {Promise} data containing user's token
 */

export const getToken = (credentials) => {
	return fetch("", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(credentials),
	})
		.then((response) => {
			return response.json();
		})
		.then((data) => {
			console.log(data);
			return data;
		})
		.catch((error) => {
			console.error(error);
		});
};

/**
 * Service to update User Profile to MongoDB with API
 * @param {string} token auth otken used to put new user's infos
 * @param {object} credentials new firstName and lastName to upadate user profile
 * @returns {Promise} data containing new user's infos
 */

export const putUser = (token, credentials) => {
	return fetch("", {
		method: "PUT",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${token}`,
		},
		body: JSON.stringify(credentials),
	})
		.then((response) => response.json())
		.then((data) => {
			console.log(data);
			return data;
		})
		.catch((error) => {
			console.error(error);
		});
};

export const getBox = () => {
	return fetch(urlApi.apiRemi() + "/box/", {
		method: "GET",
	})
		.then((response) => response.json())
		.then((data) => {
			console.log(data);
			return data;
		})
		.catch(() => {
			localStorage.clear();
		});
};

export const updateBox = (boxid) => {
	return fetch(urlApi.apiRemi() + `/box/${boxid}`, {
		method: "PUT",
	})
		.then((response) => response.json())
		.then((data) => {
			console.log(data);
			return data;
		})
		.catch(() => {
			localStorage.clear();
		});
};

export const resetBox = () => {
	return fetch(urlApi.apiRemi() + "/box/reset", {
		method: "PUT",
	})
		.then((response) => response.json())
		.then((data) => {
			console.log(data);
			return data;
		})
		.catch(() => {
			localStorage.clear();
		});
};

export const getQuizz = () => {
	return fetch(urlApi.apiRemi() + "/quizz/", {
		method: "GET",
	})
		.then((response) => response.json())
		.then((data) => {
			console.log(data);
			return data;
		})
		.catch(() => {
			localStorage.clear();
		});
};

export const updateQuizz = (boxid) => {
	return fetch(urlApi.apiRemi() + `/quizz/${boxid}`, {
		method: "PUT",
	})
		.then((response) => response.json())
		.then((data) => {
			console.log(data);
			return data;
		})
		.catch(() => {
			localStorage.clear();
		});
};

export const resetQuizz = () => {
	return fetch(urlApi.apiRemi() + "/quizz/reset", {
		method: "PUT",
	})
		.then((response) => response.json())
		.then((data) => {
			console.log(data);
			return data;
		})
		.catch(() => {
			localStorage.clear();
		});
};

export const getHelp = () => {
	return fetch(urlApi.apiRemi() + "/help", {
		method: "GET",
	})
		.then((response) => response.json())
		.then((data) => {
			console.log(data);
			return data;
		})
		.catch(() => {
			localStorage.clear();
		});
};

export const updateHelp = (id) => {
	return fetch(urlApi.apiRemi() + `/help/${id}`, {
		method: "PUT",
	})
		.then((response) => response.json())
		.then((data) => {
			console.log(data);
			return data;
		})
		.catch(() => {
			localStorage.clear();
		});
};

export const resetHelp = () => {
	return fetch(urlApi.apiRemi() + "/help/reset", {
		method: "PUT",
	})
		.then((response) => response.json())
		.then((data) => {
			console.log(data);
			return data;
		})
		.catch(() => {
			localStorage.clear();
		});
};

export const getObjectives = () => {
	return fetch(urlApi.apiRemi() + "/objectives", {
		method: "GET",
	})
		.then((response) => response.json())
		.then((data) => {
			console.log(data);
			return data;
		})
		.catch(() => {
			localStorage.clear();
		});
};

export const updateObjectives = (boxid) => {
	return fetch(urlApi.apiRemi() + `/objectives/${boxid}`, {
		method: "PUT",
	})
		.then((response) => response.json())
		.then((data) => {
			console.log(data);
			return data;
		})
		.catch(() => {
			localStorage.clear();
		});
};

export const resetObjectives = () => {
	return fetch(urlApi.apiRemi() + "/objectives/reset", {
		method: "PUT",
	})
		.then((response) => response.json())
		.then((data) => {
			console.log(data);
			return data;
		})
		.catch(() => {
			localStorage.clear();
		});
};

export const getHistory = (boxid) => {
	return fetch(urlApi.apiRemi() + `/history/${boxid}`, {
		method: "GET",
	})
		.then((response) => response.json())
		.then((data) => {
			console.log(data);
			return data;
		})
		.catch(() => {
			localStorage.clear();
		});
};

export const updateHistory = (boxid) => {
	return fetch(urlApi.apiRemi() + `/history/${boxid}`, {
		method: "PUT",
	})
		.then((response) => response.json())
		.then((data) => {
			console.log(data);
			return data;
		})
		.catch(() => {
			localStorage.clear();
		});
};

export const resetHistory = () => {
	return fetch(urlApi.apiRemi() + "/history/reset", {
		method: "PUT",
	})
		.then((response) => response.json())
		.then((data) => {
			console.log(data);
			return data;
		})
		.catch(() => {
			localStorage.clear();
		});
};

export const getCharactersById = (personnage) => {
	return fetch(urlApi.apiRemi() + `/characters/${personnage}`, {
		method: "GET",
	})
		.then((response) => response.json())
		.then((data) => {
			console.log(data);
			return data;
		})
		.catch(() => {
			localStorage.clear();
		});
};

export const updateCharactersById = (personnage, id) => {
	return fetch(urlApi.apiRemi() + `/characters/${personnage}/${id}`, {
		method: "PUT",
	})
		.then((response) => response.json())
		.then((data) => {
			console.log(data);
			return data;
		})
		.catch(() => {
			localStorage.clear();
		});
};

export const resetCharacters = () => {
	return fetch(urlApi.apiRemi() + "/characters/reset", {
		method: "PUT",
	})
		.then((response) => response.json())
		.then((data) => {
			console.log(data);
			return data;
		})
		.catch(() => {
			localStorage.clear();
		});
};

export const getEvent = (boxid) => {
	return fetch(urlApi.apiRemi() + `/events/${boxid}`, {
		method: "GET",
	})
		.then((response) => response.json())
		.then((data) => {
			console.log(data);
			return data;
		})
		.catch(() => {
			localStorage.clear();
		});
};

export const updateEvent = (boxid) => {
	return fetch(urlApi.apiRemi() + `/events/${boxid}`, {
		method: "PUT",
	})
		.then((response) => response.json())
		.then((data) => {
			console.log(data);
			return data;
		})
		.catch(() => {
			localStorage.clear();
		});
};

export const resetEvent = () => {
	return fetch(urlApi.apiRemi() + "/events/reset", {
		method: "PUT",
	})
		.then((response) => response.json())
		.then((data) => {
			console.log(data);
			return data;
		})
		.catch(() => {
			localStorage.clear();
		});
};
