import { useRef, type Dispatch, type SetStateAction } from "react";
import { CreateCard } from "./CreateCard";

interface ContentModalProps {
	open: boolean;
	setOpen: Dispatch<SetStateAction<boolean>>;
}

export function CreateContentModal({ open, setOpen }: ContentModalProps) {
	const titleRef = useRef<HTMLTextAreaElement>(null);
	const contentRef = useRef<HTMLTextAreaElement>(null);
	const tagRef = useRef<HTMLInputElement>(null);

	return (
		<>
			{open && (
				<div
					className="fixed left-0 top-0 z-50 flex min-h-lvh min-w-lvw items-center justify-center bg-black/40 p-4 backdrop-blur-sm"
					onClick={(e) => {
						if (e.target === e.currentTarget) {
							setOpen(false);
						}
					}}
				>
					<CreateCard
						onClose={() => {
							setOpen(false);
						}}
						titleRef={titleRef}
						contentRef={contentRef}
						tagRef={tagRef}
					/>
				</div>
			)}
		</>
	);
}
