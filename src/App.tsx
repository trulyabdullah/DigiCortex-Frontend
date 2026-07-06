import { BrowserRouter, Route, Routes } from "react-router-dom";
import { SignUp } from "./components/Signup";
import SignIn from "./components/Signin";
import { Dashboard } from "./components/Dashboard";
import { SharePreview } from "./components/SharePreview";

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<SignUp />} />
				<Route path="/signin" element={<SignIn />} />
				<Route path="/dashboard" element={<Dashboard />} />
				<Route path="/share/:shareLink" element={<SharePreview />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
