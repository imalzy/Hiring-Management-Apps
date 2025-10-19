import { destroySession } from "@/libs/auth";
import { NextResponse } from "next/server";

export async function POST() {
  try {
    await destroySession();
    const response = NextResponse.json({
      message: "Logout success",
    });

    return response;
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Login failed" }, { status: 500 });
  }
}
