import { NextRequest, NextResponse } from "next/server";

const MAIN_DOMAIN =
  process.env.NEXT_PUBLIC_MAIN_DOMAIN ||
  process.env.VERCEL_URL ||
  "localhost:3000";

export function middleware(req: NextRequest) {
  const url = req.nextUrl;
  const host = req.headers.get("host") || "";
  const hostNoPort = host.split(":")[0];
  const mainDomain = MAIN_DOMAIN.replace(/^https?:\/\//, "").split(":")[0];

  // If we are on the main domain, just continue to the normal app (landing + form)
  if (hostNoPort === mainDomain || hostNoPort === `www.${mainDomain}`) {
    return NextResponse.next();
  }

  // Do not treat Vercel default domains as tenant subdomains
  if (hostNoPort.endsWith(".vercel.app")) {
    return NextResponse.next();
  }

  // Handle localhost subdomains like slug.localhost:3000
  const isLocalhost = hostNoPort.includes("localhost");
  let subdomain: string | null = null;

  if (isLocalhost) {
    const [possibleSub] = hostNoPort.split(".");
    if (possibleSub && possibleSub !== "localhost") {
      subdomain = possibleSub;
    }
  } else {
    // production: mario-rossi.miosito.com -> mario-rossi
    const parts = hostNoPort.split(".");
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
