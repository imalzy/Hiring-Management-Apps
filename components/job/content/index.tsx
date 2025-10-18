import { useEffect, useState } from "react";

import axios from "axios";

import EmptyState from "@/components/empty-state";
import SearchBar from "@/components/search-bar";
import JobCard from "@/components/ui/JobCard";
import { Jobs } from "../types";
import JobListSkeleton from "@/components/ui/JobListSkeleton";
import {
  showErrorSnackBar,
  showSuccessSnackBar,
  showWarningSnackBar,
} from "@/components/ui/Snackbar";

interface JobContentProps {
  openModal: () => void;
}

const JobContent = ({ openModal }: JobContentProps) => {
  const [items, setItems] = useState<Jobs[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    showSuccessSnackBar("successfully");
    showErrorSnackBar("successfully");
    showWarningSnackBar("successfully");

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
      {items && items.length > 0 ? (
        items.map((item) => (
          <JobCard
            key={item.id}
            title={item?.title}
            salaryMin={item?.salaryMin}
            salaryMax={item?.salaryMax}
            startedOn={item?.createdAt}
            status={item?.status}
          />
        ))
      ) : (
        <EmptyState onClick={openModal} />
      )}
    </>
  );
};

export default JobContent;
