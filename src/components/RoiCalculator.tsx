import React, { useState } from 'react';
import { Layers, ArrowRight, CheckCircle2 } from 'lucide-react';

export default function RoiCalculator() {
  const [vehicles, setVehicles] = useState<number>(30);
  const [bookings, setBookings] = useState<number>(120);
  const [hoursSavedPerBooking, setHoursSavedPerBooking] = useState<number>(1.5);

  // Calculations that reflect real operator metrics
  const monthlyHoursSaved = Math.round(bookings * hoursSavedPerBooking);
  const economicValue = Math.round(monthlyHoursSaved * 35); // €35 per hour average cost
  
  // Operational efficiency index score (Max 98%)
  const efficiencyIndex = Math.min(98, Math.round(70 + (vehicles * 0.1) + (hoursSavedPerBooking * 6)));

  return (
    <div className="bg-white border border-[#E5E7EB] rounded-3xl p-8 md:p-12 max-w-5xl mx-auto shadow-[0_4px_24px_rgba(0,0,0,0.02)] relative overflow-hidden text-left" id="roi-calculator">
      {/* Dynamic Background Accent (Very subtle) */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-[#00C884]/2 rounded-full blur-[80px] pointer-events-none" />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
        
        {/* Left Column - Slide controls with refined spacing */}
        <div className="lg:col-span-7 space-y-8">
          <div>
            <span className="text-[#00C884] font-medium text-xs tracking-wider uppercase font-mono block mb-2">Simulatore d'Impatto</span>
            <h3 className="text-2xl sm:text-3xl font-bold text-[#111111] tracking-tight font-sans">
              Calcola il ritorno sull'investimento della tua flotta.
            </h3>
            <p className="text-[#6E6E73] text-[14px] leading-relaxed mt-2 font-sans">
              Trascina i cursori per simulare l'efficienza oraria e amministrativa generata introducendo DR7 AI nei flussi della tua operatività quotidiana.
            </p>
          </div>

          <div className="space-y-6 pt-2">
            {/* Range Slider 1: Veicoli in flotta */}
            <div className="bg-[#F5F5F7] p-5 rounded-2xl border-none">
              <div className="flex justify-between items-center mb-3">
                <span className="text-xs font-semibold text-[#111111] font-sans">Veicoli in flotta</span>
                <span className="text-[#111111] font-mono font-bold text-xs bg-white border border-[#E5E7EB]/80 px-2.5 py-1 rounded-lg shadow-sm">
                  {vehicles} veicoli
                </span>
              </div>
              <input
                type="range"
                min="5"
                max="250"
                value={vehicles}
                onChange={(e) => setVehicles(Number(e.target.value))}
                className="w-full h-1 bg-[#E5E7EB] rounded-lg appearance-none cursor-pointer accent-[#00C884] outline-none"
              />
              <div className="flex justify-between text-[10px] text-[#6E6E73] mt-2 font-mono">
                <span>5 veicoli</span>
                <span>125</span>
                <span>250 veicoli</span>
              </div>
            </div>

            {/* Range Slider 2: Prenotazioni mensili */}
            <div className="bg-[#F5F5F7] p-5 rounded-2xl border-none">
              <div className="flex justify-between items-center mb-3">
                <span className="text-xs font-semibold text-[#111111] font-sans">Contratti / Prenotazioni mensili</span>
                <span className="text-[#111111] font-mono font-bold text-xs bg-white border border-[#E5E7EB]/80 px-2.5 py-1 rounded-lg shadow-sm">
                  {bookings} contratti
                </span>
              </div>
              <input
                type="range"
                min="10"
                max="800"
                step="10"
                value={bookings}
                onChange={(e) => setBookings(Number(e.target.value))}
                className="w-full h-1 bg-[#E5E7EB] rounded-lg appearance-none cursor-pointer accent-[#00C884] outline-none"
              />
              <div className="flex justify-between text-[10px] text-[#6E6E73] mt-2 font-mono">
                <span>10 contratti</span>
                <span>400</span>
                <span>800 contratti</span>
              </div>
            </div>

            {/* Range Slider 3: Ore risparmiate per prenotazione */}
            <div className="bg-[#F5F5F7] p-5 rounded-2xl border-none">
              <div className="flex justify-between items-center mb-3">
                <span className="text-xs font-semibold text-[#111111] font-sans">Tempo amministrativo risparmiato per booking</span>
                <span className="text-[#00C884] font-mono font-bold text-xs bg-white border border-[#E5E7EB]/80 px-2.5 py-1 rounded-lg shadow-sm">
                  {hoursSavedPerBooking} ore / pratica
                </span>
              </div>
              <input
                type="range"
                min="0.5"
                max="5"
                step="0.5"
                value={hoursSavedPerBooking}
                onChange={(e) => setHoursSavedPerBooking(Number(e.target.value))}
                className="w-full h-1 bg-[#E5E7EB] rounded-lg appearance-none cursor-pointer accent-[#00C884] outline-none"
              />
              <div className="flex justify-between text-[10px] text-[#6E6E73] mt-2 font-mono">
                <span>30 min</span>
                <span>2.5 ore</span>
                <span>5 ore</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Results Showcase styled like Apple Product Tech Spec cards */}
        <div className="lg:col-span-5 bg-[#FBFBFD] border border-[#E5E7EB] p-8 md:p-10 rounded-3xl flex flex-col justify-between shadow-[0_8px_32px_rgba(0,0,0,0.01)] relative min-h-[400px]">
          <div className="space-y-6">
            <div>
              <span className="text-[#6E6E73] text-[10px] font-semibold uppercase tracking-wider block mb-1">Efficienza stimata</span>
              <div className="text-5xl font-bold tracking-tight text-[#111111] font-sans flex items-baseline gap-1">
                {efficiencyIndex}%
                <span className="text-xs font-bold text-[#00C884] uppercase font-mono tracking-normal ml-2">Ottimizzato</span>
              </div>
              <p className="text-[#6E6E73] text-[12px] mt-3 leading-relaxed font-sans">
                Indice calcolato integrando la centralizzazione delle scadenze e la firma digitale dei contratti OTP con l'eliminazione dei passaggi cartacei.
              </p>
            </div>

            <div className="border-t border-[#EEF0F2] my-5" />

            <div className="space-y-4">
              <div className="flex justify-between items-center text-xs">
                <span className="text-[#6E6E73] font-medium font-sans">Tempo recuperato:</span>
                <span className="font-mono text-[#111111] font-bold text-sm">~ {monthlyHoursSaved} ore / mese</span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-[#6E6E73] font-medium font-sans">Valore di produttività stimato:</span>
                <span className="font-mono text-[#00C884] font-bold text-sm">+ € {economicValue.toLocaleString('it-IT')} / mese</span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-[#6E6E73] font-medium font-sans">Abbattimento errori d'ufficio:</span>
                <span className="font-mono text-emerald-600 font-bold text-sm">-94% stimati</span>
              </div>
            </div>
          </div>

          <div className="pt-8 flex items-center gap-2.5 text-xs text-[#6E6E73] font-sans">
            <div className="w-5 h-5 rounded-full bg-[#00C884]/10 text-[#00C884] flex items-center justify-center shrink-0">
              <CheckCircle2 className="w-3.5 h-3.5" />
            </div>
            <span>Pronto per l'attivazione immediata</span>
          </div>
        </div>

      </div>
    </div>
  );
}
