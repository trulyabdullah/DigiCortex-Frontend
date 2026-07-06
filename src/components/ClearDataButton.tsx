import { useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "../config";

interface WipeDataProps {
	onSuccess?: () => void;
	onError?: (message: string) => void;
}

export function ClearDataButton({ onSuccess, onError }: WipeDataProps) {
	const [isOpen, setIsOpen] = useState(false);
	const [isWiping, setIsWiping] = useState(false);

	const handleWipeData = async () => {
		setIsWiping(true);
		try {
			const token = localStorage.getItem("token");
			await axios.delete(`${BACKEND_URL}/api/v1/delete`, {
				headers: { Authorization: token ? `Bearer ${token}` : "" },
			});

			setIsOpen(false);
			if (onSuccess) onSuccess();
		} catch (error: any) {
			console.error("Wipe failed:", error);
			if (onError) {
				onError(
					error.response?.data?.message ||
						"Failed to clear account data.",
				);
			}
		} finally {
			setIsWiping(false);
		}
	};

	return (
		<>
			<button
				onClick={() => setIsOpen(true)}
				className="rounded-sm border-[3px] border-black bg-white px-5 py-2 text-sm font-bold text-black shadow-[4px_4px_0px_black] transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#FCA5A5] hover:shadow-[6px_6px_0px_black] active:translate-y-0 active:shadow-none"
			>
				Delete Account
			</button>

			{isOpen && (
				<div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-xs">
					<div
						className="absolute inset-0"
						onClick={() => !isWiping && setIsOpen(false)}
					/>

					<div className="relative z-10 w-full max-w-sm rounded-md border-[3px] border-black bg-white p-6 shadow-[8px_8px_0px_#FCA5A5]">
						<h3 className="text-xl font-black text-black">
							Are you absolutely sure?
						</h3>

						<p className="mt-2 text-base font-medium leading-relaxed text-neutral-700">
							This will permanently delete all your cards, saved
							tags and account data from our database. This action
							is irreversible.
						</p>

						<div className="mt-6 flex justify-end gap-3">
							<button
								disabled={isWiping}
								onClick={() => setIsOpen(false)}
								className="rounded-sm border-2 border-black bg-white px-4 py-2 text-sm font-bold text-black shadow-[3px_3px_0px_black] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[5px_5px_0px_black] active:translate-y-0 active:shadow-none disabled:opacity-50 disabled:hover:translate-y-0 disabled:hover:shadow-[3px_3px_0px_black]"
							>
								Cancel
							</button>

							<button
								disabled={isWiping}
								onClick={handleWipeData}
								className="rounded-sm border-2 border-black bg-[#FCA5A5] px-4 py-2 text-sm font-bold text-black shadow-[3px_3px_0px_black] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[5px_5px_0px_black] active:translate-y-0 active:shadow-none disabled:opacity-50 disabled:hover:translate-y-0 disabled:hover:shadow-[3px_3px_0px_black]"
							>
								{isWiping ? "Wiping..." : "Delete Everything"}
							</button>
						</div>
					</div>
				</div>
			)}
		</>
	);
}
