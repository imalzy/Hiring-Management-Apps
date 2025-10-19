import Image from "next/image";

export default function CandidateEmptyState() {
  return (
    <div className="flex flex-col items-center justify-center h-[80vh] text-center">
      <div className="relative w-[260px] h-[180px] mb-6">
        <Image
          src="/assets/images/empty-state.svg"
          alt="No candidates illustration"
          fill
          className="object-contain"
          priority
        />
      </div>

      <h2 className="text-lg font-semibold text-gray-900">
        No candidates found
      </h2>
      <p className="text-sm text-gray-500 mt-1 max-w-sm">
        Share your job vacancies so that more candidates will apply.
      </p>
    </div>
  );
}
