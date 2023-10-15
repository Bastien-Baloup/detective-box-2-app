import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Api from "./api.js";
import Scenario from "./pages/Scenario.jsx";
import Error from "./pages/Error.jsx";
import Login from "./pages/Login.jsx";
import Credits from "./pages/Credits.jsx";
import Choice from "./pages/Choice.jsx";
import Legales from "./pages/Legales.jsx";
import Parametres from "./pages/Parametres.jsx";
import Home from "./pages/Home.jsx";
import Renfort from "./pages/Renfort.jsx";
import Historique from "./pages/Historique.jsx";
import Layout from "./components/Layout.jsx";

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

	//https://api.detectivebox.remimichel.fr/documents?name=sounds/101-commentaires-tim-1.wav

	return (
		<Router>
			<Routes>
				<Route path="/*" element={<Error />} />
				<Route path="/credits" element={<Credits />} />
				<Route path="/legales" element={<Legales />} />
				<Route path="/parametres" element={<Parametres />} />
				<Route path="/" element={<Scenario />} />
				<Route path="/sign-in" element={<Login />} />
				<Route path="/box-choice" element={<Choice />} />
				<Route element={<Layout />}>
					<Route path="/home" element={<Home />} />
					<Route path="/history" element={<Historique />} />
					<Route path="/help" element={<Renfort />} />
				</Route>
			</Routes>
		</Router>
	);
}

export default App;
