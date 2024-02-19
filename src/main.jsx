import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './style/main.scss'
import { logError } from './utils/const/logtail.js'

window.onerror = (message, source, lineno, colno, error) => {
	// Log the error details to Logtail or any other logging service
	const errorDetails = {
		message: message,
		source: source,
		lineno: lineno,
		colno: colno,
		error: error
	}
	logError(errorDetails)

	return true
}

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<App />
	</React.StrictMode>
)
