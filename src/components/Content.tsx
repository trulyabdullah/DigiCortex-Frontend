import { useEffect, useState } from "react";
import axios from "axios";
import { Card } from "./Card";
import { BACKEND_URL } from "../config";
import { ErrorToast } from "./ErrorToast";

interface ContentItem {
	_id: string;
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

			{isLoading ? (
				<div className="flex items-center justify-center min-h-[40vh]">
					<p className="text-lg font-black text-black animate-pulse uppercase tracking-wider">
						Loading content...
					</p>
				</div>
			) : contentList.length > 0 ? (
				<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-5 animate-fadeIn">
					{contentList.map((item) => (
						<Card
							key={item._id}
							title={item.title}
							content={item.content}
							tags={item.tags}
						/>
					))}
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
