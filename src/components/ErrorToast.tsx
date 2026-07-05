import { useEffect, useState } from "react";

interface ErrorToastProps {
	message: string;
	onClose: () => void;
	duration?: number;
}

export function ErrorToast({
	message,
	onClose,
	duration = 4000,
}: ErrorToastProps) {
	const [progress, setProgress] = useState(100);

	useEffect(() => {
		const intervalTime = 50;
		const steps = duration / intervalTime;
		const stepAmount = 100 / steps;

		const interval = setInterval(() => {
			setProgress((prev) => Math.max(prev - stepAmount, 0));
		}, intervalTime);

		const timeout = setTimeout(() => {
			onClose();
		}, duration);

		return () => {
			clearInterval(interval);
			clearTimeout(timeout);
		};
	}, [duration, onClose]);

	return (
		<div className="fixed right-6 top-6 z-50 flex w-80 animate-[slideIn_0.3s_ease-out] flex-col overflow-hidden rounded-sm border-[3px] border-black bg-[#FCA5A5] shadow-[6px_6px_0px_black]">
			<div className="p-4 font-bold text-black">
				<div className="flex items-center gap-2">
					<span className="flex h-6 w-6 shrink-0 items-center justify-center border-2 border-black bg-white text-xs">
						!
					</span>
					<p>{message}</p>
				</div>
			</div>
			<div className="h-1.5 w-full bg-black/20">
				<div
					className="h-full bg-black transition-all duration-75 ease-linear"
					style={{ width: `${progress}%` }}
				/>
			</div>
		</div>
	);
}
