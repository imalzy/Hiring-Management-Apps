import { forwardRef } from "react";
import { Calendar, ChevronDown } from "lucide-react";

interface InputCalendarProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  required?: boolean;
  error?: string;
}

const InputCalendar = forwardRef<HTMLInputElement, InputCalendarProps>(
  ({ label, required, error, className = "", ...props }, ref) => {
    const baseClass =
      "flex items-center justify-between border rounded-xl px-3 py-2 bg-white focus-within:border-primary-500 transition";
    const borderClass = error ? "border-red-500" : "border-gray-300";

    const containerClass = `${baseClass} ${borderClass} ${className}`.trim();

    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {label}
            {required && <span className="text-red-500">*</span>}
          </label>
        )}

        <div className={containerClass}>
          <Calendar className="w-5 h-5 text-gray-500" />

          <input
            ref={ref}
            {...props}
            className="flex-1 outline-none px-2 bg-transparent text-gray-800 placeholder-gray-400"
          />

          <ChevronDown className="w-5 h-5 text-gray-500" />
        </div>

        {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
      </div>
    );
  },
);

InputCalendar.displayName = "InputCalendar";
export default InputCalendar;
