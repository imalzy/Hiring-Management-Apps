"use client";

import { useState } from "react";

import CreateJob from "@/components/create-job";
import Button from "@/components/ui/Button";
import JobContent from "@/components/dashboard/content";
import JobModal from "@/components/dashboard/modals/job-modal";

export default function JobPage() {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenModal = () => {
    setIsOpen(true);
  };
  return (
    <>
      <main className="flex flex-1 py-3 px-6 lg:py-9 gap-6 bg-white overflow-scroll primary-scrollbar">
        <div className="flex-1 flex flex-col items-center">
          <Button
            label="Create a new job"
            className="mb-3 min-w-[158px] h-[40px] self-end block lg:hidden"
            variant="primary"
            onClick={handleOpenModal}
          />
          <JobContent openModal={handleOpenModal} />
        </div>
        <aside className="hidden lg:block">
          <CreateJob onClick={handleOpenModal} />
        </aside>
      </main>
      <JobModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
}
