import React from "react";
import Image from "next/image";

import { formatCurrency } from "@/libs/stringHelper";

interface JobCandidateCardProps {
  logo: string;
  title: string;
  company: string;
  location: string;
  salaryMin: string | number;
  salaryMax: string | number;
  handleClick: () => void;
}

const JobCandidateCard: React.FC<JobCandidateCardProps> = ({
  logo,
  title,
  company,
  location,
  salaryMin,
  salaryMax,
  handleClick,
}) => {
  return (
    <div
      onClick={handleClick}
      className="flex flex-col justify-center items-center p-3 sm:p-4 md:p-6 gap-3 sm:gap-2 w-full max-w-full sm:max-w-[384px] min-h-[120px] sm:min-h-[140px] hover:bg-[#F7FEFF] border-2 border-[var(--primary-color)] rounded-lg box-border"
    >
      <div className="flex items-center gap-2 sm:gap-3 w-full">
        <div className="w-10 h-10 sm:w-12 sm:h-12 border-1 border-[var(--natural-40)] overflow-hidden rounded-lg flex-shrink-0">
          <Image
            src={logo}
            alt={company}
            className="bg-white rounded-lg object-cover w-full h-full"
            width={48}
            height={48}
            sizes="(max-width: 640px) 40px, 48px"
          />
        </div>

        <div className="flex flex-col min-w-0 flex-1">
          <h3 className="text-sm sm:text-[15px] md:text-[16px] font-bold text-[var(--natural-90)] truncate">
            {title}
          </h3>
          <span className="text-xs sm:text-sm md:text-base text-[var(--natural-90)] truncate">
            {company}
          </span>
        </div>
      </div>

      <hr className="w-full border-t border-dashed border-gray-300" />

      <div className="flex flex-col w-full text-[var(--natural-80)] text-xs sm:text-sm md:text-base">
        <div className="flex items-center gap-1 sm:gap-2 min-w-0">
          <Image
            src={"/assets/icons/location.svg"}
            alt="location"
            height={16}
            width={16}
            className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 flex-shrink-0"
            sizes="(max-width: 640px) 12px, (max-width: 768px) 16px, 20px"
          />
          <span className="truncate">{location}</span>
        </div>
        <div className="flex items-center gap-1 sm:gap-2 min-w-0">
          <Image
            src={"/assets/icons/money.svg"}
            alt="salary"
            height={16}
            width={16}
            className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 flex-shrink-0"
            sizes="(max-width: 640px) 12px, (max-width: 768px) 16px, 20px"
          />
          <span className="truncate">
            Rp{formatCurrency(salaryMin || 0)} - Rp
            {formatCurrency(salaryMax || 0)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default JobCandidateCard;
