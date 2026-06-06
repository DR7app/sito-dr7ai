import React, { useState, useEffect } from 'react';
import {
  Calendar, Users, Car, FileText, FileSpreadsheet, FileSignature, CreditCard, AlertTriangle,
  TrendingUp, ChevronDown, Plus, Search, Menu, X, ArrowUpRight, ShieldCheck, Check,
  CheckCircle2, Calculator, HelpCircle, LogOut, Settings, Layers, Globe, Building2, Briefcase, Sparkles, MapPin, ArrowRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { LeadRequest } from './types';
import RoiCalculator from './components/RoiCalculator';
import DemoRequestModal from './components/DemoRequestModal';
import PanelLogin from './components/PanelLogin';
import AdminDashboard from './components/AdminDashboard';
import BrandLogo from './components/BrandLogo';

export default function App() {
  const [activeWorkspace, setActiveWorkspace] = useState<'visitor' | 'admin'>('visitor');
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(() => {
    return localStorage.getItem('dr7_logged_in') === 'true';
  });
  const [isDemoModalOpen, setIsDemoModalOpen] = useState<boolean>(false);
  const [selectedFaq, setSelectedFaq] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  
  // Interactive Dashboard Mockup State
  const [mockCurrentTab, setMockCurrentTab] = useState<'status' | 'rentals' | 'fleet' | 'cash'>('status');

  const FAQ_LIST = [
    {
      id: 'faq-1',
      question: 'DR7 AI è adatto anche a piccole flotte?',
      answer: 'Sì. La nostra architettura è scalabile e ideale per flotte medio-piccole (per centralizzare scadenze e ottimizzare i flussi contrattuali) fino a centinaia di vetture distribuite su più sedi fisiche e canali broker di terze parti.'
    },
    {
      id: 'faq-2',
      question: 'È possibile gestire la multi-sede aziendale?',
      answer: 'Assolutamente sì. DR7 AI consente di mappare molteplici punti di ritiro logistici, aeroporti o uffici. Potrai monitorare i rientri "one-way", differenziare i permessi degli operatori e monitorare lo stock in tempo reale per ciascuna sede.'
    },
    {
      id: 'faq-3',
      question: 'Come funzionano la firma digitale e i pagamenti depositati?',
      answer: 'La piattaforma genera automaticamente il contratto digitale in PDF pronto per essere firmato via OTP SMS legale sul posto o a distanza. Il modulo POS virtuale integrato permette di richiedere, trattenere e liberare i depositi cauzionali con un clic, riducendo l’esposizione al rischio.'
    },
    {
      id: 'faq-4',
      question: 'È consigliato per operatori NCC e autonoleggio luxury?',
      answer: 'Certamente. DR7 AI include la gestione delle prenotazioni orarie, l’assegnazione dei conducenti o driver, tabelle di transfer preconfigurate ad aeroporti e lo storico preferenze dei clienti vip insieme al tracciamento manutentivo stringente sulle vetture sportive.'
    },
    {
      id: 'faq-5',
      question: 'Come posso richiedere una demo per la mia flotta?',
      answer: 'Puoi cliccare su "Prenota demo" in alto a destra, compilare il breve form indicando le dimensioni della tua flotta aziendale e un nostro consulente ti contatterà per personalizzare una sessione dimostrativa su dr7ai.com su misura per te.'
    }
  ];

  const handleLeadSubmitted = (lead: LeadRequest) => {
    console.log('Lead raccolto con successo:', lead);
  };

  const toggleFaq = (id: string) => {
    setSelectedFaq(prev => prev === id ? null : id);
  };

  const scrollToSection = (id: string) => {
    setSelectedFaq(null);
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const openPortal = () => {
    setSelectedFaq(null);
    setMobileMenuOpen(false);
    setActiveWorkspace('admin');
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  return (
    <div className="min-h-screen bg-white text-[#111111] font-sans antialiased selection:bg-[#00C884]/15 selection:text-[#111111]">
      
      {/* 1. MINIMAL STICKY HEADER */}
      <header className="sticky top-0 z-40 bg-white/85 backdrop-blur-md border-b border-[#E5E7EB]/50">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="flex items-center justify-between h-18">
            
            {/* Elegant Brand Logo */}
            <div 
              className="flex items-center select-none cursor-pointer scale-90 md:scale-100 origin-left" 
              onClick={() => {
                setActiveWorkspace('visitor');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            >
              <BrandLogo className="h-10" showSubText={false} variant="dark" />
            </div>

            {/* Apple-style Navigation */}
            <nav className="hidden md:flex items-center gap-8 text-xs font-medium text-[#6E6E73]">
              <button onClick={() => scrollToSection('dashboard-preview')} className="hover:text-[#111111] transition cursor-pointer">Piattaforma</button>
              <button onClick={() => scrollToSection('features')} className="hover:text-[#111111] transition cursor-pointer">Funzionalità</button>
              <button onClick={() => scrollToSection('sectors')} className="hover:text-[#111111] transition cursor-pointer">Settori</button>
              <button onClick={() => scrollToSection('roi-calculator-section')} className="hover:text-[#111111] transition cursor-pointer">ROI</button>
              <button onClick={() => scrollToSection('faq')} className="hover:text-[#111111] transition cursor-pointer">FAQ</button>
            </nav>

            {/* Header Right Interactions */}
            <div className="hidden md:flex items-center gap-5">
              <button 
                onClick={openPortal} 
                className="text-xs font-semibold text-[#6E6E73] hover:text-[#111111] py-2 transition cursor-pointer"
                id="header-login-btn"
              >
                Accedi alla piattaforma
              </button>
              <button 
                onClick={() => setIsDemoModalOpen(true)}
                className="bg-[#111111] hover:bg-[#222222] text-white font-medium text-[11px] tracking-wide px-4 py-2 rounded-full shadow-sm transition active:scale-98 cursor-pointer"
                id="header-demo-btn"
              >
                Prenota demo
              </button>
            </div>

            {/* Mobile Menu Action */}
            <div className="md:hidden">
              <button 
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="text-[#111111] p-1.5 rounded-lg transition"
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>

          </div>
        </div>

        {/* Mobile Navigation Bar */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div 
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="md:hidden bg-white border-b border-[#E5E7EB] overflow-hidden"
            >
              <div className="px-6 py-6 space-y-4 flex flex-col text-left font-semibold text-sm text-[#6E6E73]">
                <button onClick={() => scrollToSection('dashboard-preview')} className="py-1 hover:text-[#111111]">Piattaforma</button>
                <button onClick={() => scrollToSection('features')} className="py-1 hover:text-[#111111]">Funzionalità</button>
                <button onClick={() => scrollToSection('sectors')} className="py-1 hover:text-[#111111]">Settori</button>
                <button onClick={() => scrollToSection('roi-calculator-section')} className="py-1 hover:text-[#111111]">Calcolatore ROI</button>
                <button onClick={() => scrollToSection('faq')} className="py-1 hover:text-[#111111]">FAQ</button>
                <div className="h-[1px] bg-[#E5E7EB] my-1" />
                <button onClick={openPortal} className="py-1.5 text-[#111111] text-left">Area Personale (Accedi)</button>
                <button 
                  onClick={() => { setMobileMenuOpen(false); setIsDemoModalOpen(true); }}
                  className="w-full bg-[#111111] text-white py-3 rounded-xl text-center font-semibold text-xs tracking-wide uppercase shadow-sm"
                >
                  Prenota demo
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* CORE WORKSPACE ROUTER */}
      {activeWorkspace === 'admin' ? (
        isLoggedIn ? (
          <AdminDashboard 
            onLogout={() => {
              setIsLoggedIn(false);
              localStorage.removeItem('dr7_logged_in');
            }} 
            onBackToLanding={() => setActiveWorkspace('visitor')} 
          />
        ) : (
          <PanelLogin 
            onLoginSuccess={() => {
              setIsLoggedIn(true);
              localStorage.setItem('dr7_logged_in', 'true');
            }} 
            onBackToLanding={() => setActiveWorkspace('visitor')} 
          />
        )
      ) : (
        <>
          {/* 2. ELEGANT APPLE HERO SECTION */}
          <section className="relative pt-16 pb-20 md:pt-24 md:pb-32 bg-white overflow-hidden text-center">
            
            {/* Soft backdrop radial light gradient */}
            <div className="absolute inset-x-0 top-0 h-[500px] bg-[radial-gradient(ellipse_at_top,rgba(0,200,132,0.03),transparent)] pointer-events-none" />

            <div className="max-w-4xl mx-auto px-6 lg:px-12 space-y-8 relative">
              
              {/* Refrained Badge identifier */}
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F5F5F7] border border-[#E5E7EB]/60">
                <span className="w-1.5 h-1.5 rounded-full bg-[#00C884]" />
                <span className="text-[10px] font-semibold text-[#111111] uppercase tracking-wider font-mono">
                  L'Operating System per la mobilità luxury e retail
                </span>
              </div>

              {/* Ultra clean prominent Apple style Typography */}
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-[#111111] leading-[1.08] max-w-3xl mx-auto font-sans">
                Gestisci noleggi, contratti e flotta.<br />Con assoluta precisione.
              </h1>

              {/* Spacious, premium support description */}
              <p className="text-base sm:text-lg text-[#6E6E73] max-w-2xl mx-auto leading-relaxed font-sans font-light">
                Un’unica piattaforma intelligente per autonoleggi premium, operatori NCC e flotta luxury. DR7 AI centralizza ogni passaggio dell'operatività: dai depositi cauzionali alla firma OTP.
              </p>

              {/* Understated action targets */}
              <div className="pt-4 flex flex-col sm:flex-row justify-center items-center gap-4">
                <button
                  onClick={() => setIsDemoModalOpen(true)}
                  className="w-full sm:w-auto px-7 py-3.5 bg-[#00C884] hover:bg-[#00b577] text-white font-semibold rounded-full text-xs tracking-wider transition-transform hover:scale-[1.01] active:scale-98 cursor-pointer uppercase shadow-[0_4px_16px_rgba(0,200,132,0.15)]"
                >
                  Prenota una demo live
                </button>
                <button
                  onClick={() => scrollToSection('dashboard-preview')}
                  className="w-full sm:w-auto px-7 py-3.5 border border-[#E5E7EB] bg-white text-[#111111] font-semibold rounded-full text-xs hover:bg-[#F5F5F7] transition cursor-pointer"
                >
                  Scopri la piattaforma
                </button>
              </div>

              {/* Sub-hero Domain info / credibility anchors */}
              <div className="pt-2">
                <span className="text-[11px] font-medium text-[#6E6E73] tracking-wider font-mono">
                  Sviluppato per professionisti su <span className="text-[#111111] font-semibold">dr7ai.com</span> • Conforme con standard GDPR ed europei
                </span>
              </div>

            </div>
          </section>

          {/* 3. CORE PRODUCT PREVIEW (Interactive High-End space-gray mock shell container) */}
          <section id="dashboard-preview" className="py-16 md:py-24 bg-[#FBFBFD] border-y border-[#E5E7EB]/60">
            <div className="max-w-7xl mx-auto px-6 lg:px-12">
              
              {/* Product storytelling description with Apple level discipline */}
              <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
                <span className="text-[#00C884] font-semibold text-xs uppercase tracking-wider font-mono">Esperienza Interattiva</span>
                <h2 className="text-3xl font-bold tracking-tight text-[#111111] font-sans">
                  Il cuore digitale della tua flotta.
                </h2>
                <p className="text-[#6E6E73] text-sm leading-relaxed max-w-xl mx-auto font-sans font-light">
                  Esplora l'interfaccia operativa di DR7 AI tramite il simulatore interattivo. Passa da un modulo all'altro per scoprire l'organizzazione logistica nativa.
                </p>
              </div>

              {/* Premium Dark Shell modeling Apple Pro Software Display */}
              <div className="bg-[#0B0B0F] text-white rounded-2xl border border-[#E2E8F0]/10 shadow-[0_24px_50px_rgba(0,0,0,0.15)] overflow-hidden relative">
                
                {/* Simulated Header Tab Bar */}
                <div className="bg-[#050508] px-6 py-4 flex items-center justify-between border-b border-[#E2E8F0]/10">
                  <div className="flex items-center gap-2">
                    {/* Symmetrical system lights */}
                    <div className="w-2.5 h-2.5 rounded-full bg-[#FF5F56]" />
                    <div className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]" />
                    <div className="w-2.5 h-2.5 rounded-full bg-[#27C93F]" />
                    <span className="ml-3 text-[10px] text-slate-500 font-mono tracking-tight select-none">
                      DR7 AI OS // CONSOLE OPERATIVA
                    </span>
                  </div>
                  <div className="flex items-center gap-2 bg-[#12121A] px-3 py-1 rounded-full border border-slate-800">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#00C884] animate-pulse" />
                    <span className="text-[9px] font-semibold text-[#00C884] font-mono tracking-wider">DATI SINCRONIZZATI FLOTTA</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[520px] text-left">
                  
                  {/* Mock Sidebar menu */}
                  <div className="lg:col-span-3 bg-[#050508] p-5 border-r border-slate-800 flex flex-col justify-between">
                    <div className="space-y-6">
                      
                      <div>
                        <p className="text-[9px] font-semibold text-slate-500 uppercase tracking-widest px-2.5">Console di Gestione</p>
                        <div className="mt-3.5 space-y-1">
                          
                          <button 
                            onClick={() => setMockCurrentTab('status')}
                            className={`w-full flex items-center justify-between px-3 py-2 rounded-lg transition font-medium text-xs cursor-pointer ${mockCurrentTab === 'status' ? 'bg-[#00C884]/15 border border-[#00C884]/40 text-[#00C884]' : 'border border-transparent text-slate-400 hover:text-white hover:bg-slate-900/40'}`}
                          >
                            <span className="flex items-center gap-2.5"><Layers className="w-3.5 h-3.5 shrink-0" /> Dashboard</span>
                            <span className="text-[9px] bg-slate-900 text-[#00C884] px-1.5 py-0.2 rounded font-mono font-bold">REALE</span>
                          </button>

                          <button 
                            onClick={() => setMockCurrentTab('rentals')}
                            className={`w-full flex items-center justify-between px-3 py-2 rounded-lg transition font-medium text-xs cursor-pointer ${mockCurrentTab === 'rentals' ? 'bg-[#00C884]/15 border border-[#00C884]/40 text-[#00C884]' : 'border border-transparent text-slate-400 hover:text-white hover:bg-slate-900/40'}`}
                          >
                            <span className="flex items-center gap-2.5"><Calendar className="w-3.5 h-3.5 shrink-0" /> Prenotazioni</span>
                            <span className="text-[9px] bg-amber-950 text-amber-400 px-1.5 py-0.2 rounded font-mono">14</span>
                          </button>

                          <button 
                            onClick={() => setMockCurrentTab('fleet')}
                            className={`w-full flex items-center justify-between px-3 py-2 rounded-lg transition font-medium text-xs cursor-pointer ${mockCurrentTab === 'fleet' ? 'bg-[#00C884]/15 border border-[#00C884]/40 text-[#00C884]' : 'border border-transparent text-slate-400 hover:text-white hover:bg-slate-900/40'}`}
                          >
                            <span className="flex items-center gap-2.5"><Car className="w-3.5 h-3.5 shrink-0" /> Stato Flotta</span>
                            <span className="text-[9px] bg-emerald-950 text-emerald-400 px-1.5 py-0.2 rounded font-mono">82%</span>
                          </button>

                          <button 
                            onClick={() => setMockCurrentTab('cash')}
                            className={`w-full flex items-center justify-between px-3 py-2 rounded-lg transition font-medium text-xs cursor-pointer ${mockCurrentTab === 'cash' ? 'bg-[#00C884]/15 border border-[#00C884]/40 text-[#00C884]' : 'border border-transparent text-slate-400 hover:text-white hover:bg-slate-900/40'}`}
                          >
                            <span className="flex items-center gap-2.5"><CreditCard className="w-3.5 h-3.5 shrink-0" /> Depositi & Transazioni</span>
                            <span className="text-[9px] bg-blue-950 text-sky-400 px-1.5 py-0.2 rounded font-mono">Attivo</span>
                          </button>

                        </div>
                      </div>

                      {/* Other non-active placeholders for visuals */}
                      <div>
                        <p className="text-[9px] font-semibold text-slate-500 uppercase tracking-widest px-2.5">Moduli Ausiliari</p>
                        <div className="mt-3 space-y-1 text-xs text-slate-400 px-2.5 font-medium">
                          <div className="flex items-center gap-2.5 py-1.5"><Users className="w-3.5 h-3.5" /> CRM Clienti Premium</div>
                          <div className="flex items-center gap-2.5 py-1.5"><FileSignature className="w-3.5 h-3.5" /> Contratti OTP SMS</div>
                          <div className="flex items-center gap-2.5 py-1.5"><TrendingUp className="w-3.5 h-3.5" /> Profitto Orario & KPI</div>
                          <div className="flex items-center gap-2.5 py-1.5"><Settings className="w-3.5 h-3.5" /> Configurazione Sedi</div>
                        </div>
                      </div>

                    </div>

                    {/* Operational fleet operator tag */}
                    <div className="mt-6 pt-4 border-t border-slate-800 text-xs flex items-center gap-3">
                      <div className="w-8 h-8 bg-slate-800 rounded-full flex items-center justify-center font-bold text-white text-[11px] border border-slate-700">
                        DF
                      </div>
                      <div className="truncate">
                        <p className="font-semibold text-slate-300 truncate">DR7 Fleet Operator</p>
                        <p className="text-[10px] text-slate-500">Premium Account</p>
                      </div>
                    </div>

                  </div>

                  {/* Simulated Content Pane */}
                  <div className="lg:col-span-9 bg-[#0B0B0F] p-6 sm:p-8 space-y-6 flex flex-col justify-between">
                    
                    <div>
                      {/* Internal Action Header with responsive styling */}
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-slate-800/80 mb-5 text-left">
                        <div>
                          <span className="text-[9px] font-bold text-[#00C884] uppercase tracking-wider font-mono">Società: Auto Prestige Mobility</span>
                          <h3 className="text-lg font-bold text-white mt-0.5">
                            {mockCurrentTab === 'status' && 'Quadro di bordo generale'}
                            {mockCurrentTab === 'rentals' && 'Planning Prenotazioni Attive'}
                            {mockCurrentTab === 'fleet' && 'Gestione Inventario & Livelli'}
                            {mockCurrentTab === 'cash' && 'Cauzioni Digitali & Fatturazione SDI'}
                          </h3>
                        </div>
                        <div>
                          <button 
                            onClick={() => setIsDemoModalOpen(true)}
                            className="bg-[#00C884] hover:bg-[#00b577] text-white text-[10px] tracking-wider font-bold px-4 py-2.5 rounded-lg shadow-sm cursor-pointer transition uppercase"
                          >
                            + Nuova operazione
                          </button>
                        </div>
                      </div>

                      {/* Top metrics grid Row */}
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                        <div className="bg-[#050508] p-4 rounded-xl border border-slate-800">
                          <span className="text-[9px] font-semibold text-slate-400 uppercase tracking-wider block">PRENOTAZIONI OGGI</span>
                          <span className="text-xl font-bold text-white block mt-1 font-mono">18</span>
                          <span className="text-[10px] text-emerald-400 mt-1 font-semibold block">100% verificate</span>
                        </div>
                        <div className="bg-[#050508] p-4 rounded-xl border border-slate-800">
                          <span className="text-[9px] font-semibold text-slate-400 uppercase tracking-wider block">VEICOLI IN FLOTTA</span>
                          <span className="text-xl font-bold text-white block mt-1 font-mono">42 <span className="text-xs text-slate-500">unità</span></span>
                          <span className="text-[10px] text-slate-400 mt-1 block">82% in uso</span>
                        </div>
                        <div className="bg-[#050508] p-4 rounded-xl border border-slate-800">
                          <span className="text-[9px] font-semibold text-slate-400 uppercase tracking-wider block">RICAVI NETTI MESE</span>
                          <span className="text-xl font-bold text-[#00C884] block mt-1 font-mono">€ 48.240</span>
                          <span className="text-[10px] text-slate-400 mt-1 block">+14% vs pref</span>
                        </div>
                        <div className="bg-[#050508] p-4 rounded-xl border border-slate-800">
                          <span className="text-[9px] font-semibold text-slate-400 uppercase tracking-wider block">CAUZIONI BLOCCATE</span>
                          <span className="text-xl font-bold text-white block mt-1 font-mono">€ 14.500</span>
                          <span className="text-[10px] text-amber-400 mt-1 font-semibold block">6 pre-autorizzate</span>
                        </div>
                      </div>

                      {/* Interactive Tab Content with motion effect */}
                      <AnimatePresence mode="wait">
                        {mockCurrentTab === 'status' && (
                          <motion.div 
                            key="status"
                            initial={{ opacity: 0, y: 4 }} 
                            animate={{ opacity: 1, y: 0 }} 
                            exit={{ opacity: 0, y: -4 }}
                            className="grid grid-cols-1 md:grid-cols-12 gap-5"
                          >
                            <div className="md:col-span-8 space-y-3.5">
                              <h4 className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest font-mono">Contratti Recenti Autonoleggio / NCC</h4>
                              
                              <div className="bg-[#050508] rounded-xl border border-slate-800 overflow-hidden text-xs">
                                <div className="p-3.5 flex items-center justify-between border-b border-slate-800/60 hover:bg-slate-900/10 transition">
                                  <div className="flex items-center gap-3">
                                    <div className="p-1.5 bg-emerald-500/10 text-[#00C884] rounded-md font-mono text-[11px]">🏎️</div>
                                    <div>
                                      <p className="font-semibold text-white">Ferrari F8 Tributo</p>
                                      <p className="text-[10px] text-slate-500">Cliente: VIP Club • Targa: FX902LL</p>
                                    </div>
                                  </div>
                                  <div className="text-right">
                                    <p className="font-bold text-[#00C884]">€ 4.500</p>
                                    <span className="text-[8px] bg-amber-500/10 text-amber-400 px-1.5 py-0.2 rounded font-mono font-semibold">ATTESA RIENTRO</span>
                                  </div>
                                </div>

                                <div className="p-3.5 flex items-center justify-between border-b border-slate-800/60 hover:bg-slate-900/10 transition">
                                  <div className="flex items-center gap-3">
                                    <div className="p-1.5 bg-emerald-500/10 text-[#00C884] rounded-md font-mono text-[11px]">🚌</div>
                                    <div>
                                      <p className="font-semibold text-white">Mercedes-Benz Classe V</p>
                                      <p className="text-[10px] text-slate-500">Autista: M. Bianchi • Tratta: Aeroporto Linate</p>
                                    </div>
                                  </div>
                                  <div className="text-right">
                                    <p className="font-bold text-white">€ 1.250</p>
                                    <span className="text-[8px] bg-[#00C884]/15 text-[#00C884] px-1.5 py-0.2 rounded font-mono font-semibold">IN STRADA</span>
                                  </div>
                                </div>

                                <div className="p-3.5 flex items-center justify-between hover:bg-slate-900/10 transition">
                                  <div className="flex items-center gap-3">
                                    <div className="p-1.5 bg-slate-800 text-slate-300 rounded-md font-mono text-[11px]">🚙</div>
                                    <div>
                                      <p className="font-semibold text-slate-300">Audi Q8 S-Line Carbon</p>
                                      <p className="text-[10px] text-slate-500">Cliente: Business srl • Contratto chiuso</p>
                                    </div>
                                  </div>
                                  <div className="text-right">
                                    <p className="font-bold text-slate-400">€ 2.100</p>
                                    <span className="text-[8px] bg-slate-800 text-slate-400 px-1.5 py-0.2 rounded font-mono font-semibold">TERMINATO</span>
                                  </div>
                                </div>
                              </div>
                            </div>

                            <div className="md:col-span-4 space-y-3.5">
                              <h4 className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest font-mono">Alert di Flotta attivo</h4>
                              <div className="space-y-2.5">
                                <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-xl text-xs space-y-1">
                                  <div className="flex items-center gap-1.5 text-red-400 font-bold font-mono text-[9px]">
                                    <AlertTriangle className="w-3 h-3 shrink-0" /> CRITICO • FRA 2 ORE
                                  </div>
                                  <p className="font-semibold text-white text-[11px]">Assicurazione Ferrari F8</p>
                                  <p className="text-[10px] text-slate-400">Inserire copia rinnovo nel cassetto file.</p>
                                </div>

                                <div className="p-3 bg-amber-500/10 border border-amber-500/20 rounded-xl text-xs space-y-1">
                                  <div className="flex items-center gap-1.5 text-amber-400 font-bold font-mono text-[9px]">
                                    <AlertTriangle className="w-3 h-3 shrink-0" /> CONTROLLO VEICOLO
                                  </div>
                                  <p className="font-semibold text-white text-[11px]">Lavaggio Mercedes Classe V</p>
                                  <p className="text-[10px] text-slate-400">Pianificato per rientro prima del transfer NCC.</p>
                                </div>
                              </div>
                            </div>
                          </motion.div>
                        )}

                        {mockCurrentTab === 'rentals' && (
                          <motion.div 
                            key="rentals"
                            initial={{ opacity: 0, y: 4 }} 
                            animate={{ opacity: 1, y: 0 }} 
                            exit={{ opacity: 0, y: -4 }}
                            className="bg-[#050508] rounded-xl border border-slate-800 p-5 space-y-4 text-xs text-left"
                          >
                            <div className="flex items-center justify-between text-[11px] text-slate-400 pb-3 border-b border-slate-800">
                              <span className="font-semibold font-mono">planning prenotazioni unificato</span>
                              <span>Mese: Giugno 2026</span>
                            </div>
                            <div className="overflow-x-auto">
                              <table className="w-full text-left text-xs">
                                <thead>
                                  <tr className="text-slate-500 font-extrabold font-mono text-[9px] uppercase border-b border-slate-800/40">
                                    <th className="pb-3 text-slate-400">Veicolo</th>
                                    <th className="pb-3 text-slate-400">Cliente</th>
                                    <th className="pb-3 text-slate-400">Periodo</th>
                                    <th className="pb-3 text-slate-400">Stato Noleggio</th>
                                    <th className="pb-3 text-slate-400">Tariffa Totale</th>
                                  </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-800/40 font-medium">
                                  <tr className="hover:bg-slate-900/10">
                                    <td className="py-2.5 font-semibold text-white">Ferrari F8 Tributo</td>
                                    <td className="py-2.5 text-slate-300">VIP Luxury Club</td>
                                    <td className="py-2.5 text-slate-400">12 Giu - 15 Giu</td>
                                    <td className="py-2.5">
                                      <span className="bg-amber-500/10 text-amber-400 text-[9px] px-2 py-0.5 rounded font-semibold font-mono">Attesa Consegna</span>
                                    </td>
                                    <td className="py-2.5 font-mono font-bold text-[#00C884]">€ 4.500</td>
                                  </tr>
                                  <tr className="hover:bg-slate-900/10">
                                    <td className="py-2.5 font-semibold text-white">Mercedes V-Class Limo</td>
                                    <td className="py-2.5 text-slate-300">Emirates Travel (NCC)</td>
                                    <td className="py-2.5 text-slate-400">06 Giu - 10 Giu</td>
                                    <td className="py-2.5">
                                      <span className="bg-[#00C884]/20 text-[#00C884] text-[9px] px-2 py-0.5 rounded font-semibold font-mono">Attivo in Corso</span>
                                    </td>
                                    <td className="py-2.5 font-mono font-bold text-[#00C884]">€ 1.250</td>
                                  </tr>
                                  <tr className="hover:bg-slate-900/10">
                                    <td className="py-2.5 font-semibold text-white">Porsche 911 S</td>
                                    <td className="py-2.5 text-slate-300">Klaus G. (Frankfurt)</td>
                                    <td className="py-2.5 text-slate-400">03 Giu - 06 Giu</td>
                                    <td className="py-2.5">
                                      <span className="bg-slate-800 text-slate-400 text-[9px] px-2 py-0.5 rounded font-semibold font-mono">Chiuso Rientrato</span>
                                    </td>
                                    <td className="py-2.5 font-mono font-bold text-slate-500">€ 2.400</td>
                                  </tr>
                                </tbody>
                              </table>
                            </div>
                          </motion.div>
                        )}

                        {mockCurrentTab === 'fleet' && (
                          <motion.div 
                            key="fleet" 
                            initial={{ opacity: 0, y: 4 }} 
                            animate={{ opacity: 1, y: 0 }} 
                            exit={{ opacity: 0, y: -4 }}
                            className="grid grid-cols-1 sm:grid-cols-3 gap-4"
                          >
                            <div className="bg-[#050508] p-4.5 rounded-xl border border-slate-800 text-xs flex flex-col justify-between space-y-4">
                              <div className="flex justify-between items-start">
                                <div>
                                  <h4 className="font-semibold text-white text-[13px]">Ferrari F8 Tributo</h4>
                                  <p className="text-[10px] text-slate-500">Targa: FX902LL • Giallo</p>
                                </div>
                                <span className="bg-amber-400/15 text-amber-400 px-1.5 py-0.2 rounded font-mono text-[9px] font-semibold">PRENOTATO</span>
                              </div>
                              <div className="space-y-1.5">
                                <div className="flex justify-between text-[10px] text-slate-400 font-mono">
                                  <span>Livello Serbatoio</span>
                                  <span>85% pieno</span>
                                </div>
                                <div className="w-full bg-slate-800 h-1 rounded-full overflow-hidden">
                                  <div className="bg-amber-400 h-full w-[85%]" />
                                </div>
                              </div>
                            </div>

                            <div className="bg-[#050508] p-4.5 rounded-xl border border-slate-800 text-xs flex flex-col justify-between space-y-4">
                              <div className="flex justify-between items-start">
                                <div>
                                  <h4 className="font-semibold text-white text-[13px]">Mercedes Classe V</h4>
                                  <p className="text-[10px] text-slate-500">Targa: GD442LK • NCC</p>
                                </div>
                                <span className="bg-emerald-400/20 text-[#00C884] px-1.5 py-0.2 rounded font-mono text-[9px] font-semibold">IN STRADA</span>
                              </div>
                              <div className="space-y-1.5">
                                <div className="flex justify-between text-[10px] text-slate-400 font-mono">
                                  <span>Livello Serbatoio</span>
                                  <span>98% pieno</span>
                                </div>
                                <div className="w-full bg-slate-800 h-1 rounded-full overflow-hidden">
                                  <div className="bg-[#00C884] h-full w-[98%]" />
                                </div>
                              </div>
                            </div>

                            <div className="bg-[#050508] p-4.5 rounded-xl border border-slate-800 text-xs flex flex-col justify-between space-y-4">
                              <div className="flex justify-between items-start">
                                <div>
                                  <h4 className="font-semibold text-white text-[13px]">Porsche 911 Carrera</h4>
                                  <p className="text-[10px] text-slate-500">Targa: FK803RR • Grigia</p>
                                </div>
                                <span className="bg-green-500/10 text-emerald-400 px-1.5 py-0.2 rounded font-mono text-[9px] font-semibold">DISPONIBILE</span>
                              </div>
                              <div className="space-y-1.5">
                                <div className="flex justify-between text-[10px] text-slate-400 font-mono">
                                  <span>Livello Serbatoio</span>
                                  <span>45% serbatoio</span>
                                </div>
                                <div className="w-full bg-slate-800 h-1 rounded-full overflow-hidden">
                                  <div className="bg-orange-400 h-full w-[45%]" />
                                </div>
                              </div>
                            </div>
                          </motion.div>
                        )}

                        {mockCurrentTab === 'cash' && (
                          <motion.div 
                            key="cash"
                            initial={{ opacity: 0, y: 4 }} 
                            animate={{ opacity: 1, y: 0 }} 
                            exit={{ opacity: 0, y: -4 }}
                            className="bg-[#050508] rounded-xl border border-slate-800 p-5 space-y-3.5 text-xs text-left"
                          >
                            <h4 className="text-slate-400 font-semibold font-mono text-[10px] uppercase">Cauzioni e fatture inviate sdi</h4>
                            <div className="space-y-2.5">
                              <div className="flex items-center justify-between p-3.5 bg-slate-900/30 border border-slate-800/60 rounded-lg">
                                <div className="flex items-center gap-2.5">
                                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                                  <div>
                                    <p className="font-semibold text-white">Pre-Autorizzazione Deposito Ferrari F8</p>
                                    <p className="text-[10px] text-slate-500">Trattenuto su Visa • ID: #DEP-0921</p>
                                  </div>
                                </div>
                                <p className="font-mono text-[#00C884] font-bold">€ 5.000,00</p>
                              </div>

                              <div className="flex items-center justify-between p-3.5 bg-slate-900/30 border border-slate-800/60 rounded-lg">
                                <div className="flex items-center gap-2.5">
                                  <span className="w-2 h-2 rounded-full bg-[#00C884]" />
                                  <div>
                                    <p className="font-semibold text-white">Fattura Elettronica #F-1029</p>
                                    <p className="text-[10px] text-slate-500">VIP Luxury Club • Trasmessa a Agenzia Entrate</p>
                                  </div>
                                </div>
                                <p className="font-mono text-white font-bold">€ 4.500,00</p>
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>

                    </div>

                    {/* Footer log entry inside mockup */}
                    <div className="border-t border-slate-800/80 pt-4.5 mt-5 flex flex-col sm:flex-row items-center justify-between gap-4 text-[10px] text-slate-500 font-mono">
                      <span>Stato Operativo: 100% Attivo // dr7ai.com secure engine // Nessun Errore</span>
                      <button 
                        onClick={openPortal} 
                        className="text-[#00C884] hover:underline font-bold tracking-tight cursor-pointer inline-flex items-center gap-1 bg-transparent border-none p-0 uppercase"
                      >
                        Accedi alla piattaforma principale →
                      </button>
                    </div>

                  </div>
                </div>

              </div>

            </div>
          </section>

          {/* 4. VALUE STRIP (Minimal Understated Benefit Points) */}
          <section className="py-14 bg-white border-b border-[#E5E7EB]/50">
            <div className="max-w-6xl mx-auto px-6 lg:px-12">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left md:text-center">
                <div className="space-y-1">
                  <h4 className="text-sm font-semibold text-[#111111]">Meno lavoro manuale</h4>
                  <p className="text-xs text-[#6E6E73] leading-relaxed">I contratti e i pre-autorizzatori di cauzione sono generati automaticamente e firmati via OTP.</p>
                </div>
                <div className="space-y-1">
                  <h4 className="text-sm font-semibold text-[#111111]">Più controllo operativo</h4>
                  <p className="text-xs text-[#6E6E73] leading-relaxed">Tutti i nodi scadenziari (patenti, revisioni, manutenzioni) sono integrati con allerte SMS automatiche.</p>
                </div>
                <div className="space-y-1">
                  <h4 className="text-sm font-semibold text-[#111111]">Maggiore marginalità</h4>
                  <p className="text-xs text-[#6E6E73] leading-relaxed">Con dati incrociati e pianificazione ad alto rendimento elimini i fermi macchina imprevisti dei veicoli.</p>
                </div>
              </div>
            </div>
          </section>

          {/* 5. PROBLEM STORY (Spacious story, large simple typography, minimal subtle cards) */}
          <section className="py-20 md:py-28 bg-[#F5F5F7]">
            <div className="max-w-6xl mx-auto px-6 lg:px-12 space-y-16">
              
              <div className="text-left max-w-3xl space-y-4">
                <span className="text-[#6E6E73] font-semibold text-xs uppercase tracking-wider font-mono">Il paradosso della mobilità</span>
                <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#111111] font-sans leading-tight">
                  Quando gli strumenti sono scollegati,<br />l'efficienza operativa crolla.
                </h2>
                <p className="text-[#6E6E73] text-sm sm:text-base font-light leading-relaxed font-sans max-w-2xl">
                  Il noleggio auto e i servizi NCC sono attività ricche di variabili critiche. Utilizzare fogli Excel disgiunti, faldoni di carta ed e-mail frammentate espone l'azienda a errori anagrafici, ritardi rischiosi sulle scadenze dei mezzi e perdite economiche sui depositi cauzionali.
                </p>
              </div>

              {/* Minimal light cards detailing operator bottlenecks */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                
                <div className="bg-white p-7.5 rounded-2xl border-none space-y-3.5 shadow-[0_4px_16px_rgba(0,0,0,0.01)] hover:translate-y-[-2px] transition duration-200">
                  <div className="text-lg">📱</div>
                  <h4 className="font-semibold text-[#111111] text-[15px]">Prenotazioni frammentate</h4>
                  <p className="text-xs text-[#6E6E73] leading-relaxed font-sans">
                    Richieste sparse tra canali diversi, telefonate improvise, chat di WhatsApp e portali esterni che generano rischiosi problemi di overbooking.
                  </p>
                </div>

                <div className="bg-white p-7.5 rounded-2xl border-none space-y-3.5 shadow-[0_4px_16px_rgba(0,0,0,0.01)] hover:translate-y-[-2px] transition duration-200">
                  <div className="text-lg">🖋️</div>
                  <h4 className="font-semibold text-[#111111] text-[15px]">Contratti fisici e cartacei</h4>
                  <p className="text-xs text-[#6E6E73] leading-relaxed font-sans">
                    Moduli anagrafici scritti a mano con faldoni burocratici difficili da rintracciare e perdite costanti di tempo per l'archiviazione formale.
                  </p>
                </div>

                <div className="bg-white p-7.5 rounded-2xl border-none space-y-3.5 shadow-[0_4px_16px_rgba(0,0,0,0.01)] hover:translate-y-[-2px] transition duration-200">
                  <div className="text-lg">🔒</div>
                  <h4 className="font-semibold text-[#111111] text-[15px]">Cauzioni fuori controllo</h4>
                  <p className="text-xs text-[#6E6E73] leading-relaxed font-sans">
                    Pre-autorizzazioni difficili da tracciare, sblocchi lenti che indispongono i clienti e assenza di controllo sui danni effettivi al rientro.
                  </p>
                </div>

                <div className="bg-white p-7.5 rounded-2xl border-none space-y-3.5 shadow-[0_4px_16px_rgba(0,0,0,0.01)] hover:translate-y-[-2px] transition duration-200">
                  <div className="text-lg">🚗</div>
                  <h4 className="font-semibold text-[#111111] text-[15px]">Scadenze del parco veicoli</h4>
                  <p className="text-xs text-[#6E6E73] leading-relaxed font-sans">
                    Livelli di carburante scoordinati, manutenzioni repentine, tagliandi dimenticati o visti di idoneità non monitorati tempestivamente.
                  </p>
                </div>

                <div className="bg-white p-7.5 rounded-2xl border-none space-y-3.5 shadow-[0_4px_16px_rgba(0,0,0,0.01)] hover:translate-y-[-2px] transition duration-200">
                  <div className="text-lg">📊</div>
                  <h4 className="font-semibold text-[#111111] text-[15px]">Assenza di report reali</h4>
                  <p className="text-xs text-[#6E6E73] leading-relaxed font-sans">
                    Impossibilità di calcolare l'esatta marginalità netta oraria per ciascun singolo veicolo e il reale tasso di occupazione del parco mezzi.
                  </p>
                </div>

                <div className="bg-white p-7.5 rounded-2xl border-none space-y-3.5 shadow-[0_4px_16px_rgba(0,0,0,0.01)] hover:translate-y-[-2px] transition duration-200">
                  <div className="text-lg">🕒</div>
                  <h4 className="font-semibold text-[#111111] text-[15px]">Troppi passaggi manuali</h4>
                  <p className="text-xs text-[#6E6E73] leading-relaxed font-sans">
                    L'ufficio amministrativo consuma la maggior parte delle ore del giorno a stampare polizze, compilare anagrafiche e spedire fatture.
                  </p>
                </div>

              </div>

            </div>
          </section>

          {/* 6. FEATURES PORTFOLIO (Ogni funzione è pensata per semplificare) */}
          <section id="features" className="py-20 md:py-28 bg-white">
            <div className="max-w-6xl mx-auto px-6 lg:px-12 space-y-16">
              
              {/* Apple-style typography statement */}
              <div className="text-left max-w-2xl space-y-3">
                <span className="text-[#00C884] font-semibold text-xs uppercase tracking-wider font-mono">Dettagli della piattaforma</span>
                <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#111111] font-sans">
                  Ogni funzione è pensata per semplificare.
                </h2>
                <p className="text-[#6E6E73] text-sm leading-relaxed max-w-2xl font-sans font-light">
                  Non abbiamo creato un software pieno di pulsanti complessi. Abbiamo riprogettato l'intero processo di gestione della flotta rendendolo fluido, logico ed estremamente reattivo.
                </p>
              </div>

              {/* 6 core feature blocks */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                
                <div className="space-y-3">
                  <div className="w-10 h-10 rounded-xl bg-[#F5F5F7] text-slate-800 flex items-center justify-center">
                    <Calendar className="w-4.5 h-4.5 text-[#00C884]" />
                  </div>
                  <h4 className="text-base font-semibold text-[#111111]">Prenotazioni centralizzate</h4>
                  <p className="text-xs text-[#6E6E73] leading-relaxed font-sans">
                    Inserimento guidato delle richieste e integrazione automatica con i canali broker esterni per garantire un planning dinamico al riparo da sovrapposizioni o overbooking.
                  </p>
                </div>

                <div className="space-y-3">
                  <div className="w-10 h-10 rounded-xl bg-[#F5F5F7] text-slate-800 flex items-center justify-center">
                    <Users className="w-4.5 h-4.5 text-[#00C884]" />
                  </div>
                  <h4 className="text-base font-semibold text-[#111111]">CRM & Anagrafica Clienti</h4>
                  <p className="text-xs text-[#6E6E73] leading-relaxed font-sans">
                    Archivio unificato con digitalizzazione diretta dei documenti d'identità, patenti di guida e gestione automatizzata di allert e liste nere aziendali per tutelare i mezzi.
                  </p>
                </div>

                <div className="space-y-3">
                  <div className="w-10 h-10 rounded-xl bg-[#F5F5F7] text-slate-800 flex items-center justify-center">
                    <Car className="w-4.5 h-4.5 text-[#00C884]" />
                  </div>
                  <h4 className="text-base font-semibold text-[#111111]">Stato Flotta real-time</h4>
                  <p className="text-xs text-[#6E6E73] leading-relaxed font-sans">
                    Monitoraggio puntuale dei livelli carburante, chilometri, pulizia interna, turnazioni per manutenzione ordinaria e scadenziario assicurativo per evitare fermi imprevisti.
                  </p>
                </div>

                <div className="space-y-3">
                  <div className="w-10 h-10 rounded-xl bg-[#F5F5F7] text-slate-800 flex items-center justify-center">
                    <FileSignature className="w-4.5 h-4.5 text-[#00C884]" />
                  </div>
                  <h4 className="text-base font-semibold text-[#111111]">Contratti digitali & Firma OTP</h4>
                  <p className="text-xs text-[#6E6E73] leading-relaxed font-sans">
                    Compilazione automatica e legale dei PDF contrattuali firmabili ovunque tramite convalida OTP su smartphone, azzerando la necessità di stampare o compilare manualmente.
                  </p>
                </div>

                <div className="space-y-3">
                  <div className="w-10 h-10 rounded-xl bg-[#F5F5F7] text-slate-800 flex items-center justify-center">
                    <CreditCard className="w-4.5 h-4.5 text-[#00C884]" />
                  </div>
                  <h4 className="text-base font-semibold text-[#111111]">Pagamenti & Cauzioni sicure</h4>
                  <p className="text-xs text-[#6E6E73] leading-relaxed font-sans">
                    POS virtuale centralizzato per bloccare i depositi cauzionali tempestivamente e autorizzare ricarichi per carburante mancante o sbloccare la cauzione a fine corsa.
                  </p>
                </div>

                <div className="space-y-3">
                  <div className="w-10 h-10 rounded-xl bg-[#F5F5F7] text-slate-800 flex items-center justify-center">
                    <TrendingUp className="w-4.5 h-4.5 text-[#00C884]" />
                  </div>
                  <h4 className="text-base font-semibold text-[#111111]">Report e controllo di performance</h4>
                  <p className="text-xs text-[#6E6E73] leading-relaxed font-sans">
                    Grafici puliti sul rendimento economico di ciascun veicolo, tasso di occupazione del parco flotta e performance degli autisti NCC per decisioni aziendali basate su numeri reali.
                  </p>
                </div>

              </div>

            </div>
          </section>

          {/* 7. SECTORS SECTION (Pensato per operatori mobility che vogliono scalare con metodo) */}
          <section id="sectors" className="py-20 md:py-28 bg-[#FBFBFD] border-t border-[#E5E7EB]/50">
            <div className="max-w-6xl mx-auto px-6 lg:px-12 space-y-16">
              
              <div className="text-left max-w-3xl space-y-3">
                <span className="text-[#6E6E73] font-semibold text-xs uppercase tracking-wider font-mono">Segmenti di Mercato</span>
                <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#111111] font-sans">
                  Adatto a professionisti della mobilità.
                </h2>
                <p className="text-[#6E6E73] text-sm leading-relaxed max-w-xl font-sans font-light">
                  DR7 AI unifica ed adatta le proprie funzioni sulla base delle logiche e dei ritmi specifici di ciascuna attività di mobilità o noleggio.
                </p>
              </div>

              {/* Sectors Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                
                <div className="bg-white p-8 rounded-2xl border border-[#E5E7EB]/50 space-y-3">
                  <span className="text-[#00C884] font-bold text-xs uppercase tracking-wider font-mono block">AREA BREAK RETAIL</span>
                  <h4 className="font-bold text-[#111111] text-base">Autonoleggi classici</h4>
                  <p className="text-xs text-[#6E6E73] leading-relaxed font-sans">
                    Noleggio a breve, medio e lungo termine con tariffari dinamici, calcolo automatico della disponibilità flotta tra i canali fisici storici o web.
                  </p>
                </div>

                <div className="bg-white p-8 rounded-2xl border border-[#E5E7EB]/50 space-y-3">
                  <span className="text-[#00C884] font-bold text-xs uppercase tracking-wider font-mono block">AREA CHAUFFEUR</span>
                  <h4 className="font-bold text-[#111111] text-base">NCC & Noleggio con conducente</h4>
                  <p className="text-xs text-[#6E6E73] leading-relaxed font-sans">
                    Pianificazione oraria dei conducenti, gestione tratte ad aeroporti a prezzo fisso, coordinate di transfer speciali e storici dei driver.
                  </p>
                </div>

                <div className="bg-white p-8 rounded-2xl border border-[#E5E7EB]/50 space-y-3">
                  <span className="text-[#00C884] font-bold text-xs uppercase tracking-wider font-mono block">AREA PERFORMANCE</span>
                  <h4 className="font-bold text-[#111111] text-base">Flotte Premium & Luxury supercar</h4>
                  <p className="text-xs text-[#6E6E73] leading-relaxed font-sans">
                    Controllo ferreo sui depositi cauzionali di alta gamma, pre-autorizzatori di credito, storico incidenti dei conducenti e limitazioni di chilometraggio.
                  </p>
                </div>

                <div className="bg-white p-8 rounded-2xl border border-[#E5E7EB]/50 space-y-3">
                  <span className="text-[#00C884] font-bold text-xs uppercase tracking-wider font-mono block">AREA DISTRIBUZIONE</span>
                  <h4 className="font-bold text-[#111111] text-base">Operatori Multi-sede</h4>
                  <p className="text-xs text-[#6E6E73] leading-relaxed font-sans">
                    Inventari multi-point in sdoganamento dinamico interattivo, tracciando i rientri "one-way" e separando le responsabilità dei diversi team fisici.
                  </p>
                </div>

                <div className="bg-white p-8 rounded-2xl border border-[#E5E7EB]/50 space-y-3">
                  <span className="text-[#00C884] font-bold text-xs uppercase tracking-wider font-mono block">AREA NETWORK</span>
                  <h4 className="font-bold text-[#111111] text-base">Broker & Aggregatori</h4>
                  <p className="text-xs text-[#6E6E73] leading-relaxed font-sans">
                    Ricezione e consolidamento automatico delle pendenze da portali esterni, gestione commissioni agenzie terze e fluidità dei dati anagrafici.
                  </p>
                </div>

                <div className="bg-white p-8 rounded-2xl border border-[#E5E7EB]/50 space-y-3">
                  <span className="text-[#00C884] font-bold text-xs uppercase tracking-wider font-mono block">AREA CUSTOM VIP</span>
                  <h4 className="font-bold text-[#111111] text-base font-sans">Gestione flotte Luxury</h4>
                  <p className="text-xs text-[#6E6E73] leading-relaxed font-sans">
                    Fidelizzazione anagrafica di fascia alta, autorizzazione crediti in tempo reale, massima privacy burocratica e tracciabilità stringente dei mezzi di alto valore.
                  </p>
                </div>

              </div>

            </div>
          </section>

          {/* 8. ROI CALCULATOR SECTION (Integration) */}
          <section id="roi-calculator-section" className="py-20 md:py-28 bg-white">
            <div className="max-w-6xl mx-auto px-6 lg:px-12">
              
              {/* ROI Calculator Import Integration with elegant layout border */}
              <RoiCalculator />

            </div>
          </section>

          {/* 9. DR7 ORIGIN (Understated, highly credible storytelling) */}
          <section className="py-20 md:py-28 bg-[#F5F5F7]">
            <div className="max-w-4xl mx-auto px-6 lg:px-12 text-center space-y-8">
              
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mx-auto shadow-sm border border-[#E5E7EB]/50 text-base">
                🛡️
              </div>

              <div className="space-y-3">
                <span className="text-[#00C884] font-semibold text-xs uppercase tracking-wider font-mono block">Esperienza Reale Di Settore</span>
                <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#111111] font-sans">
                  Sviluppato partendo da esigenze operative reali.
                </h2>
              </div>

              <p className="text-base sm:text-lg text-[#6E6E73] leading-relaxed font-light font-sans italic">
                “DR7 AI nasce dall’esperienza vissuta sul campo della mobilità e del noleggio sul territorio. Abbiamo compreso quanta energia, tempo d’ufficio ed efficienza andassero persi a causa di gestionali obsoleti o frammentati. DR7 AI è la risposta concreta: un Operating System che riporta ordine, fluidità e margini in un unico sistema intelligente.”
              </p>

              <div>
                <p className="font-bold text-sm text-[#111111]">Il Team di Sviluppo DR7 AI</p>
                <p className="text-[10px] text-[#6E6E73] uppercase tracking-wider font-semibold font-mono">Specialisti di Mobilità & Saas • dr7ai.com</p>
              </div>

            </div>
          </section>

          {/* 10. FINAL CONVERSION CTA SECTION */}
          <section className="py-24 bg-[#0B0B0F] text-white text-center relative overflow-hidden">
            {/* Extremely subtle ambient teal shadow light */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-[#00C884]/4 rounded-full blur-[100px] pointer-events-none" />

            <div className="max-w-4xl mx-auto px-6 lg:px-12 space-y-8 relative">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-semibold bg-[#00C884]/15 text-[#00C884] border border-[#00C884]/20 uppercase tracking-wider font-mono">
                Richiedi una presentazione
              </span>

              <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight leading-tight max-w-2xl mx-auto font-sans">
                Vuoi vedere DR7 AI applicato alla tua flotta?
              </h2>

              <p className="text-xs sm:text-sm text-slate-450 max-w-xl mx-auto leading-relaxed font-sans font-light">
                Contatta un nostro specialista per una presentazione focalizzata sui ritmi operativi e sulle dimensioni esatte del tuo parco auto. Semplifica la tua amministrazione in 15 minuti.
              </p>

              <div className="pt-2 flex flex-col sm:flex-row justify-center items-center gap-4">
                <button
                  onClick={() => setIsDemoModalOpen(true)}
                  className="w-full sm:w-auto px-8 py-3.5 bg-[#00C884] hover:bg-[#00b577] text-white font-semibold rounded-full text-xs tracking-wider transition-transform hover:scale-[1.01] active:scale-98 cursor-pointer uppercase shadow-[0_4px_16px_rgba(0,200,132,0.1)]"
                >
                  Richiedi Demo Gratuita
                </button>
              </div>

              <div className="text-[9px] text-slate-500 uppercase tracking-widest font-mono">
                Senza alcun impegno • Risposta in poche ore lavorative
              </div>
            </div>
          </section>

          {/* 11. FAQ ACCORDION SECTION */}
          <section id="faq" className="py-20 md:py-28 bg-white border-t border-[#E5E7EB]/50">
            <div className="max-w-4xl mx-auto px-6 lg:px-12 space-y-12">
              
              <div className="text-center max-w-2xl mx-auto space-y-3">
                <span className="text-[#00C884] font-semibold text-xs uppercase tracking-wider font-mono block">Supporto e risposte</span>
                <h2 className="text-3xl font-bold tracking-tight text-[#111111] font-sans">
                  Domande Frequenti (FAQ)
                </h2>
                <p className="text-[#6E6E73] text-sm font-sans font-light">
                  Chiarimenti sull'integrazione di DR7 AI nei flussi anagrafici e gestionali già attivi nella tua agenzia.
                </p>
              </div>

              <div className="space-y-4 max-w-3xl mx-auto text-left">
                {FAQ_LIST.map((item) => {
                  const isOpen = selectedFaq === item.id;
                  return (
                    <div 
                      key={item.id}
                      className="bg-[#F5F5F7] border border-[#E5E7EB]/40 rounded-2xl overflow-hidden transition"
                    >
                      <button
                        onClick={() => toggleFaq(item.id)}
                        className="w-full flex justify-between items-center p-5 text-left font-semibold text-xs sm:text-sm text-[#111111] hover:text-[#00C884] transition"
                      >
                        <span>{item.question}</span>
                        <ChevronDown className={`w-4 h-4 text-[#6E6E73] transition-transform duration-300 ${isOpen ? 'rotate-180 text-[#00C884]' : ''}`} />
                      </button>
                      
                      {isOpen && (
                        <div className="px-5 pb-5 pt-1 text-xs text-[#6E6E73] leading-relaxed border-t border-[#E5E7EB]/30 bg-white font-sans font-light">
                          {item.answer}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </section>

          {/* 12. MINIMAL AND PREMIUM FOOTER */}
          <footer className="bg-[#FBFBFD] text-[#6E6E73] text-xs border-t border-[#E5E7EB]/60 py-16">
            <div className="max-w-7xl mx-auto px-6 lg:px-12">
              
              <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12 text-left">
                
                <div className="space-y-4 text-left">
                  <div className="flex items-center origin-left scale-90">
                    <BrandLogo className="h-10" showSubText={false} variant="dark" />
                  </div>
                  <p className="text-[11px] text-[#6E6E73] leading-relaxed font-sans font-light">
                    SaaS Operating System per autonoleggio, flotta luxury, multi-sede ed NCC.
                  </p>
                  <p className="text-[10px] text-[#6E6E73] font-mono leading-relaxed opacity-80">
                    Ospitato in server sicuri conformi con il GDPR europeo e standard di sicurezza globali.
                  </p>
                </div>

                <div>
                  <h5 className="font-bold text-[#111111] mb-4 text-xs tracking-wider uppercase font-sans">Piattaforma</h5>
                  <ul className="space-y-2.5 text-[11px] font-medium font-sans">
                    <li><button onClick={() => scrollToSection('dashboard-preview')} className="hover:text-[#111111] transition bg-transparent border-none p-0">Software Preview</button></li>
                    <li><button onClick={() => scrollToSection('features')} className="hover:text-[#111111] transition bg-transparent border-none p-0">Funzionalità</button></li>
                    <li><button onClick={() => scrollToSection('sectors')} className="hover:text-[#111111] transition bg-transparent border-none p-0">Mappa Settori</button></li>
                    <li><button onClick={() => scrollToSection('roi-calculator-section')} className="hover:text-[#111111] transition bg-transparent border-none p-0">Simulatore ROI</button></li>
                  </ul>
                </div>

                <div>
                  <h5 className="font-bold text-[#111111] mb-4 text-xs tracking-wider uppercase font-sans">Risorse & Portale</h5>
                  <ul className="space-y-2.5 text-[11px] font-medium font-sans">
                    <li><button onClick={() => setIsDemoModalOpen(true)} className="hover:text-[#111111] transition bg-transparent border-none p-0 text-left">Richiedi demo personalizzata</button></li>
                    <li><button onClick={openPortal} className="hover:text-[#00C884] transition bg-transparent border-none p-0">Accedi all'area riservata</button></li>
                    <li><span className="text-[#6E6E73] font-light">Documenti di avvio rapido (SLA)</span></li>
                  </ul>
                </div>

                <div>
                  <h5 className="font-bold text-[#111111] mb-4 text-xs tracking-wider uppercase font-sans">Società</h5>
                  <p className="text-[11px] text-[#6E6E73] leading-relaxed font-sans font-light">
                    Dubai Rent 7 SRL<br />
                    Dominio: <span className="text-[#111111] font-semibold">dr7ai.com</span><br />
                    Infrastruttura sicura cloud di livello Enterprise.
                  </p>
                  <p className="text-[10px] text-[#00C884] font-bold mt-2 font-mono">✓ 100% GDPR Compliant</p>
                </div>

              </div>

              <div className="border-t border-[#E5E7EB] pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-[#6E6E73] font-mono text-[10px]">
                <p>© 2026 DR7 AI (dr7ai.com). Tutti i diritti riservati.</p>
                <div className="flex gap-4">
                  <span>Trattamento dati Codice</span>
                  <span>|</span>
                  <span>Informativa sui Cookie</span>
                </div>
              </div>

            </div>
          </footer>
        </>
      )}

      {/* LEAD ACQUISITION POPUP MODAL */}
      <DemoRequestModal 
        isOpen={isDemoModalOpen} 
        onClose={() => setIsDemoModalOpen(false)} 
        onSuccessSubmit={handleLeadSubmitted}
      />
    </div>
  );
}
