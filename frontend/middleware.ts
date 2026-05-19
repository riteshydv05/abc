import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

const adminLoginPath = "/admin/login";

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const token = req.cookies.get("vc_admin_token")?.value;
  const secret = process.env.ADMIN_JWT_SECRET;

  if (pathname.startsWith(adminLoginPath)) {
    if (!token || !secret) {
      return NextResponse.next();
    }

    try {
      const { payload } = await jwtVerify(token, new TextEncoder().encode(secret));
      if (payload?.role === "admin") {
        return NextResponse.redirect(new URL("/admin", req.url));
      }
    } catch {
      const res = NextResponse.next();
      res.cookies.set("vc_admin_token", "", { path: "/", maxAge: 0 });
      return res;
    }

    return NextResponse.next();
  }

  if (!token || !secret) {
    return NextResponse.redirect(new URL(adminLoginPath, req.url));
  }

  try {
    const { payload } = await jwtVerify(token, new TextEncoder().encode(secret));
    if (payload?.role !== "admin") {
      throw new Error("Invalid role");
    }
    return NextResponse.next();
  } catch {
    const res = NextResponse.redirect(new URL(adminLoginPath, req.url));
    res.cookies.set("vc_admin_token", "", { path: "/", maxAge: 0 });
    return res;
  }
}

export const config = {
  matcher: ["/admin/:path*"],
};
