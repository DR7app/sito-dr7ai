/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { SectionFeature, TargetAudience, FaqItem, BeforeAfterItem } from '../types';

export const HERO_COPY = {
  title: "Gestisci la tua attività di noleggio e flotte da un unico cruscotto intelligente.",
  subtitle: "La piattaforma SaaS completa e moderna per autonoleggi d'élite, NCC e gestori di flotte. Centralizza prenotazioni, clienti, veicoli e pagamenti senza più caos di fogli Excel e chat sparse.",
  ctaPrimary: "Richiedi Demo DR7 AI",
  ctaSecondary: "Scopri i Moduli del Software",
  reassurance: "Nessun dato di pagamento richiesto. Dimostrazione personalizzata e gratuita in italiano.",
  adminUrl: "#demo-request",
  portalUrl: "https://dr7ai.com"
};

export const PROBLEM_COPY = {
  title: "Il caos operativo sta frenando la crescita del tuo noleggio?",
  subtitle: "Senza una piattaforma centralizzata, ogni prenotazione persa o veicolo fermo si traduce in centinaia di euro di perdite nette ogni singolo giorno.",
  painPoints: [
    {
      title: "Prenotazioni sparse e confuse",
      description: "Le tue richieste arrivano spezzate tra WhatsApp, email private, telefonate a tarda sera e fogli di carta che poi si perdono nei cassetti."
    },
    {
      title: "Visibilità flotta in tempo reale pari a zero",
      description: "Rischiare il doppio noleggio (overbooking) o lasciare veicoli fermi in officina senza tracciamento chiaro blocca il tuo flusso di cassa operativo."
    },
    {
      title: "Pagamenti e fatture dispersi",
      description: "Incorrere in scadenze non tracciate, caparre non incassate puntualmente o fatturazioni manuali che richiedono ore ruba preziose giornate commerciali."
    },
    {
      title: "Stato del business invisibile",
      description: "Impossibile sapere in tempo reale quale veicolo rende di più, quale sede performa meglio o calcolare il fatturato preciso stimato alla fine del mese."
    }
  ]
};

export const SOLUTION_COPY = {
  title: "Benvenuto nell'era del noleggio intelligente con DR7 AI",
  subtitle: "L'unica piattaforma gestionale che mette al centro il controllo totale dei tuoi veicoli e delle tue prenotazioni.",
  description: "DR7 AI è stato progettato per eliminare i ritardi d'ufficio e i fardelli di gestione. Uniamo la flessibilità di un CRM moderno alla stabilità di un software flotta professionale di ultima generazione. Permetti alla tua azienda di lavorare con processi fluidi, veloci e orientatissimi ai profitti.",
  keyMetrics: [
    { value: "+28%", label: "Tasso di occupazione flotta" },
    { value: "-5h", label: "Tempo di segreteria a settimana" },
    { value: "0", label: "Errori di overbooking rimasti" }
  ]
};

export const BENEFITS_COPY = [
  {
    id: "oper_control",
    title: "Controllo Operativo Totale",
    description: "Ogni macchina, ogni cliente, ogni contratto è sotto controllo in tempo reale. Monitora le date di ritiro, le riconsegne, le cauzioni e le scadenze importanti da un pannello centralizzato e intuitivo.",
    iconName: "Kanban"
  },
  {
    id: "booked_org",
    title: "Prenotazioni Organizzate",
    description: "Smetti di temere sovrapposizioni e doppi inserimenti. DR7 AI registra e ordina cronologicamente le tue prenotazioni su un calendario interattivo di flotta aggiornabile con semplici clic.",
    iconName: "CalendarClock"
  },
  {
    id: "premium_clients",
    title: "Anagrafica Clienti Fissa",
    description: "Costruisci uno storico digitale di valore per ogni conducente. Salva patenti di guida, documenti d'identità, preferenze di viaggio, canali di contatto e pagamenti effettuati nel pieno rispetto della privacy.",
    iconName: "Users"
  },
  {
    id: "fleet_power",
    title: "Controllo Flotta e Veicoli",
    description: "Tieni traccia delle scadenze di assicurazione, bollo, revisioni cicliche o manutenzioni urgenti dei mezzi. Minimizza i tempi di fermo macchina e mantieni i tuoi autisti sempre operativi su strada.",
    iconName: "Target"
  },
  {
    id: "revenue_tracks",
    title: "Entrate e Pagamenti Chiari",
    description: "Traccia caparre, acconti e saldi finali dei noleggi. Con i moduli operativi, visualizzi chi ha pagato in anticipo e chi deve ancora saldare il proprio noleggio direttamente all'arrivo.",
    iconName: "TrendingUp"
  },
  {
    id: "less_manual",
    title: "Meno Lavoro Manuale",
    description: "Libera il tuo staff amministrativo dalle mansioni ripetitive. Genera riepiloghi, notifica i clienti tramite email o template predefiniti e riduci drasticamente la scrittura di file cartacei.",
    iconName: "Zap"
  }
];

