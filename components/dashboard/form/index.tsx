import { Controller } from "react-hook-form";
import { JobType } from "../schema/job";
import { PROFILE_FIELDS } from "../constants";
import Input from "@/components/ui/Input";
import { CurrencyInput } from "@/components/ui/CurrencyInput";
import Textarea from "@/components/ui/Textarea";
import { ToggleGroup } from "@/components/ui/ToggleGroup";
import Select from "@/components/ui/Select";
import Button from "@/components/ui/Button";
import toast from "react-hot-toast";
import axios from "axios";
import { useJobForm } from "../hooks/use-job-form";

export const JobForm = ({ onClose }: { onClose: () => void }) => {
  const { control, handleSubmit, trigger, errors, reset } = useJobForm();

  const onSubmitHandler = handleSubmit(
    async (formData: JobType) => {
      trigger();
      await axios.post("/api/jobs", formData);
      toast.success("Job created successfully!");
      reset();
      onClose();
    },
    (err) => {
      console.error("Form submission error:", err);
    },
  );

  return (
    <form onSubmit={onSubmitHandler}>
      <div className="p-6 space-y-6 max-h-[80vh] overflow-y-auto">
        <div className="grid gap-4">
          <Controller
            name="jobs.jobName"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                label="Job Name"
                required
                placeholder="Ex. Front End Developer"
                error={errors.jobs?.jobName?.message}
              />
            )}
          />

          <Controller
            name="jobs.jobType"
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                label="Job Type"
                required
                placeholder="Select job type"
                options={[
                  { id: "1", label: "Full-time", value: "FULL_TIME" },
                  { id: "2", label: "Contract", value: "CONTRACT" },
                  { id: "3", label: "Part-time", value: "PART_TIME" },
                  { id: "4", label: "Internship", value: "INTERNSHIP" },
                  { id: "5", label: "Freelance", value: "FREELANCE" },
                ]}
                error={errors.jobs?.jobType?.message}
              />
            )}
          />

          <Controller
            name="jobs.jobDesc"
            control={control}
            render={({ field }) => (
              <Textarea
                {...field}
                label="Job Description"
                required
                rows={3}
                placeholder="Ex. "
                error={errors.jobs?.jobDesc?.message}
              />
            )}
          />

          <Controller
            name="jobs.numberOfCandidates"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                label="Number of Candidate Needed"
                type="number"
                required
                placeholder="Ex. 2"
                error={errors.jobs?.numberOfCandidates?.message}
              />
            )}
          />
        </div>

        <div className="pt-4 border-t border-dashed border-gray-300">
          <p className="text-sm font-medium text-gray-700 block mb-2">
            Job Salary
          </p>
          <div className="flex gap-4">
            <Controller
              name="jobs.salaryMin"
              control={control}
              render={({ field }) => (
                <CurrencyInput
                  {...field}
                  label="Minimum Estimated Salary"
                  value={field?.value}
                  onChange={(val) => field.onChange(val)}
                  error={errors.jobs?.salaryMin?.message as string | undefined}
                />
              )}
            />
            <div className="mt-7 text-gray-500">–</div>
            <Controller
              name="jobs.salaryMax"
              control={control}
              render={({ field }) => (
                <CurrencyInput
                  {...field}
                  label="Maximum Estimated Salary"
                  value={field?.value}
                  onChange={(val) => field.onChange(val)}
                  error={errors.jobs?.salaryMax?.message as string | undefined}
                />
              )}
            />
          </div>
        </div>

        <div className="border-2 border-gray-300 rounded-lg p-4">
          <h3 className="font-medium text-gray-800 mb-3">
            Minimum Profile Information Required
          </h3>
          <div className="divide-y divide-gray-200">
            {PROFILE_FIELDS.map((field) => (
              <Controller
                key={field.key}
                name={`configs.${field.key}` as const}
                control={control}
                render={({ field: { value, onChange } }) => (
                  <ToggleGroup
                    value={value}
                    onChange={onChange}
                    label={field}
                  />
                )}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="px-6 py-4 border-t border-gray-200 flex justify-end">
        <Button type="submit" label="Publish Job" />
      </div>
    </form>
  );
};
