'use client';
import React from 'react';
import { Quote, Scissors, HeartHandshake, Award, MapPin } from 'lucide-react';

export const Differentials: React.FC = () => {
  const pillars = [
    {
      icon: Scissors,
      iconColor: 'text-emerald-800',
      bgColor: 'bg-emerald-100',
      title: 'Aulas Práticas com Cães Reais',
      description: 'Nenhum boneco sintético substitui o manejo sensível com um animal vivo. Nossos alunos saem 100% preparados para o mercado de trabalho.',
    },
    {
      icon: HeartHandshake,
      iconColor: 'text-[#FF007F]',
      bgColor: 'bg-pink-100',
      title: 'Manejo Humanizado e Sem Traumas',
      description: 'Priorizamos a tranquilidade e a segurança do pet com técnicas modernas de dessensibilização, sem contenções agressivas.',
    },
    {
      icon: Award,
      iconColor: 'text-indigo-800',
      bgColor: 'bg-indigo-100',
      title: 'Equipamentos e Cosméticos de Ponta',
      description: 'Sopradores silenciosos, lâminas profissionais esterilizadas e cosméticos hipoalergênicos de padrão internacional.',
    },
    {
      icon: MapPin,
      iconColor: 'text-[#D81B60]',
      bgColor: 'bg-pink-50',
      title: 'Localização Privilegiada em Guarulhos',
      description: 'Fácil acesso na Av. Jurema, 814 no Parque Jurema, com estacionamento e proximidade aos principais eixos da cidade.',
    },
  ];

  return (
    <section 
      id="diferenciais" 
      className="py-16 sm:py-24 bg-white border-b border-stone-200 scroll-mt-16"
      aria-labelledby="differentials-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Quote Card (Hero Quote with subtle Magenta & Emerald aura) */}
        <div className="relative bg-gradient-to-br from-[#0F172A] via-slate-900 to-[#1F0715] text-white rounded-3xl p-8 sm:p-12 shadow-xl border border-pink-950/30 overflow-hidden mb-16">
          <div className="absolute top-0 right-0 -translate-y-6 translate-x-6 w-64 h-64 bg-[#FF007F]/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 translate-y-6 -translate-x-6 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="relative z-10 max-w-3xl mx-auto text-center">
            
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-pink-950/60 border border-pink-700/40 text-[#FF007F] mb-6 shadow-inner">
              <Quote className="w-7 h-7" aria-hidden="true" />
            </div>

            <blockquote className="font-heading text-xl sm:text-2xl md:text-3xl font-extrabold leading-snug tracking-tight text-slate-50 mb-6">
              "Aqui, cada pet é acolhido como membro da nossa própria família, e cada aluno aprende com a dedicação e o rigor técnico de quem ama a profissão."
            </blockquote>

            <div className="flex flex-col items-center">
              <p className="text-base font-bold text-pink-300">
                Diretoria & Equipe Técnica Sonho Pet
              </p>
              <p className="text-xs text-slate-400 mt-0.5">
                Escola de Estética Animal & Salão Especializado • Guarulhos - SP
              </p>
            </div>

          </div>
        </div>

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs sm:text-sm font-bold tracking-wider uppercase text-[#D81B60] bg-pink-50 px-4 py-1.5 rounded-full border border-pink-200">
            Nossos Pilares
          </span>
          <h2 
            id="differentials-heading" 
            className="font-heading text-2xl sm:text-3xl md:text-4xl font-extrabold text-stone-900 mt-4 tracking-tight"
          >
            Por Que a Sonho Pet é Referência em Guarulhos
          </h2>
          <p className="text-base text-stone-700 mt-3 leading-relaxed">
            Unimos paixão genuína por animais, metodologia de ensino comprovada e rigorosos padrões sanitários.
          </p>
        </div>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <div 
                key={idx}
                className="bg-stone-50 p-6 rounded-2xl border border-stone-200 shadow-xs hover:border-[#FF007F]/40 transition-colors flex flex-col justify-between"
              >
                <div>
                  <div className={`w-12 h-12 rounded-xl ${pillar.bgColor} flex items-center justify-center mb-4`}>
                    <Icon className={`w-6 h-6 ${pillar.iconColor}`} aria-hidden="true" />
                  </div>
                  <h3 className="font-heading text-lg font-bold text-stone-900 mb-2">
                    {pillar.title}
                  </h3>
                  <p className="text-sm text-stone-700 leading-relaxed font-medium">
                    {pillar.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
