"use client";

import { useState, useEffect, useRef } from "react";
import dayjs, { Dayjs } from "dayjs";
import Input from "./Input";
import Calendar from "./Calendar/Calendar";

interface InputDatePickerProps {
  label?: string;
  required?: boolean;
  placeholder?: string;
  value?: string | Dayjs | null;
  onChange: (value: string) => void;
  error?: string;
}

export default function InputDatePicker({
  label,
  required,
  placeholder,
  value,
  onChange,
  error,
}: InputDatePickerProps) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <div ref={containerRef} className="relative">
      <Input
        type="date"
        label={label}
        required={required}
        placeholder={placeholder}
        value={value ? dayjs(value).format("YYYY-MM-DD") : ""}
        onClick={(e) => {
          e.stopPropagation();
          setOpen((prev) => !prev);
        }}
        className="pl-7"
        readOnly
        error={error}
      />

      {open && (
        <div
          className="absolute left-0 right-0 mt-2 z-10"
          onClick={(e) => e.stopPropagation()}
        >
          <Calendar
            date={value ? dayjs(value) : dayjs()}
            onSelect={(d) => {
              onChange(d.format("YYYY-MM-DD"));
              setOpen(false);
            }}
          />
        </div>
      )}
    </div>
  );
}
