import React, { useState, useEffect } from 'react';
import { Mail, Phone, Building2, Users, AlertTriangle, CheckCircle, Sparkles, X, ChevronRight, Check } from 'lucide-react';
import { LeadRequest } from '../types';

interface DemoRequestModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccessSubmit?: (lead: LeadRequest) => void;
}

export default function DemoRequestModal({ isOpen, onClose, onSuccessSubmit }: DemoRequestModalProps) {
  const [step, setStep] = useState<number>(1);
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [company, setCompany] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [size, setSize] = useState<string>('');
  const [painPoint, setPainPoint] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>('');
  const [submittedLead, setSubmittedLead] = useState<LeadRequest | null>(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleNextStep = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    
    if (!name.trim()) return setErrorMsg('Inserisci il tuo nome completo.');
    if (!email.trim() || !email.includes('@')) return setErrorMsg('Inserisci un indirizzo email aziendale valido.');
    if (!company.trim()) return setErrorMsg('Inserisci la ragione sociale della tua azienda.');
    setStep(2);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!phone.trim()) return setErrorMsg('Inserisci il tuo numero di telefono per il contatto di consulenza diretto.');
    if (!size) return setErrorMsg('Seleziona la dimensione della tua flotta.');
    if (!painPoint) return setErrorMsg('Scegli il tuo ostacolo principale per personalizzare l\'incontro.');

    setIsSubmitting(true);
    
    const newLead: LeadRequest = {
      id: "lead_" + Math.random().toString(36).substring(2, 9),
      name,
      email,
      company,
      phone,
      size,
      painPoint,
      status: 'pending',
      createdAt: new Date().toISOString()
    };

    setTimeout(() => {
      try {
        const stored = localStorage.getItem('dr7_leads');
        const list = stored ? JSON.parse(stored) : [];
        list.unshift(newLead);
        localStorage.setItem('dr7_leads', JSON.stringify(list));
      } catch (err) {
        console.error("Local storage error:", err);
      }

      setIsSubmitting(false);
      setSubmittedLead(newLead);
      setStep(3);
      if (onSuccessSubmit) {
        onSuccessSubmit(newLead);
      }
    }, 1200);
  };

  const handleClose = () => {
    setStep(1);
    setName('');
    setEmail('');
    setCompany('');
    setPhone('');
    setSize('');
    setPainPoint('');
    setSubmittedLead(null);
    setErrorMsg('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-md transition-opacity duration-300">
      <div className="bg-white border border-[#E5E7EB] rounded-3xl w-full max-w-xl shadow-2xl relative overflow-hidden flex flex-col max-h-[90vh]">
        
        {step < 3 && (
          <div className="w-full h-1 bg-[#F5F5F7] flex">
            <div className={`h-full bg-[#00C884] transition-all duration-300 ${step === 1 ? 'w-1/2' : 'w-full'}`} />
          </div>
        )}

        <button
          onClick={handleClose}
          className="absolute top-5 right-5 text-[#6E6E73] hover:text-[#111111] p-1.5 rounded-full hover:bg-[#F5F5F7] transition"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="p-6 md:p-10 overflow-y-auto">
          {step === 1 && (
            <form onSubmit={handleNextStep} className="space-y-6">
              <div className="text-left">
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-[#00C884]/10 text-[#00C884] border border-[#00C884]/20 mb-3 font-mono">
                  Passo 1 di 2 — Anagrafica
                </span>
                <h4 className="text-xl md:text-2xl font-bold text-[#111111] font-sans tracking-tight">
                  Richiedi una demo di DR7 AI
                </h4>
                <p className="text-xs text-[#6E6E73] mt-1.5 leading-relaxed font-sans">
                  Scopri come ottimizzare prenotazioni, contratti e flotta in una sessione personalizzata di 15 minuti su dr7ai.com.
                </p>
              </div>

              {errorMsg && (
                <div className="p-3.5 bg-rose-50 border border-rose-100 rounded-xl flex items-center gap-2.5 text-xs text-rose-600 font-sans">
                  <AlertTriangle className="w-4 h-4 shrink-0 text-rose-500" />
                  <span>{errorMsg}</span>
                </div>
              )}

              <div className="space-y-4">
                <div className="text-left">
                  <label className="block text-[11px] font-semibold text-[#111111] mb-1.5 font-sans">
                    Nome e Cognome *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Esempio: Marco Rossi"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-[#F5F5F7] border border-transparent focus:border-[#00C884] focus:bg-white text-sm text-[#111111] px-4 py-3 rounded-xl transition outline-none font-sans"
                  />
                </div>

                <div className="text-left">
                  <label className="block text-[11px] font-semibold text-[#111111] mb-1.5 font-sans">
                    Email Aziendale *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="Esempio: direzione@azienda.it"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-[#F5F5F7] border border-transparent focus:border-[#00C884] focus:bg-white text-sm text-[#111111] px-4 py-3 rounded-xl transition outline-none font-sans"
                  />
                  <span className="text-[10px] text-[#6E6E73] mt-1.5 block font-sans">I tuoi dati sono riservati e protetti in conformità con il GDPR.</span>
                </div>

                <div className="text-left">
                  <label className="block text-[11px] font-semibold text-[#111111] mb-1.5 font-sans">
                    Ragione Sociale Azienda *
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#6E6E73]">
                      <Building2 className="w-4 h-4" />
                    </div>
                    <input
                      type="text"
                      required
                      placeholder="Esempio: Noleggio Auto Premium SRL"
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                      className="w-full bg-[#F5F5F7] border border-transparent focus:border-[#00C884] focus:bg-white text-sm text-[#111111] pl-10 pr-4 py-3 rounded-xl transition outline-none font-sans"
                    />
                  </div>
                </div>
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  type="submit"
                  className="w-full md:w-auto inline-flex items-center justify-center gap-1.5 bg-[#00C884] hover:bg-[#00b577] text-white font-bold text-xs tracking-wider px-6 py-3.5 rounded-xl transition cursor-pointer uppercase"
                >
                  Continua <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </form>
          )}

          {step === 2 && (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="text-left">
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-[#00C884]/10 text-[#00C884] border border-[#00C884]/20 mb-3 font-mono">
                  Passo 2 di 2 — Profilazione Flotta
                </span>
                <h4 className="text-xl md:text-2xl font-bold text-[#111111] font-sans tracking-tight">
                  Configura il tuo modello operativo
                </h4>
                <p className="text-xs text-[#6E6E73] mt-1.5 leading-relaxed font-sans">
                  Queste risposte aiutano il nostro consulente a calibrare i moduli corretti durante la presentazione live di dr7ai.com.
                </p>
              </div>

              {errorMsg && (
                <div className="p-3.5 bg-rose-50 border border-rose-100 rounded-xl flex items-center gap-2.5 text-xs text-rose-600 font-sans">
                  <AlertTriangle className="w-4 h-4 shrink-0 text-rose-500" />
                  <span>{errorMsg}</span>
                </div>
              )}

              <div className="space-y-4">
                <div className="text-left">
                  <label className="block text-[11px] font-semibold text-[#111111] mb-1.5 font-sans">
                    Numero di Telefono Diretto *
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#6E6E73]">
                      <Phone className="w-4 h-4" />
                    </div>
                    <input
                      type="tel"
                      required
                      placeholder="Esempio: 333 1234567"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full bg-[#F5F5F7] border border-transparent focus:border-[#00C884] focus:bg-white text-sm text-[#111111] pl-10 pr-4 py-3 rounded-xl transition outline-none font-sans"
                    />
                  </div>
                </div>

                <div className="text-left">
                  <label className="block text-[11px] font-semibold text-[#111111] mb-1.5 font-sans">
                    Dimensione stimata flotta veicoli *
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {[
                      { id: '1', label: '1 - 5 veicoli' },
                      { id: '2-5', label: '6 - 20 veicoli' },
                      { id: '6-20', label: '21 - 50 veicoli' },
                      { id: '21-50', label: '51 - 100 veicoli' },
                      { id: '51+', label: '100+ veicoli' }
                    ].map(opt => (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => setSize(opt.id)}
                        className={`px-3 py-2.5 rounded-xl text-xs font-semibold border transition ${
                          size === opt.id
                            ? 'bg-[#00C884]/15 border-[#00C884] text-[#00C884] font-bold'
                            : 'bg-[#F5F5F7] border-transparent text-[#6E6E73] hover:bg-[#E5E7EB] cursor-pointer'
                        }`}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="text-left">
                  <label className="block text-[11px] font-semibold text-[#111111] mb-1.5 font-sans">
                    Qual è l'ostacolo più gravoso della tua attività? *
                  </label>
                  <div className="space-y-2">
                    {[
                      { id: 'prospects_dispersion', label: 'Dati, prenotazioni e scadenze sparsi ovunque' },
                      { id: 'oublis_relances', label: 'Gestione totalmente manuale di contratti e scadenze' },
                      { id: 'manque_visibilite', label: 'Mancanza di grafici e tracciabilità sui ricavi reali' },
                      { id: 'perte_temps_admin', label: 'Eccessivo tempo d\'ufficio perso a stampare documenti' }
                    ].map(opt => (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => setPainPoint(opt.id)}
                        className={`w-full text-left px-4 py-3 rounded-xl text-xs transition border flex items-center justify-between cursor-pointer ${
                          painPoint === opt.id
                            ? 'bg-[#00C884]/15 border-[#00C884] text-[#00C884] font-bold'
                            : 'bg-[#F5F5F7] border-transparent text-[#6E6E73] hover:bg-[#E5E7EB]'
                        }`}
                      >
                        <span>{opt.label}</span>
                        {painPoint === opt.id && <Check className="w-3.5 h-3.5 text-[#00C884] shrink-0 ml-2" />}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-2 flex flex-col sm:flex-row justify-between items-center gap-4">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="w-full sm:w-auto text-[#6E6E73] hover:text-[#111111] text-xs font-semibold py-2 text-center transition"
                >
                  Torna indietro
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#00C884] hover:bg-[#00b577] disabled:bg-[#E5E7EB] disabled:text-[#6E6E73] text-white font-bold text-xs tracking-wider px-6 py-3 rounded-xl transition cursor-pointer uppercase"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Elaborazione...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4" /> Conferma e Richiedi Demo
                    </>
                  )}
                </button>
              </div>
            </form>
          )}

          {step === 3 && submittedLead && (
            <div className="text-center py-6 space-y-6">
              <div className="w-14 h-14 bg-[#00C884]/10 text-[#00C884] rounded-full flex items-center justify-center mx-auto border border-[#00C884]/20 animate-bounce">
                <Check className="w-6 h-6 stroke-[3]" />
              </div>

              <div className="space-y-2">
                <h4 className="text-xl md:text-2xl font-bold text-[#111111] font-sans tracking-tight">
                  Richiesta registrata con successo!
                </h4>
                <p className="text-xs text-[#6E6E73] max-w-sm mx-auto leading-relaxed font-sans">
                  Grazie <strong className="text-[#111111]">{submittedLead.name}</strong>. Il profilo per l'azienda <strong className="text-[#00C884]">{submittedLead.company}</strong> è stato configurato nel nostro sistema.
                </p>
              </div>

              <div className="bg-[#F5F5F7] p-5 rounded-2xl text-left max-w-md mx-auto space-y-3">
                <p className="text-[10px] font-bold text-[#00C884] font-mono tracking-wider uppercase">
                  Fasi successive:
                </p>
                <ul className="text-xs text-[#6E6E73] space-y-2.5 font-sans">
                  <li className="flex items-start gap-2">
                    <span className="text-[#00C884] font-bold font-mono">1.</span>
                    <span>Analizziamo i nodi o gli ostacoli indicati sulla gestione della tua flotta.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#00C884] font-bold font-mono">2.</span>
                    <span>Ti contatteremo telefonicamente a breve al numero ({submittedLead.phone}).</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#00C884] font-bold font-mono">3.</span>
                    <span>Mostreremo in tempo reale l'implementazione pratica su dr7ai.com.</span>
                  </li>
                </ul>
              </div>

              <p className="text-[11px] text-[#6E6E73] font-mono max-w-xs mx-auto">
                La documentazione e la ricevuta sono state predisposte per l'indirizzo aziendale {submittedLead.email}.
              </p>

              <div className="pt-1">
                <button
                  onClick={handleClose}
                  className="bg-[#111111] hover:bg-[#222222] text-white font-bold text-xs tracking-wider px-6 py-3 rounded-xl transition cursor-pointer"
                >
                  Chiudi finestra
                </button>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
