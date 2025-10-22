import { getUserFromSession } from "@/libs/auth";
import prismadb from "@/libs/prismadb";
import { NextRequest, NextResponse } from "next/server";

export async function POST(
  req: NextRequest,
  context: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await context.params;
    const jobId = id;
    const body = await req.json();

    console.log("Job ID:", jobId);
    const user = await getUserFromSession();

    const userId = user?.id;

    const job = await prismadb.job.findUnique({
      where: { id: jobId },
      // select: { id: true, status: true },
    });

    console.log("Job", job);

    if (!job || job.status !== "ACTIVE") {
      return NextResponse.json(
        { error: "Job is not available or inactive" },
        { status: 400 },
      );
    }

    const existing = await prismadb.candidate.findFirst({
      where: { userId, jobId },
    });

    if (existing) {
      return NextResponse.json(
        { error: "You have already applied for this job" },
        { status: 400 },
      );
    }

    const attributes = Object.entries(body).map(([key, value], index) => ({
      key,
      label: key.replaceAll("_", " ").replace(/\b\w/g, (c) => c.toUpperCase()),
      value: String(value),
      order: index + 1,
    }));

    const candidate = await prismadb.candidate.create({
      data: {
        candidateId: `CAND-${Date.now()}`,
        job: { connect: { id: jobId } },
        user: { connect: { id: userId } },
        attributes: { create: attributes },
      },
      include: { attributes: true },
    });

    return NextResponse.json(
      {
        message: "Application submitted successfully",
        candidateId: candidate.candidateId,
        jobId: candidate.jobId,
        userId: candidate.userId,
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("Apply job error:", error);

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
