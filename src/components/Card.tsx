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
		<div className="flex flex-col gap-4 rounded-xl border border-gray-200 bg-white p-5 shadow-md transition-shadow duration-300 hover:shadow-2xl max-w-sm">
			{/* whole of topbar */}
			<div className="flex items-center justify-between">
				<div className="flex items-center gap-3">
					{/* a simple document logo */}
					<div className="rounded-lg bg-gray-100 p-2 text-gray-700">
						<Document size="sm" />
					</div>
					{/* card title in topbar */}
					<div className="font-semibold text-gray-900">{title}</div>
				</div>

				<div className="flex gap-2">
					{/* share button */}
					<button
						onClick={() => {
							console.log("clik");
						}}
						className="rounded-full p-2 text-gray-500 transition-all duration-200 hover:bg-blue-100 hover:text-blue-600"
					>
						<Share size="sm" />
					</button>
					{/* delete button */}
					<button
						onClick={() => {
							console.log("clik");
						}}
						className="rounded-full p-2 text-gray-500 transition-all duration-200 hover:bg-red-100 hover:text-red-600"
					>
						<Delete size="sm" />
					</button>
				</div>
			</div>
			{content && (
				<div className="text-sm leading-6  text-gray-600">
					<p className="line-clamp-8">{content}</p>
				</div>
			)}
		</div>
	);
}
