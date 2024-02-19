export const logError = async (error) => {
	try {
		return await fetch('https://in.logs.betterstack.com/', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: 'Bearer 83Vp72fFG7bNogSesePfTw2u'
			},
			body: JSON.stringify(error)
		})
	} catch (error) {
		return true
	}
}

export const logMessage = async (msg) => {
	try {
		return await fetch('https://in.logs.betterstack.com/', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: 'Bearer 83Vp72fFG7bNogSesePfTw2u'
			},
			body: JSON.stringify({ msg: msg })
		})
	} catch (error) {
		return true
	}
}
