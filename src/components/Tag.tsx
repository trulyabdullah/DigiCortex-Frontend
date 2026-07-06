import type { HTMLAttributes } from "react";

interface TagProps extends HTMLAttributes<HTMLDivElement> {
	text: string;
	variant?: "purple" | "pink" | "teal" | "yellow";
}

const variantClasses = {
	teal: "bg-[#5EEAD4]",
	yellow: "bg-[#FDE047]",
	purple: "bg-[#C4B5FD]",
	pink: "bg-[#F9A8D4]",
};

export const Tag = ({ text, variant = "purple", ...props }: TagProps) => {
	return (
		<div
			className={`${variantClasses[variant]} inline-flex items-center justify-center rounded-sm border-2 border-black px-3 py-1 text-sm font-bold text-black shadow-[3px_3px_0px_black] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[5px_5px_0px_black]`}
			{...props}
		>
			<span>#{text}</span>
		</div>
	);
};
