import { useEffect, useState } from "react";
import axios from "axios";
import { Card } from "./Card";
import { BACKEND_URL } from "../config";
import { ErrorToast } from "./ErrorToast";
import { DeleteConfirmModal } from "./DeleteConfirmModal";

interface ContentItem {
	_id?: string;
	id?: string;
	title: string;
	content: string;
	tags: Array<{ _id: string; name: string } | string>;
}

interface ContentProps {
	refreshTrigger?: number;
}

export function Content({ refreshTrigger = 0 }: ContentProps) {
	const [contentList, setContentList] = useState<ContentItem[]>([]);
	const [isLoading, setIsLoading] = useState(true);
	const [errorMessage, setErrorMessage] = useState<string | null>(null);
	const [activeDelete, setActiveDelete] = useState<{
		id: string;
		title: string;
	} | null>(null);

	const [activePreview, setActivePreview] = useState<ContentItem | null>(
		null,
	);

	function handleDeleteRequest(id: string) {
		const targetItem = contentList.find(
			(item) => (item._id || item.id) === id,
		);
		if (targetItem) {
			setActiveDelete({ id, title: targetItem.title });
		}
	}

	async function executeDelete(id: string) {
		try {
			const token = localStorage.getItem("token");
			await axios.delete(`${BACKEND_URL}/api/v1/content/${id}`, {
				headers: { Authorization: token ? `Bearer ${token}` : "" },
			});
			getData();
		} catch (error: any) {
			console.error("Delete failed:", error);
			setErrorMessage(
				error.response?.data?.message || "Failed to delete item.",
			);
		}
	}

	async function getData() {
		setIsLoading(true);
		try {
			const token = localStorage.getItem("token");
			const response = await axios.get(`${BACKEND_URL}/api/v1/content`, {
				headers: { Authorization: token ? `Bearer ${token}` : "" },
			});
			setContentList(response.data.data || []);
		} catch (error: any) {
			console.error("Failed to fetch content:", error);
			setErrorMessage(
				error.response?.data?.message || "Could not load your content.",
			);
		} finally {
			setIsLoading(false);
		}
	}

	useEffect(() => {
		getData();
	}, [refreshTrigger]);

	const handleCardClick = (e: React.MouseEvent, item: ContentItem) => {
		const target = e.target as HTMLElement;
		if (target.closest("button")) return;
		setActivePreview(item);
	};

	return (
		<div className="p-4 space-y-4">
			{errorMessage && (
				<ErrorToast
					message={errorMessage}
					onClose={() => setErrorMessage(null)}
				/>
			)}

			<DeleteConfirmModal
				isOpen={activeDelete !== null}
				title={activeDelete?.title || ""}
				onConfirm={() => {
					if (activeDelete) {
						executeDelete(activeDelete.id);
						setActiveDelete(null);
					}
				}}
				onCancel={() => setActiveDelete(null)}
			/>

			{activePreview && (
				<div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm transition-opacity duration-200">
					<div
						className="absolute inset-0"
						onClick={() => setActivePreview(null)}
					/>
					<div className="relative w-full max-w-2xl border-[3px] border-black bg-white p-8 shadow-[10px_10px_0px_black] max-h-[85vh] flex flex-col overflow-hidden rounded-md z-10">
						<div className="flex items-start justify-between gap-6 pb-4 border-b border-neutral-200">
							<h2 className="text-2xl font-black text-black tracking-tight wrap-break-word max-w-[85%]">
								{activePreview.title}
							</h2>
							<button
								onClick={() => setActivePreview(null)}
								className="text-neutral-400 hover:text-black transition-colors p-1 shrink-0"
								aria-label="Close preview"
							>
								<svg
									className="w-6 h-6"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
									strokeWidth={2.5}
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										d="M6 18L18 6M6 6l12 12"
									/>
								</svg>
							</button>
						</div>

						<div className="flex-1 overflow-y-auto py-6 pr-2">
							<p className="text-neutral-800 font-medium text-base whitespace-pre-wrap leading-relaxed wrap-break-word tracking-wide">
								{activePreview.content}
							</p>
						</div>

						<div className="pt-5 border-t border-neutral-200 flex flex-col sm:flex-row gap-4 justify-between sm:items-center">
							<div className="flex flex-wrap gap-1.5">
								{activePreview.tags &&
								activePreview.tags.length > 0 ? (
									activePreview.tags.map((tag, idx) => {
										const name =
											typeof tag === "string"
												? tag
												: tag.name;
										return (
											<span
												key={idx}
												className="inline-flex items-center bg-neutral-100 border border-neutral-200 px-2.5 py-1 text-xs font-bold text-neutral-600 rounded-sm"
											>
												#{name.toLowerCase().trim()}
											</span>
										);
									})
								) : (
									<span className="text-xs font-semibold text-neutral-400 italic">
										No tags
									</span>
								)}
							</div>

							<button
								onClick={() => setActivePreview(null)}
								className="border-2 border-black bg-[#FDE047] px-6 py-2 text-xs font-black uppercase tracking-wider shadow-[3px_3px_0px_black] hover:bg-[#fadc23] hover:shadow-[4px_4px_0px_black] active:translate-x-px active:translate-y-px active:shadow-none transition-all rounded-sm"
							>
								Close
							</button>
						</div>
					</div>
				</div>
			)}

			{isLoading ? (
				<div className="flex items-center justify-center min-h-[40vh]">
					<p className="text-lg font-black text-black animate-pulse uppercase tracking-wider">
						Loading content...
					</p>
				</div>
			) : contentList.length > 0 ? (
				<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-5">
					{contentList.map((item) => {
						const targetId = item._id || item.id || "";
						return (
							<div
								key={targetId}
								onClick={(e) => handleCardClick(e, item)}
								className="cursor-pointer"
							>
								<Card
									id={targetId}
									title={item.title}
									content={item.content}
									tags={item.tags}
									onDelete={handleDeleteRequest}
								/>
							</div>
						);
					})}
				</div>
			) : (
				<div className="flex flex-col items-center justify-center min-h-[40vh] border-[3px] border-dashed border-black rounded-md p-8 bg-neutral-50">
					<p className="text-xl font-black text-black uppercase mb-2">
						Your library is empty
					</p>
					<p className="text-neutral-500 text-sm font-medium">
						Click the add button to create your very first card!
					</p>
				</div>
			)}
		</div>
	);
}
