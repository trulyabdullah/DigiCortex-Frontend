import { useState } from "react";

function App() {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [activeScreen, setActiveScreen] = useState<"content" | "tags">(
		"content",
	);
	return <div></div>;
}

export default App;
