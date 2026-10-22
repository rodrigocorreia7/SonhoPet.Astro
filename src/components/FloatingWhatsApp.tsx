'use client';
import React from 'react';
import { MessageCircle } from 'lucide-react';

interface FloatingWhatsAppProps {
  onWhatsAppClick: (origin?: string) => void;
}

export const FloatingWhatsApp: React.FC<FloatingWhatsAppProps> = ({ onWhatsAppClick }) => {
  return (
    <aside aria-label="Atalho de Contato Direto" className="fixed bottom-6 right-6 z-50">
      <a
        href="https://wa.me/5511983800176?text=Ol%C3%A1!%20Estou%20no%20site%20da%20Sonho%20Pet%20e%20gostaria%20de%20tirar%20uma%20d%C3%BAvida."
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => onWhatsAppClick('floating_button')}
        className="group relative flex items-center justify-center w-14 h-14 rounded-full bg-whatsapp-aaa text-white shadow-2xl hover:bg-[#054C44] active:scale-95 transition-all duration-200 focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-[#075E54]"
        aria-label="Falar conosco no WhatsApp (abre em nova janela)"
      >
        {/* Pulse radar wave */}
        <span 
          className="absolute inset-0 rounded-full bg-[#075E54] opacity-40 animate-ping pointer-events-none" 
          aria-hidden="true" 
        />
        
        <MessageCircle className="w-7 h-7 fill-white text-white z-10 transition-transform group-hover:scale-110" aria-hidden="true" />

        {/* Tooltip on Hover */}
        <span className="sr-only">Falar com a Sonho Pet no WhatsApp</span>
        <span className="hidden sm:group-hover:inline-block absolute right-16 bg-slate-900 text-white text-xs font-bold px-3 py-1.5 rounded-lg shadow-xl whitespace-nowrap border border-slate-700 animate-in fade-in slide-in-from-right-1 duration-150">
          WhatsApp Oficial ★ 5.0
        </span>
      </a>
    </aside>
  );
};
