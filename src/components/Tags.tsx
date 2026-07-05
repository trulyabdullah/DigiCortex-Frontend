import { Tag } from "./Tag";

export function Tags() {
	return (
		<div className="space-y-8 animate-fadeIn">
			<div className="rounded-md border-[3px] border-black bg-[#FDE047] p-6 shadow-[6px_6px_0px_black]">
				<h1 className="text-3xl font-black text-black tracking-wide">
					TAG MANAGEMENT
				</h1>
			</div>

			<div className="grid grid-cols-1">
				<div className="rounded-md border-[3px] border-black bg-white p-5 shadow-[8px_8px_0px_black]">
					<h2 className="text-xl font-black text-black mb-4 pb-2 border-b-2 border-black">
						Active Tags
					</h2>
					<div className="flex flex-wrap gap-3">
						<Tag text="react" variant="purple" />
						<Tag text="tailwind" variant="pink" />
						<Tag text="webdev" variant="teal" />
						<Tag text="frontend" variant="purple" />
					</div>
				</div>
			</div>
		</div>
	);
}
