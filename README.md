## Applicazione multi-tenant per commercialisti

Applicazione Next.js (App Router) che permette a studi di commercialisti di creare siti single-page su sottodomini dedicati, pronta per il deploy su Vercel.

### Funzionamento

- **Landing principale** sul dominio principale con form guidato (`/wizard`) per creare un nuovo sito.
- **Sottodomini dinamici**: richieste a `slug.miosito.com` vengono riscritte alla route `/[subdomain]` che mostra il sito del commercialista.
- **Database**: Prisma + PostgreSQL (es. Supabase) con modelli `Site` e `Service`.
- **Immagini**: upload opzionale di logo e immagine di copertina tramite Vercel Blob.
- **Template**: due varianti single-page:
  - Template A: Minimal Tech (blu/grigio, sans-serif, layout tech).
  - Template B: Elegant Corporate (antracite/oro, serif per i titoli, layout istituzionale).

### Setup locale

1. Installa le dipendenze:

```bash
npm install
```

2. Copia il file di esempio delle variabili d'ambiente:

```bash
cp .env.example .env
```

Compila `DATABASE_URL`, `NEXT_PUBLIC_MAIN_DOMAIN` (facoltativa in sviluppo) e `BLOB_READ_WRITE_TOKEN` se vuoi testare l'upload.

3. Esegui le migrazioni Prisma:

```bash
npx prisma migrate dev --name init
```

4. Avvia il server di sviluppo:

```bash
npm run dev
```

Apri `http://localhost:3000` per vedere la landing e `http://localhost:3000/wizard` per il form multi-step.

### Deploy su Vercel

1. **Collega il repository** a Vercel e crea un nuovo progetto.
2. In **Settings → Environment Variables** configura:
   - `DATABASE_URL`: stringa di connessione al database PostgreSQL/Supabase.
   - `NEXT_PUBLIC_MAIN_DOMAIN`: dominio principale senza protocollo (es. `miosito.com`).
   - `BLOB_READ_WRITE_TOKEN`: token di lettura/scrittura generato dalla sezione Blob del progetto Vercel.
3. Assicurati che le migrazioni Prisma vengano eseguite (build hook o esecuzione manuale da una macchina di gestione).
4. Imposta il dominio principale in Vercel (es. `miosito.com`). Le richieste a `slug.miosito.com` verranno gestite dal `middleware.ts` per il multi-tenancy.

