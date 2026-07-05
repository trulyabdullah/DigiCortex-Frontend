import { Delete } from "../icons/Delete";
import { Document } from "../icons/Document";
import { Share } from "../icons/Share";

interface CardProp {
	title: string;
	content?: string;
}

export function Card({ title, content }: CardProp) {
	return (
		// entire card content
		<div className="w-full rounded-md border-[3px] border-black bg-white p-5 shadow-[8px_8px_0px_#FDE047] transition-all duration-200 hover:-translate-y-1 hover:-translate-x-1 hover:shadow-[12px_12px_0px_#FDE047]">
			{/* whole of topbar */}
			<div className="flex items-center justify-between">
				<div className="flex items-center gap-3">
					{/* a simple document logo */}
					<div className="rounded-sm border-2 border-black bg-[#C4B5FD] p-2 text-black">
						<Document size="sm" />
					</div>
					{/* card title in topbar */}
					<div className="text-xl font-black text-black">{title}</div>
				</div>

				<div className="flex gap-2">
					{/* share button */}
					<button
						onClick={() => {
							console.log("clik");
						}}
						className="rounded-sm border-2 border-transparent p-2 text-black transition-all duration-200 hover:-translate-y-0.5 hover:border-black hover:bg-[#B8D8FF] hover:shadow-[4px_4px_0px_black] active:translate-y-0 active:shadow-none"
					>
						<Share size="sm" />
					</button>
					{/* delete button */}
					<button
						onClick={() => {
							console.log("clik");
						}}
						className="rounded-sm border-2 border-transparent p-2 text-black transition-all duration-200 hover:-translate-y-0.5 hover:border-black hover:bg-[#FCA5A5] hover:shadow-[4px_4px_0px_black] active:translate-y-0 active:shadow-none"
					>
						<Delete size="sm" />
					</button>
				</div>
			</div>
			{content && (
				<div className="mt-5 text-base font-medium leading-relaxed text-neutral-700">
					<p className="line-clamp-8">{content}</p>
				</div>
			)}
		</div>
	);
}
