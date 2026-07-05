import type { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	children: React.ReactNode;
	variant: "primary" | "secondary";
	size: "sm" | "md" | "lg";
	startIcon?: React.ReactNode;
	endIcon?: React.ReactNode;
	onClick: () => void;
}

const variantClasses = {
	primary: "bg-[#5EEAD4] text-black",
	secondary: "bg-white text-black hover:bg-[#B8D8FF]",
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
	onClick,
	...props
}: ButtonProps) => {
	return (
		<button
			className={`${variantClasses[variant]} ${sizeClasses[size]} inline-flex items-center justify-center gap-2 rounded-md border-[3px] border-black font-bold transition-all duration-200 hover:-translate-y-1 hover:shadow-[5px_5px_0px_black] active:translate-y-0 active:shadow-none`}
			onClick={onClick}
			{...props}
		>
			{startIcon && <span className="shrink-0">{startIcon}</span>}
			<span>{children}</span>
			{endIcon && <span className="shrink-0">{endIcon}</span>}
		</button>
	);
};
