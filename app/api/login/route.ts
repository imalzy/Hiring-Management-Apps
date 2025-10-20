import { NextRequest, NextResponse } from "next/server";

import * as jose from "jose";

import prismadb from "@/libs/prismadb";
import { comparePassword } from "@/libs/bcrypt";

const jwtConfig = {
  secret: new TextEncoder().encode(process.env.NEXT_PUBLIC_JWT_SECRET),
};

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

    const jwt = await new jose.SignJWT({
      id: user.id,
      role: user.role,
      fullname: user.name,
    })
      .setExpirationTime("7d")
      .setProtectedHeader({ alg: "HS256" })
      .sign(jwtConfig.secret);

    const res = NextResponse.json({
      message: "Login success",
      role: user.role,
      id: user.id,
    });

    res.cookies.set({
      name: "session",
      value: jwt,
      httpOnly: true,
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });

    return res;
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Login failed" }, { status: 500 });
  }
}
