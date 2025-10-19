"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

import type {
  Attribute,
  CandidateInJobDetail,
  JobDetail,
} from "@/components/job/types";

interface CandidateContentProps {
  slug: string;
}

const CandidateContent = ({ slug }: CandidateContentProps) => {
  const [job, setJob] = useState<JobDetail | null>(null);
  const [candidates, setCandidates] = useState<CandidateInJobDetail[]>([]);
  const [loading, setLoading] = useState(true);
  const [headers, setHeaders] = useState<{ key: string; label: string }[]>([]);
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  const findCandidates = async () => {
    try {
      const { data } = await axios.get(`/api/candidates?id=${id}&slug=${slug}`);
      setJob(data?.data || null);
      const listCandidates = data?.data?.attributes;
      console.log(listCandidates);
      setCandidates(listCandidates);
      const mapHeaders =
        listCandidates[0]?.attributes
          ?.sort(
            (a: Attribute, b: Attribute) => (a?.order ?? 0) - (b?.order ?? 0),
          )
          ?.map((attr: Attribute) => ({
            key: attr.key,
            label: attr.label,
          })) || [];
      setHeaders(mapHeaders);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    findCandidates();
  }, []);

  if (loading) return <div className="p-6 text-gray-600">Loading...</div>;
  if (!job || !job.attributes?.length)
    return (
      <div className="p-6 text-gray-500">
        No candidates available for <b>{job?.title}</b>.
      </div>
    );

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="mb-4">
        <h1 className="text-2xl font-semibold text-gray-800">{job.title}</h1>
        <p className="text-sm text-gray-500">Manage Candidates</p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <table className="min-w-full divide-y divide-gray-100 text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left font-medium text-gray-700">
                <input type="checkbox" />
              </th>
              {headers.map((header) => (
                <th
                  key={header.key}
                  className="px-6 py-3 text-left font-medium text-gray-700"
                >
                  {header.label}
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100 bg-white">
            {candidates.map((candidate) => (
              <tr key={candidate.id} className="hover:bg-gray-50 transition">
                <td className="px-6 py-4">
                  <input type="checkbox" />
                </td>
                {headers.map((header) => {
                  const attr = candidate.attributes.find(
                    (a) => a.key === header.key,
                  );
                  return (
                    <td key={header.key} className="px-6 py-4 text-gray-700">
                      {header.key === "portfolio" && attr?.value ? (
                        <a
                          href={attr.value}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-teal-600 hover:underline truncate"
                        >
                          {attr.value}
                        </a>
                      ) : (
                        attr?.value || "-"
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CandidateContent;
