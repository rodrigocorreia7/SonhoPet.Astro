'use client';
import React, { useState, useRef, useEffect } from 'react';
import { CurvedLoop } from './CurvedLoop';
import { Volume2, VolumeX, Heart, MessageCircle, Star, ArrowRight, Users } from 'lucide-react';

interface UnifiedHeroVideoProps {
  onWhatsAppClick: (origin?: string) => void;
}

export const UnifiedHeroVideo: React.FC<UnifiedHeroVideoProps> = ({ onWhatsAppClick }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const [scrollProgress, setScrollProgress] = useState(0);
  const [isMuted, setIsMuted] = useState(true);
  const isPlayingRef = useRef(false);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const containerHeight = containerRef.current.offsetHeight - window.innerHeight;
      
      if (containerHeight <= 0) return;

      const progress = Math.max(0, Math.min(1, -rect.top / containerHeight));
      setScrollProgress(progress);

      const video = videoRef.current;
      if (!video) return;

      if (progress < 0.1) {
        // At the top: Pause and reset to frame 0 (white background)
        if (isPlayingRef.current || video.currentTime > 0.05) {
          video.pause();
          video.currentTime = 0;
          isPlayingRef.current = false;
        }
      } else {
        // Scrolled down: Play video smoothly
        if (!isPlayingRef.current) {
          video.play().then(() => {
            isPlayingRef.current = true;
          }).catch(() => {
            isPlayingRef.current = false;
          });
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const toggleSound = () => {
    if (videoRef.current) {
      const nextMuted = !isMuted;
      videoRef.current.muted = nextMuted;
      setIsMuted(nextMuted);
    }
  };

  // Scroll phase calculations
  // Top Hero CurvedLoop fades out slightly as scroll starts
  const topLoopOpacity = Math.max(0, 1 - scrollProgress * 3.5);

  // Center Hero audio button: visible only at the top phase, fades out before storytelling overlaps
  const centerAudioOpacity = Math.max(0, 1 - scrollProgress * 4.5);

  // Corner floating audio button: appears cleanly only when scrolled down
  const cornerAudioOpacity = Math.min(1, Math.max(0, (scrollProgress - 0.2) * 3));

  // Storytelling content (Headline, subtitle, badges, CTA) fades in as scroll goes from 0.15 to 0.5
  const detailsOpacity = Math.max(0, Math.min(1, (scrollProgress - 0.15) * 3));
  const detailsTranslateY = Math.max(0, (1 - detailsOpacity) * 25);

  return (
    <div 
      ref={containerRef}
      className="relative w-full h-[180vh] bg-white select-none"
    >
      {/* Sticky Fullscreen Container */}
      <div className="sticky top-0 w-full h-screen overflow-hidden flex flex-col justify-between">
        
        {/* 1. Full-Screen Video Background */}
        <div className="absolute inset-0 w-full h-full z-0 bg-white">
          <video
            ref={videoRef}
            src="/videos/Pets_playing.mp4"
            loop
            muted={isMuted}
            playsInline
            preload="metadata"
            className="w-full h-full object-cover object-bottom"
            aria-label="Vídeo de pets da Sonho Pet com banho, tosa e estética"
          />
        </div>

        {/* 2. Top Header Section: ONLY the CurvedLoop with paws in #FF007F */}
        <div 
          className="relative z-20 w-full pt-2 flex flex-col items-center pointer-events-auto transition-opacity duration-150"
          style={{ opacity: topLoopOpacity }}
        >
          <div className="w-full -mb-3 sm:-mb-5">
            <CurvedLoop
              marqueeText="🐾 SONHO 🐾 PET "
              speed={1.6}
              curveAmount={70}
              interactive={true}
            />
          </div>
        </div>

        {/* 3. Compact Audio Button in Hero (On the Golden's green ledge at the top, cleanly fades on scroll) */}
        <div 
          className="absolute left-1/2 -translate-x-1/2 bottom-8 sm:bottom-12 md:bottom-16 z-30 transition-all duration-200"
          style={{
            opacity: centerAudioOpacity,
            pointerEvents: centerAudioOpacity > 0.2 ? 'auto' : 'none',
            transform: `translate(-50%, ${scrollProgress * 20}px)`
          }}
        >
          <button
            type="button"
            onClick={toggleSound}
            className={`group px-4 py-2 rounded-full font-heading font-bold text-xs flex items-center gap-2 shadow-xl transition-all duration-150 cursor-pointer active:scale-95 border ${
              isMuted
                ? 'bg-black/75 hover:bg-black/90 text-white border-emerald-400/60 shadow-[0_0_15px_rgba(0,200,83,0.35)] backdrop-blur-md animate-pulse hover:animate-none'
                : 'bg-emerald-900/90 hover:bg-emerald-900 text-white border-emerald-300 shadow-[0_0_20px_rgba(16,185,129,0.4)] backdrop-blur-md'
            }`}
            aria-label={isMuted ? 'Ativar áudio dos pets no vídeo' : 'Desativar áudio do vídeo'}
          >
            {isMuted ? (
              <>
                <VolumeX className="w-3.5 h-3.5 text-emerald-400 group-hover:scale-110 transition-transform" />
                <span>Ativar Som dos Pets</span>
              </>
            ) : (
              <>
                <Volume2 className="w-3.5 h-3.5 text-emerald-300 animate-bounce" />
                <span className="text-emerald-200">Som Ligado</span>
              </>
            )}
          </button>
        </div>

        {/* 4. Discrete Corner Audio Toggle Button during Scrolling */}
        <div 
          className="absolute top-4 right-4 z-40 transition-opacity duration-200"
          style={{ 
            opacity: cornerAudioOpacity,
            pointerEvents: cornerAudioOpacity > 0.2 ? 'auto' : 'none'
          }}
        >
          <button
            type="button"
            onClick={toggleSound}
            className={`px-3 py-1.5 rounded-xl font-bold text-xs flex items-center gap-2 shadow-md backdrop-blur-md border transition-all cursor-pointer active:scale-95 ${
              isMuted
                ? 'bg-black/60 hover:bg-black/85 text-white border-white/20'
                : 'bg-emerald-900/80 hover:bg-emerald-900 text-white border-emerald-400'
            }`}
            aria-label={isMuted ? 'Ativar áudio do vídeo' : 'Desativar áudio do vídeo'}
          >
            {isMuted ? (
              <>
                <VolumeX className="w-3.5 h-3.5 text-slate-300" />
                <span className="hidden sm:inline">Ativar Som</span>
              </>
            ) : (
              <>
                <Volume2 className="w-3.5 h-3.5 text-emerald-400 animate-bounce" />
                <span className="text-emerald-300 hidden sm:inline">Som Ligado</span>
              </>
            )}
          </button>
        </div>

        {/* 5. Storytelling Content (Clean, 100% Unobstructed with WhatsApp CTA & Badges) */}
        <div 
          className="relative z-30 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-10 sm:pb-14 text-center flex flex-col items-center transition-all duration-150 ease-out"
          style={{ 
            opacity: detailsOpacity,
            transform: `translateY(${detailsTranslateY}px)`,
            pointerEvents: detailsOpacity > 0.1 ? 'auto' : 'none'
          }}
        >
          {/* Eyebrow Pill */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-950/85 border border-emerald-500/50 text-emerald-300 text-xs sm:text-sm font-bold mb-3 shadow-xl backdrop-blur-md">
            <Heart className="w-4 h-4 text-emerald-400 fill-emerald-400/20" aria-hidden="true" />
            <span>Experiência Real • Sonho Pet Guarulhos</span>
          </div>

          {/* Headline: "SEU AMOR POR ANIMAIS SE TRANSFORMANDO EM FUTURO E RENDA" */}
          <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl lg:text-[2.85rem] font-black text-white tracking-tight leading-[1.15] mb-3 drop-shadow-[0_2px_12px_rgba(0,0,0,0.9)] uppercase">
            <span>SEU AMOR POR ANIMAIS </span>
            <span className="text-white block sm:inline">
              SE TRANSFORMANDO EM{' '}
            </span>
            <span className="text-[#FF007F] inline-block font-black">
              FUTURO E RENDA
            </span>
          </h2>

          {/* Crisp Subtitle */}
          <p className="text-sm sm:text-base md:text-lg text-slate-100 font-medium leading-relaxed max-w-2xl mx-auto mb-5 drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
            Veja a energia, alegria e tranquilidade dos animais que passam pelas mãos dos nossos profissionais e alunos formados.
          </p>

          {/* 3 Crisp Badges in Dark Glass */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 w-full max-w-2xl mb-5">
            <div className="px-4 py-2.5 rounded-xl bg-black/60 border border-white/20 flex items-center justify-center gap-2 shadow-lg backdrop-blur-md">
              <Heart className="w-4 h-4 text-rose-400 fill-rose-400 shrink-0" />
              <span className="text-xs sm:text-sm font-bold text-white">Manejo 100% Positivo</span>
            </div>

            <div className="px-4 py-2.5 rounded-xl bg-black/60 border border-white/20 flex items-center justify-center gap-2 shadow-lg backdrop-blur-md">
              <Star className="w-4 h-4 text-amber-400 fill-amber-400 shrink-0" />
              <span className="text-xs sm:text-sm font-bold text-white">Nota 5.0 no Google Maps</span>
            </div>

            <div className="px-4 py-2.5 rounded-xl bg-black/60 border border-white/20 flex items-center justify-center gap-2 shadow-lg backdrop-blur-md">
              <Users className="w-4 h-4 text-emerald-400 shrink-0" />
              <span className="text-xs sm:text-sm font-bold text-white">Turmas Reduzidas</span>
            </div>
          </div>

          {/* CTA Button (100% Clean & Highlighted) */}
          <a
            href="https://wa.me/5511983800176?text=Ol%C3%A1!%20Vi%20o%20v%C3%ADdeo%20dos%20pets%20no%20site%20da%20Sonho%20Pet%20e%20gostaria%20de%20informa%C3%A7%C3%B5es."
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => onWhatsAppClick('unified_video_cta')}
            className="group inline-flex items-center gap-2.5 px-8 py-3.5 rounded-2xl font-bold text-base bg-whatsapp-aaa hover:bg-[#054c44] text-white shadow-2xl transition-all active:scale-[0.98] focus-visible:outline-3 focus-visible:outline-white"
            aria-label="Falar com a Sonho Pet no WhatsApp (abre em nova janela)"
          >
            <MessageCircle className="w-5 h-5 fill-white" />
            <span>Falar no WhatsApp Oficial</span>
            <ArrowRight className="w-4 h-4 text-white/80 group-hover:translate-x-1 transition-transform" />
          </a>

        </div>

      </div>
    </div>
  );
};
