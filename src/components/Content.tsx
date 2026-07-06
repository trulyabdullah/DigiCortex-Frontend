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
				headers: {
					Authorization: token ? `Bearer ${token}` : "",
				},
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
				headers: {
					Authorization: token ? `Bearer ${token}` : "",
				},
			});
			const fetchedContent = response.data.data || [];
			setContentList(fetchedContent);
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

			{isLoading ? (
				<div className="flex items-center justify-center min-h-[40vh]">
					<p className="text-lg font-black text-black animate-pulse uppercase tracking-wider">
						Loading content...
					</p>
				</div>
			) : contentList.length > 0 ? (
				<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-5 animate-fadeIn">
					{contentList.map((item) => {
						const targetId = item._id || item.id || "";

						return (
							<Card
								id={targetId}
								key={targetId}
								title={item.title}
								content={item.content}
								tags={item.tags}
								onDelete={handleDeleteRequest}
							/>
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
