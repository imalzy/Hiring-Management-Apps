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
  Candidate?: Candidate[];
}

export interface FormConfig {
  id?: string;
  fieldKey?: string;
  fieldOption?: string;
  jobId?: string;
}

export interface Candidate {
  id?: string;
  candidateId?: string;
  jobId?: string;
  userId?: string;
  createdAt?: Date;
  updatedAt?: Date;
  attributes?: Attribute[];
}

export interface Attribute {
  id?: string;
  candidateId?: string;
  key?: string;
  label?: string;
  value?: string;
  order?: number;
}

export interface CandidateInJobDetail {
  id: string;
  attributes: Attribute[];
}

export interface JobDetail {
  id: string;
  slug: string;
  title: string;
  attributes: CandidateInJobDetail[];
}
