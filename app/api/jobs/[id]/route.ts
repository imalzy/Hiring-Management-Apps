import prismadb from "@/libs/prismadb";
import { NextResponse, NextRequest } from "next/server";

export async function GET(
  req: NextRequest,
  contextPromise: Promise<{ params: { id: string } }>,
) {
  try {
    const { params } = await contextPromise;
    const { id } = params;

    if (!id) {
      return new NextResponse("Invalid or missing job ID params", {
        status: 400,
      });
    }

    const job = await prismadb.job.findMany({
      where: {
        id: id,
      },
      include: { formConfigs: true },
      orderBy: { createdAt: "desc" },
    });

    if (!job) {
      return NextResponse.json(
        { error: `Job not found for ID: ${id}` },
        { status: 404 },
      );
    }

    const configs = job[0].formConfigs.filter((v) => v.fieldOption !== "Off");
    const response = {
      ...job[0],
      formConfigs: configs,
    };

    return NextResponse.json({ data: response });
  } catch (err) {
    console.error("GET /jobs error:", err);
    return NextResponse.json(
      { error: "Failed to fetch jobs" },
      { status: 500 },
    );
  }
}
