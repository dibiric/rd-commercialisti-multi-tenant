import { Site, Service } from "@prisma/client";
import { Mail, Phone, Building2 } from "lucide-react";

type SiteWithServices = Site & { services: Service[] };

interface Props {
  site: SiteWithServices;
}

export function ElegantCorporateTemplate({ site }: Props) {
  return (
    <div className="min-h-screen bg-[#050508] text-slate-50">
      <main className="mx-auto max-w-5xl px-4 py-12 space-y-24">
        {/* Hero */}
        <section className="space-y-8">
          <div className="inline-flex items-center gap-2 rounded-full border border-zinc-800 bg-zinc-900/60 px-4 py-1 text-xs tracking-[0.2em] uppercase text-zinc-300">
            <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
            Studio di consulenza fiscale
          </div>
          <div className="grid gap-10 md:grid-cols-[1.4fr_minmax(0,1fr)] items-end">
            <div className="space-y-5">
              <h1 className="font-serif text-4xl md:text-5xl tracking-tight text-zinc-50">
                {site.heroTitle || site.name}
              </h1>
              <p className="text-sm md:text-base leading-relaxed text-zinc-300">
                {site.heroSubtitle ||
                  "Un partner affidabile e vicino all&apos;impresa, con una visione integrata tra fiscalità, governance e pianificazione patrimoniale."}
              </p>
            </div>
            <div className="space-y-3 text-sm">
              <p className="font-semibold text-amber-300">
                {site.ownerName || "Dottore Commercialista"}
              </p>
              {site.email && (
                <p className="flex items-center gap-2 text-xs text-zinc-300">
                  <Mail className="h-3 w-3 text-amber-300" />
                  <a href={`mailto:${site.email}`} className="hover:text-amber-200">
                    {site.email}
                  </a>
                </p>
              )}
              {site.phone && (
                <p className="flex items-center gap-2 text-xs text-zinc-300">
                  <Phone className="h-3 w-3 text-amber-300" />
                  <a href={`tel:${site.phone}`} className="hover:text-amber-200">
                    {site.phone}
                  </a>
                </p>
              )}
            </div>
          </div>
        </section>

        {/* Chi siamo */}
        <section className="grid gap-10 md:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] items-start">
          <div className="space-y-4">
            <h2 className="font-serif text-lg text-zinc-50">Chi siamo</h2>
            <p className="text-sm md:text-base leading-relaxed text-zinc-300">
              {site.about ||
                "Lo studio affianca imprese familiari, gruppi societari e professionisti nella gestione ordinaria e straordinaria, con un approccio prudente ma orientato alle opportunità."}
            </p>
          </div>
          <div className="rounded-3xl border border-zinc-800 bg-gradient-to-br from-zinc-950 to-zinc-900/80 p-5 text-xs text-zinc-300 space-y-3 shadow-[0_18px_60px_rgba(0,0,0,0.7)]">
            <div className="flex items-center gap-2">
              <div className="inline-flex h-8 w-8 items-center justify-center rounded-2xl bg-amber-400/10 text-amber-300">
                <Building2 className="h-4 w-4" />
              </div>
              <div>
                <p className="text-[11px] uppercase tracking-[0.18em] text-zinc-400">
                  I nostri valori
                </p>
                <p className="text-xs font-medium text-zinc-100">
                  Riservatezza, responsabilità, continuità nel tempo.
                </p>
              </div>
            </div>
            <p>
              Ci impegniamo a instaurare relazioni di lungo periodo, basate su
              un dialogo costante e su un aggiornamento normativo puntuale.
            </p>
          </div>
        </section>

        {/* Servizi */}
        <section className="space-y-7">
          <div className="flex items-center justify-between gap-6">
            <h2 className="font-serif text-lg text-zinc-50">Servizi</h2>
            <span className="h-px flex-1 bg-gradient-to-r from-zinc-800 via-zinc-700/80 to-amber-400/60" />
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {site.services.map((service) => (
              <article
                key={service.id}
                className="group rounded-3xl border border-zinc-800 bg-zinc-950/60 p-5 shadow-sm transition hover:border-amber-400/80 hover:bg-zinc-950"
              >
                <p className="text-[11px] uppercase tracking-[0.18em] text-amber-300 mb-2">
                  Servizio
                </p>
                <h3 className="font-serif text-sm text-zinc-50">
                  {service.title}
                </h3>
                {service.description && (
                  <p className="mt-3 text-xs leading-relaxed text-zinc-300">
                    {service.description}
                  </p>
                )}
              </article>
            ))}
          </div>
        </section>

        {/* Contatti */}
        <section id="contatti" className="border-t border-zinc-800 pt-8">
          <div className="grid gap-10 md:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] items-start">
            <div className="space-y-3">
              <h2 className="font-serif text-lg text-zinc-50">Contatti</h2>
              <p className="text-sm text-zinc-300">
                Per ricevere maggiori informazioni o fissare un incontro in
                studio, compila il form indicando il tipo di consulenza di cui
                hai bisogno.
              </p>
            </div>
            <form
              className="space-y-3 rounded-3xl border border-zinc-800 bg-zinc-950/60 p-5 text-sm"
              action={`mailto:${site.email || ""}`}
              method="post"
              encType="text/plain"
            >
              <div className="space-y-1.5">
                <label className="text-xs text-zinc-300">Nome e Cognome</label>
                <input
                  name="nome"
                  className="w-full rounded-full border border-zinc-700 bg-zinc-950/70 px-4 py-2 text-xs outline-none focus:border-amber-400"
                  required
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs text-zinc-300">Email</label>
                <input
                  type="email"
                  name="email"
                  className="w-full rounded-full border border-zinc-700 bg-zinc-950/70 px-4 py-2 text-xs outline-none focus:border-amber-400"
                  required
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs text-zinc-300">Messaggio</label>
                <textarea
                  name="messaggio"
                  className="min-h-[110px] w-full rounded-3xl border border-zinc-700 bg-zinc-950/70 px-4 py-2 text-xs outline-none focus:border-amber-400"
                  required
                />
              </div>
              <button
                type="submit"
                className="inline-flex h-9 items-center justify-center rounded-full bg-amber-400 px-5 text-xs font-medium text-black transition hover:bg-amber-300"
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

