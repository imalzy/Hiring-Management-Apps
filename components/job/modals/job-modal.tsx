import Image from "next/image";
import { JobForm } from "../form";

export default function JobModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div className="bg-white w-full max-w-3xl rounded-2xl shadow-lg overflow-hidden font-['Nunito_Sans']">
        <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4">
          <h2 className="text-lg font-semibold text-gray-800">Job Opening</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 cursor-pointer"
          >
            <Image
              src={"/assets/icons/close.svg"}
              alt="close"
              height={20}
              width={20}
            />
          </button>
        </div>
        <JobForm onClose={onClose} />
      </div>
    </div>
  );
}
