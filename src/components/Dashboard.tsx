import { useState } from "react";
import { Sidebar } from "./Sidebar";
import { Content } from "./Content";
import { MainButton } from "./MainButton";
import { CreateContentModal } from "./CreateContentModal";
import { Tags } from "./Tags";

export function Dashboard() {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [activeScreen, setActiveScreen] = useState<"content" | "tags">(
		"content",
	);

	const [refreshTrigger, setRefreshTrigger] = useState(0);

	const triggerRefresh = () => {
		setRefreshTrigger((prev) => prev + 1);
	};

	return (
		<div className="flex min-h-screen bg-[#F4F4F5]">
			<Sidebar setActiveScreen={setActiveScreen} />

			<div className="flex-1 overflow-x-hidden p-6 md:ml-72 md:p-10 lg:p-12">
				<CreateContentModal
					open={isModalOpen}
					setOpen={setIsModalOpen}
					refresh={triggerRefresh}
				/>

				<main className="mx-auto max-w-7xl">
					{activeScreen === "content" && (
						<div className="animate-fadeIn space-y-8">
							<div className="flex flex-col gap-4 flex-wrap rounded-md border-[3px] border-black bg-[#C4B5FD] p-6 shadow-[6px_6px_0px_black] sm:flex-row sm:items-center sm:justify-between">
								<h1 className="tracking-wide text-3xl font-black text-black">
									WORKSPACE
								</h1>
								<MainButton setIsModalOpen={setIsModalOpen} />
							</div>

							<Content refreshTrigger={refreshTrigger} />
						</div>
					)}

					{activeScreen === "tags" && (
						<div className="animate-fadeIn">
							<Tags />
						</div>
					)}
				</main>
			</div>
		</div>
	);
}
