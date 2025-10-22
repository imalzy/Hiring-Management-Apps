import React from "react";

interface RadioOption {
  label: string;
  value: string;
}

interface RadioGroupProps {
  name: string;
  label: string;
  options: RadioOption[];
  required?: boolean;
  value?: string;
  onChange?: (value: string) => void;
}

const RadioGroup: React.FC<RadioGroupProps> = ({
  name,
  label,
  options,
  required,
  value,
  onChange,
}) => {
  return (
    <div className="flex flex-col gap-2 font-[var(--font-nunito-sans)] text-[var(--natural-90)]">
      <label className="text-sm font-medium">
        {label} {required && <span className="text-red-500">*</span>}
      </label>

      <div className="flex flex-wrap gap-6">
        {options.map((option) => {
          const isSelected = value === option.value;

          return (
            <label
              key={option.value}
              className="flex items-center gap-3 cursor-pointer select-none transition-all"
            >
              <div
                className={`relative w-5 h-5 rounded-full border-2 border-[var(--natural-90)] flex items-center justify-center transition-all
              `}
              >
                <div
                  className={`w-3 h-3 rounded-full transition-all
                  ${
                    isSelected
                      ? "bg-[var(--primary-color)] scale-100 opacity-100"
                      : "scale-0 opacity-0"
                  }`}
                />
              </div>

              <input
                type="radio"
                name={name}
                value={option.value}
                checked={isSelected}
                onChange={() => onChange?.(option.value)}
                className="hidden"
              />

              <span
                className={`text-sm transition-colors ${
                  isSelected ? "text-[var(--natural-90)]" : ""
                }`}
              >
                {option.label}
              </span>
            </label>
          );
        })}
      </div>
    </div>
  );
};

export default RadioGroup;
