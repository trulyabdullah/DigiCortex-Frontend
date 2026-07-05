import { useState } from "react";
import { Button } from "./components/Button";
import { Card } from "./components/Card";
import { CreateContentModal } from "./components/CreateContentModal";
import { Plus } from "./icons/Plus";
import { Share } from "./icons/Share";
import { Sidebar } from "./components/Sidebar";

function App() {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [isContentScreen, setIsContentScreen] = useState(true);
	const [isTagScreen, setIsTagScreen] = useState(true);
	return (
		<div className="flex">
			<Sidebar
				setIsContentScreen={setIsContentScreen}
				setIsTagScreen={setIsTagScreen}
			/>
			<div className="flex-1 min-h-screen bg-[#331D2C] p-4 md:ml-72 overflow-x-hidden">
				<CreateContentModal
					open={isModalOpen}
					setOpen={() => {
						setIsModalOpen(false);
					}}
				/>
				<div className="mb-4 flex justify-end gap-2">
					<Button
						variant="primary"
						size="sm"
						startIcon={<Plus size="sm" />}
						onClick={() => setIsModalOpen(true)}
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
				</div>
				{isContentScreen && (
					<div className="p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3">
						<Card
							title="test card"
							content={
								"Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos."
							}
						/>
						<Card
							title="test card"
							content={
								"Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos."
							}
						/>
						<Card title="test card" content={"sdf"} />
						<Card
							title="test card"
							content={
								"Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos."
							}
						/>
						<Card
							title="test card"
							content={
								"Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos."
							}
						/>
						<Card
							title="test card"
							content={
								"Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos."
							}
						/>
						<Card
							title="test card"
							content={
								"Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos."
							}
						/>
					</div>
				)}
				{isTagScreen && <div>tags</div>}
			</div>
		</div>
	);
}

export default App;
