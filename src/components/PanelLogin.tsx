/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Mail, Lock, Eye, EyeOff, ShieldCheck, ArrowRight, ArrowLeft } from 'lucide-react';

interface PanelLoginProps {
  onLoginSuccess: () => void;
  onBackToLanding: () => void;
}

export default function PanelLogin({ onLoginSuccess, onBackToLanding }: PanelLoginProps) {
  const [email, setEmail] = useState<string>('admin@dr7empire.com');
  const [password, setPassword] = useState<string>('••••••••');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!email.trim() || !email.includes('@')) {
      setErrorMsg('Inserisci un indirizzo email valido.');
      return;
    }

    if (!password) {
      setErrorMsg('Inserisci la password.');
      return;
    }

    setIsSubmitting(true);

    // Simulate authentication
    setTimeout(() => {
      setIsSubmitting(false);
      onLoginSuccess();
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-[#F4F9FB] flex flex-col justify-center items-center p-4 relative font-sans">
      
      {/* Return to landing floating action */}
      <button 
        onClick={onBackToLanding}
        className="absolute top-6 left-6 inline-flex items-center gap-2 px-3.5 py-2 text-xs font-semibold text-[#183C45] hover:text-[#0399AE] bg-white border border-[#E0F2F6] rounded-xl shadow-sm transition hover:scale-105 cursor-pointer"
        id="btn-back-to-landing"
      >
        <ArrowLeft className="w-3.5 h-3.5" /> Ritorna al Sito
      </button>

      {/* Main card matching container exactly */}
      <div className="w-full max-w-[450px] bg-white border border-[#CEECEF]/80 rounded-[24px] p-8 md:p-10 shadow-[0_12px_40px_rgba(3,153,174,0.04)] flex flex-col items-center relative" id="login-card">
        
        {/* DR7 A.I. Brand representation */}
        <div className="flex flex-col items-center mb-8 w-full">
          
          {/* Logo container with symmetrical brain and ECG heartbeat */}
          <div className="w-40 h-28 relative flex items-center justify-center">
            <svg viewBox="0 0 160 110" className="w-[140px] h-[95px]" fill="none" xmlns="http://www.w3.org/2000/svg">
              {/* Left Hemisphere (Cerebral curves in Blue-Teal) */}
              <g stroke="#03505E" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" opacity="0.9">
                <path d="M78 20 C64 20, 50 26, 50 40 C50 48, 54 51, 55 57 C55 65, 61 71, 71 72 M78 78 C76 81, 78 85, 78 88" />
                <path d="M74 30 C66 30, 60 35, 60 42 C60 47, 63 49, 64 52" />
                <path d="M50 40 C58 40, 62 46, 68 46" />
                <path d="M55 57 C62 57, 64 63, 70 63" />
                <path d="M78 20 C73 24, 73 34, 78 38" />
                <path d="M78 48 C72 52, 72 62, 78 66" />
              </g>

              {/* Right Hemisphere (Neural nodes & web lines in brilliant Cyan) */}
              <g stroke="#24E2F4" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M82 20 C96 20, 110 26, 110 40 C110 48, 106 51, 105 57 C105 65, 99 71, 89 72 M82 78 C84 81, 82 85, 82 88" />
                <path d="M86 30 C94 30, 100 35, 100 42 C100 47, 97 49, 96 52" />
                <path d="M110 40 C102 40, 98 46, 92 46" />
                <path d="M105 57 C98 57, 96 63, 90 63" />
                <path d="M82 20 C87 24, 87 34, 82 38" />
                <path d="M82 48 C88 52, 88 62, 82 66" />
                
                {/* Node Indicators */}
                <circle cx="110" cy="40" r="2.2" fill="#24E2F4" stroke="none" />
                <circle cx="105" cy="57" r="2.2" fill="#24E2F4" stroke="none" />
                <circle cx="100" cy="42" r="2.2" fill="#24E2F4" stroke="none" />
                <circle cx="96" cy="52" r="2.2" fill="#24E2F4" stroke="none" />
                <circle cx="89" cy="72" r="2.2" fill="#24E2F4" stroke="none" />
              </g>

              {/* Heartbeat / Pulse / ECG Wave right through center */}
              <path d="M25 50 H55 L59 36 L64 69 L70 24 L76 75 L81 44 L85 55 L90 50 H135" stroke="#00B6CC" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>

          {/* Symmetrical Text Container */}
          <div className="w-full text-center flex flex-col items-center select-none mt-1">
            {/* Custom DR7 Title with colored '7' */}
            <h1 className="text-[34px] font-black tracking-tight text-[#173B45] leading-none font-sans flex items-center justify-center">
              DR<span className="text-[#0399AE]">7</span>
            </h1>

            {/* —— A. I. —— split horizontal line */}
            <div className="flex items-center gap-2.5 w-full max-w-[190px] mt-2 mb-1.5">
              <div className="h-[1px] bg-gradient-to-r from-transparent to-slate-300 flex-1"></div>
              <span className="text-[12px] font-black text-[#173B45] tracking-[0.3em] pl-[0.3em] font-sans">A.I.</span>
              <div className="h-[1px] bg-gradient-to-l from-transparent to-slate-300 flex-1"></div>
            </div>

            {/* Spaced out tagline */}
            <span className="text-[8px] font-bold text-[#7E99A0] tracking-[0.16em] uppercase whitespace-nowrap font-sans">
              INTELLIGENZA  •  CONTROLLO  •  RISULTATI
            </span>
          </div>

        </div>

        {/* Display feedback error if any */}
        {errorMsg && (
          <div className="w-full p-3 mb-4 bg-red-50 text-red-705 border border-red-150 rounded-xl text-xs flex items-center justify-center font-semibold font-sans">
            {errorMsg}
          </div>
        )}

        {/* Login form styled exactly like user's panel */}
        <form onSubmit={handleSubmit} className="w-full space-y-6">
          <div className="text-left">
            <label className="block text-[11px] font-extrabold text-[#0399AE] tracking-[0.12em] mb-2 font-sans">
              EMAIL
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4.5 flex items-center pointer-events-none text-slate-400">
                <Mail className="w-4.5 h-4.5 stroke-[1.8]" />
              </div>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@dr7empire.com"
                className="w-full bg-[#F5F8FA] border border-[#E4EDF0] focus:border-[#0399AE] focus:bg-white text-slate-700 text-sm px-4 py-3.5 pl-12 rounded-2xl transition outline-none font-sans font-medium shadow-inner shadow-slate-100/30"
                id="input-email"
              />
            </div>
          </div>

          <div className="text-left">
            <label className="block text-[11px] font-extrabold text-[#0399AE] tracking-[0.12em] mb-2 font-sans">
              PASSWORD
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4.5 flex items-center pointer-events-none text-slate-400">
                <Lock className="w-4.5 h-4.5 stroke-[1.8]" />
              </div>
              <input
                type={showPassword ? "text" : "password"}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="w-full bg-[#F5F8FA] border border-[#E4EDF0] focus:border-[#0399AE] focus:bg-white text-slate-700 text-sm px-4 py-3.5 pl-12 pr-12 rounded-2xl transition outline-none font-sans"
                id="input-password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-[#0399AE] cursor-pointer"
                id="toggle-password"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            
            <div className="flex justify-end mt-2">
              <button
                type="button"
                onClick={() => alert("Credenziali Demo precompilate. Fai clic su ACCEDI per sbloccare l'area di amministrazione.")}
                className="text-[11px] font-bold text-[#0399AE] hover:text-[#027e90] transition hover:underline font-sans cursor-pointer bg-transparent border-none p-0"
              >
                Password dimenticata?
              </button>
            </div>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full select-none cursor-pointer inline-flex items-center justify-center gap-2 bg-gradient-to-r from-[#03839A] to-[#1EE0F6] active:scale-[0.98] hover:opacity-95 text-white font-black text-xs tracking-widest uppercase py-4 rounded-2xl shadow-lg shadow-cyan-500/10 transition-all font-sans"
              id="btn-login-submit"
            >
              {isSubmitting ? (
                <>
                  <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ACCESSO IN CORSO...
                </>
              ) : (
                <>
                  ACCEDI <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        </form>

        <div className="w-full h-px bg-[#EBF3F5] my-6" />

        <div className="flex items-center gap-2 text-xs text-[#62858E] font-semibold font-sans">
          <ShieldCheck className="w-4.5 h-4.5 text-[#10B981] fill-emerald-100/10" />
          <span>Accesso sicuro e protetto</span>
        </div>

      </div>
      
      <div className="mt-8 text-center text-[10px] uppercase font-bold tracking-widest text-[#B3C6CC] select-none font-mono">
        Dubai Rent 7 SRL • dr7ai.com portal v12.4
      </div>
    </div>
  );
}
