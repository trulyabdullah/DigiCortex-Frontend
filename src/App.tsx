import { BrowserRouter, Route, Routes } from "react-router-dom";
import { SignUp } from "./components/Signup";
import SignIn from "./components/Signin";
import { Dashboard } from "./components/Dashboard";
import { SharePreview } from "./components/SharePreview";
import { PublicRoute } from "./components/PublicRoute"; // Import the guard

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route
					path="/"
					element={
						<PublicRoute>
							<SignUp />
						</PublicRoute>
					}
				/>
				<Route
					path="/signin"
					element={
						<PublicRoute>
							<SignIn />
						</PublicRoute>
					}
				/>
				<Route path="/dashboard" element={<Dashboard />} />
				<Route path="/share/:shareLink" element={<SharePreview />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
