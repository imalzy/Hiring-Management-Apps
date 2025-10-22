import { NextRequest, NextResponse } from "next/server";

import slugify from "slugify";
import prismadb from "@/libs/prismadb";

import { jobSchema } from "@/components/dashboard/schema/job";

export async function GET() {
  try {
    const jobs = await prismadb.job.findMany({
      include: { formConfigs: true },
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json({ data: jobs });
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
