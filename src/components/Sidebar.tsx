import { useState, type Dispatch, type SetStateAction } from "react";
import { DocumentFill } from "../icons/DocumentFill";
import { Tag } from "../icons/Tags";
import { Out } from "../icons/Out";
import { useNavigate } from "react-router-dom";

interface SidebarProp {
	setActiveScreen: Dispatch<SetStateAction<"content" | "tags">>;
}

export function Sidebar({ setActiveScreen }: SidebarProp) {
	const navigate = useNavigate();
	const [isSignOutModalOpen, setIsSignOutModalOpen] = useState(false);

	const handleSignOutConfirm = () => {
		localStorage.removeItem("token");
		navigate("/signin");
	};

	return (
		<div className="fixed left-0 top-0 hidden min-h-lvh w-72 flex-col gap-5 border-r-[3px] border-black bg-white p-6 md:flex">
			<button
				onClick={() => {
					setActiveScreen("content");
				}}
				className="flex w-full items-center gap-3 rounded-md border-[3px] border-black bg-white p-4 text-lg font-bold text-black transition-all duration-200 hover:-translate-y-1 hover:bg-[#FDE047] hover:shadow-[6px_6px_0px_black] active:translate-y-0 active:shadow-none"
			>
				<DocumentFill size="sm" />
				Notes
			</button>

			<button
				onClick={() => {
					setActiveScreen("tags");
				}}
				className="flex w-full items-center gap-3 rounded-md border-[3px] border-black bg-white p-4 text-lg font-bold text-black transition-all duration-200 hover:-translate-y-1 hover:bg-[#F9A8D4] hover:shadow-[6px_6px_0px_black] active:translate-y-0 active:shadow-none"
			>
				<Tag size="sm" />
				Tags
			</button>

			<button
				onClick={() => setIsSignOutModalOpen(true)}
				className="flex w-full items-center gap-3 rounded-md border-[3px] border-black bg-white p-4 text-lg font-bold text-black transition-all duration-200 hover:-translate-y-1 hover:bg-[#F9A8D4] hover:shadow-[6px_6px_0px_black] active:translate-y-0 active:shadow-none"
			>
				<Out size="sm" />
				Sign out
			</button>
			{isSignOutModalOpen && (
				<div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-xs">
					<div className="w-full max-w-sm rounded-md border-[3px] border-black bg-white p-6 shadow-[8px_8px_0px_#5EEAD4]">
						<h3 className="text-xl font-black text-black">
							Leaving so soon?
						</h3>

						<p className="mt-2 text-base font-medium leading-relaxed text-neutral-700">
							Are you sure you want to log out of your space?
						</p>

						<div className="mt-6 flex justify-end gap-3">
							<button
								onClick={() => setIsSignOutModalOpen(false)}
								className="rounded-sm border-2 border-black bg-white px-4 py-2 text-sm font-bold text-black shadow-[3px_3px_0px_black] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[5px_5px_0px_black] active:translate-y-0 active:shadow-none"
							>
								Stay
							</button>
							<button
								onClick={handleSignOutConfirm}
								className="rounded-sm border-2 border-black bg-[#FCA5A5] px-4 py-2 text-sm font-bold text-black shadow-[3px_3px_0px_black] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[5px_5px_0px_black] active:translate-y-0 active:shadow-none"
							>
								Log Out
							</button>
						</div>
					</div>
				</div>
			)}
		</div>
	);
}
