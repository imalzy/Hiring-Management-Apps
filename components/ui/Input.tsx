import { Eye, EyeOff } from "lucide-react";
import React, { useState } from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  required?: boolean;
  error?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    { label, required, error, type = "text", className = "", ...props },
    ref,
  ) => {
    const [showPassword, setShowPassword] = useState(false);
    const isPassword = type === "password";

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (type === "number") {
        const invalidChars = ["-", "+", "e", "E"];
        if (invalidChars.includes(e.key)) {
          e.preventDefault();
        }
      }
    };
    return (
      <div className="w-full font-['Nunito_Sans']">
        {label && (
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {label} {required && <span className="text-red-500">*</span>}
          </label>
        )}

        <div className="relative">
          <input
            {...props}
            type={isPassword && showPassword ? "text" : type}
            min={type === "number" ? 1 : undefined}
            onKeyDown={handleKeyDown}
            className={`
            w-full rounded-lg border-2 border-[var(--natural-40)] text-[var(--natural-90)] bg-white px-3 py-2 text-sm
            focus:ring-2 focus:ring-[var(--primary-color)] focus:border-transparent outline-none
            placeholder:text-gray-400 resize-none h-10
            ${error ? "border-red-500" : ""}
            ${className}
                `}
          />

          {isPassword && (
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none cursor-pointer"
              tabIndex={-1}
            >
              {showPassword ? (
                <EyeOff className="w-4 h-4" />
              ) : (
                <Eye className="w-4 h-4" />
              )}
            </button>
          )}
        </div>
        {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
      </div>
    );
  },
);

Input.displayName = "Input";
export default Input;
