/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ArrowRight, CheckCircle2, User, Coins, MessageSquare, RotateCcw } from 'lucide-react';
import { Prospect, PipelineStage } from '../types';

const INITIAL_STAGES: PipelineStage[] = [
  { id: '1', title: 'Nuove Richieste', color: 'border-white/[0.08] bg-white/[0.01]' },
  { id: '2', title: 'Prezzo Calcolato', color: 'border-white/[0.08] bg-white/[0.01]' },
  { id: '3', title: 'Attesa Acconto', color: 'border-white/[0.08] bg-white/[0.01]' },
  { id: '4', title: 'Confermata', color: 'border-[#30d158]/20 bg-[#30d158]/[0.02]' }
];

const INITIAL_PROSPECTS: Prospect[] = [
  { id: 'p1', name: 'Laura Martinez', company: 'Noleggio Tesla Model Y (7gg)', value: 450, stageId: '1', activity: 'Compilato modulo preventivo sul sito', lastContact: '2 ore fa' },
  { id: 'p2', name: 'Tommaso Giraudi', company: 'Servizio NCC Matrimonio', value: 1200, stageId: '2', activity: 'Opzioni veicolo e autista calcolate', lastContact: 'Ieri' },
  { id: 'p3', name: 'Emilia Rossi', company: 'Noleggio Mensile Furgone', value: 2400, stageId: '3', activity: 'Inviato link sicuro Stripe per acconto', lastContact: '10 min fa' },
  { id: 'p4', name: 'Marco Fontani', company: 'Flotta breve termine Aziende', value: 5800, stageId: '4', activity: 'Contratto firmato e deposito approvato', lastContact: '1 giorno fa' }
];

