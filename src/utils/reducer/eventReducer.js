const eventReducer = (state, action) => {
	switch (action.type) {
		case 'setEvent':
			return {
				id: action.id,
				toogleEvent: state.id !== action.id ? !state.toogleEvent : state.toogleEvent
			}
		case 'resetEvent':
			return {
				id: '',
				toogleEvent: state.toogleEvent
			}
		default:
			return state
	}
}

export default eventReducer
