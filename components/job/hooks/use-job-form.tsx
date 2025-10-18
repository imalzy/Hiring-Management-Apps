import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { jobSchema, JobType } from "../schema/job";
import { PROFILE_FIELDS } from "../constants";

export const useJobForm = () => {
  const {
    control,
    handleSubmit,
    trigger,
    formState: { errors },
    reset,
  } = useForm<JobType>({
    resolver: zodResolver(jobSchema),
    mode: "all",
    defaultValues: {
      jobs: {
        jobName: "",
        jobType: "",
        jobDesc: "",
        numberOfCandidates: "1",
        salaryMin: undefined,
        salaryMax: undefined,
      },
      configs: Object.fromEntries(
        PROFILE_FIELDS.map((field) => [field, "Off"]),
      ),
    } as JobType,
  });

  return {
    control,
    handleSubmit,
    trigger,
    errors,
    reset,
  };
};
