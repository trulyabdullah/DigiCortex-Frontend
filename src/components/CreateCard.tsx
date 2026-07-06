import { useState, type KeyboardEvent } from "react";
import { Close } from "../icons/Close";
import { Save } from "../icons/Save";
import { Write } from "../icons/Write";
import { ErrorToast } from "./ErrorToast";
import TextareaAutosize from "react-textarea-autosize";
import axios from "axios";
import { BACKEND_URL } from "../config";

interface CreateCardProp {
	onClose: () => void;
	titleRef: React.RefObject<HTMLTextAreaElement | null>;
	contentRef: React.RefObject<HTMLTextAreaElement | null>;
	tagRef: React.RefObject<HTMLInputElement | null>;
	refresh: () => void;
}

interface TagItem {
	text: string;
	variant: "purple" | "pink" | "teal" | "yellow";
}

const variantClasses = {
	teal: "bg-[#5EEAD4]",
	yellow: "bg-[#FDE047]",
	purple: "bg-[#C4B5FD]",
	pink: "bg-[#F9A8D4]",
};

export function CreateCard({
	onClose,
	titleRef,
	contentRef,
	tagRef,
	refresh,
}: CreateCardProp) {
	const [tagsList, setTagsList] = useState<TagItem[]>([]);
	const [isLoading, setIsLoading] = useState(false);
	const [errorMessage, setErrorMessage] = useState<string | null>(null);

	const handleAddTag = () => {
		if (!tagRef.current) return;

		const newTagText = tagRef.current.value.trim().toLowerCase();

		if (newTagText && !tagsList.some((tag) => tag.text === newTagText)) {
			const colors: ("purple" | "pink" | "teal" | "yellow")[] = [
				"purple",
				"pink",
				"teal",
				"yellow",
			];
			const randomColor =
				colors[Math.floor(Math.random() * colors.length)];

			setTagsList((prev) => [
				...prev,
				{ text: newTagText, variant: randomColor },
			]);
			tagRef.current.value = "";
		}
	};

	const handleTagKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
		if (e.key === "Enter") {
			e.preventDefault();
			handleAddTag();
		}
	};

	const handleRemoveTag = (tagTextToRemove: string) => {
		setTagsList((prev) =>
			prev.filter((tag) => tag.text !== tagTextToRemove),
		);
	};

	const handleSaveContent = async () => {
		const title = titleRef.current?.value.trim();
		const content = contentRef.current?.value.trim();

		if (!title || !content) {
			setErrorMessage("Title and Content are required fields.");
			return;
		}

		setIsLoading(true);
		try {
			const token = localStorage.getItem("token");

			await axios.post(
				`${BACKEND_URL}/api/v1/content`,
				{
					title,
					content,
					tags: tagsList.map((tag) => tag.text),
				},
				{
					headers: {
						Authorization: token ? `Bearer ${token}` : "",
					},
				},
			);
			refresh();
			onClose();
		} catch (error: any) {
			console.error("Failed to save content:", error);
			setErrorMessage(
				error.response?.data?.message ||
					"Something went wrong while saving.",
			);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<>
			{errorMessage && (
				<ErrorToast
					message={errorMessage}
					onClose={() => setErrorMessage(null)}
				/>
			)}

			<div className="flex w-full max-w-lg flex-col gap-5 rounded-md border-[3px] border-black bg-white p-6 shadow-[10px_10px_0px_#E9D5FF] transition-all duration-300">
				<div className="flex items-start justify-between gap-2 sm:gap-4">
					<div className="flex flex-1 items-center gap-3">
						<div className="rounded-sm border-2 border-black bg-[#FEF08A] p-2 text-black">
							<Write size="sm" />
						</div>
						<div className="flex-1">
							<TextareaAutosize
								ref={titleRef}
								maxLength={50}
								maxRows={1}
								placeholder="Enter title"
								className="w-full resize-none rounded-sm border-2 border-black bg-[#FDFDFD] px-4 py-3 text-lg font-black text-black outline-none transition-all duration-200 placeholder:text-neutral-400 focus:-translate-y-0.5 focus:bg-white focus:shadow-[4px_4px_0px_#B8D8FF]"
							/>
						</div>
					</div>

					<div className="flex gap-2">
						<button
							onClick={handleSaveContent}
							disabled={isLoading}
							className="rounded-sm border-2 border-transparent p-2 text-black transition-all duration-200 hover:-translate-y-0.5 hover:border-black hover:bg-[#86EFAC] hover:shadow-[4px_4px_0px_black] active:translate-y-0 active:shadow-none disabled:opacity-50"
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
						ref={contentRef}
						minRows={5}
						maxRows={12}
						maxLength={50000}
						placeholder="Write something..."
						className="custom-scrollbar w-full resize-none rounded-sm border-2 border-black bg-[#FDFDFD] px-4 py-4 text-base font-medium leading-relaxed text-neutral-800 outline-none transition-all duration-200 placeholder:text-neutral-400 focus:-translate-y-0.5 focus:bg-white focus:shadow-[4px_4px_0px_#B8D8FF]"
					/>
				</div>

				<div className="flex flex-col gap-3 border-t-2 border-neutral-100 pt-4">
					<div className="flex gap-2">
						<input
							ref={tagRef}
							type="text"
							onKeyDown={handleTagKeyDown}
							placeholder="Add a tag..."
							className="flex-1 rounded-sm border-2 border-black bg-[#FDFDFD] px-4 py-2 text-sm font-bold text-black outline-none transition-all duration-200 placeholder:text-neutral-400 focus:-translate-y-0.5 focus:bg-white focus:shadow-[4px_4px_0px_#B8D8FF]"
						/>
						<button
							type="button"
							onClick={handleAddTag}
							className="rounded-sm border-2 border-black bg-[#93C5FD] px-5 py-2 text-sm font-black uppercase tracking-widest text-black transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[4px_4px_0px_black] active:translate-y-0 active:shadow-none"
						>
							ADD
						</button>
					</div>

					<div className="flex flex-wrap gap-2">
						{tagsList.map((tag) => (
							<span
								key={tag.text}
								className={`${variantClasses[tag.variant]} flex items-center gap-1.5 rounded-sm border-2 border-black px-2.5 py-1 text-xs font-bold text-black transition-all hover:-translate-y-0.5 hover:shadow-[2px_2px_0px_black]`}
							>
								#{tag.text.toUpperCase()}
								<button
									type="button"
									onClick={() => handleRemoveTag(tag.text)}
									className="flex items-center justify-center rounded-full p-0.5 transition-colors hover:bg-black/10"
								>
									<svg
										width="12"
										height="12"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										strokeWidth="3"
										strokeLinecap="round"
										strokeLinejoin="round"
									>
										<line
											x1="18"
											y1="6"
											x2="6"
											y2="18"
										></line>
										<line
											x1="6"
											y1="6"
											x2="18"
											y2="18"
										></line>
									</svg>
								</button>
							</span>
						))}
					</div>
				</div>
			</div>
		</>
	);
}
