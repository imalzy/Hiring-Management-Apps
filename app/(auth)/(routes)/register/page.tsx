import Register from "@/components/auth/content/register";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const title = `Sign Up`;
  const description = `Unlock your career potential with us! Discover 50,000+ active job opportunities, connect with top employers, and apply in just one tap. Take the next big step in your professional journey today!`;

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
  return <Register />;
}
