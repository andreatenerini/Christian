# Americanitalia — sito vetrina vacanze studio in Florida

Next.js 15 + Payload CMS 3 (admin in italiano) + PostgreSQL (Neon). Nessun e-commerce: il visitatore chiama, scrive su WhatsApp o compila il modulo contatti.

## Avvio in locale

```bash
npm install
# crea .env.local partendo da env-template.txt
npm run dev          # sito su http://localhost:3000, CMS su /admin
npm run seed         # (una volta) carica testi e foto iniziali da /seed — rieseguibile senza duplicati
```

Al primo accesso a `/admin` Payload chiede di creare l'utente amministratore.

## Cosa si gestisce dal CMS

| Voce | Contenuto |
|---|---|
| Impostazioni sito | telefono (in evidenza in home), WhatsApp, email, frase "migliori prezzi", dati società, social |
| Home page | apertura (titolo, foto di sfondo), presentazione, foto in evidenza, chiusura |
| Chi sono | foto, biografia, esperienze, foto dei viaggi accompagnati |
| Programmi | la vacanza studio: inclusi, didattica, road trip, opzioni, foto. Quello "in evidenza" va in home e nel menu |
| Gallerie | album fotografici |
| Pagine | privacy, cookie e altre pagine di testo (`/slug`) |
| Richieste di contatto | messaggi arrivati dal modulo, con stato e note |

Ogni salvataggio aggiorna subito le pagine pubbliche.

## Produzione (Vercel)

Env obbligatorie: `DATABASE_URI`, `PAYLOAD_SECRET`, `NEXT_PUBLIC_SERVER_URL`, `BLOB_READ_WRITE_TOKEN` (i file caricati non persistono sul filesystem di Vercel). Facoltative per la notifica email delle richieste: `RESEND_API_KEY`, `RESEND_FROM_EMAIL`, `NOTIFICA_RICHIESTE_EMAIL`.

Le foto caricate col seed in locale stanno in `/media` (non versionata): dopo aver configurato Blob rilanciare il seed puntando al DB di produzione, oppure ricaricarle dal CMS.