export default function InteractivePipeline() {
  const [prospects, setProspects] = useState<Prospect[]>(INITIAL_PROSPECTS);
  const [selectedProspect, setSelectedProspect] = useState<Prospect | null>(INITIAL_PROSPECTS[0]);
  const [log, setLog] = useState<string>("Clicca sulle frecce (➔) delle singole schede flotta per simulare le conversioni e l'automazione dei flussi.");

  const moveProspect = (id: string, direction: 'forward' | 'backward') => {
    setProspects(prev => {
      return prev.map(p => {
        if (p.id === id) {
          const currentStage = Number(p.stageId);
          let nextStage = currentStage;
          if (direction === 'forward' && currentStage < 4) nextStage = currentStage + 1;
          if (direction === 'backward' && currentStage > 1) nextStage = currentStage - 1;
          
          const updated = { ...p, stageId: String(nextStage) };
          
          let actionText = "";
          if (nextStage === 2) {
            actionText = `⚡ Automazione DR7 AI : Schema preventivo calcolato per ${p.name}. Invio automatico di dettagli veicolo via SMS e WhatsApp in corso.`;
          } else if (nextStage === 3) {
            actionText = `📧 Automazione DR7 AI : Rilevato sollecito acconto. Generato link sicuro Stripe di pre-autorizzazione per il veicolo di ${p.name}.`;
          } else if (nextStage === 4) {
            actionText = `🎉 Automazione DR7 AI : PRENOTAZIONE CONFERMATA! Il veicolo è stato rimosso dal database pubblico ed è bloccato sul calendario. +${p.value.toLocaleString()} € aggiunti all'andamento mensile.`;
          } else {
            actionText = `📥 Scheda di ${p.name} riposizionata allo stato di ingresso per revisione.`;
          }
          
          setLog(actionText);
          if (selectedProspect && selectedProspect.id === id) {
            setSelectedProspect(updated);
          }
          return updated;
        }
        return p;
      });
    });
  };

  const selectProspect = (p: Prospect) => {
    setSelectedProspect(p);
  };

  const handleReset = () => {
    setProspects(INITIAL_PROSPECTS);
    setSelectedProspect(INITIAL_PROSPECTS[0]);
    setLog("Flusso interattivo ripristinato. Sposta nuovamente le schede per simulare l'attività.");
  };

  return (
    <div className="bg-[#121214] border border-white/[0.08] rounded-[24px] p-5 sm:p-6 md:p-8 shadow-[0_24px_50px_-12px_rgba(0,0,0,0.5)]" id="interactive-pipeline">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4 text-left">
        <div>
          <span className="text-[#86868b] text-[11px] font-bold uppercase tracking-wider block mb-1">
            CRUSCOTTO IN TEMPO REALE DEMO
          </span>
          <h4 className="text-xl font-semibold text-white flex items-center gap-2 font-sans tracking-tight">
            <span className="w-2.5 h-2.5 bg-[#30d158] rounded-full shrink-0 animate-pulse" />
            Flusso di Prenotazione Interattivo
          </h4>
          <p className="text-xs text-[#86868b] mt-1 font-sans leading-relaxed">
            Esegui i passaggi per simulare gli automatismi del SaaS (messaggi automatici, conferme ed esclusioni).
          </p>
        </div>
        <button
          onClick={handleReset}
          className="flex items-center gap-2 px-3.5 py-2 text-xs font-medium text-white hover:bg-white/[0.06] bg-white/[0.03] rounded-full border border-white/[0.08] transition duration-200 cursor-pointer"
        >
          <RotateCcw className="w-3.5 h-3.5 text-[#86868b]" /> Ripristina
        </button>
      </div>

      {/* Kanban Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {INITIAL_STAGES.map(stage => {
          const stageProspects = prospects.filter(p => p.stageId === stage.id);
          return (
            <div
              key={stage.id}
              className={`rounded-2xl p-4 flex flex-col min-h-[180px] bg-[#1a1a1c]/40 border border-white/[0.04] text-left`}
            >
              <div className="flex justify-between items-center mb-4">
                <span className="text-xs font-semibold text-white/90 font-sans tracking-wide">
                  {stage.title}
                </span>
                <span className="w-5 h-5 flex items-center justify-center rounded-full bg-white/[0.05] font-mono text-[10px] text-[#86868b] font-bold border border-white/[0.04]">
                  {stageProspects.length}
                </span>
              </div>

              <div className="space-y-3 flex-1 flex flex-col justify-start">
                {stageProspects.map(p => {
                  const isSelected = selectedProspect?.id === p.id;
                  const isConfirmed = p.stageId === '4';
                  return (
                    <div
                      key={p.id}
                      onClick={() => selectProspect(p)}
                      className={`p-3.5 rounded-xl border text-left cursor-pointer transition-all duration-200 ${
                        isSelected
                          ? isConfirmed 
                            ? 'bg-[#30d158]/5 border-[#30d158]/40 shadow-lg shadow-[#30d158]/[0.02]'
                            : 'bg-[#1c1c1e] border-[#555] shadow-lg scale-[1.01]'
                          : 'bg-[#1c1c1e]/50 border-white/[0.04] hover:border-white/[0.12] hover:bg-[#1c1c1e]/90'
                      }`}
                    >
                      <div className="flex justify-between items-start gap-2">
                        <span className="text-xs font-semibold text-white tracking-tight leading-snug line-clamp-1 font-sans">{p.name}</span>
                        <span className={`text-[11px] font-bold font-mono ${isConfirmed ? 'text-[#30d158]' : 'text-white'}`}>
                          {p.value.toLocaleString()}€
                        </span>
                      </div>
                      <p className="text-[10px] text-[#86868b] line-clamp-1 mt-1 font-sans">{p.company}</p>
                      
                      <div className="flex justify-between items-center mt-4 pt-2.5 border-t border-white/[0.03]">
                        <span className="text-[9px] text-[#86868b] font-mono">{p.lastContact}</span>
                        <div className="flex gap-1.5" onClick={e => e.stopPropagation()}>
                          {Number(p.stageId) > 1 && (
                            <button
                              onClick={() => moveProspect(p.id, 'backward')}
                              title="Arretra stato"
                              className="w-5 h-5 flex items-center justify-center rounded-md bg-white/[0.04] hover:bg-white/[0.1] text-[#86868b] hover:text-white transition cursor-pointer border border-white/[0.06]"
                            >
                              <span className="text-[10px] block font-mono rotate-180">➔</span>
                            </button>
                          )}
                          {Number(p.stageId) < 4 && (
                            <button
                              onClick={() => moveProspect(p.id, 'forward')}
                              title="Avanza stato"
                              className="w-5 h-5 flex items-center justify-center rounded-md bg-[#2997ff]/10 hover:bg-[#2997ff]/20 text-[#2997ff] font-bold transition cursor-pointer border border-[#2997ff]/20"
                            >
                              <span className="text-[10px] block font-mono">➔</span>
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
                {stageProspects.length === 0 && (
                  <div className="flex-1 border border-dashed border-white/[0.04] rounded-xl flex items-center justify-center p-6 bg-white/[0.005]">
                    <span className="text-[10px] text-[#86868b] font-mono uppercase tracking-wider select-none">Nessuna scheda</span>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Activity Log / Live Action feedback as macOS Console */}
      <div className="bg-[#0e0e10] border border-white/[0.06] rounded-xl p-3.5 mb-6 text-left">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-1.5 h-1.5 rounded-full bg-[#30d158]" />
          <span className="text-[10px] font-bold font-sans tracking-wide text-[#30d158] uppercase">SISTEMA DI AUTOMAZIONE ATTIVO</span>
        </div>
        <p className="text-xs text-[#86868b] font-mono leading-relaxed bg-[#121214] p-3 rounded-lg border border-white/[0.03]">
          {log}
        </p>
      </div>

      {/* Selected Prospect Details Drawer */}
      {selectedProspect && (
        <div className="bg-[#1c1c1e]/40 border border-white/[0.05] rounded-xl p-4 text-left">
          <p className="text-[10px] font-bold text-[#86868b] uppercase tracking-wider mb-3">
            DETTAGLI ANAGRAFICA SELEZIONATA (Fascicolo Flotta Sincronizzato)
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div className="flex items-start gap-3">
              <div className="p-2.5 bg-white/[0.03] text-[#86868b] rounded-lg border border-white/[0.05]">
                <User className="w-4 h-4" />
              </div>
              <div className="font-sans">
                <p className="text-[10px] text-[#86868b] font-medium uppercase tracking-wider">Cliente / Noleggiatore</p>
                <p className="text-xs font-semibold text-white mt-0.5">{selectedProspect.name}</p>
                <p className="text-[11px] text-[#86868b] mt-0.5">{selectedProspect.company}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="p-2.5 bg-[#30d158]/5 text-[#30d158] rounded-lg border border-[#30d158]/10">
                <Coins className="w-4 h-4" />
              </div>
              <div className="font-sans">
                <p className="text-[10px] text-[#86868b] font-medium uppercase tracking-wider">Transazione & Tariffa</p>
                <p className="text-xs font-semibold text-[#30d158] font-mono mt-0.5">{selectedProspect.value.toLocaleString()} €</p>
                <p className="text-[11px] text-[#86868b] mt-0.5">Stato: {INITIAL_STAGES.find(s => s.id === selectedProspect.stageId)?.title}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="p-2.5 bg-[#0a84ff]/5 text-[#0a84ff] rounded-lg border border-[#0a84ff]/10">
                <MessageSquare className="w-4 h-4" />
              </div>
              <div className="font-sans">
                <p className="text-[10px] text-[#86868b] font-medium uppercase tracking-wider">Attività Tracciata</p>
                <p className="text-xs font-semibold text-neutral-300 mt-0.5">{selectedProspect.activity}</p>
                <p className="text-[10px] text-[#86868b] font-mono mt-0.5">Rilevato: {selectedProspect.lastContact}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
