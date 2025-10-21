"use client";

import React from "react";
import dynamic from "next/dynamic";
import "react-quill-new/dist/quill.snow.css";

const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });

export interface RichTextEditorProps {
  label?: string;
  required?: boolean;
  error?: string;
  className?: string;
  value: string;
  onChange: (value: string) => void;
}

const RichTextEditor = React.forwardRef<HTMLDivElement, RichTextEditorProps>(
  ({ label, required, error, className = "", value, onChange }, ref) => {
    return (
      <div className="w-full font-['Nunito_Sans']">
        {label && (
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {label} {required && <span className="text-red-500">*</span>}
          </label>
        )}

        <div
          ref={ref}
          className={`rounded-lg border-2 border-[var(--natural-40)] bg-white
            text-[var(--natural-90)] focus-within:ring-2 focus-within:ring-[var(--primary-color)]
            focus-within:border-transparent ${error ? "border-red-500" : ""} ${className}`}
        >
          <ReactQuill
            theme="snow"
            value={value}
            onChange={onChange}
            className="text-sm min-h-[120px]"
          />
        </div>

        {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
      </div>
    );
  },
);

RichTextEditor.displayName = "RichTextEditor";
export default RichTextEditor;
