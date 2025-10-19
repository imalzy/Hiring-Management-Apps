import CandidateContent from "@/components/candidate/content";
import { Metadata } from "next";

interface CandidatesPageProps {
  params: {
    slug: string;
  };
}

// ✅ Metadata needs to await props
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

// ✅ Page component must also await props
export default async function CandidatesPage({
  params,
}: Readonly<{
  params: Promise<{ slug: string }>;
}>) {
  const { slug } = await params;

  return <CandidateContent slug={slug} />;
}
