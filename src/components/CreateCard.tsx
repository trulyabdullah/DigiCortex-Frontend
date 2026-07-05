import { Close } from "../icons/Close";
import { Save } from "../icons/Save";
import { Write } from "../icons/Write";
import TextareaAutosize from "react-textarea-autosize";

interface CreateCardProp {
	onClose: () => void;
}

export function CreateCard({ onClose }: CreateCardProp) {
	return (
		<div className="w-10/12 max-w-lg flex flex-col gap-4 rounded-xl border border-gray-200 bg-white p-4 shadow-md transition-shadow duration-300 hover:shadow-2xl">
			<div className="flex items-center gap-1 sm:gap-2">
				<div className="flex items-center flex-1 gap-1">
					<div className="rounded-full p-2 text-gray-500">
						<Write size="sm" />
					</div>
					<div className="font-semibold text-gray-900 flex-1">
						<TextareaAutosize
							maxLength={50}
							maxRows={1}
							placeholder="Enter title"
							className="leading-6 custom-scrollbar w-full resize-none rounded-lg border border-gray-200 p-2 text-sm outline-none focus:border-blue-500"
						/>
					</div>
				</div>

				<div className="flex">
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
					maxLength={50000}
					placeholder="Write something..."
					className="leading-6 custom-scrollbar w-full resize-none rounded-lg border border-gray-200 p-3 text-sm outline-none focus:border-blue-500"
				/>
			</div>
		</div>
	);
}
