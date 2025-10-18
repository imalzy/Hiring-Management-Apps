import Image from "next/image";
import { useState, useRef, useEffect } from "react";

interface Option {
  label: string;
  value: string;
}

interface SelectProps {
  label?: string;
  required?: boolean;
  placeholder?: string;
  options: Option[];
  value?: string;
  error?: string;
  onChange: (value: string) => void;
}

export default function Select({
  label,
  required,
  placeholder = "Select option",
  options,
  value,
  onChange,
  error,
}: SelectProps) {
  const [open, setOpen] = useState(false);

  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative font-['Nunito_Sans']" ref={ref}>
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}

      <button
        type="button"
        onClick={() => setOpen(!open)}
        className={`cursor-pointer flex w-full items-center justify-between rounded-lg border-2
          border-[var(--natural-40)]  bg-white px-3 py-2 text-sm
          text-left focus:ring-2 focus:ring-[var(--primary-color)] focus:border-transparent
          outline-none ${error ? "border-red-500" : ""}`}
      >
        <span className={value ? "text-[var(--natural-90)]" : "text-gray-400"}>
          {options.find((opt) => opt.value === value)?.label || placeholder}
        </span>

        <Image
          src="/assets/icons/chevron-down.svg"
          className={`transition-transform ${open ? "rotate-180" : ""}`}
          alt="chevron"
          width={16}
          height={16}
        />
      </button>
      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
      {open && (
        <div className="absolute z-20 mt-2 w-full rounded-lg border border-gray-200 bg-white shadow-lg overflow-hidden">
          {options.map((option) => {
            const isSelected = option.value === value;
            return (
              <div
                key={option.value}
                onClick={() => {
                  onChange(option.value);
                  setOpen(false);
                }}
                className={`relative px-4 py-2 cursor-pointer text-xs font-bold ${
                  isSelected
                    ? "bg-[var(--primary-color)]/10 text-[var(--primary-color)]"
                    : "hover:bg-[var(--primary-color)]/5 text-[var(--natural-100)]"
                }`}
              >
                {option.label}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
