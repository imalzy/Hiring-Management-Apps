import React from "react";
import { FIELD_OPTIONS, FieldOption } from "../job/constants";

interface ToggleGroupProps {
  label: { key: string; name: string };
  value: FieldOption;
  onChange: (option: FieldOption) => void;
}

export const ToggleGroup: React.FC<ToggleGroupProps> = ({
  label,
  value,
  onChange,
}) => {
  const isLockedField = ["full_name", "photo_profile", "email"].includes(
    label?.key || "",
  );

  const getButtonClass = (option: FieldOption) => {
    const base = `px-3 h-8 py-1 rounded-2xl text-sm transition border`;

    if (isLockedField && option !== "Mandatory") {
      return `${base} bg-[#EDEDED] text-[var(--natural-60)] border-[var(--natural-40)] cursor-not-allowed`;
    }

    if (value === option) {
      return `${base} text-[var(--primary-color)] border-[var(--primary-color)] cursor-pointer`;
    }

    return `${base} text-[var(--natural-90)] border-[var(--natural-40)]  hover:bg-[#ededed] cursor-pointer`;
  };

  const handleClick = (option: FieldOption) => {
    if (isLockedField && option !== "Mandatory") return;
    onChange(option);
  };

  return (
    <div className="flex items-center justify-between py-2">
      <span className="text-sm text-gray-700">{label?.name}</span>
      <div className="flex gap-2">
        {FIELD_OPTIONS.map((option) => (
          <button
            key={option}
            type="button"
            onClick={() => handleClick(option)}
            className={getButtonClass(option)}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
};
