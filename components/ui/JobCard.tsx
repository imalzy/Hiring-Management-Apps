import Button from "./Button";

import { JobStatus } from "../job/types";

interface JobCardProps {
  title?: string;
  salaryMin?: number;
  salaryMax?: number;
  currency?: string;
  startedOn?: string;
  status?: JobStatus;
}

export default function JobCard({
  title,
  salaryMin,
  salaryMax,
  currency = "Rp",
  startedOn,
  status,
}: JobCardProps) {
  const formatCurrency = (value: number) =>
    `${currency}${value.toLocaleString("id-ID")}`;

  const getStatusClass = () => {
    if (status === "ACTIVE")
      return "bg-[#F8FBF9] border-[#B8DBCA] text-[var(--success-color)]";
    if (status === "INACTIVE") return "bg-red-50 border-red-300 text-red-700";
    return "bg-gray-50 border-gray-300 text-gray-700";
  };

  const getStatusLabel = () => {
    if (status === "ACTIVE") return "Active";
    if (status === "INACTIVE") return "Inactive";
    return "Draft";
  };

  return (
    <div
      className="flex flex-col p-6 gap-3 bg-white rounded-2xl shadow-md w-full max-h-[156px]"
      style={{ boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)" }}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <span
            className={`px-4 py-1 rounded-md border text-sm font-bold capitalize ${getStatusClass()}`}
          >
            {getStatusLabel()}
          </span>
          <span className="px-4 py-1 border border-[var(--natural-40)] rounded text-sm text-[var(--natural-90)]">
            started on {startedOn}
          </span>
        </div>
      </div>

      <div className="flex items-end justify-between">
        <div className="flex-1 flex flex-col gap-2">
          <h3 className="text-lg font-bold text-[var(--natural-100)]">
            {title}
          </h3>
          <p className="text-[var(--natural-80)] text-base">
            {formatCurrency(salaryMin || 0)} - {formatCurrency(salaryMax || 0)}
          </p>
        </div>

        <Button
          type="button"
          className="!text-xs flex-1  max-w-max max-h-[28px]"
          variant="primary"
          label="Manage Job"
        />
      </div>
    </div>
  );
}
