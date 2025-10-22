"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const JobApplySuccessPage = () => {
  const router = useRouter();

  useEffect(() => {
    setTimeout(() => {
      router.push("/jobs");
    }, 5000);
  }, [router]);

  return (
    <div className="flex justify-center items-center h-full">
      <div className="w-[600px] flex flex-col pb-4 items-center">
        <Image
          src={"/assets/images/success-apply.svg"}
          alt="success"
          width={214}
          height={192}
        />

        <div className="flex flex-col items-center">
          <h1 className="font-bold text-[var(--natural-90)] text-2xl">
            🎉 Your application was sent!
          </h1>
          <p className="text-[var(--natural-90)] text-[16px]">
            {`Congratulations! You've taken the first step towards a rewarding
            career at Rakamin. We look forward to learning more about you during
            the application process.`}
          </p>
        </div>
      </div>
    </div>
  );
};

export default JobApplySuccessPage;
