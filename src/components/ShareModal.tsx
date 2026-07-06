import { useState, useEffect } from "react";
import { Button } from "./Button";
import { BACKEND_URL } from "../config";

interface ShareModalProps {
	isOpen: boolean;
	onClose: () => void;
}

export function ShareModal({ isOpen, onClose }: ShareModalProps) {
	const [isShared, setIsShared] = useState(false);
	const [shareUrl, setShareUrl] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const [isCopied, setIsCopied] = useState(false);
	const [errorMessage, setErrorMessage] = useState("");

	useEffect(() => {
		const savedHash = localStorage.getItem("brain_share_hash");
		if (savedHash) {
			setIsShared(true);
			setShareUrl(`${window.location.origin}/share/${savedHash}`);
		}
	}, []);

	if (!isOpen) return null;

	const handleToggleShare = async () => {
		setIsLoading(true);
		setErrorMessage("");
		const token = localStorage.getItem("token");
		const nextShareState = !isShared;

		try {
			const response = await fetch(`${BACKEND_URL}/api/v1/brain/share`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization: token ? `Bearer ${token}` : "",
				},
				body: JSON.stringify({ share: nextShareState }),
			});

			const result = await response.json();

			if (!response.ok) {
				if (response.status === 409) {
					setErrorMessage(
						"A public link already exists for this account. Please reset or try again.",
					);
				} else {
					throw new Error(result.message || "Action failed");
				}
				return;
			}

			if (nextShareState) {
				const generatedUrl = `${window.location.origin}/share/${result.link}`;
				setShareUrl(generatedUrl);
				localStorage.setItem("brain_share_hash", result.link);
				setIsShared(true);
			} else {
				setShareUrl("");
				localStorage.removeItem("brain_share_hash");
				setIsShared(false);
			}
		} catch (error) {
			console.error("Share configuration error:", error);
			setErrorMessage(
				"Server communication failed. Please try again later.",
			);
		} finally {
			setIsLoading(false);
		}
	};

	const copyToClipboard = async () => {
		if (!shareUrl) return;
		try {
			await navigator.clipboard.writeText(shareUrl);
			setIsCopied(true);
			setTimeout(() => setIsCopied(false), 2000);
		} catch (err) {
			setErrorMessage("Failed to copy link to clipboard.");
		}
	};

	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
			<div className="absolute inset-0" onClick={onClose} />

			<div className="relative w-full max-w-md border-[3px] border-black bg-white p-6 shadow-[6px_6px_0px_black] transition-all animate-fadeIn">
				<div className="flex items-center justify-between border-b-2 border-black pb-4 mb-6">
					<h2 className="text-xl font-black tracking-tight uppercase text-black">
						Share Your Brain
					</h2>
					<button
						onClick={onClose}
						className="w-8 h-8 flex items-center justify-center border-2 border-black bg-white text-sm font-black hover:bg-rose-300 hover:shadow-[2px_2px_0px_black] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all"
					>
						✕
					</button>
				</div>

				<div className="space-y-5">
					<div className="flex items-center justify-between border-2 border-black bg-zinc-50 p-4 shadow-[4px_4px_0px_black]">
						<div>
							<p className="font-bold text-sm text-black uppercase tracking-wide">
								Public Access
							</p>
							<p className="text-xs text-zinc-600 font-medium mt-0.5">
								{isShared
									? "Anyone with the link can view."
									: "Your workspace is private."}
							</p>
						</div>

						<button
							onClick={handleToggleShare}
							disabled={isLoading}
							className={`relative h-7 w-14 border-2 border-black transition-colors duration-150 disabled:opacity-50 shadow-[2px_2px_0px_black] active:translate-x-px active:translate-y-px active:shadow-none ${
								isShared ? "bg-[#5EEAD4]" : "bg-zinc-200"
							}`}
						>
							<span
								className={`absolute top-0.5 bottom-0.5 w-5 border-2 border-black bg-white transition-all duration-150 ${
									isShared ? "left-7" : "left-0.5"
								}`}
							/>
						</button>
					</div>

					{isShared && shareUrl && (
						<div className="space-y-2 animate-fadeIn pt-1">
							<label className="block text-xs font-bold uppercase tracking-wider text-black">
								Public URL
							</label>
							<div className="flex gap-2">
								<input
									type="text"
									readOnly
									value={shareUrl}
									className="flex-1 border-2 border-black bg-white px-3 py-2 text-sm font-medium text-zinc-800 outline-none select-all shadow-[3px_3px_0px_black] transition-all focus:translate-x-px focus:translate-y-px focus:shadow-[2px_2px_0px_black]"
								/>
								<Button
									variant="primary"
									size="sm"
									onClick={copyToClipboard}
									className="border-2 border-black bg-[#5EEAD4] font-black uppercase text-xs px-4 shadow-[3px_3px_0px_black] hover:bg-[#3bf1d6] active:translate-x-0.75 active:translate-y-0.75 active:shadow-none transition-all"
								>
									{isCopied ? "Copied!" : "Copy"}
								</Button>
							</div>
						</div>
					)}

					{errorMessage && (
						<div className="border-2 border-black bg-rose-50 p-3 text-xs font-bold text-rose-700 shadow-[3px_3px_0px_black] flex items-center gap-2">
							<span>⚠️</span>
							<span>{errorMessage}</span>
						</div>
					)}
				</div>

				<div className="mt-8 flex justify-end">
					<button
						onClick={onClose}
						className="border-2 border-black bg-white px-5 py-2 text-xs font-black uppercase tracking-wider transition-all hover:-translate-y-0.5 hover:shadow-[4px_4px_0px_black] active:translate-y-0 active:shadow-none"
					>
						Close Settings
					</button>
				</div>
			</div>
		</div>
	);
}