export const FEATURES_COPY: SectionFeature[] = [
  {
    id: "dash_module",
    title: "Dashboard Centralizzata",
    description: "Visualizzazione istantanea del fatturato, veicoli disponibili, noleggi attivi nel giorno e tassi medi di occupazione dei veicoli.",
    iconName: "LayoutGrid"
  },
  {
    id: "booking_module",
    title: "Gestione Prenotazioni",
    description: "Modulo intuitivo per registrare i periodi di noleggio, tariffe, cauzioni di sicurezza pre-autorizzate ed extra opzionali forniti.",
    iconName: "Contact"
  },
  {
    id: "vehicles_module",
    title: "Modulo Flotta e Veicoli",
    description: "Riepilogo dei mezzi con targa, chilometraggio attuale, scorte di benzina e avvisi automatici sulle prossime scadenze legali.",
    iconName: "Coins"
  },
  {
    id: "payments_module",
    title: "Tracciamento Pagamenti",
    description: "Registra incassi con carte, bonifici o contanti. Verifica in tre secondi lo stato dei depositi cauzionali rimborsati o trattenuti.",
    iconName: "UserCheck"
  },
  {
    id: "invoices_module",
    title: "Notifiche e Fatturazione",
    description: "Creazione rapida di conferme d'ordine pronte per l'invio via email ai clienti o al reparto di contabilità aziendale.",
    iconName: "CheckSquare"
  },
  {
    id: "stats_module",
    title: "Modulo Analisi & Ricavi",
    description: "Visualizza report, scomposizione dei ricavi per categoria di auto e redditività reale di ogni singola vettura posseduta.",
    iconName: "BarChart3"
  },
  {
    id: "sub_module",
    title: "Abbonamenti e Piani Vari",
    description: "Ideale per gestire noleggi a lungo termine, formule in abbonamento mensile e canoni ricorrenti per clienti business ricorrenti.",
    iconName: "Cpu"
  },
  {
    id: "team_module",
    title: "Gestione Collaboratori",
    description: "Assegna diversi permessi operativi ad autisti, personale di banco e venditori. Massima sicurezza dei dati commerciali.",
    iconName: "ShieldAlert"
  }
];

export const TARGETS_COPY: TargetAudience[] = [
  {
    id: "autonoleggi",
    title: "Autonoleggi auto e furgoni",
    description: "Per chi noleggia autovetture, van, camper o scooter a breve e medio termine.",
    benefit: "Centralizza la programmazione di ritiro e riconsegna per evitare l'overbooking e proteggere la tua reputazione.",
    iconName: "Building2"
  },
  {
    id: "ncc_chauffeur",
    title: "Agenzie di NCC e Chauffeur",
    description: "Per chi offre servizi con conducente di vetture lussuose o transfer aeroportuali.",
    benefit: "Assegna i trasferimenti in modo organizzato ai vari autisti, tracciando orari di prelievo e tariffe fissate.",
    iconName: "Award"
  },
  {
    id: "commercial_rent",
    title: "Noleggio veicoli commerciali",
    description: "Per aziende specializzate nel b2b, furgoni da lavoro, cassonati e truck pesanti.",
    benefit: "Monitora i chilometri percorsi, lo stato usura veicolo al rientro e gestisci i listini tariffari orari complessi.",
    iconName: "Rocket"
  },
  {
    id: "fleet_mgrs",
    title: "Gestori di flotte aziendali",
    description: "Per chi controlla vasti parchi auto distribuiti ad uso interno o contratti corporate.",
    benefit: "Riduci i costi operativi grazie ad avvisi per manutenzione freni, tagliandi ordinari e cambi gomme stagionali.",
    iconName: "Briefcase"
  },
  {
    id: "mobility_agency",
    title: "Agenzie di mobilità moderna",
    description: "Per start-up di car-sharing, noleggio multi-sede ed e-mobility urbana.",
    benefit: "Scala i tuoi servizi monitorando l'attività degli utenti e integrando moduli per tariffe flessibili e abbonamenti.",
    iconName: "Lightbulb"
  },
  {
    id: "digital_rents",
    title: "Imprenditori in digitalizzazione",
    description: "Per fondatori lungimiranti che vogliono eliminare per sempre l'uso della carta in azienda.",
    benefit: "Costruisci un business automatizzato che opera perfettamente anche quando sei lontano dall'ufficio centralizzato.",
    iconName: "GraduationCap"
  }
];

