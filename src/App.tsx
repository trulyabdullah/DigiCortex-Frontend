import { useState } from "react";
import { Button } from "./components/Button";
import { Card } from "./components/Card";
import { CreateContentModal } from "./components/CreateContentModal";
import { Plus } from "./icons/Plus";
import { Share } from "./icons/Share";

function App() {
	const [isModalOpen, setIsModalOpen] = useState(false);

	return (
		<div>
			<div className="min-h-lvh">
				<CreateContentModal
					open={isModalOpen}
					setOpen={() => {
						setIsModalOpen(false);
					}}
				/>
				<Button
					variant="primary"
					size="sm"
					startIcon={<Plus size="sm" />}
					onClick={() => {
						setIsModalOpen(true);
					}}
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
		</div>
	);
}

export default App;
