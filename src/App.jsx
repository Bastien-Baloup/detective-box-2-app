import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Api from "./api.js";
import Scenario from "./pages/Scenario.jsx";
import Error from "./pages/Error.jsx";
import Login from "./pages/Login.jsx";
import Credits from "./pages/Credits.jsx";
import Choice from "./pages/Choice.jsx";

const api = new Api();

function App() {
	const [status, setStatus] = useState("KO");
	//added this line to avoid having an error
	console.log(status);

	useEffect(() => {
		api.getStatus().then((res) => {
			setStatus(res.status);
		});
	}, []);

	return (
		<Router>
			<Routes>
				<Route path="/*" element={<Error />} />
				<Route path="/" element={<Scenario />} />
				<Route path="/sign-in" element={<Login />} />
				<Route path="/credits" element={<Credits />} />
				<Route path="/box-choice" element={<Choice />} />
			</Routes>
		</Router>
	);
}

export default App;
