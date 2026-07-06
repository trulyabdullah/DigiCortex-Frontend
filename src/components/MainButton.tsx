import type { Dispatch, SetStateAction } from "react";
import { Plus } from "../icons/Plus";
import { Share } from "../icons/Share";
import { Button } from "./Button";
import { Delete } from "../icons/Delete";

interface MainButtonProp {
	setIsModalOpen: Dispatch<SetStateAction<boolean>>;
}

export function MainButton({ setIsModalOpen }: MainButtonProp) {
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
				onClick={() => {}}
			>
				Share
			</Button>

			<Button
				variant="tertiary"
				size="sm"
				startIcon={<Delete size="sm" />}
				onClick={() => {}}
			>
				Delete Account
			</Button>
		</div>
	);
}
