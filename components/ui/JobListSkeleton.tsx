export default function JobListSkeleton() {
  return (
    <div className="w-full space-y-4 animate-pulse">
      {Array.from({ length: 3 }).map((_, i) => (
        <div
          key={i}
          className="flex flex-col p-6 gap-3 bg-white rounded-2xl shadow-md w-full max-h-[156px]"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="h-6 w-20 bg-gray-200 rounded"></div>
              <div className="h-6 w-32 bg-gray-200 rounded"></div>
            </div>
          </div>

          <div className="flex items-end justify-between mt-2">
            <div className="flex flex-col gap-2">
              <div className="h-5 w-48 bg-gray-200 rounded"></div>
              <div className="h-4 w-36 bg-gray-200 rounded"></div>
            </div>
            <div className="h-8 w-24 bg-gray-200 rounded-lg"></div>
          </div>
        </div>
      ))}
    </div>
  );
}
