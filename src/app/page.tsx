import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-50">
      <main className="mx-auto flex min-h-screen max-w-4xl flex-col gap-12 px-4 py-12">
        <header className="flex items-center justify-between gap-4">
          <div className="space-y-1">
            <p className="text-xs font-medium tracking-[0.25em] text-sky-400 uppercase">
              Landing · Commercialisti
            </p>
            <h1 className="text-xl font-semibold text-slate-50">
              Crea il sito single-page per il tuo studio.
            </h1>
          </div>
          <Link
            href="#crea-sito"
            className="inline-flex h-9 items-center justify-center rounded-md bg-sky-500 px-4 text-xs font-medium text-slate-950 transition hover:bg-sky-400"
          >
            Crea il tuo sito
          </Link>
        </header>

        <section className="grid gap-10 md:grid-cols-[1.3fr_minmax(0,1fr)] items-start">
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-slate-50">
              Sito professionale, in pochi minuti.
            </h2>
            <p className="text-sm text-slate-300 leading-relaxed">
              Compila il form guidato, scegli il template che preferisci e
              pubblica lo studio su un sottodominio dedicato
              (es.&nbsp;{"mario-rossi.miosito.com"}). Perfetto per liberi
              professionisti e piccoli studi che vogliono una presenza online
              chiara e moderna.
            </p>
            <ul className="text-sm text-slate-300 space-y-1.5">
              <li>· Gestione automatica dei sottodomini</li>
              <li>· Due template ottimizzati per la lead generation</li>
              <li>· Immagini caricate in modo sicuro con Vercel Blob</li>
            </ul>
          </div>
          <div
            id="crea-sito"
            className="rounded-xl border border-slate-800 bg-slate-900/40 p-6 space-y-4"
          >
            <h2 className="text-sm font-medium text-slate-100">
              Inizia la configurazione
            </h2>
            <p className="text-xs text-slate-300">
              Completa i passaggi del form per generare automaticamente il tuo
              sito single-page.
            </p>
            <Link
              href="/wizard"
              className="inline-flex h-9 items-center justify-center rounded-md bg-sky-500 px-4 text-xs font-medium text-slate-950 transition hover:bg-sky-400"
            >
              Avvia il wizard
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}
