'use client';
import React, { useState, useRef, useEffect } from 'react';
import { Volume2, VolumeX, Sparkles, Heart, MessageCircle, Star, ArrowRight } from 'lucide-react';

interface ScrollVideoStoryProps {
  onWhatsAppClick: (origin?: string) => void;
}

export const ScrollVideoStory: React.FC<ScrollVideoStoryProps> = ({ onWhatsAppClick }) => {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);

  // Intersection Observer for seamless viewport autoplay
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (videoRef.current) {
              videoRef.current.play().then(() => {
                setIsPlaying(true);
              }).catch(() => {
                setIsPlaying(false);
              });
            }
          } else {
            if (videoRef.current) {
              videoRef.current.pause();
              setIsPlaying(false);
            }
          }
        });
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  const toggleSound = () => {
    if (videoRef.current) {
      const nextMuted = !isMuted;
      videoRef.current.muted = nextMuted;
      setIsMuted(nextMuted);
    }
  };

  return (
    <section 
      id="video-story"
      ref={sectionRef}
      aria-labelledby="video-story-heading"
      className="relative min-h-[85vh] lg:min-h-[90vh] flex items-center justify-center overflow-hidden bg-black text-white scroll-mt-16 select-none"
    >
      {/* 1. Full-Bleed Video Background */}
      <video
        ref={videoRef}
        src="/videos/Pets_playing.mp4"
        loop
        muted={isMuted}
        playsInline
        preload="metadata"
        className="absolute inset-0 w-full h-full object-cover object-center z-0 filter brightness-[0.85] contrast-[1.05]"
        aria-label="Vídeo de pets felizes brincando e recebendo cuidados na Sonho Pet"
      />

      {/* 2. Cinematic Vignette Gradient Overlays */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/60 z-10 pointer-events-none" />
      <div className="absolute inset-0 bg-radial from-transparent via-transparent to-black/60 z-10 pointer-events-none" />

      {/* 3. Audio Toggle Button Top Right */}
      <div className="absolute top-6 right-6 z-30">
        <button
          type="button"
          onClick={toggleSound}
          className="px-4 py-2.5 rounded-2xl bg-black/60 hover:bg-black/85 backdrop-blur-md text-white text-xs font-bold border border-white/20 flex items-center gap-2 transition-all active:scale-95 shadow-xl hover:border-emerald-400"
          aria-label={isMuted ? 'Ativar áudio do vídeo' : 'Desativar áudio do vídeo'}
        >
          {isMuted ? (
            <>
              <VolumeX className="w-4 h-4 text-slate-300" />
              <span>Ativar Áudio</span>
            </>
          ) : (
            <>
              <Volume2 className="w-4 h-4 text-emerald-400 animate-bounce" />
              <span className="text-emerald-300">Som Ligado</span>
            </>
          )}
        </button>
      </div>

      {/* 4. Center Content Overlay */}
      <div className="relative z-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center flex flex-col items-center">
        
        {/* Eyebrow Pill */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-950/80 border border-emerald-500/50 text-emerald-300 text-xs sm:text-sm font-bold mb-6 shadow-2xl backdrop-blur-md">
          <Sparkles className="w-4 h-4 text-emerald-400" aria-hidden="true" />
          <span>Experiência Real • Sonho Pet Guarulhos</span>
        </div>

        {/* Cinematic Headline */}
        <h2 
          id="video-story-heading"
          className="font-heading text-3xl sm:text-4xl md:text-6xl font-black text-white tracking-tight leading-[1.1] mb-6 drop-shadow-lg"
        >
          Cuidado com Alma,{' '}
          <span className="text-emerald-400 underline decoration-amber-400 decoration-wavy decoration-2">
            Técnica com Amor
          </span>
        </h2>

        {/* Subtitle */}
        <p className="text-base sm:text-xl text-slate-200 leading-relaxed max-w-2xl mx-auto mb-10 drop-shadow-md">
          Veja a energia, alegria e tranquilidade dos animais que passam pelas mãos dos nossos profissionais e alunos formados.
        </p>

        {/* 3 Floating Badges in Glass */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full max-w-3xl mb-10">
          <div className="p-4 rounded-2xl bg-black/50 backdrop-blur-md border border-white/15 flex items-center justify-center gap-3">
            <Heart className="w-5 h-5 text-rose-400 fill-rose-400 shrink-0" />
            <span className="text-xs sm:text-sm font-bold text-white">Manejo 100% Positivo</span>
          </div>

          <div className="p-4 rounded-2xl bg-black/50 backdrop-blur-md border border-white/15 flex items-center justify-center gap-3">
            <Star className="w-5 h-5 text-amber-400 fill-amber-400 shrink-0" />
            <span className="text-xs sm:text-sm font-bold text-white">Nota 5.0 no Google Maps</span>
          </div>

          <div className="p-4 rounded-2xl bg-black/50 backdrop-blur-md border border-white/15 flex items-center justify-center gap-3">
            <Sparkles className="w-5 h-5 text-emerald-400 shrink-0" />
            <span className="text-xs sm:text-sm font-bold text-white">Turmas Reduzidas</span>
          </div>
        </div>

        {/* CTA Button Over Video */}
        <a
          href="https://wa.me/5511983800176?text=Ol%C3%A1!%20Vi%20o%20v%C3%ADdeo%20dos%20pets%20no%20site%20da%20Sonho%20Pet%20e%20gostaria%20de%20informa%C3%A7%C3%B5es."
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => onWhatsAppClick('video_fullbleed_cta')}
          className="group inline-flex items-center gap-3 px-9 py-4 rounded-2xl font-bold text-base sm:text-lg bg-whatsapp-aaa hover:bg-[#054c44] text-white shadow-2xl transition-all active:scale-[0.98] focus-visible:outline-3 focus-visible:outline-white"
          aria-label="Falar com a Sonho Pet no WhatsApp (abre em nova janela)"
        >
          <MessageCircle className="w-5 h-5 fill-white" />
          <span>Falar no WhatsApp Oficial</span>
          <ArrowRight className="w-5 h-5 text-white/80 group-hover:translate-x-1 transition-transform" />
        </a>

      </div>

    </section>
  );
};
