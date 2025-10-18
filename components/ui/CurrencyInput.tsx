import { formatCurrency } from "@/libs/stringHelper";
import React, { useState } from "react";

interface CurrencyInputProps
  extends Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    "onChange" | "value"
  > {
  label?: string;
  value?: number;
  required?: boolean;
  error?: string;
  onChange?: (value: number) => void;
}

export const CurrencyInput: React.FC<CurrencyInputProps> = ({
  label,
  value = 0,
  required,
  error,
  onChange,
  className,
  ...props
}) => {
  const [displayValue, setDisplayValue] = useState(
    value ? formatCurrency(value) : "",
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/[^0-9]/g, "");
    const num = parseInt(raw || "0", 10);

    setDisplayValue(formatCurrency(num));
    if (onChange) onChange(num);
  };

  return (
    <div className="flex-1">
      {label && (
        <label className="text-xs text-gray-500">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}
      <div
        className={`flex items-center  w-full rounded-lg border-2 border-[var(--natural-40)] text-[var(--natural-90)] bg-white px-3 py-2 text-sm
       focus-within:ring-2 focus-within:ring-[var(--primary-color)] focus-within:border-transparent outline-none
      placeholder:text-gray-400 resize-none
      ${error ? "border-red-500" : ""}
      ${className}`}
      >
        <span className="text-[var(--natural-90)] font-bold mr-2">Rp</span>
        <input
          type="text"
          placeholder="8.000.000"
          {...props}
          inputMode="decimal"
          value={displayValue}
          onChange={handleChange}
          className="w-full border-none outline-none text-sm"
        />
      </div>
      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </div>
  );
};
