import { BrowserRouter, Route, Routes } from "react-router-dom";
import { SignUp } from "./components/Signup";
import SignIn from "./components/Signin";
import { Dashboard } from "./components/Dashboard";

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/signup" element={<SignUp />} />
				<Route path="/signin" element={<SignIn />} />
				<Route path="/dashboard" element={<Dashboard />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
