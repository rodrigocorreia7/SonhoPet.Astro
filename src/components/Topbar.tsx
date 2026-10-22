'use client';
import React from 'react';
import { Star, Clock, MapPin } from 'lucide-react';

export const Topbar: React.FC = () => {
  return (
    <aside 
      aria-label="Informações Rápidas e Avaliações"
      className="bg-[#0F172A] text-slate-200 text-xs py-2 px-4 border-b border-slate-800"
    >
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-center sm:text-left">
        
        {/* Left: Google Maps Rating */}
        <div className="flex items-center gap-2">
          <div role="img" aria-label="Avaliação 5 estrelas no Google Maps" className="flex items-center gap-0.5 text-amber-400">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" aria-hidden="true" />
            ))}
          </div>
          <span className="font-bold text-white">★ 5.0 no Google Maps</span>
          <span className="text-slate-500 hidden md:inline">•</span>
          <span className="text-slate-300 hidden md:inline">Escola Referência em Guarulhos</span>
        </div>

        {/* Right: Hours & Location */}
        <div className="flex items-center gap-4 text-[11px] sm:text-xs">
          <div className="flex items-center gap-1.5 text-slate-300">
            <Clock className="w-3.5 h-3.5 text-emerald-400" aria-hidden="true" />
            <span>Seg a Sáb: 09h às 18h</span>
          </div>
          <div className="hidden lg:flex items-center gap-1.5 text-slate-300">
            <MapPin className="w-3.5 h-3.5 text-rose-400" aria-hidden="true" />
            <span>Av. Jurema, 814 - Guarulhos</span>
          </div>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-emerald-950/80 text-emerald-300 border border-emerald-800/60 font-semibold">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            Matrículas Abertas
          </span>
        </div>

      </div>
    </aside>
  );
};
