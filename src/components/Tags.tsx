import { useEffect, useState } from "react";
import axios from "axios";
import { Tag } from "./Tag";
import { BACKEND_URL } from "../config";
import { ErrorToast } from "./ErrorToast";

interface TagData {
	name: string;
	variant: "purple" | "pink" | "teal" | "yellow";
}

interface CardData {
	id: string;
	title: string;
	content: string;
	name: string;
	tags: string[];
}

export function Tags() {
	const [tags, setTags] = useState<TagData[]>([]);
	const [selectedTag, setSelectedTag] = useState<string | null>(null);
	const [cards, setCards] = useState<CardData[]>([]);
	const [isLoadingCards, setIsLoadingCards] = useState<boolean>(false);
	const [errorMessage, setErrorMessage] = useState<string | null>(null);
	const [activeModalCard, setActiveModalCard] = useState<CardData | null>(
		null,
	);

	useEffect(() => {
		async function getTags() {
			try {
				const token = localStorage.getItem("token");
				const response = await axios.get(`${BACKEND_URL}/api/v1/tags`, {
					headers: { Authorization: token ? `Bearer ${token}` : "" },
				});
				const fetchedTags: string[] = response.data.data || [];
				const colors: ("purple" | "pink" | "teal" | "yellow")[] = [
					"purple",
					"pink",
					"teal",
					"yellow",
				];
				const mappedTags = fetchedTags.map((tagName) => ({
					name: tagName,
					variant: colors[Math.floor(Math.random() * colors.length)],
				}));
				setTags(mappedTags);
			} catch (error: any) {
				setErrorMessage(
					error.response?.data?.message || "Could not load tags.",
				);
			}
		}
		getTags();
	}, []);

	async function handleTagClick(tagName: string) {
		if (selectedTag === tagName) {
			setSelectedTag(null);
			setCards([]);
			return;
		}
		setSelectedTag(tagName);
		setIsLoadingCards(true);
		try {
			const token = localStorage.getItem("token");
			const response = await axios.get(`${BACKEND_URL}/api/v1/content`, {
				params: { tag: tagName },
				headers: { Authorization: token ? `Bearer ${token}` : "" },
			});
			setCards(response.data.data || []);
		} catch (error: any) {
			setErrorMessage("Could not load cards for this tag.");
		} finally {
			setIsLoadingCards(false);
		}
	}

	return (
		<div className="space-y-8 animate-fadeIn">
			{errorMessage && (
				<ErrorToast
					message={errorMessage}
					onClose={() => setErrorMessage(null)}
				/>
			)}

			<div className="rounded-md border-[3px] border-black bg-[#FDE047] p-6 shadow-[6px_6px_0px_black]">
				<h1 className="text-3xl font-black text-black tracking-wide">
					TAG MANAGEMENT
				</h1>
			</div>

			<div className="grid grid-cols-1 gap-8">
				<div className="rounded-md border-[3px] border-black bg-white p-5 shadow-[8px_8px_0px_black]">
					<h2 className="text-xl font-black text-black mb-4 pb-2 border-b-2 border-black">
						Active Tags
					</h2>
					<div className="flex flex-wrap gap-4 pt-2">
						{tags.map((tag, idx) => (
							<div
								key={`tag-${tag.name}-${idx}`}
								onClick={() => handleTagClick(tag.name)}
								className="cursor-pointer"
							>
								<Tag text={tag.name} variant={tag.variant} />
							</div>
						))}
					</div>
				</div>

				{selectedTag && (
					<div className="space-y-4">
						<h2 className="text-2xl font-black">
							Cards tagged with: {selectedTag}
						</h2>
						{isLoadingCards ? (
							<p>Loading...</p>
						) : (
							<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
								{cards.map((card) => (
									<div
										key={card.id}
										onClick={() => setActiveModalCard(card)}
										className="border-2 border-black p-4 cursor-pointer bg-white"
									>
										<h3 className="font-bold">
											{card.title}
										</h3>
										<div className="flex flex-wrap gap-1 mt-2">
											{card.tags.map((tagName, i) => (
												<span
													key={i}
													className="text-xs font-bold px-2 bg-neutral-200"
												>
													#{tagName}
												</span>
											))}
										</div>
									</div>
								))}
							</div>
						)}
					</div>
				)}
			</div>

			{activeModalCard && (
				<div
					className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-fadeIn"
					onClick={() => setActiveModalCard(null)}
				>
					<div
						className="relative w-full max-w-2xl max-h-[85vh] flex flex-col rounded-md border-4 border-black bg-white p-6 shadow-[10px_10px_0px_black] animate-scaleUp"
						onClick={(e) => e.stopPropagation()}
					>
						<button
							onClick={() => setActiveModalCard(null)}
							className="absolute top-4 right-4 bg-[#F9A8D4] border-2 border-black px-2 py-1 text-xs font-black text-black rounded-sm shadow-[2px_2px_0px_black] hover:translate-y-px transition-all"
						>
							CLOSE [X]
						</button>

						<div className="mb-4 pr-16">
							<h2 className="text-2xl font-black text-black uppercase tracking-tight">
								{activeModalCard.title}
							</h2>
						</div>

						<div className="flex-1 overflow-y-auto text-sm text-neutral-800 font-medium whitespace-pre-wrap leading-relaxed pr-2 border-t-2 border-black pt-4 mb-6 custom-scrollbar">
							{activeModalCard.content}
						</div>

						<div className="flex flex-wrap gap-1.5 pt-3 border-t-2 border-dashed border-neutral-300">
							{activeModalCard.tags.map((tagName, i) => (
								<span
									key={i}
									className="text-xs font-bold px-2.5 py-1 bg-neutral-100 border-2 border-black rounded-sm"
								>
									#{tagName}
								</span>
							))}
						</div>
					</div>
				</div>
			)}
		</div>
	);
}
