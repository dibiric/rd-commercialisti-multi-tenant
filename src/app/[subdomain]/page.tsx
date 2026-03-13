import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { MinimalTechTemplate } from "@/components/templates/minimal-tech-template";
import { ElegantCorporateTemplate } from "@/components/templates/elegant-corporate-template";

interface PageProps {
  params: {
    subdomain: string;
  };
}

export default async function SubdomainPage({ params }: PageProps) {
  const site = await prisma.site.findUnique({
    where: { slug: params.subdomain },
    include: { services: true },
  });

  if (!site) {
    notFound();
  }

  switch (site.template) {
    case "MINIMAL_TECH":
      return <MinimalTechTemplate site={site} />;
    case "ELEGANT_CORPORATE":
      return <ElegantCorporateTemplate site={site} />;
    default:
      return <MinimalTechTemplate site={site} />;
  }
}

