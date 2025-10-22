"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import axios from "axios";
import { Jobs } from "@/components/dashboard/types";
import DynamicForm from "../form";

type ResumeContentProps = {
  jobId: string;
};

const ResumeContent: React.FC<ResumeContentProps> = ({ jobId }) => {
  const [loading, setLoading] = useState(true);
  const [job, setJob] = useState<Jobs>();

  const findCandidates = async () => {
    try {
      const { data } = await axios.get(`/api/jobs/${jobId}`);
      setJob(data.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    findCandidates();
  }, []);

  if (loading)
    return (
      <div className="min-h-screen flex justify-center bg-[var(--background)] font-[var(--font-nunito-sans)] px-4 mt-[50px] pb-4">
        <div className="w-full flex justify-center items-center max-w-2xl bg-white shadow-md rounded-md border border-[var(--natural-40)]">
          <div>Loading...</div>
        </div>
      </div>
    );

  return (
    <div className="min-h-screen flex justify-center bg-[var(--background)] font-[var(--font-nunito-sans)] px-4 mt-[50px] pb-4">
      <div className="w-full max-w-2xl bg-white shadow-md rounded-md border border-[var(--natural-40)]">
        <div className="flex items-center justify-between p-10">
          <div className="flex items-center gap-4">
            <button
              onClick={() => window.history.back()}
              className="h-6 w-6 rounded-lg transition border border-[var(--natural-40)] p-1 cursor-pointer"
              style={{ boxShadow: "0px 1px 2px rgba(0, 0, 0, 0.12)" }}
            >
              <Image
                src={"/assets/icons/chevron-left.svg"}
                alt="Back"
                width={20}
                height={20}
              />
            </button>
            <h2 className="font-bold text-[var(--natural-100)] text-lg">
              Apply {job?.title} at Rakamin
            </h2>
          </div>
          <p className="text-xs text-[var(--natural-70)]">
            ℹ️ This field required to fill
          </p>
        </div>
        <DynamicForm fields={job?.formConfigs || []} jobId={jobId} />
      </div>
    </div>
  );
};

export default ResumeContent;
