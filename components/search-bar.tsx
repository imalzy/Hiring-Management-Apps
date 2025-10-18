"use client";

import Image from "next/image";

export default function SearchBar() {
  return (
    <div className="relative w-full mx-auto flex items-center mb-4">
      <input
        type="text"
        placeholder="Search by job details"
        className="w-full px-2.5 py-4 outline-2 outline-[#EDEDED] rounded-lg focus:ring-2 focus:ring-[var(--primary-color)] focus:outline-none text-sm max-h-11"
      />
      <Image
        className="absolute right-3"
        src="/assets/icons/search.svg"
        alt="Search Icon"
        width={20}
        height={20}
      />
    </div>
  );
}
