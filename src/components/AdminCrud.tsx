import React, { useState, useEffect } from 'react';
import { 
  BookOpen, Plus, Edit2, Trash2, CheckCircle, ArrowLeft, 
  Users, MessageCircle, Search, X, Save
} from 'lucide-react';
import type { BlogPostItem, LeadItem } from '../types';
import { 
  getStoredPosts, saveStoredPost, deleteStoredPost, 
  getStoredLeads, saveStoredLead, deleteStoredLead 
} from '../data/blogStore';

export const AdminCrud: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'posts' | 'leads'>('posts');
  const [posts, setPosts] = useState<BlogPostItem[]>([]);
  const [leads, setLeads] = useState<LeadItem[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  
  // Post modal / form state
  const [isPostModalOpen, setIsPostModalOpen] = useState(false);
  const [editingPost, setEditingPost] = useState<BlogPostItem | null>(null);
  const [postForm, setPostForm] = useState({
    title: '',
    category: 'Carreira & Negócios',
    readTime: '3 min de leitura',
    date: 'Outubro, 2024',
    image: '',
    excerpt: '',
    content: ''
  });

  // Lead modal / form state
  const [isLeadModalOpen, setIsLeadModalOpen] = useState(false);
  const [leadForm, setLeadForm] = useState({
    name: '',
    phone: '',
    interest: 'curso' as 'curso' | 'estetica' | 'duvidas',
    notes: '',
    status: 'novo' as 'novo' | 'contatado' | 'matriculado' | 'arquivado'
  });

  useEffect(() => {
    setPosts(getStoredPosts());
    setLeads(getStoredLeads());

    const handleUpdate = () => {
      setPosts(getStoredPosts());
      setLeads(getStoredLeads());
    };

    window.addEventListener('sonho_pet_posts_updated', handleUpdate);
    window.addEventListener('sonho_pet_leads_updated', handleUpdate);
    return () => {
      window.removeEventListener('sonho_pet_posts_updated', handleUpdate);
      window.removeEventListener('sonho_pet_leads_updated', handleUpdate);
    };
  }, []);

  // Post Actions
  const openNewPostModal = () => {
    setEditingPost(null);
    setPostForm({
      title: '',
      category: 'Carreira & Negócios',
      readTime: '4 min de leitura',
      date: new Date().toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' }),
      image: 'https://images.unsplash.com/photo-1541599540903-216a46ca1dc0?auto=format&fit=crop&w=800&h=500&q=80',
      excerpt: '',
      content: ''
    });
    setIsPostModalOpen(true);
  };

  const openEditPostModal = (post: BlogPostItem) => {
    setEditingPost(post);
    setPostForm({
      title: post.title,
      category: post.category,
      readTime: post.readTime,
      date: post.date,
      image: post.image,
      excerpt: post.excerpt,
      content: post.content
    });
    setIsPostModalOpen(true);
  };

  const handleSavePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!postForm.title || !postForm.content) return;

    const newPost: BlogPostItem = {
      id: editingPost ? editingPost.id : `post-${Date.now()}`,
      title: postForm.title,
      category: postForm.category,
      readTime: postForm.readTime,
      date: postForm.date,
      image: postForm.image || 'https://images.unsplash.com/photo-1541599540903-216a46ca1dc0?auto=format&fit=crop&w=800&h=500&q=80',
      excerpt: postForm.excerpt,
      content: postForm.content,
      published: true
    };

    const updated = saveStoredPost(newPost);
    setPosts(updated);
    setIsPostModalOpen(false);
  };

  const handleDeletePost = (id: string) => {
    if (confirm('Tem certeza que deseja excluir este artigo?')) {
      const updated = deleteStoredPost(id);
      setPosts(updated);
    }
  };

  // Lead Actions
  const handleSaveLead = (e: React.FormEvent) => {
    e.preventDefault();
    if (!leadForm.name || !leadForm.phone) return;

    const newLead: LeadItem = {
      id: `lead-${Date.now()}`,
      name: leadForm.name,
      phone: leadForm.phone,
      interest: leadForm.interest,
      notes: leadForm.notes,
      createdAt: new Date().toLocaleString('pt-BR'),
      status: leadForm.status
    };

    const updated = saveStoredLead(newLead);
    setLeads(updated);
    setIsLeadModalOpen(false);
    setLeadForm({
      name: '',
      phone: '',
      interest: 'curso',
      notes: '',
      status: 'novo'
    });
  };

  const handleStatusChange = (lead: LeadItem, newStatus: LeadItem['status']) => {
    const updated = saveStoredLead({ ...lead, status: newStatus });
    setLeads(updated);
  };

  const handleDeleteLead = (id: string) => {
    if (confirm('Tem certeza que deseja excluir este lead?')) {
      const updated = deleteStoredLead(id);
      setLeads(updated);
    }
  };

  const filteredPosts = posts.filter(p => 
    p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredLeads = leads.filter(l => 
    l.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    l.phone.includes(searchTerm)
  );

  return (
    <div className="min-h-screen bg-stone-100 text-stone-900 pb-20">
      {/* Top Navbar */}
      <header className="bg-[#0B1120] text-white py-4 px-6 border-b border-slate-800 sticky top-0 z-30 shadow-md">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <a 
              href="/" 
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-bold text-slate-200 transition-colors"
            >
              <ArrowLeft className="w-4 h-4 text-emerald-400" />
              <span>Voltar ao Site</span>
            </a>
            <div className="h-6 w-px bg-slate-700 hidden sm:block" />
            <div className="flex items-center gap-2">
              <img src="/logo.png" alt="Sonho Pet" className="h-8 w-auto bg-white/10 p-1 rounded-lg" />
              <h1 className="font-heading font-black text-lg text-white">
                Painel Administrativo <span className="text-[#FF007F]">CRUD</span>
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab('posts')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                activeTab === 'posts' 
                  ? 'bg-[#FF007F] text-white shadow-md' 
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              <span>Gerenciar Blog ({posts.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('leads')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                activeTab === 'leads' 
                  ? 'bg-emerald-600 text-white shadow-md' 
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              <Users className="w-4 h-4" />
              <span>Leads / Contatos ({leads.length})</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {/* Header Actions & Search */}
        <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-xs mb-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-stone-900 font-heading">
              {activeTab === 'posts' ? 'Gerenciador de Artigos do Blog' : 'Gestão de Alunos & Leads'}
            </h2>
            <p className="text-sm text-stone-600 mt-1">
              {activeTab === 'posts' 
                ? 'Crie, edite e remova postagens que aparecem na página principal.' 
                : 'Acompanhe contatos e matrículas recebidas pelo site.'}
            </p>
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto">
            <div className="relative flex-1 md:w-64">
              <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder={activeTab === 'posts' ? 'Buscar artigos...' : 'Buscar leads...'}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-4 py-2 rounded-xl border border-stone-300 text-xs focus:ring-2 focus:ring-emerald-700 focus:outline-hidden"
              />
            </div>

            {activeTab === 'posts' ? (
              <button
                onClick={openNewPostModal}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#FF007F] hover:bg-[#D81B60] text-white text-xs font-bold shadow-sm transition-all"
              >
                <Plus className="w-4 h-4" />
                <span>Novo Artigo</span>
              </button>
            ) : (
              <button
                onClick={() => setIsLeadModalOpen(true)}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold shadow-sm transition-all"
              >
                <Plus className="w-4 h-4" />
                <span>Registrar Lead</span>
              </button>
            )}
          </div>
        </div>

        {/* Tab 1: POSTS TABLE */}
        {activeTab === 'posts' && (
          <div className="bg-white rounded-2xl border border-stone-200 shadow-xs overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm text-stone-700">
                <thead className="bg-stone-50 border-b border-stone-200 text-xs uppercase tracking-wider text-stone-500 font-bold">
                  <tr>
                    <th className="px-6 py-4">Artigo</th>
                    <th className="px-6 py-4">Categoria</th>
                    <th className="px-6 py-4">Tempo Leitura</th>
                    <th className="px-6 py-4">Data</th>
                    <th className="px-6 py-4 text-right">Ações</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100">
                  {filteredPosts.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="px-6 py-12 text-center text-stone-500">
                        Nenhum artigo encontrado. Clique em "+ Novo Artigo" para cadastrar.
                      </td>
                    </tr>
                  ) : (
                    filteredPosts.map((post) => (
                      <tr key={post.id} className="hover:bg-stone-50/80 transition-colors">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <img 
                              src={post.image} 
                              alt={post.title} 
                              className="w-12 h-12 rounded-lg object-cover shrink-0 border border-stone-200"
                            />
                            <div>
                              <div className="font-bold text-stone-900 line-clamp-1">{post.title}</div>
                              <div className="text-xs text-stone-500 line-clamp-1 mt-0.5">{post.excerpt}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className="inline-block px-2.5 py-1 rounded-full text-[11px] font-bold bg-pink-50 text-[#D81B60] border border-pink-200">
                            {post.category}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-xs font-medium text-stone-600">
                          {post.readTime}
                        </td>
                        <td className="px-6 py-4 text-xs font-medium text-stone-600">
                          {post.date}
                        </td>
                        <td className="px-6 py-4 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <button
                              onClick={() => openEditPostModal(post)}
                              className="p-1.5 text-stone-600 hover:text-emerald-700 hover:bg-emerald-50 rounded-lg transition-colors"
                              title="Editar Artigo"
                            >
                              <Edit2 className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleDeletePost(post.id)}
                              className="p-1.5 text-stone-600 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                              title="Excluir Artigo"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab 2: LEADS TABLE */}
        {activeTab === 'leads' && (
          <div className="bg-white rounded-2xl border border-stone-200 shadow-xs overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm text-stone-700">
                <thead className="bg-stone-50 border-b border-stone-200 text-xs uppercase tracking-wider text-stone-500 font-bold">
                  <tr>
                    <th className="px-6 py-4">Nome & Contato</th>
                    <th className="px-6 py-4">Interesse</th>
                    <th className="px-6 py-4">Observações</th>
                    <th className="px-6 py-4">Data Registro</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4 text-right">Ações</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100">
                  {filteredLeads.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="px-6 py-12 text-center text-stone-500">
                        Nenhum lead encontrado.
                      </td>
                    </tr>
                  ) : (
                    filteredLeads.map((lead) => (
                      <tr key={lead.id} className="hover:bg-stone-50/80 transition-colors">
                        <td className="px-6 py-4">
                          <div className="font-bold text-stone-900">{lead.name}</div>
                          <a 
                            href={`https://wa.me/55${lead.phone.replace(/\D/g, '')}`} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-700 hover:underline mt-0.5"
                          >
                            <MessageCircle className="w-3.5 h-3.5" />
                            <span>{lead.phone}</span>
                          </a>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`inline-block px-2.5 py-1 rounded-full text-[11px] font-bold ${
                            lead.interest === 'curso' 
                              ? 'bg-pink-100 text-[#881337]' 
                              : lead.interest === 'estetica'
                              ? 'bg-emerald-100 text-emerald-900'
                              : 'bg-stone-200 text-stone-800'
                          }`}>
                            {lead.interest === 'curso' ? 'Curso Banho e Tosa' : lead.interest === 'estetica' ? 'Banho e Tosa Pet' : 'Dúvidas Gerais'}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-xs text-stone-600 max-w-xs truncate">
                          {lead.notes || '—'}
                        </td>
                        <td className="px-6 py-4 text-xs text-stone-500">
                          {lead.createdAt}
                        </td>
                        <td className="px-6 py-4">
                          <select
                            value={lead.status}
                            onChange={(e) => handleStatusChange(lead, e.target.value as any)}
                            className="text-xs font-bold rounded-lg border border-stone-200 px-2 py-1 bg-stone-50 focus:outline-hidden"
                          >
                            <option value="novo">🟢 Novo</option>
                            <option value="contatado">🟡 Contatado</option>
                            <option value="matriculado">🔵 Matriculado</option>
                            <option value="arquivado">⚪ Arquivado</option>
                          </select>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <button
                            onClick={() => handleDeleteLead(lead.id)}
                            className="p-1.5 text-stone-500 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                            title="Excluir Lead"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>

      {/* POST MODAL (CREATE / EDIT) */}
      {isPostModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-stone-100 mb-6">
              <h3 className="font-heading font-black text-xl text-stone-900">
                {editingPost ? 'Editar Artigo' : 'Novo Artigo para o Blog'}
              </h3>
              <button 
                onClick={() => setIsPostModalOpen(false)}
                className="p-2 text-stone-400 hover:text-stone-700 rounded-full"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSavePost} className="space-y-4 text-xs font-bold">
              <div>
                <label className="block text-stone-700 mb-1">Título do Artigo</label>
                <input
                  type="text"
                  required
                  placeholder="Ex: Guia Completo de Tosa Bebê em 2026"
                  value={postForm.title}
                  onChange={(e) => setPostForm({ ...postForm, title: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-stone-300 font-normal text-sm focus:ring-2 focus:ring-[#FF007F] focus:outline-hidden"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-stone-700 mb-1">Categoria</label>
                  <select
                    value={postForm.category}
                    onChange={(e) => setPostForm({ ...postForm, category: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-stone-300 font-normal text-sm focus:outline-hidden"
                  >
                    <option value="Carreira & Negócios">Carreira & Negócios</option>
                    <option value="Cuidados & Saúde">Cuidados & Saúde</option>
                    <option value="Técnicas Groomer">Técnicas Groomer</option>
                    <option value="Tendências Pet">Tendências Pet</option>
                  </select>
                </div>

                <div>
                  <label className="block text-stone-700 mb-1">Tempo de Leitura</label>
                  <input
                    type="text"
                    value={postForm.readTime}
                    onChange={(e) => setPostForm({ ...postForm, readTime: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-stone-300 font-normal text-sm focus:outline-hidden"
                  />
                </div>
              </div>

              <div>
                <label className="block text-stone-700 mb-1">URL da Imagem de Capa</label>
                <input
                  type="url"
                  placeholder="https://images.unsplash.com/..."
                  value={postForm.image}
                  onChange={(e) => setPostForm({ ...postForm, image: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-stone-300 font-normal text-sm focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block text-stone-700 mb-1">Resumo / Chamada (Excerpt)</label>
                <textarea
                  rows={2}
                  required
                  placeholder="Breve resumo atraente para a listagem..."
                  value={postForm.excerpt}
                  onChange={(e) => setPostForm({ ...postForm, excerpt: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-stone-300 font-normal text-sm focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block text-stone-700 mb-1">Conteúdo Completo do Artigo</label>
                <textarea
                  rows={6}
                  required
                  placeholder="Escreva os parágrafos do artigo..."
                  value={postForm.content}
                  onChange={(e) => setPostForm({ ...postForm, content: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-stone-300 font-normal text-sm focus:outline-hidden"
                />
              </div>

              <div className="pt-4 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsPostModalOpen(false)}
                  className="px-5 py-2.5 rounded-xl border border-stone-300 text-stone-700 hover:bg-stone-50 font-bold"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-[#FF007F] hover:bg-[#D81B60] text-white font-bold shadow-md flex items-center gap-2"
                >
                  <Save className="w-4 h-4" />
                  <span>Salvar Artigo</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* LEAD MODAL (MANUAL REGISTRATION) */}
      {isLeadModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl">
            <div className="flex items-center justify-between pb-4 border-b border-stone-100 mb-6">
              <h3 className="font-heading font-black text-xl text-stone-900">
                Registrar Novo Lead / Aluno
              </h3>
              <button 
                onClick={() => setIsLeadModalOpen(false)}
                className="p-2 text-stone-400 hover:text-stone-700 rounded-full"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveLead} className="space-y-4 text-xs font-bold">
              <div>
                <label className="block text-stone-700 mb-1">Nome Completo</label>
                <input
                  type="text"
                  required
                  placeholder="Ex: Juliana Mendes"
                  value={leadForm.name}
                  onChange={(e) => setLeadForm({ ...leadForm, name: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-stone-300 font-normal text-sm focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block text-stone-700 mb-1">WhatsApp / Telefone</label>
                <input
                  type="text"
                  required
                  placeholder="(11) 9..."
                  value={leadForm.phone}
                  onChange={(e) => setLeadForm({ ...leadForm, phone: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-stone-300 font-normal text-sm focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block text-stone-700 mb-1">Interesse Principal</label>
                <select
                  value={leadForm.interest}
                  onChange={(e) => setLeadForm({ ...leadForm, interest: e.target.value as any })}
                  className="w-full px-4 py-2.5 rounded-xl border border-stone-300 font-normal text-sm focus:outline-hidden"
                >
                  <option value="curso">Curso de Banho e Tosa</option>
                  <option value="estetica">Banho e Tosa Pet</option>
                  <option value="duvidas">Dúvidas Gerais</option>
                </select>
              </div>

              <div>
                <label className="block text-stone-700 mb-1">Observações</label>
                <textarea
                  rows={3}
                  placeholder="Informações adicionais sobre o aluno..."
                  value={leadForm.notes}
                  onChange={(e) => setLeadForm({ ...leadForm, notes: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-stone-300 font-normal text-sm focus:outline-hidden"
                />
              </div>

              <div className="pt-4 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsLeadModalOpen(false)}
                  className="px-5 py-2.5 rounded-xl border border-stone-300 text-stone-700 hover:bg-stone-50 font-bold"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold shadow-md flex items-center gap-2"
                >
                  <Save className="w-4 h-4" />
                  <span>Cadastrar Lead</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
