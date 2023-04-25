import type { NextRequest } from "next/server";

export function middleware(request) {
  if (!request.nextUrl.pathname.startsWith("/Auth")) {
    if (localStorage.getItem("user") == null) {
      request.nextUrl = new URL("/Auth", request.nextUrl);
    }
  }
  return request.nextUrl;
}
