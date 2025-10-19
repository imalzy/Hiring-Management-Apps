import { NextRequest, NextResponse } from "next/server";

import { hashPassword } from "@/libs/bcrypt";
import prismadb from "@/libs/prismadb";

export async function POST(req: NextRequest) {
  const { fullname, email, password } = await req.json();

  if (!fullname || !email || !password) {
    return NextResponse.json(
      { error: "Missing required fields" },
      { status: 400 },
    );
  }

  const existing = await prismadb.user.findUnique({ where: { email } });
  if (existing) {
    return NextResponse.json(
      { error: "Email already exists" },
      { status: 409 },
    );
  }

  const hashed = await hashPassword(password);

  const user = await prismadb.user.create({
    data: { name: fullname, email, password: hashed, role: "CANDIDATE" },
  });

  return NextResponse.json({
    success: true,
    user: {
      id: user?.id,
      createdAt: user?.createdAt,
      updatedAt: user?.updatedAt,
    },
  });
}
