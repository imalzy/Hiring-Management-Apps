"use client";

import { useEffect } from "react";

import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/jobs");
  }, []);

  return (
    <>
      <div className="flex h-screen items-center justify-center">
        <p className="text-gray-600 text-lg">Redirecting...</p>
      </div>
    </>
  );
}
