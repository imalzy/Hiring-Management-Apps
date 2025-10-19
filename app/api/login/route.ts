import { NextRequest, NextResponse } from "next/server";

import prismadb from "@/libs/prismadb";
import { comparePassword } from "@/libs/bcrypt";
import { createSession } from "@/libs/auth";

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    const user = await prismadb.user.findUnique({ where: { email } });
    if (!user)
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 },
      );

    const valid = await comparePassword(password, user.password);
    if (!valid)
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 },
      );

    createSession({ id: user.id, role: user.role });

    return NextResponse.json({
      success: true,
      user: { id: user.id, role: user.role },
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Login failed" }, { status: 500 });
  }
}
