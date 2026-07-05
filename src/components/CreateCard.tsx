import { Close } from "../icons/Close";
import { Save } from "../icons/Save";
import { Write } from "../icons/Write";
import TextareaAutosize from "react-textarea-autosize";

interface CreateCardProp {
	onClose: () => void;
}

export function CreateCard({ onClose }: CreateCardProp) {
	return (
		<div className="flex w-full max-w-lg flex-col gap-5 rounded-md border-[3px] border-black bg-white p-6 shadow-[10px_10px_0px_#E9D5FF] transition-all duration-300">
			<div className="flex items-start justify-between gap-2 sm:gap-4">
				<div className="flex flex-1 items-center gap-3">
					<div className="rounded-sm border-2 border-black bg-[#FEF08A] p-2 text-black">
						<Write size="sm" />
					</div>
					<div className="flex-1">
						<TextareaAutosize
							maxLength={50}
							maxRows={1}
							placeholder="Enter title"
							className="w-full resize-none rounded-sm border-2 border-black bg-[#FDFDFD] px-4 py-3 text-lg font-black text-black outline-none transition-all duration-200 placeholder:text-neutral-400 focus:-translate-y-0.5 focus:bg-white focus:shadow-[4px_4px_0px_#B8D8FF]"
						/>
					</div>
				</div>

				<div className="flex gap-2">
					<button
						onClick={() => {
							console.log("clik");
						}}
						className="rounded-sm border-2 border-transparent p-2 text-black transition-all duration-200 hover:-translate-y-0.5 hover:border-black hover:bg-[#86EFAC] hover:shadow-[4px_4px_0px_black] active:translate-y-0 active:shadow-none"
					>
						<Save size="sm" />
					</button>
					<button
						onClick={onClose}
						className="rounded-sm border-2 border-transparent p-2 text-black transition-all duration-200 hover:-translate-y-0.5 hover:border-black hover:bg-[#FCA5A5] hover:shadow-[4px_4px_0px_black] active:translate-y-0 active:shadow-none"
					>
						<Close size="sm" />
					</button>
				</div>
			</div>

			<div className="w-full">
				<TextareaAutosize
					minRows={5}
					maxRows={12}
					maxLength={50000}
					placeholder="Write something..."
					className="custom-scrollbar w-full resize-none rounded-sm border-2 border-black bg-[#FDFDFD] px-4 py-4 text-base font-medium leading-relaxed text-neutral-800 outline-none transition-all duration-200 placeholder:text-neutral-400 focus:-translate-y-0.5 focus:bg-white focus:shadow-[4px_4px_0px_#B8D8FF]"
				/>
			</div>
		</div>
	);
}
