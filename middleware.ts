import { NextRequest, NextResponse } from "next/server";

const MAIN_DOMAIN =
  process.env.NEXT_PUBLIC_MAIN_DOMAIN || "localhost:3000";

export function middleware(req: NextRequest) {
  const url = req.nextUrl;
  const host = req.headers.get("host") || "";

  // If we are on the main domain, just continue to the normal app (landing + form)
  if (host === MAIN_DOMAIN) {
    return NextResponse.next();
  }

  // Handle localhost subdomains like slug.localhost:3000
  const isLocalhost = host.includes("localhost");
  let subdomain: string | null = null;

  if (isLocalhost) {
    const [possibleSub] = host.split(".");
    if (possibleSub && possibleSub !== "localhost") {
      subdomain = possibleSub;
    }
  } else {
    // production: mario-rossi.miosito.com -> mario-rossi
    const parts = host.split(".");
    if (parts.length > 2) {
      subdomain = parts[0];
    }
  }

  if (subdomain) {
    const rewriteUrl = url.clone();
    rewriteUrl.pathname = `/${subdomain}`;
    return NextResponse.rewrite(rewriteUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};

