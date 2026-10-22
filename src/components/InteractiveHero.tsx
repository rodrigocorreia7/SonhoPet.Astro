'use client';
import React from 'react';
import { CurvedLoop } from './CurvedLoop';

interface InteractiveHeroProps {
  onWhatsAppClick?: (origin?: string) => void;
}

export const InteractiveHero: React.FC<InteractiveHeroProps> = () => {
  return (
    <section 
      id="hero"
      aria-labelledby="hero-title"
      className="relative overflow-hidden bg-white pt-2 pb-0 flex flex-col justify-between select-none"
    >
      {/* 1. Curved Marquee Text on Top (✦ SONHO ✦ PET ✦) in #FF007F */}
      <div className="w-full relative z-10 -mb-4 sm:-mb-6">
        <CurvedLoop
          marqueeText="✦ SONHO ✦ PET ✦ SONHO ✦ PET ✦ "
          speed={1.6}
          curveAmount={70}
          interactive={true}
        />
      </div>

      {/* 2. Hero Headline Typography (Exact Colors & 3-line layout) */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 text-center mt-2 mb-2 sm:mb-4">
        <h1 
          id="hero-title"
          className="font-heading font-black tracking-tight leading-[1.15] text-2xl sm:text-3xl md:text-4xl lg:text-[2.75rem] uppercase"
        >
          <span className="block text-[#00C853] drop-shadow-xs">
            O LUGAR ONDE SEU AMOR
          </span>
          <span className="block text-[#00C853] mt-1 sm:mt-1.5 drop-shadow-xs">
            POR ANIMAIS SE TRANSFORMA
          </span>
          <span className="block mt-1 sm:mt-1.5">
            <span className="text-[#00C853] mr-2">EM</span>
            <span className="text-[#FF007F] font-black underline decoration-wavy decoration-[#FF007F]/40 decoration-2">
              FUTURO E RENDA
            </span>
          </span>
        </h1>
      </div>

      {/* 3. Pets Trio on Bottom Deck (Static & Perfectly Positioned) */}
      <div className="relative w-full max-w-6xl mx-auto mt-2 sm:mt-4 px-2 sm:px-4">
        <div className="relative w-full flex items-end justify-center">
          <img
            src="/pets-trio.png"
            alt="Trio de pets da Sonho Pet: Dachshund, Golden Retriever e Gatinho apoiados na bancada"
            width="1200"
            height="600"
            fetchPriority="high"
            decoding="async"
            className="w-full max-w-5xl h-auto object-contain object-bottom pointer-events-none drop-shadow-md"
          />
        </div>
      </div>

    </section>
  );
};
