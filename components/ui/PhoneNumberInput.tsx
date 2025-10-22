import React from "react";
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";

const PhoneNumberInput: React.FC<{
  label: string;
  required: boolean;
  value: string;
  onChange: (phone: string) => void;
}> = ({ label, required, value = "+62", onChange }) => {
  return (
    <div className="flex flex-col w-full font-[var(--font-nunito-sans)]">
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}
      <div className="w-full !border-2 !border-[var(--natural-40)] !rounded-lg focus-within:!border-[var(--primary-color)] focus-within:!ring-1 focus-within:!ring-[var(--primary-color)]">
        <PhoneInput
          defaultCountry="id"
          value={value}
          onChange={onChange}
          inputClassName="!w-full !border-none !px-3 !py-2 !text-[var(--foreground)] text-[var(--natural-90)] placeholder:text-[var(--natural-60)]"
          countrySelectorStyleProps={{
            buttonClassName:
              "!border-l-0 !border-t-0 !border-b-0 !border-r-1 hover:!bg-[var(--primary-color)]/10 !px-4 !py-3",
            dropdownStyleProps: {
              className:
                "!shadow-lg !rounded-lg !border !border-[var(--primary-color)] !bg-[var(--background)]",
              listItemClassName:
                "!flex !justify-start !text-[var(--foreground)] !items-center hover:!bg-[var(--primary-color)]/10 !px-3 !py-2",
            },
          }}
          dialCodePreviewStyleProps={{
            className:
              "!text-[var(--natural-70)] border-[var(--primary-color)]",
          }}
        />
      </div>
    </div>
  );
};

export default React.memo(PhoneNumberInput);
