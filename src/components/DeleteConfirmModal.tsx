interface DeleteConfirmModalProps {
	isOpen: boolean;
	title: string;
	onConfirm: () => void;
	onCancel: () => void;
}

export function DeleteConfirmModal({
	isOpen,
	title,
	onConfirm,
	onCancel,
}: DeleteConfirmModalProps) {
	if (!isOpen) return null;

	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs">
			<div className="w-full max-w-md transform rounded-md border-[3px] border-black bg-white p-6 shadow-[8px_8px_0px_black] transition-all duration-200 ease-out">
				<div className="mb-3 flex items-center gap-3">
					<h3 className="text-xl font-black uppercase tracking-wide text-black">
						Confirm Action
					</h3>
				</div>

				<p className="text-sm font-medium leading-relaxed text-neutral-700">
					Are you sure you want to delete{" "}
					<span className="font-black text-black">"{title}"</span>?
					This action cannot be undone.
				</p>

				<div className="mt-6 flex justify-end gap-3">
					<button
						onClick={onCancel}
						className="rounded-sm border-2 border-black bg-[#FCA5A5] px-4 py-2 text-xs font-black uppercase tracking-wider text-black shadow-[3px_3px_0px_black] transition-all duration-150 hover:-translate-y-0.5 hover:shadow-[5px_5px_0px_black] active:translate-y-0 active:shadow-none"
					>
						No
					</button>

					<button
						onClick={onConfirm}
						className="rounded-sm border-2 border-black bg-[#86EFAC] px-4 py-2 text-xs font-black uppercase tracking-wider text-black shadow-[3px_3px_0px_black] transition-all duration-150 hover:-translate-y-0.5 hover:shadow-[5px_5px_0px_black] active:translate-y-0 active:shadow-none"
					>
						Yes
					</button>
				</div>
			</div>
		</div>
	);
}
