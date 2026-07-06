import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Card } from "../components/Card";
import { BACKEND_URL } from "../config";

interface SharedContentItem {
	id: string;
	_id?: string;
	title: string;
	content: string;
	name?: string;
	tags: Array<{ _id: string; name: string } | string>;
}

export function SharePreview() {
	const { shareLink } = useParams<{ shareLink: string }>();
	const [contentList, setContentList] = useState<SharedContentItem[]>([]);
	const [username, setUsername] = useState<string>("GUEST");
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		async function fetchSharedBrain() {
			try {
				setIsLoading(true);
				const response = await axios.get(
					`${BACKEND_URL}/api/v1/brain/${shareLink}`,
				);

				const items = response.data.data || [];
				setContentList(items);

				if (items.length > 0 && items[0].name) {
					setUsername(items[0].name);
				}
			} catch (err: any) {
				console.error("Failed to load shared brain:", err);
				setError(
					err.response?.data?.message ||
						"This shared brain doesn't exist or has been deactivated.",
				);
			} finally {
				setIsLoading(false);
			}
		}

		if (shareLink) {
			fetchSharedBrain();
		}
	}, [shareLink]);

	if (isLoading) {
		return (
			<div className="flex min-h-screen items-center justify-center bg-[#F4F4F5]">
				<p className="animate-pulse text-xl font-black text-black uppercase tracking-wider">
					Assembling Shared Brain...
				</p>
			</div>
		);
	}

	if (error) {
		return (
			<div className="flex min-h-screen items-center justify-center bg-[#F4F4F5] p-6">
				<div className="max-w-md text-center rounded-md border-[3px] border-black bg-[#FCA5A5] p-8 shadow-[8px_8px_0px_black]">
					<h1 className="text-2xl font-black uppercase text-black mb-2">
						Link Expired
					</h1>
					<p className="font-medium text-neutral-800">{error}</p>
				</div>
			</div>
		);
	}

	return (
		<div className="min-h-screen bg-[#F4F4F5] p-6 md:p-12 lg:p-16">
			<div className="mx-auto max-w-7xl space-y-10">
				<div className="flex flex-col gap-3 rounded-md border-[3px] border-black bg-[#FDE047] p-8 shadow-[8px_8px_0px_black] sm:flex-row sm:items-center sm:justify-between">
					<div>
						<span className="inline-block rounded-sm border-2 border-black bg-white px-3 py-1 text-xs font-black uppercase text-black shadow-[2px_2px_0px_black] mb-3">
							Public Read-Only View
						</span>
						<h1 className="text-3xl md:text-4xl font-black uppercase tracking-wide text-black">
							{username.toUpperCase()}'S BRAIN
						</h1>
					</div>
				</div>

				{contentList.length > 0 ? (
					<div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
						{contentList.map((item) => {
							const cardId = item.id || item._id || "";
							return (
								<Card
									key={cardId}
									id={cardId}
									title={item.title}
									content={item.content}
									tags={item.tags}
								/>
							);
						})}
					</div>
				) : (
					<div className="flex flex-col items-center justify-center border-[3px] border-dashed border-black rounded-md p-12 bg-white shadow-[6px_6px_0px_black]">
						<p className="text-xl font-black text-black uppercase">
							No shared items
						</p>
						<p className="text-neutral-500 text-sm font-medium mt-1">
							This space exists, but there is no public content
							listed inside it right now.
						</p>
					</div>
				)}
			</div>
		</div>
	);
}
