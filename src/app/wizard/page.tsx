 "use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

type ServiceItem = { id: number; title: string; description: string };

type Step = 1 | 2 | 3;

export default function WizardPage() {
  const [step, setStep] = useState<Step>(1);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const [name, setName] = useState("");
  const [ownerName, setOwnerName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const [about, setAbout] = useState("");
  const [heroTitle, setHeroTitle] = useState("");
  const [heroSubtitle, setHeroSubtitle] = useState("");

  const [services, setServices] = useState<ServiceItem[]>([
    { id: 1, title: "Consulenza fiscale", description: "Pianificazione e ottimizzazione." },
  ]);

  const [template, setTemplate] = useState<"MINIMAL_TECH" | "ELEGANT_CORPORATE">(
    "MINIMAL_TECH"
  );

  const [slug, setSlug] = useState("");
  const [slugStatus, setSlugStatus] = useState<"idle" | "checking" | "free" | "taken" | "invalid">(
    "idle"
  );

  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [coverFile, setCoverFile] = useState<File | null>(null);

  const currentStepLabel =
    step === 1 ? "Dati personali" : step === 2 ? "Servizi" : "Template & immagini";

  const handleSlugBlur = async () => {
    if (!slug) return;
    if (!/^[a-z0-9-]+$/.test(slug)) {
      setSlugStatus("invalid");
      return;
    }

    setSlugStatus("checking");
    try {
      const res = await fetch(`/api/slug-available?slug=${encodeURIComponent(slug)}`);
      if (!res.ok) {
        setSlugStatus("invalid");
        return;
      }
      const data = await res.json();
      setSlugStatus(data.ok ? "free" : "taken");
    } catch {
      setSlugStatus("invalid");
    }
  };

  const addService = () => {
    const id = Date.now();
    setServices((prev) => [...prev, { id, title: "", description: "" }]);
  };

  const updateService = (id: number, field: "title" | "description", value: string) => {
    setServices((prev) =>
      prev.map((s) => (s.id === id ? { ...s, [field]: value } : s))
    );
  };

  const removeService = (id: number) => {
    setServices((prev) => prev.filter((s) => s.id !== id));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    startTransition(async () => {
      const fd = new FormData();
      fd.set("slug", slug);
      fd.set("name", name);
      fd.set("ownerName", ownerName);
      fd.set("email", email);
      fd.set("phone", phone);
      fd.set("about", about);
      fd.set("heroTitle", heroTitle);
      fd.set("heroSubtitle", heroSubtitle);
      fd.set("template", template);
      fd.set(
        "services",
        JSON.stringify(
          services
            .filter((s) => s.title.trim().length > 0)
            .map((s) => ({ title: s.title, description: s.description }))
        )
      );

      if (logoFile) fd.set("logo", logoFile);
      if (coverFile) fd.set("cover", coverFile);

      const res = await fetch("/api/sites", {
        method: "POST",
        body: fd,
      });

      if (!res.ok) {
        return;
      }
      const data = await res.json();
      router.push(data.url);
    });
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50">
      <main className="mx-auto flex min-h-screen max-w-4xl flex-col gap-8 px-4 py-10">
        <header className="space-y-2">
          <p className="text-xs font-medium uppercase tracking-[0.3em] text-sky-400">
            Wizard di configurazione
          </p>
          <h1 className="text-xl font-semibold">Crea il sito per il tuo studio</h1>
          <p className="text-xs text-slate-300">
            Compila i passaggi seguenti. Potrai sempre aggiornare i contenuti dal database.
          </p>
        </header>

        <div className="flex items-center gap-3 text-xs text-slate-300">
          <span className="inline-flex h-6 min-w-[28px] items-center justify-center rounded-full bg-sky-500 text-[11px] font-semibold text-slate-950">
            {step}/3
          </span>
          <span>{currentStepLabel}</span>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {step === 1 && (
            <section className="space-y-4 rounded-xl border border-slate-800 bg-slate-900/40 p-5">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-1.5">
                  <Label htmlFor="name">Nome studio</Label>
                  <Input
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="ownerName">Nome del professionista</Label>
                  <Input
                    id="ownerName"
                    value={ownerName}
                    onChange={(e) => setOwnerName(e.target.value)}
                    required
                  />
                </div>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-1.5">
                  <Label htmlFor="email">Email contatto</Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="phone">Telefono (opzionale)</Label>
                  <Input
                    id="phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="slug">
                  Sottodominio desiderato (slug)
                </Label>
                <Input
                  id="slug"
                  value={slug}
                  onChange={(e) => {
                    setSlug(e.target.value.toLowerCase());
                    setSlugStatus("idle");
                  }}
                  onBlur={handleSlugBlur}
                  placeholder="es. studio-rossi"
                  required
                />
                <p className="text-[11px] text-slate-400">
                  Il sito sarà raggiungibile su{" "}
                  {process.env.NEXT_PUBLIC_MAIN_DOMAIN
                    ? `nome.${process.env.NEXT_PUBLIC_MAIN_DOMAIN}`
                    : "nome.localhost:3000"}
                </p>
                {slugStatus === "checking" && (
                  <p className="text-[11px] text-sky-400">Verifica disponibilità…</p>
                )}
                {slugStatus === "free" && (
                  <p className="text-[11px] text-emerald-400">
                    Sottodominio disponibile.
                  </p>
                )}
                {slugStatus === "taken" && (
                  <p className="text-[11px] text-red-400">
                    Sottodominio già utilizzato, scegline un altro.
                  </p>
                )}
                {slugStatus === "invalid" && (
                  <p className="text-[11px] text-red-400">
                    Formato non valido o errore temporaneo. Usa solo lettere, numeri e
                    trattini.
                  </p>
                )}
              </div>
            </section>
          )}

          {step === 2 && (
            <section className="space-y-4 rounded-xl border border-slate-800 bg-slate-900/40 p-5">
              <div className="space-y-1.5">
                <Label htmlFor="about">Chi siamo</Label>
                <Textarea
                  id="about"
                  rows={4}
                  value={about}
                  onChange={(e) => setAbout(e.target.value)}
                  placeholder="Descrivi lo studio, le aree di competenza e il tuo approccio."
                />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label>Servizi offerti</Label>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={addService}
                  >
                    Aggiungi servizio
                  </Button>
                </div>
                <p className="text-[11px] text-slate-400">
                  Inserisci una lista di servizi che verranno mostrati nella sezione
                  dedicata del sito.
                </p>
                <div className="space-y-3">
                  {services.map((service) => (
                    <div
                      key={service.id}
                      className="grid gap-2 rounded-md border border-slate-800 bg-slate-950/40 p-3 md:grid-cols-[minmax(0,1.2fr)_minmax(0,1.4fr)_auto]"
                    >
                      <Input
                        placeholder="Titolo servizio"
                        value={service.title}
                        onChange={(e) =>
                          updateService(service.id, "title", e.target.value)
                        }
                      />
                      <Input
                        placeholder="Descrizione breve"
                        value={service.description}
                        onChange={(e) =>
                          updateService(service.id, "description", e.target.value)
                        }
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => removeService(service.id)}
                      >
                        ×
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          )}

          {step === 3 && (
            <section className="space-y-4 rounded-xl border border-slate-800 bg-slate-900/40 p-5">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-1.5">
                  <Label htmlFor="heroTitle">Titolo Hero</Label>
                  <Input
                    id="heroTitle"
                    value={heroTitle}
                    onChange={(e) => setHeroTitle(e.target.value)}
                    placeholder="Es. Consulenza fiscale per professionisti e PMI"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="heroSubtitle">Sottotitolo Hero</Label>
                  <Input
                    id="heroSubtitle"
                    value={heroSubtitle}
                    onChange={(e) => setHeroSubtitle(e.target.value)}
                    placeholder="Una frase che chiarisca il valore dello studio."
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Seleziona il template</Label>
                <div className="grid gap-3 md:grid-cols-2 text-xs">
                  <button
                    type="button"
                    onClick={() => setTemplate("MINIMAL_TECH")}
                    className={`rounded-lg border p-3 text-left transition ${
                      template === "MINIMAL_TECH"
                        ? "border-sky-500 bg-slate-900/80"
                        : "border-slate-800 bg-slate-950/40 hover:border-slate-700"
                    }`}
                  >
                    <p className="text-[11px] uppercase tracking-[0.18em] text-sky-400">
                      Template A
                    </p>
                    <p className="mt-1 text-sm font-semibold">Minimal Tech</p>
                    <p className="mt-1 text-[11px] text-slate-300">
                      Layout moderno blu/grigio, ideale per studi digital oriented.
                    </p>
                  </button>

                  <button
                    type="button"
                    onClick={() => setTemplate("ELEGANT_CORPORATE")}
                    className={`rounded-lg border p-3 text-left transition ${
                      template === "ELEGANT_CORPORATE"
                        ? "border-amber-400 bg-zinc-950/90"
                        : "border-zinc-800 bg-zinc-950/40 hover:border-zinc-700"
                    }`}
                  >
                    <p className="text-[11px] uppercase tracking-[0.18em] text-amber-300">
                      Template B
                    </p>
                    <p className="mt-1 text-sm font-semibold">Elegant Corporate</p>
                    <p className="mt-1 text-[11px] text-zinc-300">
                      Layout istituzionale antracite/oro con sezioni alternate.
                    </p>
                  </button>
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-1.5">
                  <Label htmlFor="logo">Logo (opzionale)</Label>
                  <Input
                    id="logo"
                    type="file"
                    accept="image/*"
                    onChange={(e) => setLogoFile(e.target.files?.[0] || null)}
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="cover">Immagine di copertina (opzionale)</Label>
                  <Input
                    id="cover"
                    type="file"
                    accept="image/*"
                    onChange={(e) => setCoverFile(e.target.files?.[0] || null)}
                  />
                </div>
              </div>
            </section>
          )}

          <div className="flex items-center justify-between pt-2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              disabled={step === 1}
              onClick={() => setStep((prev) => (prev === 1 ? 1 : ((prev - 1) as Step)))}
            >
              Indietro
            </Button>
            {step < 3 ? (
              <Button
                type="button"
                size="sm"
                onClick={() => setStep((prev) => (prev === 3 ? 3 : ((prev + 1) as Step)))}
              >
                Avanti
              </Button>
            ) : (
              <Button type="submit" size="sm" disabled={isPending || slugStatus === "taken"}>
                {isPending ? "Creazione in corso…" : "Crea sito"}
              </Button>
            )}
          </div>
        </form>
      </main>
    </div>
  );
}

