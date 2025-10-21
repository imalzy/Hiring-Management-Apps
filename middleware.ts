import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import * as jose from "jose";

const jwtConfig = {
  secret: new TextEncoder().encode(process.env.NEXT_PUBLIC_JWT_SECRET),
};

export async function middleware(req: NextRequest) {
  const token = req.cookies.get("session")?.value;
  const { pathname } = req.nextUrl;

  const isProtectedRoute =
    pathname.startsWith("/dashboard") || pathname.startsWith("/jobs");

  if (!isProtectedRoute) return NextResponse.next();

  if (!token) {
    const loginUrl = new URL("/login", req.url);
    loginUrl.searchParams.set("from", pathname);
    return NextResponse.redirect(loginUrl);
  }

  try {
    const { payload } = (await jose.jwtVerify(token, jwtConfig.secret, {
      algorithms: ["HS256"],
    })) as {
      payload: {
        id: string;
        role: string;
        fullname: string;
      };
    };
    const role = payload.role as string;
    if (pathname === "/dashboard" && role === "CANDIDATE") {
      return NextResponse.redirect(new URL("/jobs", req.url));
    }

    if (pathname === "/jobs" && role === "ADMIN") {
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }

    return NextResponse.next();
  } catch {
    const res = NextResponse.redirect(new URL("/login", req.url));
    res.cookies.delete("session");
    return res;
  }
}

export const config = {
  matcher: ["/dashboard/:path*"],
};
