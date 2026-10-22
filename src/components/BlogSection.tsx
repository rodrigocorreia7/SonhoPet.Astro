import React, { useState, useEffect } from 'react';
import { BookOpen, Calendar, Clock, ArrowRight, X, MessageCircle, Heart, Settings } from 'lucide-react';
import type { BlogPostItem } from '../types';
import { getStoredPosts } from '../data/blogStore';

interface BlogSectionProps {
  onWhatsAppClick?: (origin?: string) => void;
}

export const BlogSection: React.FC<BlogSectionProps> = ({ onWhatsAppClick }) => {
  const [posts, setPosts] = useState<BlogPostItem[]>([]);
  const [selectedPost, setSelectedPost] = useState<BlogPostItem | null>(null);

  useEffect(() => {
    setPosts(getStoredPosts());

    const handleUpdate = () => {
      setPosts(getStoredPosts());
    };

    window.addEventListener('sonho_pet_posts_updated', handleUpdate);
    return () => window.removeEventListener('sonho_pet_posts_updated', handleUpdate);
  }, []);

  return (
    <section 
      id="blog" 
      className="py-16 sm:py-24 bg-white border-b border-stone-200 scroll-mt-16"
      aria-labelledby="blog-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="flex items-center justify-center gap-2 mb-3">
            <span className="text-xs sm:text-sm font-bold tracking-wider uppercase text-[#D81B60] bg-pink-50 px-4 py-1.5 rounded-full border border-pink-200">
              Blog & Conhecimento Pet
            </span>
            <a
              href="/admin"
              className="inline-flex items-center gap-1.5 text-[11px] font-bold text-stone-600 hover:text-stone-900 bg-stone-100 hover:bg-stone-200 px-3 py-1.5 rounded-full border border-stone-300 transition-colors"
              title="Acessar Painel CRUD"
            >
              <Settings className="w-3.5 h-3.5 text-stone-500" />
              <span>Gerenciar Posts (CRUD)</span>
            </a>
          </div>
          <h2 
            id="blog-heading" 
            className="font-heading text-3xl sm:text-4xl font-extrabold text-stone-900 mt-2 tracking-tight"
          >
            Dicas, Técnicas e Mercado de Estética Animal
          </h2>
          <p className="text-base sm:text-lg text-stone-700 mt-3 leading-relaxed">
            Conteúdo exclusivo preparado pelos instrutores e especialistas da Sonho Pet em Guarulhos.
          </p>
        </div>

        {/* Blog Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <article 
              key={post.id}
              className="bg-stone-50 rounded-3xl overflow-hidden border border-stone-200 hover:border-[#FF007F]/40 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group"
            >
              <div>
                {/* Post Image */}
                <div className="relative h-52 sm:h-56 overflow-hidden bg-stone-200">
                  <img 
                    src={post.image} 
                    alt={post.title}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-xs text-[#881337] border border-pink-200 text-xs font-bold px-3 py-1 rounded-full shadow-xs">
                    {post.category}
                  </div>
                </div>

                {/* Post Body */}
                <div className="p-6">
                  <div className="flex items-center gap-4 text-xs text-stone-500 font-medium mb-3">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-stone-400" />
                      {post.date}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-stone-400" />
                      {post.readTime}
                    </span>
                  </div>

                  <h3 className="font-heading text-xl font-bold text-stone-900 group-hover:text-[#881337] transition-colors leading-snug mb-3">
                    {post.title}
                  </h3>

                  <p className="text-stone-700 text-sm leading-relaxed line-clamp-3">
                    {post.excerpt}
                  </p>
                </div>
              </div>

              {/* Action Button */}
              <div className="p-6 pt-0">
                <button
                  type="button"
                  onClick={() => setSelectedPost(post)}
                  className="w-full inline-flex items-center justify-between px-5 py-3 rounded-xl bg-white hover:bg-pink-50 border border-stone-200 hover:border-pink-200 text-stone-900 hover:text-[#881337] font-bold text-xs tracking-wide transition-all group/btn cursor-pointer"
                >
                  <span>Ler Artigo Completo</span>
                  <ArrowRight className="w-4 h-4 text-stone-400 group-hover/btn:translate-x-1 group-hover/btn:text-[#881337] transition-all" />
                </button>
              </div>
            </article>
          ))}
        </div>

      </div>

      {/* Reader Modal */}
      {selectedPost && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200"
          role="dialog"
          aria-modal="true"
        >
          <div className="relative bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-stone-200 p-6 sm:p-8">
            <button
              type="button"
              onClick={() => setSelectedPost(null)}
              className="absolute top-5 right-5 p-2 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-600 transition-colors"
              aria-label="Fechar artigo"
            >
              <X className="w-5 h-5" />
            </button>

            <span className="inline-block text-xs font-bold text-[#881337] bg-pink-100 px-3 py-1 rounded-full mb-3">
              {selectedPost.category}
            </span>

            <h3 className="font-heading text-2xl sm:text-3xl font-black text-stone-900 leading-tight mb-4">
              {selectedPost.title}
            </h3>

            <div className="h-64 rounded-2xl overflow-hidden mb-6 bg-stone-100">
              <img 
                src={selectedPost.image} 
                alt={selectedPost.title}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="space-y-4 text-stone-700 text-sm leading-relaxed whitespace-pre-line mb-8">
              {selectedPost.content}
            </div>

            <div className="pt-6 border-t border-stone-200 flex flex-col sm:flex-row items-center justify-between gap-4">
              <span className="text-xs text-stone-500 font-medium">
                Sonho Pet • Guarulhos - SP
              </span>
              <a
                href="https://wa.me/5511983800176?text=Ol%C3%A1!%20Li%20o%20artigo%20no%20blog%20da%20Sonho%20Pet%20e%20gostaria%20de%20tirar%20uma%20d%C3%BAvida."
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => onWhatsAppClick?.('blog_modal_whatsapp')}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold bg-whatsapp-aaa text-white hover:bg-[#054C44] transition-colors"
              >
                <MessageCircle className="w-4 h-4 fill-white text-white" />
                <span>Tirar Dúvida no WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
