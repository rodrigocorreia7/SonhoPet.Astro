import React, { useState, useEffect } from 'react';
import { Menu, X, MessageCircle, Settings } from 'lucide-react';

interface HeaderProps {
  onWhatsAppClick?: (origin?: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ onWhatsAppClick }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'O Curso', href: '#curso' },
    { label: 'Serviços Pet', href: '#servicos' },
    { label: 'Diferenciais', href: '#diferenciais' },
    { label: 'Depoimentos', href: '#depoimentos' },
    { label: 'Blog', href: '#blog' },
    { label: 'FAQ', href: '#faq' },
    { label: 'Contato', href: '#contato' },
  ];

  return (
    <header 
      id="main-header"
      className={`sticky top-0 z-40 w-full transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/90 backdrop-blur-md shadow-xs border-b border-stone-200/80 py-2.5' 
          : 'bg-white border-b border-stone-100 py-3.5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Official Brand Logo */}
          <a 
            href="/" 
            className="flex items-center gap-3 group focus-visible:outline-2 focus-visible:outline-[#075E54] rounded-xl p-1 transition-transform"
            aria-label="Sonho Pet - Ir para o início"
          >
            <img 
              src="/logo.png" 
              alt="Sonho Pet - Curso de Banho e Tosa e Estética Animal" 
              className="h-11 sm:h-12 w-auto object-contain transition-transform group-hover:scale-105"
            />
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-7" aria-label="Navegação Principal">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-semibold text-stone-700 hover:text-emerald-900 transition-colors py-1 relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-emerald-800 hover:after:w-full after:transition-all focus-visible:outline-2 focus-visible:outline-emerald-800"
              >
                {link.label}
              </a>
            ))}
            <a
              href="/admin"
              className="text-xs font-bold text-[#FF007F] hover:text-[#D81B60] bg-pink-50 hover:bg-pink-100 px-3 py-1.5 rounded-full border border-pink-200 transition-all flex items-center gap-1.5"
            >
              <Settings className="w-3.5 h-3.5" />
              <span>Painel CRUD</span>
            </a>
          </nav>

          {/* Desktop CTA */}
          <div className="hidden sm:flex items-center gap-3">
            <a
              href="https://wa.me/5511983800176?text=Ol%C3%A1!%20Vim%20pelo%20site%20da%20Sonho%20Pet%20e%20gostaria%20de%20informa%C3%A7%C3%B5es."
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => onWhatsAppClick?.('header_cta')}
              className="group inline-flex items-center gap-3 pl-5 pr-2 py-2 rounded-full font-bold text-sm bg-whatsapp-aaa hover:bg-[#054c44] text-white shadow-sm hover:shadow-md transition-all active:scale-[0.98] focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-[#075E54]"
              aria-label="Falar com a Sonho Pet no WhatsApp (abre em nova janela)"
            >
              <span>Chamar no WhatsApp</span>
              <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center group-hover:scale-105 group-hover:translate-x-0.5 transition-transform">
                <MessageCircle className="w-4 h-4 fill-white text-white" aria-hidden="true" />
              </div>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 lg:hidden">
            <a
              href="/admin"
              className="p-2 text-stone-700 hover:text-[#FF007F]"
              title="Painel CRUD"
            >
              <Settings className="w-5 h-5" />
            </a>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-stone-700 hover:text-stone-900 hover:bg-stone-100 transition-colors focus-visible:outline-2 focus-visible:outline-emerald-800"
              aria-expanded={mobileMenuOpen}
              aria-label="Abrir menu de navegação"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <nav className="lg:hidden pt-4 pb-6 border-t border-stone-100 mt-3 flex flex-col gap-3">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-base font-semibold text-stone-800 hover:text-emerald-900 py-2 px-3 rounded-lg hover:bg-stone-50 transition-colors"
              >
                {link.label}
              </a>
            ))}
            <a
              href="/admin"
              onClick={() => setMobileMenuOpen(false)}
              className="text-sm font-bold text-[#FF007F] bg-pink-50 py-2.5 px-3 rounded-lg border border-pink-200 flex items-center gap-2"
            >
              <Settings className="w-4 h-4" />
              <span>Acessar Painel CRUD</span>
            </a>
            <div className="pt-2">
              <a
                href="https://wa.me/5511983800176?text=Ol%C3%A1!%20Vim%20pelo%20site%20da%20Sonho%20Pet%20e%20gostaria%20de%20informa%C3%A7%C3%B5es."
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => {
                  onWhatsAppClick?.('mobile_menu_cta');
                  setMobileMenuOpen(false);
                }}
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-bold text-sm bg-whatsapp-aaa text-white shadow"
              >
                <MessageCircle className="w-4 h-4 fill-white text-white" />
                <span>Chamar no WhatsApp</span>
              </a>
            </div>
          </nav>
        )}

      </div>
    </header>
  );
};
