import { NextRequest, NextResponse } from "next/server";

const apiBase = process.env.BACKEND_API_URL || "http://localhost:5000/api";
const cookieName = "vc_admin_token";
const tokenMaxAgeSeconds = 60 * 60 * 12;

export async function POST(request: NextRequest) {
  let body: { email?: string; password?: string } | null = null;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { success: false, message: "Invalid JSON body." },
      { status: 400 }
    );
  }

  const email = body?.email?.toString().trim();
  const password = body?.password?.toString();

  if (!email || !password) {
    return NextResponse.json(
      { success: false, message: "Email and password are required." },
      { status: 400 }
    );
  }

  const res = await fetch(`${apiBase}/admin/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
    cache: "no-store",
  });

  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    return NextResponse.json(
      { success: false, message: data?.message || "Login failed." },
      { status: res.status }
    );
  }

  if (!data?.token) {
    return NextResponse.json(
      { success: false, message: "Login failed. Missing token." },
      { status: 502 }
    );
  }

  const response = NextResponse.json({ success: true, admin: data?.admin ?? null });
  response.cookies.set(cookieName, data.token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: tokenMaxAgeSeconds,
    path: "/",
  });
  response.headers.set("Cache-Control", "no-store");
  return response;
}
