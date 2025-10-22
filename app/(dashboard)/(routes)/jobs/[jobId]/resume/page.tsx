import ResumeContent from "@/components/resume/content";

export default async function ResumePage({
  params,
}: Readonly<{
  params: Promise<{ jobId: string }>;
}>) {
  const { jobId } = await params;

  return <ResumeContent jobId={jobId} />;
}
