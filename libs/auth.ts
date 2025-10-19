import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

const SECRET = process.env.JWT_SECRET || "supersecret";

export async function createSession(user: { id: string; role: string }) {
  const token = jwt.sign(user, SECRET, { expiresIn: "7d" });
  const cookieStore = await cookies();
  cookieStore.set("session", token, {
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
} | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get("session")?.value;
  if (!token) return null;
  try {
    return jwt.verify(token, SECRET) as { id: string; role: string };
  } catch {
    return null;
  }
}