export const BEFORE_AFTER_COPY: BeforeAfterItem[] = [
  {
    before: "Appuntamenti scritti a matita su un foglio da scrivania che viene macchiato dal caffè o buttato per errore.",
    after: "Un database sicuro accessibile istantaneamente da computer e smartphone ovunque tu ti trovi."
  },
  {
    before: "Scadenza dell'assicurazione di una vettura dimenticata, con rischio di pesanti sanzioni legali o incidenti non coperti.",
    after: "Avviso automatico di alert ben visibile sulla dashboard 15 giorni prima del termine del rinnovo del mezzo."
  },
  {
    before: "Overbooking causato da orari di prenotazione WhatsApp scritti in ritardo su Excel. Clienti inferociti sul banco.",
    after: "Calendario interattivo integrato di disponibilità che blocca il mezzo non appena viene approvata una prenotazione."
  },
  {
    before: "Manager all'oscuro sul capitale reale incassato, cauzioni ancora da restituire o quale autista sta rendendo di più.",
    after: "Grafici di performance finanziari chiari, aggiornati in tempo reale con i saldi mensili pronti da scaricare."
  }
];

export const WHY_US_COPY = [
  {
    title: "Interfaccia moderna e intuitiva",
    description: "Nessun bisogno di lunghi e noiosi corsi di formazione per il personale. DR7 AI è facile, pulito e pronto all'uso da subito."
  },
  {
    title: "Progettato appositamente per la mobilità",
    description: "Non è un generico software industriale adattato a forza. DR7 AI include la gestione nativa di targhe, scadenze mezzi e anagrafiche di noleggio."
  },
  {
    title: "Pieno controllo dei dati e dei flussi",
    description: "Sicurezza informatica avanzata con cloud ultra-resistente. Sei tu a definire chi del tuo team puó vedere le tariffe o modificare i contratti."
  },
  {
    title: "Approccio diretto basato sui bisogni reali",
    description: "Forniamo un software scalabile: attiva solo i moduli operativi di cui ha realmente bisogno la tua flotta oggi, e cresci con calma domani."
  }
];

export const FAQ_COPY: FaqItem[] = [
  {
    id: "faq_1",
    question: "Che cos'è esattamente DR7 AI?",
    answer: "DR7 AI è una piattaforma software SaaS gestionale all-in-one pensata per centralizzare, automatizzare e dare controllo a tutte le attività di noleggio auto, furgoni, flotte e servizi NCC di qualsiasi dimensione."
  },
  {
    id: "faq_2",
    question: "Posso usarlo se gestisco un flotta piccola (es. 5-10 auto)?",
    answer: "Certamente. DR7 AI nasce per essere scalabile ed estremamente efficiente. Ti permette di impostare una base solida e professionale fin dal primo giorno per poi aumentare il numero di vetture senza caos."
  },
  {
    id: "faq_3",
    question: "La piattaforma gestisce gli avvisi di manutenzione dei veicoli?",
    answer: "Sì, il Modulo Veicoli e Flotta include sezioni per impostare scadenze ricorrenti (assicurazione, bolli, revisioni, tagliandi) avvisandoti visivamente in anticipo per non correre rischi su strada."
  },
  {
    id: "faq_4",
    question: "Come viene evitata l'overbooking dei veicoli?",
    answer: "Il calendario di disponibilità controlla le prenotazioni in tempo reale. Quando inserisci o approvi un noleggio, quel determinato veicolo viene bloccato per l'esatto lasso di tempo, escludendo prenotazioni sovrapposte dello stesso mezzo."
  },
  {
    id: "faq_5",
    question: "I miei dati aziendali e quelli dei miei clienti sono sicuri?",
    answer: "Assolutamente sì. I server utilizzano sistemi di crittografia avanzati e backup giornalieri automatizzati. Rispettiamo rigorosamente i protocolli di sicurezza standard per i tuoi contatti, contratti e storici noleggio."
  },
  {
    id: "faq_6",
    question: "Cosa comprende la dimostrazione gratuita (Demo)?",
    answer: "Cliccando su 'Richiedi Demo' configureremo per te una chiamata conoscitiva gratuita di 15 minuti. Analizzeremo i problemi d'ufficio del tuo noleggio e ti mostreremo in anteprima l'interfaccia di gestione DR7 AI."
  },
  {
    id: "faq_7",
    question: "Si tratta di moduli personalizzabili?",
    answer: "Sì. DR7 AI è strutturato per darti moduli operativi flessibili (Fatturazione, Calendario, Clienti, Flotta, Piani e Abbonamenti) attivabili o configurabili ad hoc a seconda della reale struttura del tuo business di mobilità."
  },
  {
    id: "faq_8",
    question: "Come si comincia l'integrazione di DR7 AI?",
    answer: "Il processo è incredibilmente semplice. Compili il modulo lead e prenoti la demo, definiamo i moduli necessari alla tua realtà, e potrai caricare la tua flotta iniziale e anagrafica clienti in pochissimo tempo."
  }
];

