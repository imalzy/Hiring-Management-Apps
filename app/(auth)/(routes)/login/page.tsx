import Login from "@/components/auth/content/login";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const title = `Login Now`;
  const description = `Login now and get recommendation of jobs that suitable for you. Many vacancies from various best companies in Indonesia.`;

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

export default function Page() {
  return <Login />;
}
