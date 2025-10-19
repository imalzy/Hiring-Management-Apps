import { NextRequest, NextResponse } from "next/server";

import slugify from "slugify";
import prismadb from "@/libs/prismadb";

import { jobSchema } from "@/components/job/schema/job";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    console.log("[searchParams]", searchParams);

    const jobsDetail = await prismadb.job.findMany({
      where: {
        id: searchParams.get("id") || undefined,
        slug: searchParams.get("slug") || undefined,
      },
      include: {
        Candidate: {
          include: {
            attributes: true,
          },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    const candidates =
      jobsDetail.flatMap((job) =>
        job.Candidate.map((cand) => ({
          id: cand.id,
          attributes: cand.attributes.map((attr) => ({
            key: attr.key,
            label: attr.label,
            value: attr.value,
            order: attr.order,
          })),
        })),
      ) || [];

    const job = jobsDetail.map((j) => ({
      id: j.id,
      slug: j.slug,
      title: j.title,
    }));

    const resp = {
      ...job[0],
      attributes: candidates,
    };

    return NextResponse.json({
      data: { ...resp },
    });
  } catch (err) {
    console.error("GET /jobs error:", err);
    return NextResponse.json(
      { error: "Failed to fetch jobs" },
      { status: 500 },
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = jobSchema.parse(body);
    const { jobs, configs } = parsed;
    const configArray = Object.entries(configs).map(([key, value]) => ({
      fieldKey: key,
      fieldOption: value as "Mandatory" | "Optional" | "Off",
    }));

    const baseSlug = slugify(jobs.jobName, { lower: true, strict: true });
    const existingCount = await prismadb.job.count({
      where: { slug: { startsWith: baseSlug } },
    });
    const uniqueSlug =
      existingCount === 0 ? baseSlug : `${baseSlug}-${existingCount}`;

    const payload = {
      slug: uniqueSlug,
      title: jobs.jobName,
      jobDesc: jobs.jobDesc,
      jobType: jobs.jobType?.toUpperCase() as
        | "FULL_TIME"
        | "CONTRACT"
        | "PART_TIME"
        | "INTERNSHIP"
        | "FREELANCE",
      numberOfCandidates: Number(jobs.numberOfCandidates),
      salaryMin: jobs.salaryMin ? Number(jobs.salaryMin) : null,
      salaryMax: jobs.salaryMax ? Number(jobs.salaryMax) : null,
      currency: "IDR",
      formConfigs: {
        create: [...configArray],
      },
    };

    const job = await prismadb.job.create({
      data: payload,
      include: { formConfigs: true },
    });

    return NextResponse.json(job);
  } catch (error) {
    console.log("[Jobs] Error:", JSON.stringify(error));
    return new NextResponse("Internal Error", { status: 500 });
  }
}

// export async function PUT(req: Request) {
//   try {
//     const { searchParams } = new URL(req.url);
//     const id = searchParams.get("id");
//     if (!id)
//       return NextResponse.json({ error: "Missing job ID" }, { status: 400 });

//     const body = await req.json();
//     const parsed = jobSchema.partial().parse(body);
//     const { jobs, configs } = parsed;

//     const configArray = Object.entries(configs).map(([key, value]) => ({
//       fieldKey: key,
//       fieldOption: value,
//     }));

//     const job = await prismadb.job.update({
//       where: { id },
//       data: {
//         ...parsed,
//         formConfigs: configs
//           ? {
//               deleteMany: {},
//               create: configArray,
//             }
//           : undefined,
//       },
//       include: { formConfigs: true },
//     });

//     return NextResponse.json({ data: job });
//   } catch (err) {
//     console.error("PUT /jobs error:", err);
//     return NextResponse.json(
//       { error: err instanceof Error ? err.message : "Failed to update job" },
//       { status: 400 },
//     );
//   }
// }

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    if (!id)
      return NextResponse.json({ error: "Missing job ID" }, { status: 400 });

    await prismadb.formConfig.deleteMany({ where: { jobId: id } });
    await prismadb.job.delete({ where: { id } });

    return NextResponse.json({ message: "Job deleted successfully" });
  } catch (err) {
    console.error("DELETE /jobs error:", err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Failed to delete job" },
      { status: 400 },
    );
  }
}
