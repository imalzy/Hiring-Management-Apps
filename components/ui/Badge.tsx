import React, { useMemo } from "react";

interface BadgeProps {
  label: string;
  variant?: "success" | "warning" | "error" | "info" | "neutral";
  className?: string;
}

const Badge: React.FC<BadgeProps> = ({
  label,
  variant = "neutral",
  className = "",
}) => {
  const variantClasses = useMemo(() => {
    switch (variant) {
      case "success":
        return "bg-[#43936C] text-white";
      case "warning":
        return "bg-[var(--secondary-color)] text-white";
      case "error":
        return "bg-[#E11428] text-white";
      case "info":
        return "bg-blue-600 text-white";
      default:
        return "bg-gray-400 text-white";
    }
  }, [variant]);

  const combinedClasses = useMemo(
    () =>
      `flex items-center justify-center px-1 py-2 text-xs capitalize text-white font-semibold rounded-sm gap-2 max-h-6 h-full max-w-[70px] w-full ${variantClasses} ${className}`,
    [variantClasses, className],
  );

  const getStatusLabel = () => {
    if (label === "FULL_TIME") return "Full-Time";
    if (label === "CONTRACT") return "Contract";
    if (label === "PART_TIME") return "Part-Time";
    if (label === "INTERNSHIP") return "Internship";
    if (label === "FREELANCE") return "Freelance";
    return "";
  };

  return <span className={combinedClasses}>{getStatusLabel()}</span>;
};

export default Badge;
