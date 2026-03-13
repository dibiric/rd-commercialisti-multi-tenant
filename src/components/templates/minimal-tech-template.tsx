import { Site, Service } from "@prisma/client";
import { Mail, Phone, MapPin } from "lucide-react";

type SiteWithServices = Site & { services: Service[] };

interface Props {
  site: SiteWithServices;
}

export function MinimalTechTemplate({ site }: Props) {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <main className="mx-auto max-w-5xl px-4 py-12 space-y-24">
        {/* Hero */}
        <section className="grid gap-10 md:grid-cols-2 items-center">
          <div className="space-y-6">
            <p className="text-xs uppercase tracking-[0.3em] text-sky-400">
              Studio Commercialista
            </p>
            <h1 className="text-4xl md:text-5xl font-semibold tracking-tight">
              {site.heroTitle || site.name}
            </h1>
            <p className="text-sm md:text-base text-slate-300 leading-relaxed">
              {site.heroSubtitle ||
                "Consulenza fiscale e societaria per liberi professionisti, PMI e startup innovative."}
            </p>
          </div>
          <div className="rounded-xl border border-slate-800 bg-slate-900/40 p-6 shadow-xl">
            <h2 className="text-sm font-medium text-slate-100 mb-4">
              Prenota una consulenza
            </h2>
            <div className="space-y-3 text-sm text-slate-300">
              {site.email && (
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-sky-400" />
                  <a href={`mailto:${site.email}`} className="hover:text-sky-300">
                    {site.email}
                  </a>
                </div>
              )}
              {site.phone && (
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-sky-400" />
                  <a href={`tel:${site.phone}`} className="hover:text-sky-300">
                    {site.phone}
                  </a>
                </div>
              )}
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-sky-400" />
                <span>{site.name}</span>
              </div>
            </div>
          </div>
        </section>

        {/* Chi siamo */}
        <section className="grid gap-10 md:grid-cols-[1.3fr_minmax(0,1fr)] items-start">
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-slate-50">Chi siamo</h2>
            <p className="text-sm md:text-base leading-relaxed text-slate-300">
              {site.about ||
                "Accompagniamo imprenditori e professionisti in tutte le fasi della crescita aziendale, con un approccio orientato ai dati e alle tecnologie digitali."}
            </p>
          </div>
          <div className="rounded-xl border border-slate-800 bg-slate-900/40 p-5 text-xs text-slate-300 space-y-2">
            <p className="font-medium text-slate-100">Perché sceglierci</p>
            <p>
              Pianifichiamo insieme a te gli obiettivi fiscali e finanziari,
              integrando strumenti cloud e flussi automatizzati per ridurre il
              carico amministrativo.
            </p>
          </div>
        </section>

        {/* Servizi */}
        <section className="space-y-6">
          <div className="flex items-center justify-between gap-4">
            <h2 className="text-lg font-semibold text-slate-50">Servizi</h2>
            <p className="text-xs text-slate-400">
              Soluzioni modulari per le esigenze del tuo business.
            </p>
          </div>
          <div className="grid gap-5 md:grid-cols-3">
            {site.services.map((service) => (
              <article
                key={service.id}
                className="group rounded-xl border border-slate-800 bg-slate-900/40 p-4 shadow-sm transition hover:border-sky-500 hover:bg-slate-900/70"
              >
                <div className="mb-3 h-8 w-8 rounded-lg bg-sky-500/10 text-sky-400 flex items-center justify-center text-xs font-medium">
                  {service.icon || service.title[0]}
                </div>
                <h3 className="text-sm font-semibold text-slate-50">
                  {service.title}
                </h3>
                {service.description && (
                  <p className="mt-2 text-xs text-slate-300 leading-relaxed">
                    {service.description}
                  </p>
                )}
              </article>
            ))}
          </div>
        </section>

        {/* Contatti */}
        <section id="contatti" className="border-t border-slate-800 pt-8">
          <div className="grid gap-8 md:grid-cols-[1.2fr_minmax(0,1fr)] items-start">
            <div className="space-y-3">
              <h2 className="text-lg font-semibold text-slate-50">
                Contatti
              </h2>
              <p className="text-sm text-slate-300">
                Raccontaci in poche righe la tua situazione: ti ricontatteremo
                con una proposta di consulenza personalizzata.
              </p>
            </div>
            <form
              className="space-y-3 rounded-xl border border-slate-800 bg-slate-900/40 p-5 text-sm"
              action={`mailto:${site.email || ""}`}
              method="post"
              encType="text/plain"
            >
              <div className="space-y-1.5">
                <label className="text-xs text-slate-300">Nome e Cognome</label>
                <input
                  name="nome"
                  className="w-full rounded-md border border-slate-700 bg-slate-950/60 px-3 py-2 text-xs outline-none ring-0 focus:border-sky-500 focus:outline-none"
                  required
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs text-slate-300">Email</label>
                <input
                  type="email"
                  name="email"
                  className="w-full rounded-md border border-slate-700 bg-slate-950/60 px-3 py-2 text-xs outline-none focus:border-sky-500"
                  required
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs text-slate-300">Messaggio</label>
                <textarea
                  name="messaggio"
                  className="min-h-[100px] w-full rounded-md border border-slate-700 bg-slate-950/60 px-3 py-2 text-xs outline-none focus:border-sky-500"
                  required
                />
              </div>
              <button
                type="submit"
                className="inline-flex h-9 items-center justify-center rounded-md bg-sky-500 px-3 text-xs font-medium text-slate-950 transition hover:bg-sky-400"
              >
                Invia richiesta
              </button>
            </form>
          </div>
        </section>
      </main>
    </div>
  );
}

