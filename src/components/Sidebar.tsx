import type { Dispatch, SetStateAction } from "react";
import { DocumentFill } from "../icons/DocumentFill";
import { Tag } from "../icons/Tags";
import { Out } from "../icons/Out";
import { useNavigate } from "react-router-dom";

interface SidebarProp {
	setActiveScreen: Dispatch<SetStateAction<"content" | "tags">>;
}

export function Sidebar({ setActiveScreen }: SidebarProp) {
	const navigate = useNavigate();
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
				onClick={() => {
					navigate("/signin");
				}}
				className="flex w-full items-center gap-3 rounded-md border-[3px] border-black bg-white p-4 text-lg font-bold text-black transition-all duration-200 hover:-translate-y-1 hover:bg-[#F9A8D4] hover:shadow-[6px_6px_0px_black] active:translate-y-0 active:shadow-none"
			>
				<Out size="sm" />
				Sign out
			</button>
		</div>
	);
}
