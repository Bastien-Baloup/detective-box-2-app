const url = "https://api.detectivebox.remimichel.fr";

export const getHistories = (token, ids) => {
	return fetch(url + `/history?ids=${ids.join(",")}`, {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${token}`,
		},
	});
};

export const updateTimeEndBox = (token, id) => {
	return fetch(url + `/users/end_box/` + id, {
		method: "PUT",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${token}`,
		},
	});
};

export const getMe = (token) => {
	return fetch(url + "/users/me", {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${token}`,
		},
	});
};

export const getToken = (credentials) => {
	return fetch(url + "/users/login", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(credentials),
	});
};

export const createUser = (newaccount) => {
	return fetch(url + "/users/", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(newaccount),
	})
		// .then((response) => response.json())
		// .then((data) => {
		// 	return data;
		// })
		// .catch((error) => {
		// 	console.error(error);
		// });
};

export const getUser = (token) => {
	return fetch(url + "/users/me", {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${token}`,
		},
	})
		.then((response) => response.json())
		.then((data) => {
			return data;
		})
		.catch((error) => {
			console.error(error);
		});
};

export const forgotPassword = (email) => {
	return fetch(url + "/users/forgot_password", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({email}),
	})
		.then((response) => response.json())
		.then((data) => {
			return data;
		})
		.catch((error) => {
			console.error(error);
		});
};

export const updatePassword = (token, newpassword) => {
	return fetch(url + "/users/", {
		method: "PUT",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${token}`,
		},
		body: JSON.stringify({
			password: newpassword,
		}),
	})
		.then((response) => response.json())
		.then((data) => {
			return data;
		})
		.catch((error) => {
			console.error(error);
		});
};

export const updateName = (token, id, newinfos) => {
	return fetch(url + "/users/" + id, {
		method: "PUT",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${token}`,
		},
		body: JSON.stringify(newinfos),
	})
		.then((response) => response.json())
		.then((data) => {
			return data;
		})
		.catch((error) => {
			console.error(error);
		});
};

export const resetAll = (token) => {
	return fetch(url + "/game/reset", {
		method: "PUT",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${token}`,
		},
	})
		.then((response) => response.json())
		.then((data) => {
			return data;
		})
		.catch((error) => {
			console.error(error);
		});
};

export const getBox = (token) => {
	return fetch(url + "/box/", {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${token}`,
		},
	})
		.then((response) => response.json())
		.then((data) => {
			return data;
		})
		.catch((error) => {
			console.error(error);
		});
};

export const updateBox = (token, boxid, newstatus) => {
	return fetch(url + `/box/` + boxid, {
		method: "PUT",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${token}`,
		},
		body: JSON.stringify({
			status: newstatus,
		}),
	})
		.then((response) => response.json())
		.then((data) => {
			return data;
		})
		.catch((error) => {
			console.error(error);
		});
};

export const resetBox = (token) => {
	return fetch(url + "/box/reset", {
		method: "PUT",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${token}`,
		},
	})
		.then((response) => response.json())
		.then((data) => {
			return data;
		})
		.catch((error) => {
			console.error(error);
		});
};

export const getQuizzByBox = (token, boxid) => {
	return fetch(url + "/quizz/" + boxid, {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${token}`,
		},
	})
		.then((response) => response.json())
		.then((data) => {
			return data;
		})
		.catch((error) => {
			console.error(error);
		});
};

export const updateQuizz = (token, boxid) => {
	return fetch(url + "/quizz/" + boxid, {
		method: "PUT",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${token}`,
		},
		body: JSON.stringify({
			status: true,
		}),
	})
		.then((response) => response.json())
		.then((data) => {
			return data;
		})
		.catch((error) => {
			console.error(error);
		});
};

export const resetQuizz = (token) => {
	return fetch(url + "/quizz/reset", {
		method: "PUT",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${token}`,
		},
	})
		.then((response) => response.json())
		.then((data) => {
			return data;
		})
		.catch((error) => {
			console.error(error);
		});
};

// export const getHelp = () => {
// 	return fetch(url + "/help/", {
// 		method: "GET",
// 	})
// 		.then((response) => response.json())
// 		.then((data) => {
// 			console.log(data);
// 			return data;
// 		})
// 		.catch((error) => {
// 			console.error(error);
// 		});
// };

export const getHelpByBox = (token, boxid) => {
	return fetch(url + "/help/" + boxid, {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${token}`,
		},
	})
		.then((response) => response.json())
		.then((data) => {
			return data;
		})
		.catch((error) => {
			console.error(error);
		});
};

