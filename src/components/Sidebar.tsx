import { useState, type Dispatch, type SetStateAction } from "react";
import { DocumentFill } from "../icons/DocumentFill";
import { Tag } from "../icons/Tags";
import { Out } from "../icons/Out";
import { useNavigate } from "react-router-dom";

interface SidebarProp {
	setActiveScreen: Dispatch<SetStateAction<"content" | "tags">>;
}

export function Sidebar({ setActiveScreen }: SidebarProp) {
	const [isMobileOpen, setIsMobileOpen] = useState(false);
	const [isSignOutModalOpen, setIsSignOutModalOpen] = useState(false);
	const navigate = useNavigate();
	const handleSignOutConfirm = () => {
		localStorage.removeItem("token");
		localStorage.removeItem("brain_share_hash");
		navigate("/signin");
	};

	return (
		<>
			<button
				onClick={() => setIsMobileOpen(true)}
				className="md:hidden fixed top-4 left-4 z-40 p-2 border-2 border-black bg-white font-black"
			>
				MENU
			</button>

			<div
				className={`
                fixed top-0 left-0 h-full w-72 bg-white border-r-[3px] border-black p-6 flex flex-col gap-5 z-50
                transition-transform duration-300 ease-in-out
                ${isMobileOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0
            `}
			>
				<button
					onClick={() => {
						setActiveScreen("content");
						setIsMobileOpen(false);
					}}
					className="flex w-full items-center gap-3 rounded-md border-[3px] border-black bg-white p-4 text-lg font-bold text-black transition-all hover:-translate-y-1 hover:bg-[#FDE047] hover:shadow-[6px_6px_0px_black]"
				>
					<DocumentFill size="sm" /> Notes
				</button>

				<button
					onClick={() => {
						setActiveScreen("tags");
						setIsMobileOpen(false);
					}}
					className="flex w-full items-center gap-3 rounded-md border-[3px] border-black bg-white p-4 text-lg font-bold text-black transition-all hover:-translate-y-1 hover:bg-[#F9A8D4] hover:shadow-[6px_6px_0px_black]"
				>
					<Tag size="sm" /> Tags
				</button>

				<button
					onClick={() => setIsSignOutModalOpen(true)}
					className="flex w-full items-center gap-3 rounded-md border-[3px] border-black bg-white p-4 text-lg font-bold text-black transition-all hover:-translate-y-1 hover:bg-[#F9A8D4] hover:shadow-[6px_6px_0px_black]"
				>
					<Out size="sm" /> Sign out
				</button>
			</div>
			{isMobileOpen && (
				<div
					className="md:hidden fixed inset-0 bg-black/20 z-40"
					onClick={() => setIsMobileOpen(false)}
				/>
			)}

			{isSignOutModalOpen && (
				<div className="fixed inset-0 z-60 flex items-center justify-center bg-black/40 p-4 backdrop-blur-xs">
					<div className="w-full max-w-sm rounded-md border-[3px] border-black bg-white p-6 shadow-[8px_8px_0px_#5EEAD4]">
						<h3 className="text-xl font-black text-black">
							Leaving so soon?
						</h3>
						<p className="mt-2 text-base font-medium text-neutral-700">
							Are you sure you want to log out?
						</p>
						<div className="mt-6 flex justify-end gap-3">
							<button
								onClick={() => setIsSignOutModalOpen(false)}
								className="px-4 py-2 border-2 border-black font-bold text-sm"
							>
								Stay
							</button>
							<button
								onClick={handleSignOutConfirm}
								className="px-4 py-2 border-2 border-black bg-[#FCA5A5] font-bold text-sm"
							>
								Log Out
							</button>
						</div>
					</div>
				</div>
			)}
		</>
	);
}
