import Image from "next/image";
import Button from "./ui/Button";

interface CreateJobProps {
  onClick?: () => void;
}

export default function EmptyState({ onClick }: CreateJobProps) {
  return (
    <div className="flex flex-col items-center justify-center text-center mt-8 lg:mt-16 space-y-4">
      <Image
        src="/assets/images/empty-state.svg"
        alt="No jobs"
        width={300}
        height={300}
        className="mb-2"
      />
      <h2 className="text-[var(--natural-90)] font-bold text-xl">
        No job openings available
      </h2>
      <p className="text-[var(--natural-90)] text-[16px]">
        Create a job opening now and start the candidate process.
      </p>

      <Button
        label="Create a new job"
        className="min-w-[158px] h-[40px]"
        variant="secondary"
        onClick={onClick}
      />
    </div>
  );
}