export const updateHelp = (token, boxid, helpid, newstatus) => {
	return fetch(url + "/help/" + boxid + "/?id=" + helpid, {
		method: "PUT",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${token}`,
		},
		body: JSON.stringify({
			status: newstatus,
		}),
	})
		.then((response) => response.json())
		.then((data) => {
			return data;
		})
		.catch((error) => {
			console.error(error);
		});
};

export const resetHelp = (token) => {
	return fetch(url + "/help/reset", {
		method: "PUT",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${token}`,
		},
	})
		.then((response) => response.json())
		.then((data) => {
			return data;
		})
		.catch((error) => {
			console.error(error);
		});
};

export const getObjectivesByBox = (token, boxid) => {
	return fetch(url + "/objectives/" + boxid, {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${token}`,
		},
	})
		.then((response) => response.json())
		.then((data) => {
			return data;
		})
		.catch((error) => {
			console.error(error);
		});
};

export const updateObjectives = (token, boxid, objectiveid, newstatus) => {
	return fetch(url + "/objectives/" + boxid + "/?id=" + objectiveid, {
		method: "PUT",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${token}`,
		},
		body: JSON.stringify({
			status: newstatus,
		}),
	})
		.then((response) => response.json())
		.then((data) => {
			return data;
		})
		.catch((error) => {
			console.error(error);
		});
};

export const resetObjectives = (token) => {
	return fetch(url + "/objectives/reset", {
		method: "PUT",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${token}`,
		},
	})
		.then((response) => response.json())
		.then((data) => {
			return data;
		})
		.catch((error) => {
			console.error(error);
		});
};

export const getHistoryByBox = (token, boxid) => {
	return fetch(url + "/history/" + boxid, {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${token}`,
		},
	})
		.then((response) => response.json())
		.then((data) => {
			return data;
		})
		.catch((error) => {
			console.error(error);
		});
};

export const updateHistory = (token, boxid, objectiveid) => {
	return fetch(url + "/history/" + boxid + "/?id=" + objectiveid, {
		method: "PUT",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${token}`,
		},
		body: JSON.stringify({
			status: true,
		}),
	})
		.then((response) => response.json())
		.then((data) => {
			return data;
		})
		.catch((error) => {
			console.error(error);
		});
};

export const resetHistory = (token) => {
	return fetch(url + "/history/reset", {
		method: "PUT",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${token}`,
		},
	})
		.then((response) => response.json())
		.then((data) => {
			return data;
		})
		.catch((error) => {
			console.error(error);
		});
};

// export const getCharacters = () => {
// 	return fetch(url + "/characters/", {
// 		method: "GET",
// 	})
// 		.then((response) => response.json())
// 		.then((data) => {
// 			console.log(data);
// 			return data;
// 		})
// 		.catch((error) => {
// 			console.error(error);
// 		});
// };

export const getCharactersById = (token, personnage) => {
	return fetch(url + "/characters/" + personnage, {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${token}`,
		},
	})
		.then((response) => response.json())
		.then((data) => {
			return data;
		})
		.catch((error) => {
			console.error(error);
		});
};

export const updateCharactersById = (token, personnage, boxid, answer) => {
	return fetch(url + "/characters/" + personnage + "/" + boxid + "/?answer=" + answer, {
		method: "PUT",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${token}`,
		},
	})
		.then((response) => response.json())
		.then((data) => {
			return data;
		})
		.catch((error) => {
			console.error(error);
		});
};

export const resetCharacters = (token) => {
	return fetch(url + "/characters/reset", {
		method: "PUT",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${token}`,
		},
	})
		.then((response) => response.json())
		.then((data) => {
			return data;
		})
		.catch((error) => {
			console.error(error);
		});
};

export const getEventByBox = (token, boxid) => {
	return fetch(url + "/events/" + boxid, {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${token}`,
		},
	})
		.then((response) => response.json())
		.then((data) => {
			return data;
		})
		.catch((error) => {
			console.error(error);
		});
};

export const updateEvent = (token, boxid, id, newstatus) => {
	return fetch(url + "/events/" + boxid + "/?id=" + id, {
		method: "PUT",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${token}`,
		},
		body: JSON.stringify({
			status: newstatus,
		}),
	})
		.then((response) => response.json())
		.then((data) => {
			return data;
		})
		.catch((error) => {
			console.error(error);
		});
};

export const resetEvent = (token) => {
	return fetch(url + "/events/reset", {
		method: "PUT",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${token}`,
		},
	})
		.then((response) => response.json())
		.then((data) => {
			return data;
		})
		.catch((error) => {
			console.error(error);
		});
};
