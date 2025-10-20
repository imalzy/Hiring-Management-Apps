import CandidateContent from "@/components/candidate/content";
import { Metadata } from "next";

export async function generateMetadata({
  params,
}: Readonly<{
  params: Promise<{ slug: string }>;
}>): Promise<Metadata> {
  const { slug } = await params;
  const title = `Jobs - ${slug}`;
  const description = `Learn more about the candidate ${slug}.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "website",
    },
    twitter: {
      title,
      description,
    },
  };
}

export default async function CandidatesPage({
  params,
}: Readonly<{
  params: Promise<{ slug: string }>;
}>) {
  const { slug } = await params;

  return <CandidateContent slug={slug} />;
}
