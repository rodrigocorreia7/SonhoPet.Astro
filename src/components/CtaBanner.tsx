'use client';
import React from 'react';
import { MessageCircle, CheckCircle2, ArrowRight, ShieldCheck } from 'lucide-react';

interface CtaBannerProps {
  onWhatsAppClick: (origin?: string) => void;
}

export const CtaBanner: React.FC<CtaBannerProps> = ({ onWhatsAppClick }) => {
  return (
    <section 
      aria-label="Chamada Final para Matrícula e Agendamento"
      className="py-16 sm:py-24 bg-gradient-to-br from-[#0F172A] via-slate-900 to-emerald-950 text-white relative overflow-hidden"
    >
      {/* Ambient background blur */}
      <div className="absolute top-0 right-0 -translate-y-12 translate-x-12 w-96 h-96 bg-emerald-500/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 translate-y-12 -translate-x-12 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        
        {/* Eyebrow Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-900/60 border border-emerald-700/50 text-emerald-300 text-xs sm:text-sm font-bold mb-6">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" aria-hidden="true" />
          <span>Vagas Limitadas para a Próxima Turma</span>
        </div>

        {/* Headline */}
        <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight mb-6">
          Dê o Primeiro Passo Para Sua Nova Carreira no{' '}
          <span className="text-emerald-400">
            Mercado Pet
          </span>
        </h2>

        {/* Subtitle */}
        <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed mb-10">
          Garanta sua vaga com condições facilitadas de pagamento ou agende o banho e tosa do seu pet com quem realmente ama e entende de animais.
        </p>

        {/* CTA Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="https://wa.me/5511983800176?text=Ol%C3%A1!%20Quero%20aproveitar%20a%20oportunidade%20e%20fazer%20minha%20inscri%C3%A7%C3%A3o%20na%20Sonho%20Pet."
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => onWhatsAppClick('bottom_cta_banner')}
            className="group w-full sm:w-auto inline-flex items-center justify-center gap-3 px-9 py-4 rounded-2xl font-bold text-base sm:text-lg bg-whatsapp-aaa text-white shadow-xl hover:bg-[#054c44] active:scale-[0.98] transition-all focus-visible:outline-3 focus-visible:outline-white"
            aria-label="Falar com a Equipe no WhatsApp (abre em nova janela)"
          >
            <MessageCircle className="w-5 h-5 fill-white" aria-hidden="true" />
            <span>Falar com a Equipe no WhatsApp</span>
            <ArrowRight className="w-4 h-4 text-white/80 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>

        {/* Trust Points */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-400 font-medium">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Atendimento Personalizado</span>
          </div>
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Turmas com Vagas Reduzidas</span>
          </div>
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Certificado Profissional Incluso</span>
          </div>
        </div>

      </div>
    </section>
  );
};
