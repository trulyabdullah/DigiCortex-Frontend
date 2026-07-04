import { Button } from "./components/Button";
import { PlusIcon } from "./icons/PlusIcon";

function App() {
	return (
		<div className="flex items-center justify-center">
			<Button
				variant={"primary"}
				size={"sm"}
				startIcon={<PlusIcon size="sm" />}
				onClick={() => {
					console.log("clicked");
				}}
			>
				Add content
			</Button>
		</div>
	);
}

export default App;
