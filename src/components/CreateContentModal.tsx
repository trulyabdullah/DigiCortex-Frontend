import type { Dispatch, SetStateAction } from "react";
import { CreateCard } from "./CreateCard";

interface ContentModalProps {
	open: boolean;
	setOpen: Dispatch<SetStateAction<boolean>>;
}

export function CreateContentModal({ open, setOpen }: ContentModalProps) {
	return (
		<>
			{open && (
				<div className="min-h-lvh min-w-lvw backdrop-blur-sm fixed top-0 left-0 flex justify-center items-center">
					<CreateCard
						onClose={() => {
							setOpen(false);
						}}
					/>
				</div>
			)}
		</>
	);
}
