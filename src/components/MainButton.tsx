import { useState, type Dispatch, type SetStateAction } from "react";
import { Plus } from "../icons/Plus";
import { Share } from "../icons/Share";
import { Button } from "./Button";
import { ShareModal } from "./ShareModal";
import { ClearDataButton } from "./ClearDataButton";

interface MainButtonProp {
	setIsModalOpen: Dispatch<SetStateAction<boolean>>;
	onRefresh: () => void;
	onError: (message: string) => void;
}

export function MainButton({
	setIsModalOpen,
	onRefresh,
	onError,
}: MainButtonProp) {
	const [isShareModalOpen, setIsShareModalOpen] = useState(false);

	return (
		<div className="mb-4 flex justify-end gap-2 flex-col sm:flex-row">
			<Button
				variant="primary"
				size="sm"
				startIcon={<Plus size="sm" />}
				onClick={() => setIsModalOpen(true)}
			>
				Add Content
			</Button>

			<Button
				variant="secondary"
				size="sm"
				startIcon={<Share size="sm" />}
				onClick={() => setIsShareModalOpen(true)}
			>
				Share Brain
			</Button>

			<ClearDataButton
				onSuccess={() => {
					onRefresh();
				}}
				onError={(msg) => {
					onError(msg);
				}}
			/>

			<ShareModal
				isOpen={isShareModalOpen}
				onClose={() => setIsShareModalOpen(false)}
			/>
		</div>
	);
}
