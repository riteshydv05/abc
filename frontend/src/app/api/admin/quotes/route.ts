import { NextRequest, NextResponse } from "next/server";

const apiBase = process.env.BACKEND_API_URL || "http://localhost:5000/api";

export async function GET(request: NextRequest) {
  const token = request.cookies.get("vc_admin_token")?.value;

  if (!token) {
    return NextResponse.json(
      { success: false, message: "Unauthorized." },
      { status: 401 }
    );
  }

  const url = new URL(request.url);
  const query = url.searchParams.toString();
  const endpoint = `${apiBase}/quote${query ? `?${query}` : ""}`;

  const res = await fetch(endpoint, {
    headers: { Authorization: `Bearer ${token}` },
    cache: "no-store",
  });

  const data = await res.json().catch(() => ({}));
  return NextResponse.json(data, { status: res.status });
}
