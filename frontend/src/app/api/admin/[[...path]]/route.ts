import { NextRequest, NextResponse } from "next/server";

/**
 * Proxy all /api/admin/* requests to the backend
 * This allows the admin dashboard to communicate with the backend API
 */
export async function GET(
  request: NextRequest,
  { params }: { params: { path: string[] } }
) {
  return proxyRequest(request, params.path);
}

export async function POST(
  request: NextRequest,
  { params }: { params: { path: string[] } }
) {
  return proxyRequest(request, params.path, await request.text());
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: { path: string[] } }
) {
  return proxyRequest(request, params.path, await request.text());
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { path: string[] } }
) {
  return proxyRequest(request, params.path);
}

async function proxyRequest(
  request: NextRequest,
  pathSegments: string[],
  body?: string
) {
  try {
    const backendUrl = process.env.BACKEND_API_URL || "http://localhost:5000/api";
    const endpoint = pathSegments.join("/");
    const url = new URL(`${backendUrl}/admin/${endpoint}`);

    // Preserve query parameters
    url.search = request.nextUrl.search;

    // Get token from request headers or cookies
    const token =
      request.headers.get("authorization")?.replace("Bearer ", "") ||
      request.cookies.get("vc_admin_token")?.value;

    const fetchOptions: RequestInit = {
      method: request.method,
      headers: {
        "Content-Type": "application/json",
      },
    };

    // Add authorization if token exists
    if (token) {
      fetchOptions.headers = {
        ...fetchOptions.headers,
        Authorization: `Bearer ${token}`,
      };
    }

    // Add body for POST/PATCH
    if (body && (request.method === "POST" || request.method === "PATCH")) {
      fetchOptions.body = body;
    }

    const response = await fetch(url.toString(), fetchOptions);
    const data = await response.json();

    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    console.error("API proxy error:", error);
    return NextResponse.json(
      { success: false, message: "API proxy error" },
      { status: 500 }
    );
  }
}
