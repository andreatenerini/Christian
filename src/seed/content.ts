/** Testi iniziali, ricavati dal brief del titolare (info.md). Modificabili poi dal CMS. */
import { doc, h2, p, ul } from './lexical'

export const IMPOSTAZIONI = {
  // NUMERO FITTIZIO (riservato 555-01xx): da sostituire con quello reale dal CMS
  telefono: '+1 (407) 555-0123',
  telefonoLink: '+14075550123',
  whatsapp: '14075550123',
  claimPrezzi: 'Garantiamo i migliori prezzi sul mercato',
  orari: 'Rispondo anche su WhatsApp · Orlando è 6 ore indietro rispetto all’Italia',
  ragioneSociale: 'Americanitalia LLC',
  ein: '61-2338379',
  indirizzo: '1326 Kewannee Trl\nMaitland, FL 32751\nUSA',
}

export const PROGRAMMA = {
  titolo: 'Vacanza studio in Florida',
  slug: 'florida-estate',
  sottotitolo:
    'Tre settimane d’estate tra lezioni di inglese a Orlando, cinema di Hollywood e un road trip da Miami a St. Augustine. Con il tour leader sempre al tuo fianco.',
  periodo: '3 settimane · estate',
  destinatari: 'Neodiplomati e adulti',
  inEvidenza: true,
  pubblicato: true,
  ordine: 1,
  descrizione: doc(
    p('Una vacanza studio pensata su misura per ragazzi appena diplomati e per adulti che vogliono un’esperienza linguistica diretta, abbinata alla scoperta di uno dei posti più vivibili e belli al mondo: la Florida.'),
    p('Non solo una vacanza, come nella maggior parte delle offerte estive, ma una full immersion vera nella lingua inglese e negli usi e costumi americani. Dalla partenza in Italia fino al ritorno, ogni studente è seguito direttamente da me.'),
    h2('Come si svolge'),
    ul([
      'Al mattino, quattro giorni a settimana: lezioni di lingua e cultura americana all’English Language Academy di International Drive, a Orlando.',
      'Al pomeriggio: un corso monografico sul cinema di Hollywood, in 12 film.',
      'Nel tempo libero e nei weekend: escursioni e road trip, da Miami a St. Augustine fino al Golfo del Messico.',
    ]),
    p('È possibile anche partecipare al solo viaggio, senza attività didattica.'),
  ),
  inclusi: [
    {
      titolo: 'Tour leader 24 ore su 24',
      dettaglio:
        'Ti accompagno dall’aeroporto italiano di partenza, per tutte e tre le settimane, fino al ritorno: supporto educativo in inglese, competenze culturali, assistenza e consulenza durante tutto il soggiorno americano.',
    },
    { titolo: 'Corso di inglese a Orlando', dettaglio: '16 ore settimanali all’English Language Academy di International Drive, per tre settimane estive.' },
    { titolo: 'Corso sul cinema di Hollywood', dettaglio: 'Un corso monografico pomeridiano in 12 film, parte dell’unità didattica del corso linguistico.' },
    { titolo: 'Auto a noleggio', dettaglio: 'A disposizione per l’intera durata del viaggio, per un massimo di 9 partecipanti adulti.' },
    {
      titolo: 'Pernottamento',
      dettaglio:
        'In settimana camera singola in hotel o casa vacanza a Orlando; nei weekend a Miami e nell’area di St. Augustine, in camera singola o condivisa.',
    },
    { titolo: 'Tre escursioni giornaliere', dettaglio: 'Nella Florida centrale, più uscite pomeridiane, compatibilmente con il meteo.' },
    { titolo: 'Cena sul battello', dettaglio: 'Sul fiume St. Johns, a Sanford.' },
    { titolo: 'Cene in ristoranti convenzionati', dettaglio: null },
    { titolo: 'Attestato di frequenza', dettaglio: 'Del corso di lingua e cultura americana.' },
    { titolo: 'Consulenza su voli e assicurazione medica', dettaglio: 'Ti aiuto a scegliere voli e copertura sanitaria per gli Stati Uniti.' },
  ],
  didattica: {
    titolo: 'L’inglese americano, imparato dove si parla',
    introduzione:
      'Lezioni in quattro mattine a settimana, film nei pomeriggi e, su richiesta, conversazione in inglese anche fuori dall’orario didattico. Livello intermedio.',
    numeri: [
      { valore: '48', etichetta: 'ore di lingua e cultura americana' },
      { valore: '12', etichetta: 'film di Hollywood nei pomeriggi' },
      { valore: '3', etichetta: 'settimane d’estate in Florida' },
      { valore: '24h', etichetta: 'tour leader sempre con te' },
    ],
    unita: [
      'An interracial and class-based society',
      'History and constitution',
      'Patriotism and wars',
      'Racial segregation',
      'American way of life and American dream',
      'The power of money and lobbies',
      'The welfare system and civil rights',
      'The frontier and the Indians',
      'Hollywood cinema',
      'Sports',
      'Literature',
      'Music',
    ].map((titolo) => ({ titolo })),
  },
  roadTripIntro:
    'Spiagge sull’Atlantico e sul Golfo, la storia di St. Augustine, la base spaziale di Cape Canaveral, i laghi della Florida centrale e la festa del 4 luglio.',
  tappe: [
    ['Miami'],
    ['Palm Beach'],
    ['Cocoa Beach'],
    ['Daytona Beach'],
    ['New Smyrna Beach'],
    ['Cape Canaveral'],
    ['St. Augustine'],
    ['Mount Dora'],
    ['Rock Springs'],
    ['Sanford'],
    ['Orlando'],
    ['Winter Park'],
    ['Altamonte Springs'],
    ['Kissimmee'],
    ['Celebration', 'festa del 4 luglio'],
    ['Tampa'],
    ['Anna Maria Island'],
  ].map(([localita, nota]) => ({ localita, nota })),
  opzioni: [
    { titolo: 'Solo viaggio', testo: 'Puoi partecipare al viaggio anche senza le attività didattiche.' },
    { titolo: 'Conversazione extra', testo: 'Conversazione in inglese su richiesta, oltre all’orario delle lezioni.' },
    { titolo: 'Voli e assicurazione', testo: 'Consulenza turistica sulla scelta dei voli e dell’assicurazione medica per gli USA.' },
  ],
}

