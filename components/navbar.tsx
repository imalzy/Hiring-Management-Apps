import Image from "next/image";

export default function Navbar() {
  return (
    <header className="flex items-center justify-between px-6 py-3 bg-white border-b border-gray-200">
      <h1 className="text-lg font-bold text-gray-900">Job List</h1>

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
