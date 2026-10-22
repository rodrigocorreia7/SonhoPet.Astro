'use client';
import React from 'react';
import { Star, CheckCircle, Quote, Award, Scissors, HeartHandshake } from 'lucide-react';
import type { TestimonialItem } from '../types';

export const SocialProof: React.FC = () => {
  const badges = [
    {
      icon: Star,
      iconColor: 'text-amber-500 fill-amber-400',
      bgColor: 'bg-amber-50 border-amber-200',
      title: 'Nota 5.0 no Google Maps',
      subtitle: 'Mais de 50 avaliações de 5 estrelas em Guarulhos',
    },
    {
      icon: Scissors,
      iconColor: 'text-emerald-700',
      bgColor: 'bg-emerald-50 border-emerald-200',
      title: 'Aulas Práticas com Cães Reais',
      subtitle: '+80% de prática direta e atendimento real',
    },
    {
      icon: Award,
      iconColor: 'text-indigo-700',
      bgColor: 'bg-indigo-50 border-indigo-200',
      title: 'Certificado Reconhecido',
      subtitle: 'Formação profissionalizante aceita no mercado',
    },
    {
      icon: HeartHandshake,
      iconColor: 'text-[#D81B60]',
      bgColor: 'bg-pink-50 border-pink-200',
      title: 'Manejo Livre de Estresse',
      subtitle: 'Respeito ao tempo e bem-estar de cada cãozinho',
    },
  ];

  const testimonials: TestimonialItem[] = [
    {
      name: 'Mariana Silva',
      role: 'Aluna Formada (Turma 2024)',
      rating: 5,
      comment: 'Fiz o curso do zero, sem nunca ter pegado numa tesoura de tosa. As professoras têm uma paciência incrível e as aulas são 100% práticas. Já montei minha carteira de clientes e estou faturando!',
      date: 'Google Maps Review',
      verified: true,
    },
    {
      name: 'Carlos Eduardo & Thor (Golden)',
      role: 'Tutor do Thor',
      rating: 5,
      comment: 'O Thor sempre ficava estressado em outros locais. Na Sonho Pet ele foi recebido com muito amor e carinho. O banho e a tosa higiênica ficaram impecáveis. Recomendo de olhos fechados!',
      date: 'Google Maps Review',
      verified: true,
    },
    {
      name: 'Camila Albuquerque',
      role: 'Tosadora Profissional',
      rating: 5,
      comment: 'Espaço maravilhoso, limpo, organizado e com pessoas super acolhedoras. A dedicação em ensinar as técnicas corretas de tesoura fez toda a diferença na minha carreira.',
      date: 'Google Maps Review',
      verified: true,
    },
  ];

  return (
    <section 
      id="depoimentos" 
      className="py-14 sm:py-20 bg-white border-b border-stone-200"
      aria-labelledby="social-proof-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs sm:text-sm font-bold tracking-wider uppercase text-[#D81B60] bg-pink-50 px-3.5 py-1.5 rounded-full border border-pink-200">
            Reconhecimento & Confiança
          </span>
          <h2 
            id="social-proof-heading" 
            className="font-heading text-2xl sm:text-3xl md:text-4xl font-extrabold text-stone-900 mt-4 tracking-tight"
          >
            Excelência Comprovada por Alunos e Tutores
          </h2>
          <p className="text-base text-stone-700 mt-3 leading-relaxed">
            Nosso compromisso é com o desenvolvimento profissional dos alunos e o cuidado com cada pet atendido.
          </p>
        </div>

        {/* 4 Core Trust Badges */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-14">
          {badges.map((badge, idx) => {
            const Icon = badge.icon;
            return (
              <div 
                key={idx}
                className={`p-5 rounded-2xl border ${badge.bgColor} flex flex-col justify-between transition-transform hover:-translate-y-0.5 shadow-xs`}
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-xl bg-white shadow-xs flex items-center justify-center shrink-0">
                    <Icon className={`w-5 h-5 ${badge.iconColor}`} aria-hidden="true" />
                  </div>
                  <h3 className="text-sm font-bold text-stone-900 leading-snug">
                    {badge.title}
                  </h3>
                </div>
                <p className="text-xs text-stone-700 leading-relaxed font-medium">
                  {badge.subtitle}
                </p>
              </div>
            );
          })}
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, idx) => (
            <div 
              key={idx}
              className="bg-stone-50 p-6 rounded-2xl border border-stone-200 shadow-xs flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div role="img" aria-label={`Avaliação ${t.rating} de 5 estrelas no Google`} className="flex items-center gap-1 text-amber-500">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" aria-hidden="true" />
                    ))}
                  </div>
                  <Quote className="w-6 h-6 text-stone-300" aria-hidden="true" />
                </div>

                <p className="text-sm text-stone-800 leading-relaxed italic mb-6">
                  "{t.comment}"
                </p>
              </div>

              <div className="pt-4 border-t border-stone-200 flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-bold text-stone-900">
                    {t.name}
                  </h4>
                  <p className="text-xs text-stone-600 font-medium">
                    {t.role}
                  </p>
                </div>
                {t.verified && (
                  <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-900 bg-emerald-100 px-2 py-0.5 rounded-full">
                    <CheckCircle className="w-3 h-3 text-emerald-700" />
                    Verificado
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
