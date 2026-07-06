import type { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	children: React.ReactNode;
	variant: "primary" | "secondary" | "tertiary";
	size: "sm" | "md" | "lg";
	startIcon?: React.ReactNode;
	endIcon?: React.ReactNode;
}

const variantClasses = {
	primary: "bg-[#5EEAD4] text-black",
	secondary: "bg-white text-black hover:bg-[#C4B5FD]",
	tertiary: "bg-white text-black hover:bg-[#FCA5A5]",
};

const sizeClasses = {
	sm: "px-4 py-2 text-sm",
	md: "px-5 py-3 text-base",
	lg: "px-7 py-4 text-lg",
};

export const Button = ({
	children,
	variant,
	size,
	startIcon,
	endIcon,
	...props
}: ButtonProps) => {
	return (
		<button
			className={`${variantClasses[variant]} ${sizeClasses[size]} inline-flex items-center justify-center gap-2 rounded-sm border-[3px] border-black font-bold shadow-[3px_3px_0px_black] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[5px_5px_0px_black] active:translate-y-0 active:shadow-none disabled:opacity-50 disabled:pointer-events-none`}
			{...props}
		>
			{startIcon && <span className="shrink-0">{startIcon}</span>}
			<span>{children}</span>
			{endIcon && <span className="shrink-0">{endIcon}</span>}
		</button>
	);
};
