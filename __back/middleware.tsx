import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const host = req.headers.get("host") || "";

  if (host.endsWith(".dripnext.com")) {
    const subdomain = host.split(".")[0];
    req.nextUrl.searchParams.set("tenant", subdomain);
  } else {
    // custom domain → use full domain as tenant key
    req.nextUrl.searchParams.set("tenant", host);
  }

  return NextResponse.rewrite(req.nextUrl);
}

export const config = {
  matcher: [],
};
