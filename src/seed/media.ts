/** Foto di partenza: file in /seed/images, testo alternativo e didascalia. */
export interface SeedMedia {
  file: string
  alt: string
  didascalia?: string
}

export const FLORIDA: SeedMedia[] = [
  { file: 'miami-ocean-drive.jpg', alt: 'Il gruppo con le magliette Americanitalia davanti a un hotel art déco di Ocean Drive, Miami Beach', didascalia: 'Miami Beach, Ocean Drive' },
  { file: 'cape-canaveral-razzo.jpg', alt: 'Ragazze e ragazzi davanti a un razzo storico a Cape Canaveral', didascalia: 'Cape Canaveral' },
  { file: 'spiaggia-golfo.jpg', alt: 'Ragazzi sdraiati sulla sabbia bianca di una spiaggia della Florida', didascalia: 'Relax in spiaggia' },
  { file: 'gatorland.jpg', alt: 'Il gruppo sotto l’ingresso a forma di bocca di alligatore di Gatorland', didascalia: 'Gatorland, Orlando' },
  { file: 'tramonto-gruppo.jpg', alt: 'Il gruppo sugli scogli al tramonto, con il cielo arancione riflesso sull’acqua', didascalia: 'Tramonto in Florida' },
  { file: 'battello-sanford.jpg', alt: 'Il gruppo davanti a un battello a ruota sul fiume', didascalia: 'Il battello a Sanford' },
  { file: 'lezione-in-classe.jpg', alt: 'Studenti al tavolo durante una lezione di inglese', didascalia: 'In classe a Orlando' },
  { file: 'scuola-welcome.jpg', alt: 'Studenti sorridenti sotto la scritta Welcome – Knowledge is the key to success', didascalia: 'Primo giorno di scuola' },
  { file: 'lake-eola-notte.jpg', alt: 'Il gruppo di sera davanti al lago illuminato e ai grattacieli di Orlando', didascalia: 'Lake Eola, Orlando' },
  { file: 'universal-orlando.jpg', alt: 'Ragazzi davanti al globo illuminato di Universal', didascalia: 'Universal Orlando' },
  { file: 'cena-vista-lago.jpg', alt: 'Ragazzi a cena a un tavolo con vista sul lago', didascalia: 'Cena vista lago' },
  { file: 'rooftop-notte.jpg', alt: 'Terrazza panoramica illuminata di viola sulla città di notte', didascalia: 'Orlando di sera' },
  { file: 'cowboys-orlando.jpg', alt: 'Ragazzi accanto a un enorme pick-up decorato da Cowboys Orlando', didascalia: 'Serata country' },
  { file: 'partenza-volo.jpg', alt: 'Selfie di Christian con i ragazzi sulla scaletta dell’aereo', didascalia: 'Si parte!' },
  { file: 'auto-noleggio.jpg', alt: 'L’auto del viaggio parcheggiata tra le palme', didascalia: 'L’auto del road trip' },
  { file: 'casa-vacanza.jpg', alt: 'Villetta con giardino in un quartiere residenziale di Orlando', didascalia: 'La casa vacanza' },
]

export const IRLANDA: SeedMedia[] = [
  { file: 'irlanda-04.jpg', alt: 'Gruppo in posa sulle scogliere sopra l’oceano', didascalia: 'Cliffs of Moher' },
  { file: 'irlanda-06.jpg', alt: 'Gruppo a braccia aperte sopra un lago tra le colline verdi', didascalia: 'Lough Tay, Wicklow' },
  { file: 'irlanda-09.jpg', alt: 'Tre persone sulle colonne di basalto della costa', didascalia: 'Giant’s Causeway' },
  { file: 'irlanda-12.jpg', alt: 'Gruppo di sera davanti alla scritta luminosa Titanic', didascalia: 'Titanic Belfast' },
  { file: 'irlanda-05.jpg', alt: 'Gruppo sulla scalinata di un grande palazzo neoclassico', didascalia: 'Stormont, Belfast' },
  { file: 'irlanda-11.jpg', alt: 'Gruppo davanti a un pub con un’auto d’epoca', didascalia: 'Johnnie Fox’s pub' },
  { file: 'irlanda-03.jpg', alt: 'Gruppo che saluta da una barca in un porticciolo colorato' },
  { file: 'irlanda-08.jpg', alt: 'Famiglia in posa su un belvedere sopra la baia' },
  { file: 'irlanda-10.jpg', alt: 'Gruppo su una lunga spiaggia sotto un cielo nuvoloso' },
  { file: 'irlanda-07.jpg', alt: 'Selfie di gruppo dentro un pub tradizionale' },
  { file: 'irlanda-02.jpg', alt: 'Selfie di gruppo sopra un lago di montagna' },
  { file: 'irlanda-01.jpg', alt: 'Gruppo di ragazzi accanto a una Cadillac d’epoca' },
]

export const CHRISTIAN: SeedMedia = {
  file: 'christian.jpg',
  alt: 'Christian con un cappello a stelle e strisce, al tramonto sulla riva in Florida',
}
