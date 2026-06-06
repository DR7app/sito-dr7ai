/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Copy, Check, Search, Megaphone, Video, Linkedin, Sparkles } from 'lucide-react';
import { SEO_DATA, ADS_COPY } from '../data/copywriting';

export default function CopywriterToolkit() {
  const [activeTab, setActiveTab] = useState<'seo' | 'facebook' | 'google' | 'linkedin' | 'video'>('seo');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl" id="copywriter-toolkit">
      
      {/* Toolkit Header Banner */}
      <div className="bg-slate-950 px-6 py-5 border-b border-slate-800 flex flex-col md:flex-row justify-between items-start md:items-center gap-3">
        <div className="text-left">
          <div className="flex items-center gap-1.5 text-xs text-blue-400 font-bold uppercase tracking-wider mb-1">
            <Sparkles className="w-3.5 h-3.5" /> Spazio Esperto Marketing & Copywriting
          </div>
          <h3 className="text-xl font-bold text-white font-sans">
            Cassetta degli Strumenti di Vendita & Asset Pubblicitari DR7 AI
          </h3>
          <p className="text-xs text-slate-400 mt-0.5 font-sans">
            Copia in un clic i testi di vendita, tag SEO e post pubblicitari ottimizzati per massimizzare la conversione.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="px-2.5 py-1 bg-slate-900 text-slate-400 font-mono text-[10px] rounded border border-slate-800">
            dr7ai.com
          </span>
        </div>
      </div>

      {/* Toolkit Tabs Bar */}
      <div className="flex border-b border-slate-800 bg-slate-950/40 overflow-x-auto scrollbar-none">
        {[
          { id: 'seo', label: 'SEO & Meta-Dati', icon: Search },
          { id: 'facebook', label: 'Facebook / Instagram Ads', icon: Megaphone },
          { id: 'google', label: 'Google Ads Search', icon: Search },
          { id: 'linkedin', label: 'LinkedIn B2B Posts', icon: Linkedin },
          { id: 'video', label: 'Script Video (15s)', icon: Video }
        ].map(tab => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-5 py-4 text-xs font-semibold border-b-2 whitespace-nowrap transition cursor-pointer ${
                isActive
                  ? 'border-blue-500 text-white bg-slate-800/60'
                  : 'border-transparent text-slate-400 hover:text-slate-200 hover:bg-slate-800/20'
              }`}
            >
              <Icon className="w-4 h-4 shrink-0" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Toolkit Content Body */}
      <div className="p-6 text-left max-h-[500px] overflow-y-auto">
        
        {/* TAB SEO */}
        {activeTab === 'seo' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              
              {/* Meta Title */}
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 relative">
                <button
                  onClick={() => handleCopy(SEO_DATA.metaTitle, 'metatitle')}
                  className="absolute top-4 right-4 text-slate-500 hover:text-white p-1.5 bg-slate-900 rounded border border-slate-800 hover:border-slate-700 transition cursor-pointer"
                  title="Copia titolo"
                >
                  {copiedId === 'metatitle' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
                <span className="text-[10px] font-bold text-blue-400 font-mono block mb-1">TAG &lt;TITLE&gt; (Max 60 caratteri)</span>
                <p className="text-sm font-semibold text-white pr-8">{SEO_DATA.metaTitle}</p>
              </div>

              {/* Meta Description */}
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 relative">
                <button
                  onClick={() => handleCopy(SEO_DATA.metaDescription, 'metadesc')}
                  className="absolute top-4 right-4 text-slate-500 hover:text-white p-1.5 bg-slate-900 rounded border border-slate-800 hover:border-slate-700 transition cursor-pointer"
                  title="Copia descrizione"
                >
                  {copiedId === 'metadesc' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
                <span className="text-[10px] font-bold text-blue-400 font-mono block mb-1">META DESCRIPTION (Max 160 caratteri)</span>
                <p className="text-xs text-slate-400 pr-8 leading-relaxed">{SEO_DATA.metaDescription}</p>
              </div>

            </div>

            {/* Keywords */}
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
              <div className="flex justify-between items-center mb-2">
                <span className="text-[10px] font-bold text-blue-400 font-mono">10 PAROLE CHIAVE STRATEGICHE SEO (LSI)</span>
                <button
                  onClick={() => handleCopy(SEO_DATA.keywords.join(', '), 'keywords')}
                  className="flex items-center gap-1.5 text-[10px] text-slate-400 hover:text-white cursor-pointer"
                >
                  {copiedId === 'keywords' ? (
                    <><Check className="w-3.5 h-3.5 text-emerald-400" /> Copiato</>
                  ) : (
                    <><Copy className="w-3.5 h-3.5" /> Copia tutto</>
                  )}
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {SEO_DATA.keywords.map((kw, i) => (
                  <span key={i} className="px-2.5 py-1 bg-slate-900 text-slate-300 font-mono text-[11px] rounded border border-slate-800">
                    {kw}
                  </span>
                ))}
              </div>
            </div>

            {/* Headers structure */}
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3">
              <span className="text-[10px] font-bold text-blue-400 font-mono block">STRUTTURA DEI TITOLI H1 / H2 AGGIORNATA</span>
              
              <div className="space-y-1.5">
                <p className="text-xs text-slate-500 font-mono">[H1] Titolo Principale</p>
                <div className="p-2.5 bg-slate-900 rounded border border-slate-800 text-xs font-semibold text-white">
                  {SEO_DATA.h1}
                </div>
              </div>

              <div className="space-y-2">
                <p className="text-xs text-slate-500 font-mono">[H2] Struttura del Catalogo Sezioni</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {SEO_DATA.h2s.map((h2, idx) => (
                    <div key={idx} className="p-2 bg-slate-900/60 rounded text-[11px] text-slate-355 border border-slate-800 font-sans">
                      {idx + 1}. {h2}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB FACEBOOK */}
        {activeTab === 'facebook' && (
          <div className="space-y-4">
            <p className="text-xs text-slate-400 mb-3 font-sans">
              Testi pubblicitari pronti incentrati sui punti deboli della flotta e sull'efficienza del SaaS. Ideali per titolari di agenzie di noleggio e NCC.
            </p>
            {ADS_COPY.facebookInstagram.map((ad, index) => (
              <div key={index} className="bg-slate-950 p-4 rounded-xl border border-slate-800 relative group text-left">
                <button
                  onClick={() => handleCopy(`${ad.hook}\n\n👉 CTA: ${ad.cta}`, `fb_${index}`)}
                  className="absolute top-4 right-4 text-slate-500 hover:text-white p-1.5 bg-slate-900 rounded border border-slate-800 hover:border-slate-700 transition cursor-pointer"
                  title="Copia annuncio"
                >
                  {copiedId === `fb_${index}` ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
                
                <span className="text-[10px] font-bold text-indigo-400 font-mono block mb-1.5 font-mono">TESTO INSERZIONE FACEBOOK #{index + 1}</span>
                <p className="text-xs text-slate-200 leading-relaxed pr-10 font-sans whitespace-pre-line">{ad.hook}</p>
                
                <div className="mt-3 pt-2.5 border-t border-slate-900 flex justify-between items-center text-[11px] font-sans">
                  <span className="text-slate-500">Pulsante d'invito (CTA):</span>
                  <span className="text-emerald-400 font-bold">{ad.cta}</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* TAB GOOGLE */}
        {activeTab === 'google' && (
          <div className="space-y-4">
            <p className="text-xs text-slate-400 mb-2 font-sans">
              Annunci ottimizzati per le campagne di Ricerca Google Ads, con titoli principali e descrizioni ad alta intenzione d'acquisto.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {ADS_COPY.googleAds.map((ad, index) => (
                <div key={index} className="bg-slate-950 p-4 rounded-xl border border-slate-800 relative flex flex-col justify-between">
                  <button
                    onClick={() => handleCopy(`Titolo 1: ${ad.title1}\nTitolo 2: ${ad.title2}\nDescrizione: ${ad.description}`, `go_${index}`)}
                    className="absolute top-4 right-4 text-slate-500 hover:text-white p-1.5 bg-slate-900 rounded border border-slate-800 transition cursor-pointer"
                    title="Copia annuncio Google"
                  >
                    {copiedId === `go_${index}` ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>

                  <div>
                    <span className="text-[10px] font-bold text-amber-500 font-mono block mb-2 font-mono">CAMPAGNA DI RICERCA GOOGLE #{index + 1}</span>
                    <div className="space-y-1 text-xs font-sans">
                      <div>
                        <span className="text-slate-500 font-mono mr-1.5">[Titolo 1]</span>
                        <strong className="text-blue-400">{ad.title1}</strong>
                      </div>
                      <div>
                        <span className="text-slate-500 font-mono mr-1.5">[Titolo 2]</span>
                        <strong className="text-blue-400">{ad.title2}</strong>
                      </div>
                      <div className="pt-2">
                        <span className="text-slate-500 font-mono block mb-0.5">[Descrizione]</span>
                        <p className="text-slate-400 pr-8 line-clamp-3">{ad.description}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB LINKEDIN */}
        {activeTab === 'linkedin' && (
          <div className="space-y-4">
            <p className="text-xs text-slate-400 mb-2 font-sans">
              Post orientati al Social Selling professionale e diretti ai Fleet Manager o Direttori Commerciali del settore mobilità.
            </p>
            {ADS_COPY.linkedin.map((post, index) => (
              <div key={index} className="bg-slate-950 p-4.5 rounded-xl border border-slate-800 relative text-left">
                <button
                  onClick={() => handleCopy(`${post.title}\n\n${post.body}`, `li_${index}`)}
                  className="absolute top-4 right-4 text-slate-500 hover:text-white p-1.5 bg-slate-900 rounded border border-slate-800 transition cursor-pointer"
                  title="Copia post LinkedIn"
                >
                  {copiedId === `li_${index}` ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                </button>

                <span className="text-[10px] font-bold text-sky-400 font-mono block mb-2 font-mono">ARTICOLO PROFESSIONALE #{index + 1}</span>
                <h5 className="text-xs font-bold text-white mb-2 pr-8 font-sans">{post.title}</h5>
                <p className="text-xs text-slate-300 leading-relaxed whitespace-pre-wrap pr-4 font-sans">{post.body}</p>
              </div>
            ))}
          </div>
        )}

        {/* TAB VIDEO */}
        {activeTab === 'video' && (
          <div className="space-y-4">
            <p className="text-xs text-slate-400 mb-2 font-sans">
              Sceneggiatura video dinamica di 15 secondi per TikTok Ads, YouTube Shorts o Instagram Reels aziendali.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {ADS_COPY.videoScripts.map((sc, index) => (
                <div key={index} className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex flex-col justify-between relative text-left">
                  <button
                    onClick={() => handleCopy(`[${sc.title}]\nTempo: ${sc.hook}\nScena: ${sc.action}\nVoce Fuori Campo: ${sc.voiceover}`, `vid_${index}`)}
                    className="absolute top-4 right-4 text-slate-500 hover:text-white p-1.5 bg-slate-900 rounded border border-slate-800 transition cursor-pointer"
                  >
                    {copiedId === `vid_${index}` ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>

                  <div>
                    <span className="px-2 py-0.5 bg-slate-900 rounded border border-slate-800 font-mono text-[9px] text-emerald-400 font-bold">
                      {sc.hook}
                    </span>
                    <h5 className="text-xs font-bold text-white mt-2 mb-1.5 font-sans">{sc.title}</h5>
                    
                    <div className="space-y-2 mt-2 pt-2 border-t border-slate-900/60 text-[11px] font-sans">
                      <div>
                        <span className="text-slate-500 font-mono block">Scena Visiva:</span>
                        <p className="text-slate-400 italic font-sans">{sc.action}</p>
                      </div>
                      <div>
                        <span className="text-slate-500 font-mono block">Voce Fuori Campo:</span>
                        <p className="text-slate-200 mt-0.5">"{sc.voiceover}"</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
      
      {/* Toolkit Footer */}
      <div className="bg-slate-950 px-6 py-4 border-t border-slate-800 text-xs text-slate-500 flex justify-between items-center font-mono">
        <span>© DR7 AI Copywriting Engine v1.0</span>
        <span className="text-slate-400 select-all">dr7ai.com</span>
      </div>
    </div>
  );
}
