import { useEffect, useState } from "react";

import axios from "axios";
import { Jobs } from "../types";

import EmptyState from "@/components/empty-state";
import SearchBar from "@/components/search-bar";
import JobCard from "@/components/ui/JobCard";
import JobListSkeleton from "@/components/ui/JobListSkeleton";

import { fDateTime, formatStr } from "@/libs/stringHelper";

interface JobContentProps {
  openModal: () => void;
}

const JobContent = ({ openModal }: JobContentProps) => {
  const [items, setItems] = useState<Jobs[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const { status, data } = await axios.get("/api/jobs");
      if (status === 200) {
        setItems(data?.data);
        setLoading(false);
      }
      setLoading(false);
    } catch (error) {
      console.error("[Fetch Data Error]", error);
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  if (loading) return <JobListSkeleton />;

  return (
    <>
      <SearchBar />
      <div className="flex flex-col gap-4 w-full">
        {!loading &&
          items &&
          items.length > 0 &&
          items.map((item) => (
            <JobCard
              key={item.id}
              title={item?.title}
              salaryMin={item?.salaryMin}
              salaryMax={item?.salaryMax}
              startedOn={fDateTime(item?.createdAt, formatStr.date) || ""}
              status={item?.status}
            />
          ))}
      </div>
      {!loading && items && items.length === 0 && (
        <EmptyState onClick={openModal} />
      )}
    </>
  );
};

export default JobContent;