export const HOME = {
  hero: {
    etichetta: 'Vacanze studio in Florida',
    titolo: 'Tre settimane in Florida, dentro l’inglese vero',
    sottotitolo:
      'Per ragazzi appena diplomati e per adulti: corso di lingua a Orlando, cultura americana e un road trip tra le spiagge più belle. Seguiti da me, dalla partenza al ritorno.',
  },
  intro: {
    titolo: 'Una full immersion nella lingua e nella vita americana',
    testo:
      'Siamo specializzati in vacanze studio in Florida pensate su misura per ragazzi appena diplomati e per adulti che cercano un’esperienza linguistica diretta, abbinata alla scoperta di uno dei posti più vivibili e belli al mondo.',
    punti: [
      { titolo: 'Ti seguo io, dalla partenza', testo: 'Accompagno il gruppo dall’aeroporto italiano e per tutte e tre le settimane, fino al ritorno.' },
      { titolo: 'Vivo a Orlando', testo: 'Ho la residenza in Florida: conosco i posti, le distanze e la vita di tutti i giorni.' },
      { titolo: 'Il miglior prezzo sul mercato', testo: 'Un servizio di qualità, senza intermediari. Chiamami e confronta.' },
    ],
  },
  galleriaTitolo: 'Com’è andata l’ultima estate',
  cta: {
    titolo: 'Partiamo insieme la prossima estate?',
    testo: 'Gruppi piccoli, un tour leader sempre presente e un prezzo che ti dico io, senza sorprese.',
  },
}

export const CHI_SONO = {
  titolo: 'Ciao, sono Christian',
  sottotitolo:
    'Vivo a Orlando e accompagno di persona ogni gruppo, dall’Italia alla Florida e ritorno.',
  citazione:
    'Non solo una vacanza: una full immersion vera nella lingua inglese e negli usi e costumi americani.',
  biografia: doc(
    p('Sono il titolare di Americanitalia. Ho la residenza in Florida, dove ho vissuto otto anni, e ho vissuto anche a Toronto, in Canada.'),
    p('Mi sono laureato in Cinema e in Italiano per stranieri. Sono professore di lingua italiana e guida turistica in Italia e all’estero, e per due anni sono stato tour leader in Irlanda per gruppi di ragazzi.'),
    p('Per questo le mie vacanze studio uniscono le due cose che conosco meglio: l’insegnamento e il viaggio. Gli studenti sono seguiti direttamente da me fin dalla partenza, con la garanzia di un servizio di qualità al miglior prezzo sul mercato.'),
  ),
  tappe: [
    { etichetta: '8 anni', testo: 'vissuti in Florida' },
    { etichetta: 'Orlando', testo: 'dove ho la residenza' },
    { etichetta: '2 anni', testo: 'tour leader per ragazzi in Irlanda' },
    { etichetta: 'Toronto', testo: 'un’altra casa, in Canada' },
    { etichetta: 'Laurea', testo: 'in Cinema e Italiano per stranieri' },
    { etichetta: 'Prof.', testo: 'di italiano e guida turistica' },
  ],
  fotoEsperienzeTitolo: 'I gruppi che ho accompagnato in Irlanda',
}

export const PAGINE = [
  {
    titolo: 'Privacy',
    slug: 'privacy',
    inFooter: true,
    contenuto: doc(
      p('Titolare del trattamento: Americanitalia LLC, 1326 Kewannee Trl, Maitland, FL 32751, USA.'),
      h2('Quali dati raccogliamo'),
      p('Solo i dati che inserisci nel modulo di contatto: nome, email, telefono e il contenuto del messaggio.'),
      h2('Perché li usiamo'),
      p('Esclusivamente per rispondere alla tua richiesta e inviarti la proposta di viaggio. Non li cediamo a terzi e non li usiamo per newsletter senza il tuo consenso.'),
      h2('Per quanto tempo'),
      p('Per il tempo necessario a gestire la richiesta e, in caso di viaggio, per gli obblighi di legge.'),
      h2('I tuoi diritti'),
      p('Puoi chiedere in qualsiasi momento di consultare, correggere o cancellare i tuoi dati contattandoci ai recapiti indicati nel sito.'),
      p('Testo provvisorio: da far verificare a un consulente prima della pubblicazione.'),
    ),
  },
  {
    titolo: 'Cookie',
    slug: 'cookie',
    inFooter: true,
    contenuto: doc(
      p('Questo sito usa soltanto cookie tecnici, necessari al suo funzionamento. Non usa cookie di profilazione né strumenti di statistica di terze parti.'),
      p('Se in futuro verranno aggiunti servizi di terze parti (ad esempio statistiche o video incorporati), questa pagina sarà aggiornata e ti verrà chiesto il consenso.'),
    ),
  },
]
