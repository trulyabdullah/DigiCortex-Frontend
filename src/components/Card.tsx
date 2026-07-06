import { Delete } from "../icons/Delete";
import { Document } from "../icons/Document";
import { Share } from "../icons/Share";

interface TagObject {
	_id?: string;
	name: string;
}

interface CardProp {
	title: string;
	content?: string;
	tags?: Array<TagObject | string>;
}

const colors = ["purple", "pink", "teal", "yellow"] as const;
const variantClasses = {
	teal: "bg-[#5EEAD4]",
	yellow: "bg-[#FDE047]",
	purple: "bg-[#C4B5FD]",
	pink: "bg-[#F9A8D4]",
};

const getStableColorClass = (tagName: string) => {
	let hash = 0;
	for (let i = 0; i < tagName.length; i++) {
		hash = tagName.charCodeAt(i) + ((hash << 5) - hash);
	}
	const index = Math.abs(hash) % colors.length;
	return variantClasses[colors[index]];
};

export function Card({ title, content, tags = [] }: CardProp) {
	return (
		<div className="flex h-full w-full flex-col justify-between rounded-md border-[3px] border-black bg-white p-5 shadow-[8px_8px_0px_#FDE047] transition-all duration-200 hover:-translate-y-1 hover:-translate-x-1 hover:shadow-[12px_12px_0px_#FDE047]">
			<div>
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
							onClick={() => console.log("Share clicked")}
							className="flex shrink-0 items-center justify-center rounded-sm border-2 border-transparent p-2 text-black transition-all duration-200 hover:-translate-y-0.5 hover:border-black hover:bg-[#B8D8FF] hover:shadow-[4px_4px_0px_black] active:translate-y-0 active:shadow-none"
						>
							<Share size="sm" />
						</button>
						<button
							onClick={() => console.log("Delete clicked")}
							className="flex shrink-0 items-center justify-center rounded-sm border-2 border-transparent p-2 text-black transition-all duration-200 hover:-translate-y-0.5 hover:border-black hover:bg-[#FCA5A5] hover:shadow-[4px_4px_0px_black] active:translate-y-0 active:shadow-none"
						>
							<Delete size="sm" />
						</button>
					</div>
				</div>

				{content && (
					<div className="mt-5 text-base font-medium leading-relaxed text-neutral-700">
						<p className="line-clamp-6 wrap-break-word">
							{content}
						</p>
					</div>
				)}
			</div>

			{tags.length > 0 && (
				<div className="mt-5 flex flex-wrap gap-2 border-t-2 border-neutral-100 pt-4">
					{tags.map((tag, idx) => {
						const name = typeof tag === "string" ? tag : tag.name;
						const colorClass = getStableColorClass(name);

						return (
							<span
								key={
									typeof tag === "object"
										? tag._id || idx
										: idx
								}
								className={`${colorClass} inline-flex items-center rounded-sm border-2 border-black px-2.5 py-0.5 text-xs font-bold text-black shadow-[2px_2px_0px_black] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[4px_4px_0px_black]`}
							>
								#{name.toLowerCase()}
							</span>
						);
					})}
				</div>
			)}
		</div>
	);
}
