'use client';
import React, { useState } from 'react';
import { ChevronDown, HelpCircle, MessageCircle } from 'lucide-react';
import type { FaqItem } from '../types';

interface FaqSectionProps {
  onWhatsAppClick: (origin?: string) => void;
}

export const FaqSection: React.FC<FaqSectionProps> = ({ onWhatsAppClick }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs: FaqItem[] = [
    {
      id: 'faq-1',
      question: 'Preciso ter experiência prévia com animais para fazer o curso de banho e tosa?',
      answer: 'Não! O curso da Sonho Pet foi especialmente desenvolvido para capacitar quem está começando do absoluto zero. Você aprenderá desde a abordagem segura e psicologia canina até técnicas avançadas de tosa na tesoura, tosa bebê e finalizações profissionais. Quem já trabalha na área também pode fazer o curso para aperfeiçoar suas técnicas de acabamento.',
      category: 'Curso Profissionalizante',
    },
    {
      id: 'faq-2',
      question: 'Como são divididas as aulas do curso de banho e tosa?',
      answer: 'Nossa metodologia é focada em mais de 80% de prática direta com cães reais em nossa sede na Av. Jurema, 814 em Guarulhos. Trabalhamos com turmas pequenas para garantir que cada aluno receba atenção individualizada, aprenda a manusear equipamentos com segurança e desenvolva agilidade com precisão.',
      category: 'Metodologia',
    },
    {
      id: 'faq-3',
      question: 'Como agendar um banho ou garantir minha vaga no curso?',
      answer: 'Tanto o agendamento de serviços de banho e tosa para seu pet quanto as inscrições para as novas turmas do curso são realizados diretamente através do nosso WhatsApp oficial: +55 (11) 98380-0176. Nossa equipe responde rapidamente com as datas de início, formas de pagamento facilitadas e horários disponíveis.',
      category: 'Atendimento & Matrícula',
    },
    {
      id: 'faq-4',
      question: 'O curso emite certificado de conclusão profissional?',
      answer: 'Sim! Ao concluir todas as horas práticas e teóricas do treinamento, o aluno recebe o Certificado de Formação Profissional em Banho e Tosa da Sonho Pet, amplamente aceito e valorizado por pet shops, clínicas veterinárias e para quem deseja abrir seu próprio negócio.',
      category: 'Certificação',
    },
    {
      id: 'faq-5',
      question: 'Quais produtos são utilizados nos serviços de banho e tosa para os pets?',
      answer: 'Utilizamos exclusivamente linhas veterinárias profissionais hipoalergênicas, com pH balanceado, toalhas esterilizadas e higienização rigorosa de cada lâmina e mesa de atendimento entre um cão e outro para total segurança sanitária.',
      category: 'Serviços Pet',
    },
  ];

  const toggleFaq = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section 
      id="faq" 
      className="py-16 sm:py-24 bg-stone-50 border-b border-stone-200 scroll-mt-16"
      aria-labelledby="faq-heading"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100 border border-emerald-200 text-emerald-950 text-xs font-bold mb-3">
            <HelpCircle className="w-4 h-4 text-emerald-800" aria-hidden="true" />
            <span>Tire Suas Dúvidas</span>
          </div>
          <h2 
            id="faq-heading" 
            className="font-heading text-3xl sm:text-4xl font-extrabold text-stone-900 tracking-tight"
          >
            Perguntas Frequentes
          </h2>
          <p className="text-base text-stone-700 mt-3 leading-relaxed">
            Respostas claras para as principais dúvidas sobre nossos cursos e serviços estéticos para pets.
          </p>
        </div>

        {/* Accessible FAQ Accordion */}
        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={faq.id}
                className={`bg-white rounded-2xl border transition-all ${
                  isOpen ? 'border-emerald-800 shadow-sm ring-1 ring-emerald-800/20' : 'border-stone-200 hover:border-stone-300'
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(idx)}
                  className="w-full p-6 text-left flex items-center justify-between gap-4 focus-visible:outline-2 focus-visible:outline-[#075E54] rounded-2xl"
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${idx}`}
                  id={`faq-question-${idx}`}
                >
                  <span className="font-heading font-bold text-base sm:text-lg text-stone-900 leading-snug">
                    {faq.question}
                  </span>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-transform duration-200 ${
                    isOpen ? 'bg-emerald-100 text-emerald-900 rotate-180' : 'bg-stone-100 text-stone-600'
                  }`}>
                    <ChevronDown className="w-4 h-4" aria-hidden="true" />
                  </div>
                </button>

                {isOpen && (
                  <div
                    id={`faq-answer-${idx}`}
                    role="region"
                    aria-labelledby={`faq-question-${idx}`}
                    className="px-6 pb-6 pt-0 text-sm sm:text-base text-stone-700 leading-relaxed border-t border-stone-100 mt-2"
                  >
                    <p className="pt-3">{faq.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Quick Contact Box */}
        <div className="mt-10 p-6 bg-white rounded-2xl border border-stone-200 text-center flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-left">
            <h3 className="font-bold text-stone-900 text-base">Ainda tem alguma dúvida?</h3>
            <p className="text-xs text-stone-600 mt-0.5">Nossa equipe em Guarulhos está pronta para te atender no WhatsApp.</p>
          </div>
          <a
            href="https://wa.me/5511983800176?text=Ol%C3%A1!%20Tenho%20uma%20d%C3%BAvida%20sobre%20a%20Sonho%20Pet."
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => onWhatsAppClick('faq_contact')}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm bg-whatsapp-aaa text-white hover:bg-[#054c44] transition-colors shrink-0"
          >
            <MessageCircle className="w-4 h-4 fill-white text-white" aria-hidden="true" />
            <span>Falar no WhatsApp</span>
          </a>
        </div>

      </div>
    </section>
  );
};
