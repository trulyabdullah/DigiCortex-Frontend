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
	primary:
		"bg-blue-600 text-white hover:bg-blue-700 shadow-sm hover:shadow-lg",
	secondary:
		"bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400",
};

const sizeClasses = {
	sm: "px-4 py-2 text-sm",
	md: "px-5 py-2.5 text-base",
	lg: "px-7 py-3 text-lg",
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
			className={`${variantClasses[variant]} ${sizeClasses[size]} rounded-md inline-flex items-center justify-center gap-2 font-medium transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0`}
			onClick={onClick}
		>
			{startIcon && <span className="shrink-0">{startIcon}</span>}{" "}
			<span>{children}</span>
			{startIcon && <span className="shrink-0">{endIcon}</span>}{" "}
		</button>
	);
};
