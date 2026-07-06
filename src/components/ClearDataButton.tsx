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
				className="border-2 border-black bg-white px-5 py-2.5 text-xs font-black tracking-wider text-black shadow-[4px_4px_0px_black] hover:bg-rose-50 hover:shadow-[6px_6px_0px_black] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all rounded-sm"
			>
				Delete Account
			</button>

			{isOpen && (
				<div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
					<div
						className="absolute inset-0"
						onClick={() => !isWiping && setIsOpen(false)}
					/>

					<div className="relative w-full max-w-md border-[3px] border-black bg-white p-6 shadow-[8px_8px_0px_black] rounded-md z-10">
						<h3 className="text-xl font-black text-black uppercase tracking-tight mb-2">
							Are you absolutely sure?
						</h3>

						<p className="text-neutral-600 font-medium text-sm leading-relaxed mb-6">
							This will permanently delete all your cards, saved
							tags and account data from our database. This action
							is irreversible.
						</p>

						<div className="flex items-center justify-end gap-3">
							<button
								disabled={isWiping}
								onClick={() => setIsOpen(false)}
								className="border-2 border-transparent px-4 py-2 font-bold text-neutral-500 hover:text-black tracking-wider transition-colors disabled:opacity-50"
							>
								Cancel
							</button>

							<button
								disabled={isWiping}
								onClick={handleWipeData}
								className="border-2 border-black bg-rose-500 px-5 py-2 font-black tracking-wider text-white shadow-[3px_3px_0px_black] hover:bg-rose-600 hover:shadow-[4px_4px_0px_black] active:translate-x-px active:translate-y-px active:shadow-none transition-all rounded-sm disabled:opacity-50"
							>
								{isWiping
									? "Wiping..."
									: "Yes, Delete Everything"}
							</button>
						</div>
					</div>
				</div>
			)}
		</>
	);
}
