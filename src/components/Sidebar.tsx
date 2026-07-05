import type { Dispatch, SetStateAction } from "react";
import { DocumentFill } from "../icons/DocumentFill";
import { Tag } from "../icons/Tags";

interface SidebarProp {
	setActiveScreen: Dispatch<SetStateAction<"content" | "tags">>;
}

export function Sidebar({ setActiveScreen }: SidebarProp) {
	return (
		<div className="md:p-4 gap-4 md:flex flex-col fixed left-0 top-0 hidden w-72 bg-[#3F2E3E] min-h-lvh">
			<button
				onClick={() => {
					setActiveScreen("content");
				}}
				className="flex gap-3 rounded-full p-4 text-white transition-all duration-300 hover:bg-yellow-100 hover:text-yellow-600"
			>
				<DocumentFill size="sm" />
				Notes
			</button>
			<button
				onClick={() => {
					setActiveScreen("tags");
				}}
				className="flex gap-3 rounded-full p-4 text-white transition-all duration-300 hover:bg-pink-100 hover:text-pink-600"
			>
				<Tag size="sm" />
				Tags
			</button>
		</div>
	);
}
