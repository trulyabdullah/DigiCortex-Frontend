import { Button } from "./components/Button";
import { Card } from "./components/Card";
import { Plus } from "./icons/Plus";
import { Share } from "./icons/Share";

function App() {
	return (
		<div className="min-h-lvh">
			<Button
				variant="primary"
				size="sm"
				startIcon={<Plus size="sm" />}
				onClick={() => {}}
			>
				Add Content
			</Button>
			<Button
				variant="secondary"
				size="sm"
				startIcon={<Share size="sm" />}
				onClick={() => {}}
			>
				Share
			</Button>
			<Card
				title="test card"
				content={
					"Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos."
				}
			/>
		</div>
	);
}

export default App;
