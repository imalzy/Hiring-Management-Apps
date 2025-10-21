"use client";

import { useEffect, useState } from "react";
import axios from "axios";

import JobDetail from "./job-detail";
import { Jobs } from "@/components/dashboard/types";
import JobCandidateCard from "@/components/ui/JobCandidateCard";

const JobContent = () => {
  const [selectedJob, setSelectedJob] = useState<Jobs>();
  const [items, setItems] = useState<Jobs[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { status, data } = await axios.get("/api/jobs");
        if (status === 200) {
          setItems(data?.data);
          console.log("Data fetched successfully", data?.data);
          setLoading(false);
        }
        setLoading(false);
      } catch (error) {
        console.error("[Fetch Data Error]", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div className="p-6 text-gray-600">Loading...</div>;

  return (
    <main className="flex px-[104px] py-10 gap-6 mt-52px mx-auto mb-0 w-full min-h-[768px] h-screen">
      <div className="flex flex-col gap-4 overflow-y-auto primary-scrollbar h-full w-full max-w-[406px] pr-4">
        {!loading &&
          items &&
          items.map((item) => (
            <JobCandidateCard
              key={item.id}
              logo="/assets/images/company-logo.png"
              title={item.title || ""}
              company="Rakamin"
              location={"Jakarta"}
              salaryMin={item.salaryMin || 0}
              salaryMax={item.salaryMax || 0}
              handleClick={() => setSelectedJob(item)}
            />
          ))}
      </div>

      <div className="flex flex-col p-6 gap-6 w-full box-border rounded-lg border-1 border-[var(--natural-40)] min-h-[768px] overflow-y-auto primary-scrollbar h-full">
        <JobDetail
          id={selectedJob?.id || ""}
          logo={""}
          title={selectedJob?.title || ""}
          jobType={selectedJob?.jobType || ""}
          company={""}
          desc={selectedJob?.jobDesc || ""}
        />
      </div>
    </main>
  );
};

export default JobContent;
