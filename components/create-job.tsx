import Button from "./ui/Button";

interface CreateJobProps {
  onClick?: () => void;
}

export default function CreateJob({ onClick }: CreateJobProps) {
  return (
    <div className="bg-[linear-gradient(0deg,rgba(0,0,0,0.72),rgba(0,0,0,0.72)),url('/assets/images/discuss.jpg')] bg-no-repeat bg-cover bg-center rounded-2xl p-6 w-[300px] h-[168px] text-white shadow-md">
      <h3 className="font-semibold text-lg mb-1">
        Recruit the best candidates
      </h3>
      <p className="text-sm mb-4">Create jobs, invite, and hire with ease</p>
      <Button
        type="button"
        className="w-full"
        variant="primary"
        label="Create a new job"
        onClick={onClick}
      />
    </div>
  );
}
