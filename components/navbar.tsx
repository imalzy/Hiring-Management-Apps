"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

export default function Header() {
  const pathname = usePathname();

  const isCandidatePage = pathname.includes("/candidates");
  const title = isCandidatePage ? "Manage Candidate" : "Job List";

  return (
    <header className="flex items-center justify-between px-6 py-3 bg-white border-b border-gray-200">
      <div className="flex items-center gap-2">
        {isCandidatePage ? (
          <>
            <Link
              href="/"
              className="text-sm font-medium text-gray-700 hover:text-gray-900"
            >
              Job list
            </Link>
            <ChevronRight size={16} className="text-gray-400" />
            <span className="text-sm font-semibold text-gray-900">
              Manage Candidate
            </span>
          </>
        ) : (
          <h1 className="text-lg font-bold text-gray-900">{title}</h1>
        )}
      </div>

      <div className="flex items-center space-x-4">
        <button className="relative w-[28px] h-[28px] rounded-full overflow-hidden ring-2 ring-transparent hover:ring-[#e0e0e0] transition cursor-pointer">
          <Image
            src="/assets/images/profile.png"
            alt="User Avatar"
            fill
            className="object-cover"
          />
        </button>
      </div>
    </header>
  );
}
