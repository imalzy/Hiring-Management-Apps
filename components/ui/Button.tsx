import React from "react";

type ButtonVariant = "primary" | "secondary";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  variant?: ButtonVariant;
  isLoading?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  label,
  variant = "primary",
  isLoading = false,
  disabled,
  className = "",
  ...props
}) => {
  let style = `
    flex items-center justify-center gap-2 font-bold
    rounded-lg transition-opacity duration-150 cursor-pointer
  `;

  if (variant === "primary") {
    style += `
      px-6 py-2 text-white bg-[var(--primary-color)] hover:opacity-90
      disabled:bg-[#EDEDED] disabled:text-[#999999] disabled:cursor-not-allowed
      hover:bg-[#017780]
    `;
  } else if (variant === "secondary") {
    style += `
      px-4 py-2 text-[var(--natural-90)] bg-[var(--secondary-color)]
      disabled:bg-[#EDEDED] disabled:text-[#999999] disabled:cursor-not-allowed
      hover:bg-[#f7ab2f]
    `;
  }

  return (
    <button
      type="button"
      disabled={disabled || isLoading}
      className={`${style} ${className} text-[16px]`}
      style={{ boxShadow: "0px 1px 2px rgba(0, 0, 0, 0.12)" }}
      {...props}
    >
      {isLoading ? (
        <span className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full shadow-[]" />
      ) : (
        label
      )}
    </button>
  );
};

export default Button;
