import { Delete } from "../icons/Delete";
import { Document } from "../icons/Document";
import { Share } from "../icons/Share";

interface CardProp {
	title: string;
	content?: string;
}

export function Card({ title, content }: CardProp) {
	return (
		<div className="w-full rounded-md border-[3px] border-black bg-white p-5 shadow-[8px_8px_0px_#FDE047] transition-all duration-200 hover:-translate-y-1 hover:-translate-x-1 hover:shadow-[12px_12px_0px_#FDE047]">
			<div className="flex items-center justify-between gap-4">
				<div className="flex min-w-0 flex-1 items-center gap-3">
					<div className="shrink-0 rounded-sm border-2 border-black bg-[#C4B5FD] p-2 text-black">
						<Document size="sm" />
					</div>

					<div
						className="truncate text-xl font-black text-black"
						title={title}
					>
						{title}
					</div>
				</div>

				<div className="flex shrink-0 gap-2">
					<button
						onClick={() => {
							console.log("clik");
						}}
						className="flex shrink-0 items-center justify-center rounded-sm border-2 border-transparent p-2 text-black transition-all duration-200 hover:-translate-y-0.5 hover:border-black hover:bg-[#B8D8FF] hover:shadow-[4px_4px_0px_black] active:translate-y-0 active:shadow-none"
					>
						<Share size="sm" />
					</button>
					<button
						onClick={() => {
							console.log("clik");
						}}
						className="flex shrink-0 items-center justify-center rounded-sm border-2 border-transparent p-2 text-black transition-all duration-200 hover:-translate-y-0.5 hover:border-black hover:bg-[#FCA5A5] hover:shadow-[4px_4px_0px_black] active:translate-y-0 active:shadow-none"
					>
						<Delete size="sm" />
					</button>
				</div>
			</div>

			{content && (
				<div className="mt-5 text-base font-medium leading-relaxed text-neutral-700">
					<p className="line-clamp-8 wrap-break-word">{content}</p>
				</div>
			)}
		</div>
	);
}
