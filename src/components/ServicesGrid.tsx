'use client';
import React, { useState } from 'react';
import { MessageCircle, Check, ArrowRight, BookOpen, Heart, Calculator, DollarSign, Users } from 'lucide-react';
import type { ServiceCardItem } from '../types';

interface ServicesGridProps {
  onWhatsAppClick: (origin?: string) => void;
}

export const ServicesGrid: React.FC<ServicesGridProps> = ({ onWhatsAppClick }) => {
  // Groomer Revenue Simulator State
  const [petsPerDay, setPetsPerDay] = useState<number>(4);
  const [pricePerService, setPricePerService] = useState<number>(85);
  const [workingDays, setWorkingDays] = useState<number>(22);

  const monthlyGrossRevenue = petsPerDay * pricePerService * workingDays;
  const estimatedCostPercentage = 0.18; // supplies, shampoos, electricity
  const monthlyNetEstimated = monthlyGrossRevenue * (1 - estimatedCostPercentage);

  const services: ServiceCardItem[] = [
    {
      number: '01',
      badge: 'Formação Profissionalizante',
      title: 'Curso Completo de Banho e Tosa',
      description: 'Capacitação prática intensiva do zero ao avançado para você conquistar sua independência financeira ou abrir seu próprio banho e tosa em Guarulhos e região.',
      features: [
        'Aulas 100% práticas com cães e modelos reais',
        'Técnicas de tosa na máquina (lâminas e adaptadores)',
        'Tosa na tesoura (reta, curva, tubarão e desbaste)',
        'Tosa bebê, tosa higiênica e padrões de raças comerciais',
        'Manejo comportamental positivo e biossegurança',
        'Empreendedorismo pet: precificação e captação de clientes',
        'Certificado de conclusão reconhecido no mercado',
        'Suporte contínuo para dúvidas pós-curso',
      ],
      ctaText: 'Garantir Vaga no Curso no WhatsApp',
      whatsappMessage: 'Olá! Gostaria de informações sobre a próxima turma do Curso de Banho e Tosa da Sonho Pet.',
      image: 'https://images.unsplash.com/photo-1541599540903-216a46ca1dc0?auto=format&fit=crop&w=800&h=500&q=80',
      imageAlt: 'Aluno aprendendo tosa e escovação em cãozinho com tesoura profissional',
      highlight: true,
    },
    {
      number: '02',
      badge: 'Cuidado & Estética Animal',
      title: 'Banho e Tosa Premium para seu Pet',
      description: 'Tratamento de alto padrão com carinho, paciência e cosméticos veterinários hipoalergênicos para cães de todos os portes e temperamentos.',
      features: [
        'Banho relaxante com água em temperatura controlada',
        'Shampoos e condicionadores veterinários hipoalergênicos',
        'Hidratação profunda e restauração de pelagem',
        'Tosa higiênica sem estresse (almofadas, íntima e orelhas)',
        'Tosa na tesoura e tosa da raça personalizada',
        'Limpeza de ouvidos segura e corte/lixamento de unhas',
        'Toalhas individuais esterilizadas e higienização total',
        'Profissionais experientes que tratam seu pet como família',
      ],
      ctaText: 'Agendar Banho e Tosa para meu Pet',
      whatsappMessage: 'Olá! Gostaria de agendar um horário de Banho e Tosa para o meu pet na Sonho Pet.',
      image: 'https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?auto=format&fit=crop&w=800&h=500&q=80',
      imageAlt: 'Cachorro tomando banho relaxante em ambiente profissional',
      highlight: false,
    },
  ];

  return (
    <section 
      id="servicos" 
      className="py-16 sm:py-24 bg-stone-50 border-b border-stone-200 scroll-mt-16"
      aria-labelledby="services-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header with Pulsing Heart Logo */}
        <div className="text-center max-w-3xl mx-auto mb-16 flex flex-col items-center">
          
          {/* Pulsing Sonho Pet Heart Logo */}
          <div className="relative mb-5 flex items-center justify-center">
            <img 
              src="/logo.png" 
              alt="Sonho Pet Coração" 
              className="w-24 sm:w-28 md:w-32 h-auto object-contain animate-heartbeat drop-shadow-md cursor-pointer hover:scale-110 transition-transform"
            />
          </div>

          <span className="text-xs sm:text-sm font-bold tracking-wider uppercase text-[#881337] bg-pink-100 px-4 py-1.5 rounded-full border border-pink-200 shadow-xs">
            Nossos Serviços Estratégicos
          </span>
          <h2 
            id="services-heading" 
            className="font-heading text-3xl sm:text-4xl font-extrabold text-stone-900 mt-4 tracking-tight"
          >
            Escolha Como a Sonho Pet Pode te Ajudar
          </h2>
          <p className="text-base sm:text-lg text-stone-700 mt-3 leading-relaxed">
            Seja para construir uma carreira lucrativa e valorizada ou para dar ao seu companheiro o melhor tratamento de higiene e beleza.
          </p>
        </div>

        {/* 2 Strategic Cards */}
        <div id="curso" className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16 scroll-mt-24">
          {services.map((service) => (
            <div
              key={service.number}
              className={`bg-white rounded-3xl overflow-hidden border-2 flex flex-col justify-between shadow-sm hover:shadow-md transition-all ${
                service.highlight 
                  ? 'border-[#FF007F]/40 ring-4 ring-[#FF007F]/10' 
                  : 'border-stone-200 hover:border-emerald-700/30'
              }`}
            >
              {/* Card Top / Image */}
              <div>
                <div className="relative h-64 sm:h-72 overflow-hidden bg-stone-100">
                  <img
                    src={service.image}
                    alt={service.imageAlt}
                    loading="lazy"
                    decoding="async"
                    width="800"
                    height="500"
                    className="w-full h-full object-cover object-center transform hover:scale-105 transition-transform duration-500"
                  />
                  
                  {/* Category Pill Top Right */}
                  <div className={`absolute top-4 right-4 backdrop-blur-xs font-bold text-xs px-3.5 py-1.5 rounded-xl shadow-md border ${
                    service.highlight 
                      ? 'bg-white text-[#881337] border-pink-200' 
                      : 'bg-white text-emerald-900 border-emerald-200'
                  }`}>
                    {service.badge}
                  </div>
                </div>

                {/* Content Body */}
                <div className="p-6 sm:p-8">
                  <div className="flex items-center gap-2 text-xs font-bold mb-2">
                    {service.number === '01' ? (
                      <>
                        <BookOpen className="w-4 h-4 text-[#FF007F]" aria-hidden="true" />
                        <span className="text-[#881337] font-extrabold uppercase tracking-wide">{service.badge}</span>
                      </>
                    ) : (
                      <>
                        <Heart className="w-4 h-4 text-[#FF007F] fill-[#FF007F]/20" aria-hidden="true" />
                        <span className="text-emerald-900 font-extrabold uppercase tracking-wide">{service.badge}</span>
                      </>
                    )}
                  </div>

                  <h3 className="font-heading text-2xl font-bold text-stone-900 mb-3">
                    {service.title}
                  </h3>

                  <p className="text-stone-700 text-sm leading-relaxed mb-6">
                    {service.description}
                  </p>

                  {/* Checklist */}
                  <div className="space-y-2.5 pt-4 border-t border-stone-100 mb-8">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-stone-600 mb-3">
                      O que está incluso:
                    </h4>
                    {service.features.map((feat, i) => (
                      <div key={i} className="flex items-start gap-2.5 text-sm text-stone-800">
                        <div className={`w-4 h-4 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${
                          service.highlight ? 'bg-pink-100 text-[#FF007F]' : 'bg-emerald-100 text-emerald-900'
                        }`}>
                          <Check className={`w-3 h-3 ${service.highlight ? 'text-[#FF007F]' : 'text-emerald-800'}`} aria-hidden="true" />
                        </div>
                        <span className="font-medium">{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Bottom CTA Button */}
              <div className="p-6 sm:p-8 pt-0">
                <a
                  href={`https://wa.me/5511983800176?text=${encodeURIComponent(service.whatsappMessage)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => onWhatsAppClick(`service_${service.number}`)}
                  className="w-full inline-flex items-center justify-center gap-2.5 px-6 py-4 rounded-xl font-bold text-base bg-whatsapp-aaa text-white shadow-sm hover:bg-[#054c44] active:scale-[0.98] transition-all focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-[#075E54]"
                  aria-label={`${service.ctaText} (abre em nova janela)`}
                >
                  <MessageCircle className="w-5 h-5 fill-white text-white" aria-hidden="true" />
                  <span>{service.ctaText}</span>
                  <ArrowRight className="w-4 h-4 text-white/80" aria-hidden="true" />
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Interactive Groomer Income Calculator */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-stone-200 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-pink-100 border border-pink-200 text-[#881337] text-xs font-bold mb-3 shadow-xs">
                <Calculator className="w-4 h-4 text-[#881337]" aria-hidden="true" />
                <span>Simulador de Lucratividade</span>
              </div>
              <h3 className="font-heading text-2xl sm:text-3xl font-bold text-stone-900 mb-3">
                Quanto Você Pode Ganhar como Tosador Profissional?
              </h3>
              <p className="text-sm sm:text-base text-stone-700 leading-relaxed mb-6">
                O mercado pet cresce a cada ano. Com a formação da Sonho Pet, você domina a tosa comercial e na tesoura para cobrar valores justos pelo seu trabalho.
              </p>

              {/* Slider Controls */}
              <div className="space-y-5">
                <div>
                  <div className="flex justify-between text-sm font-bold text-stone-900 mb-1.5">
                    <label htmlFor="pets-slider" className="flex items-center gap-1.5">
                      <Users className="w-4 h-4 text-emerald-800" />
                      <span>Pets atendidos por dia:</span>
                    </label>
                    <span className="text-emerald-950 bg-emerald-100 px-2 py-0.5 rounded font-extrabold">
                      {petsPerDay} cães/dia
                    </span>
                  </div>
                  <input
                    id="pets-slider"
                    type="range"
                    min="1"
                    max="10"
                    step="1"
                    value={petsPerDay}
                    onChange={(e) => setPetsPerDay(Number(e.target.value))}
                    className="w-full accent-[#075E54] h-2 bg-stone-200 rounded-lg cursor-pointer"
                  />
                  <div className="flex justify-between text-[11px] text-stone-500 mt-1">
                    <span>1 pet (início)</span>
                    <span>5 pets (médio)</span>
                    <span>10 pets (alta demanda)</span>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-sm font-bold text-stone-900 mb-1.5">
                    <label htmlFor="price-slider" className="flex items-center gap-1.5">
                      <DollarSign className="w-4 h-4 text-[#881337]" />
                      <span>Valor médio por banho/tosa:</span>
                    </label>
                    <span className="text-[#881337] bg-pink-100 px-2 py-0.5 rounded font-extrabold">
                      R$ {pricePerService},00
                    </span>
                  </div>
                  <input
                    id="price-slider"
                    type="range"
                    min="50"
                    max="150"
                    step="5"
                    value={pricePerService}
                    onChange={(e) => setPricePerService(Number(e.target.value))}
                    className="w-full accent-[#FF007F] h-2 bg-stone-200 rounded-lg cursor-pointer"
                  />
                  <div className="flex justify-between text-[11px] text-stone-500 mt-1">
                    <span>R$ 50 (banho simples)</span>
                    <span>R$ 85 (tosa geral)</span>
                    <span>R$ 150 (tosa tesoura/raça)</span>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-sm font-bold text-stone-900 mb-1.5">
                    <label htmlFor="days-slider">Dias trabalhados por mês:</label>
                    <span className="text-stone-900 bg-stone-100 px-2 py-0.5 rounded font-extrabold">
                      {workingDays} dias
                    </span>
                  </div>
                  <input
                    id="days-slider"
                    type="range"
                    min="15"
                    max="26"
                    step="1"
                    value={workingDays}
                    onChange={(e) => setWorkingDays(Number(e.target.value))}
                    className="w-full accent-[#075E54] h-2 bg-stone-200 rounded-lg cursor-pointer"
                  />
                </div>
              </div>
            </div>

            {/* Simulation Results Card */}
            <div className="lg:col-span-6 bg-gradient-to-br from-[#0F172A] via-slate-900 to-[#2A081D] text-white p-6 sm:p-8 rounded-2xl shadow-lg border border-pink-950/40 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#FF007F]">
                    Estimativa Mensal de Faturamento
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-[#FF007F]/20 text-pink-300 border border-[#FF007F]/30">
                    Mercado em Alta
                  </span>
                </div>
                
                <div className="mt-4 mb-6">
                  <div className="text-xs text-slate-400 font-medium">Faturamento Bruto Estimado:</div>
                  <div className="text-3xl sm:text-4xl font-heading font-black text-emerald-400 mt-1">
                    R$ {monthlyGrossRevenue.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                    <span className="text-sm font-normal text-slate-300">/mês</span>
                  </div>
                </div>

                <div className="p-4 bg-slate-800/80 rounded-xl border border-slate-700 mb-6 space-y-2 text-xs">
                  <div className="flex justify-between text-slate-300">
                    <span>Total de atendimentos/mês:</span>
                    <strong className="text-white">{petsPerDay * workingDays} pets</strong>
                  </div>
                  <div className="flex justify-between text-slate-300">
                    <span>Lucro líquido estimado (após custos):</span>
                    <strong className="text-pink-300 font-bold">
                      ~ R$ {monthlyNetEstimated.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                    </strong>
                  </div>
                </div>
              </div>

              <div>
                <a
                  href="https://wa.me/5511983800176?text=Ol%C3%A1!%20Fiz%20a%20simula%C3%A7%C3%A3o%20no%20site%20e%20gostaria%20de%20saber%20valores%20e%20turmas%20do%20Curso%20de%20Banho%20e%20Tosa."
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => onWhatsAppClick('simulator_cta')}
                  className="w-full inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl font-bold text-sm bg-whatsapp-aaa text-white hover:bg-[#054c44] transition-all focus-visible:outline-2 focus-visible:outline-white shadow-lg"
                >
                  <MessageCircle className="w-4 h-4 fill-white text-white" aria-hidden="true" />
                  <span>Quero Aprender essa Profissão no WhatsApp</span>
                </a>
              </div>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