export const SEO_DATA = {
  metaTitle: "DR7 AI | Software Gestionale Autonoleggio, NCC e Gestione Flotte",
  metaDescription: "Centralizza prenotazioni, clienti, contratti e scadenze flotta in un unico cruscotto intelligente. Scopri il software SaaS moderno per autonoleggi d'élite, NCC e flotte.",
  keywords: [
    "software autonoleggio",
    "gestione flotte aziendali",
    "software gestionale ncc",
    "crm noleggio veicoli",
    "calendario prenotazioni auto",
    "controllo flotta veicoli",
    "scadenziario flotta",
    "DR7 AI",
    "noleggio breve termine software",
    "gestionale noleggio lungo termine",
    "piattaforma autonoleggio",
    "crm car rental",
    "car rental system",
    "noleggio auto applicativo",
    "noleggio van gestore"
  ],
  h1: "Gestisci la tua attività di noleggio e flotte da un unico cruscotto intelligente.",
  h2s: [
    "Il caos operativo sta frenando la crescita del tuo noleggio?",
    "Benvenuto nell'era del noleggio intelligente con DR7 AI",
    "Bénéfices d'équipe con la piattaforma moderna",
    "Tutti i moduli operativi attivabili in base alle tue esigenze",
    "A ciascuna impresa il proprio livello di controllo e scala",
    "La differenza prima e dopo l'inserimento di DR7 AI",
    "Perché scegliere la piattaforma DR7 AI oggi?",
    "Domande frequenti degli operatori di mobilità",
    "Pronto a centralizzare e far decollare i tuoi noleggi?"
  ]
};

