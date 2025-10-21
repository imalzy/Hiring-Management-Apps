"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

import { useEffect, useRef, useState } from "react";

import axios from "axios";

import { ChevronRight } from "lucide-react";

interface NavbarProps {
  user: {
    fullname: string;
    role: string;
    id: string;
  } | null;
}

export default function Header({ user }: NavbarProps) {
  const pathname = usePathname();
  const router = useRouter();

  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const isCandidatePage = pathname.includes("/candidates");
  const isResumePage = pathname.match(/^(.+?\/resume)(?:\/|$)/);
  const title = isCandidatePage ? "Manage Candidate" : "Job List";
  const role = user?.role;

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    await axios.post("/api/logout");
    router.replace("/login");
  };

  const getRoleLabel = (role: string) => {
    if (role === "ADMIN") return "Admin";
    if (role === "USER") return "User";
    if (role === "CANDIDATE") return "Candidate";
    return "";
  };

  if (isResumePage) return <></>;

  return (
    <header
      className={`flex items-center justify-between px-6 py-3 bg-white border-b border-gray-200 ${role === "CANDIDATE" ? "backdrop-blur-sm !border-none shadow-lg" : ""}`}
    >
      {role !== "CANDIDATE" ? (
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
      ) : (
        <div className="flex items-center gap-2"> </div>
      )}

      <div className="relative flex items-center space-x-4" ref={dropdownRef}>
        {role === "CANDIDATE" ? (
          <div className="flex items-center space-x-3 !m-0">
            <div className="w-px h-6 bg-gray-300"></div>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="relative w-[28px] h-[28px] rounded-full overflow-hidden ring-2 ring-transparent hover:ring-[#e0e0e0] transition cursor-pointer"
            >
              <Image
                src="/assets/images/profile.png"
                alt="User Avatar"
                fill
                className="object-cover"
              />
            </button>
          </div>
        ) : (
          <div className="relative group !m-0">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="relative w-[28px] h-[28px] rounded-full overflow-hidden ring-2 ring-transparent hover:ring-[#e0e0e0] transition cursor-pointer"
            >
              <Image
                src="/assets/images/profile.png"
                alt="User Avatar"
                fill
                className="object-cover"
              />
            </button>

            <div className="absolute -left-8 -translate-x-1/2 top-9 px-2 py-1 font-bold text-xs text-[var(--primary-color)] bg-[var(--primary-color)]/10 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
              {user?.fullname} | {user?.role}
            </div>
          </div>
        )}

        {isOpen && (
          <div className="absolute right-0 top-10 w-48 bg-white rounded shadow-sm border border-[var(--natural-40)] text-sm z-20">
            <div className="px-4 py-2">
              <div className="font-bold text-[var(--primary-color)]">
                {user?.fullname}
              </div>
              <div className="text-[var(--natural-70)]">
                {getRoleLabel(user?.role || "")}
              </div>
            </div>
            <hr className="border-t border-[var(--natural-40)]" />
            <button
              className="cursor-pointer font-semibold w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100"
              onClick={() => handleLogout()}
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
