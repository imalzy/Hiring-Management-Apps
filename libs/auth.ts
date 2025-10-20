import { cookies } from "next/headers";
import * as jose from "jose";

export async function createSession(user: {
  id: string;
  role: string;
  fullname: string;
}) {
  const jwt = await new jose.SignJWT(user)
    .setExpirationTime("7d")
    .setProtectedHeader({ alg: "HS256" })
    .sign(jwtConfig.secret);
  const cookieStore = await cookies();
  cookieStore.set("session", jwt, {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
  });
}

export async function destroySession() {
  const cookieStore = await cookies();
  cookieStore.delete("session");
}

export async function getUserFromSession(): Promise<{
  id: string;
  role: string;
  fullname: string;
} | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get("session")?.value;
  if (!token) return null;
  try {
    const decode = (await jose.jwtVerify(token, jwtConfig.secret, {
      algorithms: ["HS256"],
    })) as {
      payload: {
        id: string;
        role: string;
        fullname: string;
      };
    };
    return decode.payload;
  } catch {
    return null;
  }
}

export const jwtConfig = {
  secret: new TextEncoder().encode(process.env.NEXT_PUBLIC_JWT_SECRET),
};
