import { useState, useEffect, useRef, useMemo } from "react";
import Image from "next/image";

interface Option {
  id: string;
  label: string;
  value: string;
}

interface SelectProps {
  label?: string;
  required?: boolean;
  placeholder?: string;
  options: Option[];
  value?: string; // Store `id` here, not `value`
  onChange: (value: string) => void;
  error?: string;
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
  const [search, setSearch] = useState("");
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const selectedLabel = options.find((opt) => opt.id === value)?.label || "";
    setSearch(selectedLabel);
  }, [value, options]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filteredOptions = useMemo(() => {
    const query = search.toLowerCase().trim();
    return options.filter(
      (opt) =>
        opt.label.toLowerCase().includes(query) ||
        opt.value.toLowerCase().includes(query),
    );
  }, [options, search]);

  return (
    <div className="relative font-['Nunito_Sans']" ref={ref}>
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}

      <div className="relative">
        <input
          type="text"
          value={search}
          placeholder={placeholder}
          onChange={(e) => {
            setSearch(e.target.value);
            setOpen(true);
          }}
          onFocus={() => setOpen(true)}
          className={`w-full rounded-lg border-2 px-3 py-2 text-sm outline-none pr-8 text-[var(--natural-90)]
            border-[var(--natural-40)] focus:ring-2 focus:ring-[var(--primary-color)] focus:border-transparent
            ${error ? "border-red-500" : ""}`}
        />

        <Image
          src="/assets/icons/chevron-down.svg"
          alt="chevron"
          width={16}
          height={16}
          className={`absolute right-3 top-1/2 -translate-y-1/2 transition-transform ${
            open ? "rotate-180" : ""
          }`}
        />
      </div>

      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}

      {open && (
        <div className="absolute z-20 mt-2 w-full rounded-lg border border-gray-200 bg-white shadow-lg overflow-hidden">
          <div className="max-h-48 overflow-auto">
            {filteredOptions.length > 0 ? (
              filteredOptions.map((option) => {
                const isSelected = option.id === value; // Compare with `id` now

                return (
                  <div
                    key={option.id}
                    onClick={() => {
                      onChange(option.id);
                      setSearch(option.label);
                      setOpen(false);
                    }}
                    className={`relative px-4 py-2 cursor-pointer text-xs font-bold ${
                      isSelected
                        ? "bg-[var(--primary-color)]/10 text-[var(--primary-color)]"
                        : "hover:bg-[var(--primary-color)]/5 text-[var(--natural-100)]"
                    }`}
                  >
                    {option.label} - {option.value}
                  </div>
                );
              })
            ) : (
              <div className="px-4 py-2 text-xs text-gray-400">
                No results found
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
