import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./style/main.scss";
import { logError } from './utils/const/logtail.js';

window.onerror = function(message, source, lineno, colno, error) {
	// Log the error details to Logtail or any other logging service
	const errorDetails = {
		message: message,
		source: source,
		lineno: lineno,
		colno: colno,
		error: error
	};
	console.log('error')
	logError(errorDetails)
	
	return true
}

window.addEventListener('unhandledrejection', event => {
  // Access the error details from the event
  const { reason, promise } = event;

  // Log or handle the error here
  const errorDetails = {
    message: reason.message,
    stack: reason.stack,
    promise: promise
  };

	logError(errorDetails)

  // Prevent the default browser behavior
  event.preventDefault();
});
ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<App />
	</React.StrictMode>
);
