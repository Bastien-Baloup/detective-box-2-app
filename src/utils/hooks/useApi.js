/**
 * Service to fetch Token with API
 * @param {object} credentials email and password used to connect
 * @returns {Promise} data containing user's token
 */

export const getToken = (credentials) => {
	return fetch("http://localhost:3001/api/v1/user/login", {
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
	return fetch("http://localhost:3001/api/v1/user/profile", {
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

// create one service to update data from Adele
// create one service to update data from Celine
// create one service to update data from Tim
// create one service to update data from Raphaelle
// create one service to update data from Lauren
// create one service to update data from History
// create one service to update data from Quizz
// create one service to update data from Help
// create one service to update data from Event
// create one service to update data from Box
// create one service to update data from Objectifs