export const ADS_COPY = {
  facebookInstagram: [
    {
      hook: "🚗 Attività di autonoleggio, NCC o gestione flotte? Tra WhatsApp, foglietti sparsi e tabelle Excel complicate, rischi costantemente il doppio noleggio o di dimenticare una scadenza importante. DR7 AI centralizza prenotazioni, clienti e contratti in un unico pannello intelligente. Fai spazio al controllo e azzera gli sprechi.",
      cta: "Richiedi Demo Gratuita"
    },
    {
      hook: "📲 Le prenotazioni dei tuoi noleggi auto e van si perdono tra email e risposte in ritardo? Riprendi il controllo totale della tua flotta. DR7 AI è il SaaS di gestione intelligente che ti blocca l'overbooking e pianifica i ritiri in modo automatico.",
      cta: "Scopri il Software"
    },
    {
      hook: "⚡ I tuoi impiegati di banco perdono ore a compilare dati di noleggio ripetitivi invece di vendere e accogliere clienti? Automatizza! Con i moduli di DR7 AI gestisci anagrafiche conducenti, patenti e pagamenti in sicurezza.",
      cta: "Prenota Demo Ora"
    },
    {
      hook: "🏆 Imprenditori della mobilità e NCC: i tuoi concorrenti sanno esattamente quale vettura rende di più ogni mese grazie a dashboard di analisi moderne. E tu? Smetti di navigare al buio. Passa a DR7 AI.",
      cta: "Richiedi Informazioni"
    },
    {
      hook: "📈 +28% nel tasso di occupazione della tua flotta grazie a una vista interattiva dei veicoli liberi e in manutenzione. Ottimizza le entrate del tuo noleggio senza sforzo amministrativo. Prenota una video-demo dettagliata in italiano.",
      cta: "Prenota Chiamata Gratis"
    }
  ],
  googleAds: [
    {
      title1: "DR7 AI Gestionale Autonoleggio",
      title2: "Centralizza la Tua Flotta",
      description: "Il software n.1 per noleggi di auto, furgoni e NCC. Elimina gli overbooking e ottimizza i profitti."
    },
    {
      title1: "Prevenzione Overbooking Auto",
      title2: "Gestione Flotte DR7 AI",
      description: "Controlla le prenotazioni su un calendario interattivo moderno. Richiedi la tua demo di 15 min."
    },
    {
      title1: "Software Gestionale NCC",
      title2: "Demo Personalizzata Gratis",
      description: "Tracciamento pagamenti, anagrafiche conducenti storiche e gestione del team integrata."
    },
    {
      title1: "Calendario Prenotazioni Flotta",
      title2: "Software DR7 AI Premium",
      description: "Riduci il lavoro manuale in segreteria. Prova la piattaforma moderna costruita per il noleggio."
    },
    {
      title1: "Scadenziario Assicurazioni Auto",
      title2: "Meno Manutenzioni Fermi",
      description: "Monitoraggio scadenze di bolli, revisioni e tagliandi. Mantieni i tuoi veicoli sempre produttivi."
    }
  ],
  linkedin: [
    {
      title: "La perdita silenziosa nei margini dell'autonoleggio: il fermo macchina invisibile",
      body: "La maggior parte delle agenzie di mobilità e autonoleggi investe migliaia di euro nell'acquistare o prendere in leasing nuovi modelli di veicoli, trascurando poi l'efficienza operativa. Auto ferme ad attendere manutenzione ordinaria non pianificata, prenotazioni sovrapposte iscritte all'ultimo istante su fogli orari o chat WhatsApp, e totale mancanza di dati sui ricavi reali per vettura. DR7 AI elimina questo collo di bottiglia informatico. Centralizza la flotta, automatizza i promemoria di scadenza bolli e assicurazioni, e monitora in tempo reale l'andamento del fatturato stimato. Trasforma la logistica quotidiana in una macchina ad alta marginalità. Parla oggi con un nostro esperto."
    },
    {
      title: "I fogli Excel condivisi uccidono la produttività del tuo noleggio in quest'anno commerciale",
      body: "Se la tua azienda di autonoleggio, noleggio furgoni o flotta privata si affida ancora a cartelle Excel o fogli Google pronti a corrompersi per coordinare auto, autisti e tariffe, stai correndo rischi inutili. Zero storici patenti ordinati, impossibilità di ricevere notifiche push sulle scadenze dei veicoli, e nessuna visualizzazione immediata della liquidità accumulata dalle caparre. Con DR7 AI sostituisci il disordine con un'interfaccia SaaS fluida, sicura e orientata alla crescita. Risparmia in media 5 ore di pura amministrazione manuale a settimana per collaboratore. Scopri di più su dr7ai.com."
    },
    {
      title: "Come ottimizzare il tasso di prenotazione di car rental e NCC del 28% con la stessa flotta?",
      body: "La risposta risiede interamente nella pianificazione visiva. Attraverso il pannello intelligente di DR7 AI, la disponibilità di ogni macchina o van è aggiornata all'istante. Eviti overbooking fastidiosi, massimizzi il tasso di occupazione riempendo i buchi operativi di calendario e mantieni relazioni solide con la clientela corporate. Concepito per imprenditori della mobilità che esigono controllo millimetrico sui propri flussi di cassa. Prenota una chiamata d'analisi per il noleggio su dr7ai.com."
    }
  ],
  videoScripts: [
    {
      title: "Script 1 - La Prenotazione Persa (Punto di Dolore)",
      hook: "0:00 - 0:05",
      action: "Inquadratura ravvicinata di un impiegato stressato al tavolo di un autonoleggio circondato da foglietti adesivi volanti, mentre un cliente aspetta impaziente col bagaglio a mano.",
      voiceover: "Ancora prenotazioni sovrapposte o contratti persi? WhatsApp è pieno di richieste e non sai mai quali macchine sono realmente libere?"
    },
    {
      title: "Script 2 - La Soluzione Centralizzata (DR7 AI)",
      hook: "0:05 - 0:10",
      action: "L'inquadratura passa a mostrare uno schermo pulito con la favolosa vista calendario flotta di DR7 AI: auto divise per categoria e barre verdi d'occupazione.",
      voiceover: "Passa a DR7 AI. Centralizza la tua flotta di noleggio o NCC, evita gli overbooking con calendari automatici e blocca le scadenze importanti."
    },
    {
      title: "Script 3 - Chiusura di Conversione (CTA)",
      hook: "0:10 - 0:15",
      action: "Appare in evidenza il logo di DR7 AI, la scritta del dominio ufficiale 'dr7ai.com' e il pulsante verde acceso 'Richiedi Demo'.",
      voiceover: "Porta l'efficienza della tua flotta al livello successivo. Prenota ora la tua consulenza di demo gratuita su dr7ai.com!"
    }
  ]
};
