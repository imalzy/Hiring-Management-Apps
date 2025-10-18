import React from "react";

interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  required?: boolean;
  error?: string;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, required, error, className = "", ...props }, ref) => {
    return (
      <div className="w-full font-['Nunito_Sans']">
        {label && (
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {label} {required && <span className="text-red-500">*</span>}
          </label>
        )}

        <textarea
          ref={ref}
          className={`
            w-full rounded-lg border-2 border-[var(--natural-40)] text-[var(--natural-90)] bg-white px-3 py-2 text-sm
            focus:ring-2 focus:ring-[var(--primary-color)] focus:border-transparent outline-none
            placeholder:text-gray-400 resize-none
            ${error ? "border-red-500" : ""}
            ${className}
          `}
          {...props}
        />

        {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
      </div>
    );
  },
);

Textarea.displayName = "Textarea";
export default Textarea;
