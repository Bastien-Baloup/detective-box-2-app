import { logError } from '../const/logtail.js'
import { useError } from './useError.js'
const url = import.meta.env.VITE_API

const useApi = () => {
	const { setApiError } = useError()

	const handleResponse = async (response) => {
		if (!response.ok) {
			const errorData = await response.json()
			throw new Error(errorData.detail)
		}
		return response
	}

	const handleError = async (error) => {
		setApiError([error.message])
		await logError(error)
	}

	const apiFunctions = {
		getHistories: async (token, ids) => {
			try {
				const response = await fetch(`${url}/history?ids=${ids.join(',')}`, {
					method: 'GET',
					headers: {
						'Content-Type': 'application/json',
						Authorization: `Bearer ${token}`
					}
				})
				await handleResponse(response)
				return response
			} catch (error) {
				await handleError(error)
			}
		},

		updateTimeEndBox: async (token, id) => {
			try {
				const response = await fetch(`${url}/users/end_box/${id}`, {
					method: 'PUT',
					headers: {
						'Content-Type': 'application/json',
						Authorization: `Bearer ${token}`
					}
				})
				await handleResponse(response)
				return response
			} catch (error) {
				await handleError(error)
			}
		},

		getMe: async (token) => {
			// try {
			// let response = await fetch(url + "/users/me", {
			return await fetch(`${url}/users/me`, {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`
				}
			})
			// await handleResponse(response);
			// return response;
			// } catch (error) {
			//   await handleError(error);
			// }
		},

		getToken: async (credentials) => {
			// try {
			const response = await fetch(`${url}/users/login`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(credentials)
			})
			// await handleResponse(response);
			return response
			// } catch (error) {
			//   await handleError(error);
			// }
		},

		createUser: async (newaccount) => {
			try {
				const response = await fetch(`${url}/users/`, {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify(newaccount)
				})
				await handleResponse(response)
				return response
			} catch (error) {
				await handleError(error)
			}
		},

		getUser: async (token) => {
			// try {
			const response = await fetch(`${url}/users/me`, {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`
				}
			})
			// await handleResponse(response);
			return response.json()
			// } catch (error) {
			//   handleError(error);
			// }
		},

		forgotPassword: async (email) => {
			try {
				const response = await fetch(`${url}/users/forgot_password`, {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify({ email })
				})
				await handleResponse(response)
				return response.json()
			} catch (error) {
				handleError(error)
			}
		},

		updatePassword: async (token, newpassword) => {
			try {
				const response = await fetch(`${url}/users/password`, {
					method: 'PUT',
					headers: {
						'Content-Type': 'application/json',
						Authorization: `Bearer ${token}`
					},
					body: JSON.stringify({
						password: newpassword
					})
				})
				await handleResponse(response)
				return response.json()
			} catch (error) {
				handleError(error)
			}
		},

		updateName: async (token, id, newinfos) => {
			try {
				const response = await fetch(`${url}/users/${id}`, {
					method: 'PUT',
					headers: {
						'Content-Type': 'application/json',
						Authorization: `Bearer ${token}`
					},
					body: JSON.stringify(newinfos)
				})
				await handleResponse(response)
				return response.json()
			} catch (error) {
				handleError(error)
			}
		},

		resetAll: async (token) => {
			try {
				const response = await fetch(`${url}/game/reset`, {
					method: 'PUT',
					headers: {
						'Content-Type': 'application/json',
						Authorization: `Bearer ${token}`
					}
				})
				await handleResponse(response)
				return response.json()
			} catch (error) {
				handleError(error)
			}
		},

		getBox: async (token) => {
			try {
				const response = await fetch(`${url}/box/`, {
					method: 'GET',
					headers: {
						'Content-Type': 'application/json',
						Authorization: `Bearer ${token}`
					}
				})
				await handleResponse(response)
				return response.json()
			} catch (error) {
				handleError(error)
			}
		},

		updateBox: async (token, boxid, newstatus) => {
			try {
				const response = await fetch(`${url}/box/${boxid}`, {
					method: 'PUT',
					headers: {
						'Content-Type': 'application/json',
						Authorization: `Bearer ${token}`
					},
					body: JSON.stringify({
						status: newstatus
					})
				})
				await handleResponse(response)
				return response.json()
			} catch (error) {
				handleError(error)
			}
		},

		resetBox: async (token) => {
			try {
				const response = await fetch(`${url}/box/reset`, {
					method: 'PUT',
					headers: {
						'Content-Type': 'application/json',
						Authorization: `Bearer ${token}`
					}
				})
				await handleResponse(response)
				return response.json()
			} catch (error) {
				handleError(error)
			}
		},

		getQuizzByBox: async (token, boxid) => {
			try {
				const response = await fetch(`${url}/quizz/${boxid}`, {
					method: 'GET',
					headers: {
						'Content-Type': 'application/json',
						Authorization: `Bearer ${token}`
					}
				})
				await handleResponse(response)
				return response.json()
			} catch (error) {
				handleError(error)
			}
		},

		updateQuizz: async (token, boxid) => {
			try {
				const response = await fetch(`${url}/quizz/${boxid}`, {
					method: 'PUT',
					headers: {
						'Content-Type': 'application/json',
						Authorization: `Bearer ${token}`
					},
					body: JSON.stringify({
						status: true
					})
				})
				await handleResponse(response)
				return response.json()
			} catch (error) {
				handleError(error)
			}
		},

		resetQuizz: async (token) => {
			try {
				const response = await fetch(`${url}/quizz/reset`, {
					method: 'PUT',
					headers: {
						'Content-Type': 'application/json',
						Authorization: `Bearer ${token}`
					}
				})
				await handleResponse(response)
				return response.json()
			} catch (error) {
				handleError(error)
			}
		},

		getHelpByBox: async (token, boxid) => {
			try {
				const response = await fetch(`${url}/help/${boxid}`, {
					method: 'GET',
					headers: {
						'Content-Type': 'application/json',
						Authorization: `Bearer ${token}`
					}
				})
				await handleResponse(response)
				return response.json()
			} catch (error) {
				handleError(error)
			}
		},

		updateHelp: async (token, boxid, helpid, newstatus) => {
			try {
				const response = await fetch(`${url}/help/${boxid}/?id=${helpid}`, {
					method: 'PUT',
					headers: {
						'Content-Type': 'application/json',
						Authorization: `Bearer ${token}`
					},
					body: JSON.stringify({
						status: newstatus
					})
				})
				await handleResponse(response)
				return response.json()
			} catch (error) {
				handleError(error)
			}
		},

		resetHelp: async (token) => {
			try {
				const response = await fetch(`${url}/help/reset`, {
					method: 'PUT',
					headers: {
						'Content-Type': 'application/json',
						Authorization: `Bearer ${token}`
					}
				})
				await handleResponse(response)
				return response.json()
			} catch (error) {
				handleError(error)
			}
		},

		getObjectivesByBox: async (token, boxid) => {
			try {
				const response = await fetch(`${url}/objectives/${boxid}`, {
					method: 'GET',
					headers: {
						'Content-Type': 'application/json',
						Authorization: `Bearer ${token}`
					}
				})
				await handleResponse(response)
				return response.json()
			} catch (error) {
				handleError(error)
			}
		},

		updateObjectives: async (token, boxid, objectiveid, newstatus) => {
			try {
				const response = await fetch(`${url}/objectives/${boxid}/?id=${objectiveid}`, {
					method: 'PUT',
					headers: {
						'Content-Type': 'application/json',
						Authorization: `Bearer ${token}`
					},
					body: JSON.stringify({
						status: newstatus
					})
				})
				await handleResponse(response)
				return response.json()
			} catch (error) {
				handleError(error)
			}
		},

		resetObjectives: async (token) => {
			try {
				const response = await fetch(`${url}/objectives/reset`, {
					method: 'PUT',
					headers: {
						'Content-Type': 'application/json',
						Authorization: `Bearer ${token}`
					}
				})
				await handleResponse(response)
				return response.json()
			} catch (error) {
				handleError(error)
			}
		},

		getHistoryByBox: async (token, boxid) => {
			try {
				const response = await fetch(`${url}/history/${boxid}`, {
					method: 'GET',
					headers: {
						'Content-Type': 'application/json',
						Authorization: `Bearer ${token}`
					}
				})
				await handleResponse(response)
				return response.json()
			} catch (error) {
				handleError(error)
			}
		},

		updateHistory: async (token, boxid, objectiveid) => {
			try {
				const response = await fetch(`${url}/history/${boxid}/?id=${objectiveid}`, {
					method: 'PUT',
					headers: {
						'Content-Type': 'application/json',
						Authorization: `Bearer ${token}`
					},
					body: JSON.stringify({
						status: true
					})
				})
				await handleResponse(response)
				return response.json()
			} catch (error) {
				handleError(error)
			}
		},

		resetHistory: async (token) => {
			try {
				const response = await fetch(`${url}/history/reset`, {
					method: 'PUT',
					headers: {
						'Content-Type': 'application/json',
						Authorization: `Bearer ${token}`
					}
				})
				await handleResponse(response)
				return response.json()
			} catch (error) {
				handleError(error)
			}
		},

		getCharactersById: async (token, personnage) => {
			try {
				const response = await fetch(`${url}/characters/${personnage}`, {
					method: 'GET',
					headers: {
						'Content-Type': 'application/json',
						Authorization: `Bearer ${token}`
					}
				})
				await handleResponse(response)
				return response.json()
			} catch (error) {
				handleError(error)
			}
		},

		updateCharactersById: async (token, personnage, boxid, answer) => {
			try {
				const response = await fetch(`${url}/characters/${personnage}/${boxid}/?answer=${answer}`, {
					method: 'PUT',
					headers: {
						'Content-Type': 'application/json',
						Authorization: `Bearer ${token}`
					}
				})
				await handleResponse(response)
				return response.json()
			} catch (error) {
				handleError(error)
			}
		},

		resetCharacters: async (token) => {
			try {
				const response = await fetch(`${url}/characters/reset`, {
					method: 'PUT',
					headers: {
						'Content-Type': 'application/json',
						Authorization: `Bearer ${token}`
					}
				})
				await handleResponse(response)
				return response.json()
			} catch (error) {
				handleError(error)
			}
		},

		getEventByBox: async (token, boxid) => {
			try {
				const response = await fetch(`${url}/events/${boxid}`, {
					method: 'GET',
					headers: {
						'Content-Type': 'application/json',
						Authorization: `Bearer ${token}`
					}
				})
				await handleResponse(response)
				return response.json()
			} catch (error) {
				handleError(error)
			}
		},

		updateEvent: async (token, boxid, id, newstatus) => {
			try {
				const response = await fetch(`${url}/events/${boxid}/?id=${id}`, {
					method: 'PUT',
					headers: {
						'Content-Type': 'application/json',
						Authorization: `Bearer ${token}`
					},
					body: JSON.stringify({
						status: newstatus
					})
				})
				await handleResponse(response)
				return response.json()
			} catch (error) {
				handleError(error)
			}
		},

		resetEvent: async (token) => {
			try {
				const response = await fetch(`${url}/events/reset`, {
					method: 'PUT',
					headers: {
						'Content-Type': 'application/json',
						Authorization: `Bearer ${token}`
					}
				})
				await handleResponse(response)
				return response.json()
			} catch (error) {
				handleError(error)
			}
		}
	}
	return apiFunctions
}

export default useApi
