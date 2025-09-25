import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const host = req.headers.get("host") || "";

  const mainDomain = "dripnext.com";
  // Specific custom domain mapping
  const customDomain = "sub.arabcoupondaily.com";
  // const customDomain = "lvh.me:3000";

  if (host === customDomain) {
    const url = new URL(req.url);
    url.host = `client1.${mainDomain}`;

    return NextResponse.redirect(url);
  }

  // const hostName = "lvh.me:3000";
  if (host.endsWith("." + mainDomain)) {
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
