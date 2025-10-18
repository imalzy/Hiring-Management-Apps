import { z } from "zod";
import { FIELD_OPTIONS, PROFILE_FIELDS } from "../constants";

const mainSchema = z
  .object({
    jobName: z.string().min(1, "Required"),
    jobType: z.string().min(1, "Required"),
    jobDesc: z.string().min(1, "Required"),
    numberOfCandidates: z.string().min(1, "Required"),
    salaryMin: z.number().min(0, "Min salary must be >= 0").optional(),
    salaryMax: z.number().min(0, "Max salary must be >= 0").optional(),
  })
  .refine(
    (data) =>
      data.salaryMin === undefined ||
      data.salaryMax === undefined ||
      data.salaryMin <= data.salaryMax,
    {
      message: "Maximum salary must be greater than or equal to minimum salary",
      path: ["salaryMax"],
    },
  );

const configJobSchema = z.object(
  Object.fromEntries(
    PROFILE_FIELDS.map((field) => [field.key, z.enum(FIELD_OPTIONS)]),
  ),
);

export const jobSchema = z.object({
  jobs: mainSchema,
  configs: configJobSchema,
});

export type JobType = z.infer<typeof jobSchema>;
