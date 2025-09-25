import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const host = req.headers.get("host") || "";
  const hostName = "dripnext.com";
  // const hostName = "lvh.me:3000";
  if (host.endsWith("." + hostName)) {
    const subdomain = host.split(".")[0];
    req.nextUrl.searchParams.set("tenant", subdomain);
  } else {
    // custom domain → use full domain as tenant key
    req.nextUrl.searchParams.set("tenant", host);
  }

  return NextResponse.rewrite(req.nextUrl);
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
