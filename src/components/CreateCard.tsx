import { Close } from "../icons/Close";
import { Save } from "../icons/Save";
import { Write } from "../icons/Write";
import TextareaAutosize from "react-textarea-autosize";

interface CreateCardProp {
	title: string;
	content?: string;
	onClose: () => void;
}

export function CreateCard({ title, onClose }: CreateCardProp) {
	return (
		<div className="w-10/12 max-w-lg flex flex-col gap-4 rounded-xl border border-gray-200 bg-white p-5 shadow-md transition-shadow duration-300 hover:shadow-2xl">
			<div className="flex items-center justify-between gap-4">
				<div className="flex items-center gap-3">
					<div className="rounded-lg bg-gray-100 p-2 text-gray-700">
						<Write size="sm" />
					</div>
					<div className="font-semibold text-gray-900">{title}</div>
				</div>

				<div className="flex gap-2">
					<button
						onClick={() => {
							console.log("clik");
						}}
						className="rounded-full p-2 text-gray-500 transition-all duration-200 hover:bg-blue-100 hover:text-blue-600"
					>
						<Save size="sm" />
					</button>
					<button
						onClick={onClose}
						className="rounded-full p-2 text-gray-500 transition-all duration-200 hover:bg-red-100 hover:text-red-600"
					>
						<Close size="sm" />
					</button>
				</div>
			</div>
			<div className="overflow-hidden rounded-lg">
				<TextareaAutosize
					minRows={3}
					maxRows={10}
					placeholder="Write something..."
					className="leading-6 custom-scrollbar w-full resize-none rounded-lg border border-gray-200 p-3 text-sm outline-none focus:border-blue-500"
				/>
			</div>
		</div>
	);
}
