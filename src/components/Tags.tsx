import { useEffect, useState } from "react";
import axios from "axios";
import { Tag } from "./Tag";
import { BACKEND_URL } from "../config";
import { ErrorToast } from "./ErrorToast";
interface TagData {
	name: string;
	variant: "purple" | "pink" | "teal" | "yellow";
}

export function Tags() {
	const [tags, setTags] = useState<TagData[]>([]);
	const [errorMessage, setErrorMessage] = useState<string | null>(null);

	useEffect(() => {
		async function getTags() {
			try {
				const token = localStorage.getItem("token");
				const response = await axios.get(`${BACKEND_URL}/api/v1/tags`, {
					headers: {
						Authorization: token ? `Bearer ${token}` : "",
					},
				});
				const fetchedTags: string[] = response.data.data || [];
				const colors: ("purple" | "pink" | "teal" | "yellow")[] = [
					"purple",
					"pink",
					"teal",
					"yellow",
				];
				const mappedTags = fetchedTags.map((tagName) => {
					const randomColor =
						colors[Math.floor(Math.random() * colors.length)];
					return {
						name: tagName,
						variant: randomColor,
					};
				});

				setTags(mappedTags);
			} catch (error: any) {
				console.error("Failed to fetch tags:", error);
				setErrorMessage(
					error.response?.data?.message || "Could not load tags.",
				);
			}
		}

		getTags();
	}, []);

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

			<div className="grid grid-cols-1">
				<div className="rounded-md border-[3px] border-black bg-white p-5 shadow-[8px_8px_0px_black]">
					<h2 className="text-xl font-black text-black mb-4 pb-2 border-b-2 border-black">
						Active Tags
					</h2>

					<div className="flex flex-wrap gap-3">
						{tags.length > 0 ? (
							tags.map((tag) => (
								<Tag
									key={tag.name}
									text={tag.name}
									variant={tag.variant}
								/>
							))
						) : (
							<p className="text-sm font-medium text-neutral-500 italic">
								No active tags found. Create content to start
								adding tags!
							</p>
						)}
					</div>
				</div>
			</div>
		</div>
	);
}
