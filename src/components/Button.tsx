interface ButtonProps {
    children: React.ReactNode;
    variant: "primary" | "secondary";
    size: "sm" | "md" | "lg";
    startIcon?: React.ReactNode;
    endIcon?: React.ReactNode;
    onClick: () => void;
}

const variantClasses = {
    primary: "bg-powderblue text-inkblack",
    secondary: "bg-yaleblue text-porcelain",
};

const sizeClasses = {
    sm: "px-3 text-base py-2",
    md: "px-4 text-lg py-2",
    lg: "px-6 text-2xl py-3",
};

export const Button = ({
    children,
    variant,
    size,
    startIcon,
    endIcon,
    onClick,
}: ButtonProps) => {
    return (
        <button
            className={`rounded-md ${variantClasses[variant]} ${sizeClasses[size]} flex items-center justify-center gap-3`}
            onClick={onClick}
        >
            {startIcon && <span>{startIcon}</span>}
            <span>{children}</span>
            {endIcon && <span>{endIcon}</span>}
        </button>
    );
};
