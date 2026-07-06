import { useState, type Dispatch, type SetStateAction } from "react";
import { Plus } from "../icons/Plus";
import { Share } from "../icons/Share";
import { Button } from "./Button";
import { Delete } from "../icons/Delete";
import { ShareModal } from "./ShareModal";
interface MainButtonProp {
	setIsModalOpen: Dispatch<SetStateAction<boolean>>;
}

export function MainButton({ setIsModalOpen }: MainButtonProp) {
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

			<Button
				variant="tertiary"
				size="sm"
				startIcon={<Delete size="sm" />}
				onClick={() => {}}
			>
				Delete Account
			</Button>

			<ShareModal
				isOpen={isShareModalOpen}
				onClose={() => setIsShareModalOpen(false)}
			/>
		</div>
	);
}
