import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const slug = searchParams.get("slug");

  if (!slug || !/^[a-z0-9-]+$/.test(slug)) {
    return NextResponse.json({ ok: false, reason: "INVALID" }, { status: 400 });
  }

  const existing = await prisma.site.findUnique({
    where: { slug },
    select: { id: true },
  });

  return NextResponse.json({ ok: !existing });
}

