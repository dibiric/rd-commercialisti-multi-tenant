import { NextResponse } from "next/server";
import { put } from "@vercel/blob";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  const formData = await req.formData();

  const slug = String(formData.get("slug") || "").toLowerCase();
  const name = String(formData.get("name") || "");
  const ownerName = String(formData.get("ownerName") || "");
  const email = String(formData.get("email") || "");
  const phone = formData.get("phone")
    ? String(formData.get("phone"))
    : null;
  const about = formData.get("about")
    ? String(formData.get("about"))
    : null;
  const heroTitle = formData.get("heroTitle")
    ? String(formData.get("heroTitle"))
    : null;
  const heroSubtitle = formData.get("heroSubtitle")
    ? String(formData.get("heroSubtitle"))
    : null;
  const template = String(formData.get("template") || "MINIMAL_TECH");

  if (!slug || !name || !ownerName || !email) {
    return NextResponse.json(
      { error: "Missing required fields" },
      { status: 400 }
    );
  }

  const existing = await prisma.site.findUnique({ where: { slug } });
  if (existing) {
    return NextResponse.json(
      { error: "Slug already in use" },
      { status: 409 }
    );
  }

  let logoUrl: string | null = null;
  let coverUrl: string | null = null;

  const logoFile = formData.get("logo") as File | null;
  const coverFile = formData.get("cover") as File | null;

  const blobToken = process.env.BLOB_READ_WRITE_TOKEN;

  if (!blobToken && (logoFile || coverFile)) {
    return NextResponse.json(
      { error: "Blob token missing" },
      { status: 500 }
    );
  }

  if (logoFile && blobToken) {
    const uploaded = await put(`logos/${slug}`, logoFile, {
      access: "public",
    });
    logoUrl = uploaded.url;
  }

  if (coverFile && blobToken) {
    const uploaded = await put(`covers/${slug}`, coverFile, {
      access: "public",
    });
    coverUrl = uploaded.url;
  }

  const rawServices = formData.get("services");
  let services: { title: string; description?: string }[] = [];

  if (typeof rawServices === "string") {
    try {
      services = JSON.parse(rawServices);
    } catch {
      services = [];
    }
  }

  const site = await prisma.site.create({
    data: {
      slug,
      name,
      ownerName,
      email,
      phone: phone || undefined,
      about,
      heroTitle,
      heroSubtitle,
      template: template as any,
      logoUrl: logoUrl || undefined,
      coverUrl: coverUrl || undefined,
      services: {
        create: services.map((s) => ({
          title: s.title,
          description: s.description,
        })),
      },
    },
    include: { services: true },
  });

  const domain = process.env.NEXT_PUBLIC_MAIN_DOMAIN;
  const url = domain
    ? `https://${site.slug}.${domain}`
    : `http://${site.slug}.localhost:3000`;

  return NextResponse.json({ site, url });
}

