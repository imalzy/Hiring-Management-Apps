import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";

interface JobDetailProps {
  id: string;
  logo: string;
  title: string;
  jobType: string;
  company: string;
  desc: string;
}

const JobDetail = (props: JobDetailProps) => {
  const router = useRouter();

  if (!props.title)
    return (
      <div className="flex flex-col items-center justify-center w-full h-[768px]  text-gray-400">
        Select a job to view details
      </div>
    );

  return (
    <>
      <div className="flex justify-between items-start w-full max-h-[108px] border-b border-[var(--natural-40)] border-solid pb-6">
        <div className="flex gap-3 items-center">
          <div className="w-10 h-10 sm:w-12 sm:h-12 border-1 border-[var(--natural-40)] overflow-hidden rounded-lg flex-shrink-0">
            <Image
              src={props?.logo || "/assets/images/company-logo.png"}
              alt={`${props?.company} logo`}
              className="bg-white rounded-lg object-cover w-full h-full"
              width={40}
              height={40}
              sizes="(max-width: 640px) 40px, 48px"
            />
          </div>

          <div>
            <Badge label={props?.jobType} variant="success" />
            <h2 className="font-semibold text-xl text-gray-900">
              {props?.title}
            </h2>
            <p className="text-gray-500">{props?.company}</p>
          </div>
        </div>

        <Button
          label="Apply"
          variant="secondary"
          type="button"
          onClick={() => {
            router.push(`/jobs/${props?.id}/resume`);
          }}
        />
      </div>

      <div className="w-full flex flex-col gap-4 text-gray-600">
        <div className="flex flex-col gap-2 text-sm leading-relaxed">
          {props?.desc
            ?.split("\n")
            .filter((line) => line.trim())
            .map((line: string, index: number) => (
              <p key={index} className="text-gray-700">
                • {line}
              </p>
            ))}
        </div>
      </div>
    </>
  );
};

export default JobDetail;
