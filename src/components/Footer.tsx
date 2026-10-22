'use client';
import React, { useState } from 'react';
import { MapPin, Phone, Clock, MessageCircle, Star, Copy, Check, ExternalLink } from 'lucide-react';

export const Footer: React.FC = () => {
  const [copied, setCopied] = useState(false);

  const fullAddress = 'Av. Jurema, 814 - Parque Jurema, Guarulhos - SP, 07244-000, Brasil';

  const copyAddress = () => {
    navigator.clipboard.writeText(fullAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <footer 
      id="contato" 
      className="bg-[#0B1120] text-slate-300 border-t border-slate-800 pt-16 pb-12 scroll-mt-16"
      aria-labelledby="footer-heading"
    >
      <h2 id="footer-heading" className="sr-only">Informações de Contato e Rodapé</h2>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-slate-800">
          
          {/* Column 1: Brand & Bio */}
          <div className="lg:col-span-5">
            <div className="flex items-center gap-3 mb-4">
              <img 
                src="/logo.png" 
                alt="Sonho Pet" 
                className="h-12 w-auto object-contain bg-white/10 p-1 rounded-xl"
              />
              <div>
                <span className="font-heading font-extrabold text-xl text-white tracking-tight">
                  Sonho Pet
                </span>
                <p className="text-xs text-emerald-400 font-semibold">
                  Curso de Banho e Tosa & Estética Animal
                </p>
              </div>
            </div>

            <p className="text-sm text-slate-400 leading-relaxed mb-6 max-w-md">
              Formando profissionais qualificados e prestando serviços de banho e tosa de alto padrão com carinho, paciência e respeito absoluto aos animais. Avaliação 5.0 estrelas no Google Maps.
            </p>

            <div className="flex flex-wrap gap-2 text-xs font-semibold">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-800 text-slate-200 border border-slate-700">
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" aria-hidden="true" />
                <span>Nota 5.0 no Google Maps</span>
              </span>
            </div>
          </div>

          {/* Column 2: NAP Oficial */}
          <div className="lg:col-span-4">
            <h3 className="font-heading font-bold text-white text-base mb-4 tracking-tight flex items-center gap-2">
              <MapPin className="w-4 h-4 text-rose-400" />
              <span>Dados Oficiais (NAP)</span>
            </h3>

            <div className="space-y-3.5 text-sm text-slate-300">
              <div>
                <span className="text-xs uppercase text-slate-300 font-bold block">Nome Comercial:</span>
                <span className="font-semibold text-white">Sonho Pet Curso de Banho e Tosa</span>
              </div>

              <div>
                <span className="text-xs uppercase text-slate-300 font-bold block">Endereço Completo:</span>
                <span className="text-slate-300 leading-snug block">
                  Av. Jurema, 814 - Parque Jurema<br />
                  Guarulhos - SP, 07244-000, Brasil
                </span>
                
                <div className="flex items-center gap-2 mt-2">
                  <button
                    type="button"
                    onClick={copyAddress}
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold rounded bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-colors"
                    aria-label="Copiar endereço completo"
                  >
                    {copied ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span>Endereço Copiado!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5 text-slate-400" />
                        <span>Copiar Endereço</span>
                      </>
                    )}
                  </button>

                  <a
                    href="https://maps.google.com/?q=Av.+Jurema,+814+-+Parque+Jurema,+Guarulhos+-+SP,+07244-000"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold rounded bg-emerald-900/60 hover:bg-emerald-900 text-emerald-300 border border-emerald-700/50 transition-colors"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span>Ver no Maps</span>
                  </a>
                </div>
              </div>

              <div>
                <span className="text-xs uppercase text-slate-300 font-bold block">Telefone / WhatsApp:</span>
                <a 
                  href="tel:+5511983800176" 
                  className="font-semibold text-emerald-400 hover:underline flex items-center gap-1.5 mt-0.5"
                >
                  <Phone className="w-4 h-4" />
                  <span>+55 (11) 98380-0176</span>
                </a>
              </div>
            </div>
          </div>

          {/* Column 3: Hours & Direct CTA */}
          <div className="lg:col-span-3">
            <h3 className="font-heading font-bold text-white text-base mb-4 tracking-tight flex items-center gap-2">
              <Clock className="w-4 h-4 text-emerald-400" />
              <span>Horário de Atendimento</span>
            </h3>

            <ul className="space-y-2 text-xs sm:text-sm text-slate-300 mb-6">
              <li className="flex justify-between pb-1.5 border-b border-slate-800">
                <span className="text-slate-400">Segunda a Sexta:</span>
                <strong className="text-white">09:00 às 18:00</strong>
              </li>
              <li className="flex justify-between pb-1.5 border-b border-slate-800">
                <span className="text-slate-400">Sábado:</span>
                <strong className="text-white">09:00 às 18:00</strong>
              </li>
              <li className="flex justify-between">
                <span className="text-slate-400">Domingo:</span>
                <span className="text-rose-400 font-bold">Fechado</span>
              </li>
            </ul>

            <a
              href="https://wa.me/5511983800176?text=Ol%C3%A1!%20Gostaria%20de%20informa%C3%A7%C3%B5es%20sobre%20a%20Sonho%20Pet."
              target="_blank"
              rel="noopener noreferrer"
              className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-bold text-sm bg-whatsapp-aaa text-white shadow hover:bg-[#054c44] transition-all"
            >
              <MessageCircle className="w-4 h-4 fill-white text-white" />
              <span>WhatsApp: (11) 98380-0176</span>
            </a>
          </div>

        </div>

        {/* Bottom Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400 text-center sm:text-left">
          <div>
            <p>© {new Date().getFullYear()} Sonho Pet Curso de Banho e Tosa. Todos os direitos reservados.</p>
            <p className="text-[11px] text-slate-400 mt-0.5">Av. Jurema, 814 - Parque Jurema, Guarulhos - SP, CEP 07244-000</p>
          </div>
        </div>

      </div>
    </footer>
  );
};
