export function SuccessOverlay() {
	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center bg-white/40 backdrop-blur-sm animate-fadeIn">
			<div className="flex animate-[popIn_0.4s_cubic-bezier(0.175,0.885,0.32,1.275)_forwards] flex-col items-center justify-center gap-4 rotate-3 rounded-sm border-4 border-black bg-[#86EFAC] p-12 shadow-[16px_16px_0px_black]">
				<div className="flex h-20 w-20 items-center justify-center rounded-full border-4 border-black bg-white">
					<svg
						className="h-10 w-10 text-black"
						fill="none"
						strokeWidth="4"
						stroke="currentColor"
						viewBox="0 0 24 24"
					>
						<path
							strokeLinecap="square"
							strokeLinejoin="miter"
							d="M5 13l4 4L19 7"
						/>
					</svg>
				</div>
				<h2 className="text-3xl font-black uppercase tracking-widest text-black">
					Verified
				</h2>
			</div>
		</div>
	);
}
