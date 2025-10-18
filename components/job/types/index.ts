export type JobStatus = "ACTIVE" | "INACTIVE" | "DRAFT";

export interface Jobs {
  id?: string;
  slug?: string;
  title?: string;
  status?: JobStatus;
  jobDesc?: string;
  jobType?: string;
  numberOfCandidates?: number;
  salaryMin?: number;
  salaryMax?: number;
  currency?: string;
  createdAt?: Date;
  updatedAt?: Date;
  formConfigs?: FormConfig[];
}

export interface FormConfig {
  id?: string;
  fieldKey?: string;
  fieldOption?: string;
  jobId?: string;
}
