import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
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
import Restrictedaccess from "./components/Restrictedaccess.jsx";
import { BoxProvider, AuthProvider, AmbianceProvider, DataProvider } from "./utils/context/fetchContext.jsx";

// const api = new Api();

function App() {
	// const [status, setStatus] = useState("KO");
	// //EXPLICATION : added this line to avoid having an error
	// console.log(status);

	// useEffect(() => {
	// 	api.getStatus().then((res) => {
	// 		setStatus(res.status);
	// 	});
	// }, []);

	return (
		<BoxProvider>
			<AuthProvider>
				<AmbianceProvider>
					<DataProvider>
						<Router>
							<Routes>
								<Route path="/*" element={<Error />} />
								<Route path="/sign-in" element={<Login />} />
								<Route path="/box-choice" element={<Choice />} />
								<Route element={<Restrictedaccess />}>
									<Route element={<Layout />}>
										<Route path="/" element={<Home />} />
										<Route path="/history" element={<Historique />} />
										<Route path="/help" element={<Renfort />} />
									</Route>
									<Route path="/credits" element={<Credits />} />
									<Route path="/legales" element={<Legales />} />
									<Route path="/parametres" element={<Parametres />} />
								</Route>
							</Routes>
						</Router>
					</DataProvider>
				</AmbianceProvider>
			</AuthProvider>
		</BoxProvider>
	);
}

export default App;
