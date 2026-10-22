import type { BlogPostItem, LeadItem } from '../types';

export const INITIAL_POSTS: BlogPostItem[] = [
  {
    id: 'post-1',
    title: 'Como Começar na Profissão de Banhista e Tosador do Zero',
    excerpt: 'Descubra os passos fundamentais para entrar em um dos mercados mais aquecidos e lucrativos do Brasil com segurança e autoridade.',
    category: 'Carreira & Negócios',
    readTime: '4 min de leitura',
    date: 'Outubro, 2024',
    image: 'https://images.unsplash.com/photo-1541599540903-216a46ca1dc0?auto=format&fit=crop&w=800&h=500&q=80',
    published: true,
    content: `O mercado pet brasileiro é o terceiro maior do mundo em faturamento, movimentando mais de R$ 60 bilhões ao ano. Dentro desse ecossistema, os serviços de banho, tosa e estética canina são os mais recorrentes, garantindo uma clientela fiel que retorna a cada 7 ou 15 dias.

Para começar do zero, o primeiro passo indispensável é escolher uma formação 100% prática com modelos e cães reais. Bonecos sintéticos não ensinam a lidar com o temperamento, respiração, sensibilidade e anatomia de diferentes raças.

Na Sonho Pet em Guarulhos, os alunos aprendem desde o primeiro dia: manejo comportamental positivo, uso correto de tesouras retas, curvas e tubarão, padrões de tosa higiênica e tosa bebê, além de precificação e atendimento ao tutor.`
  },
  {
    id: 'post-2',
    title: 'Qual a Frequência Ideal de Banho e Tosa para Cada Tipo de Pelo?',
    excerpt: 'Entenda como a rotina correta de banho e higienização previne dermatites, nós dolorosos e mantém a barreira cutânea do pet saudável.',
    category: 'Cuidados & Saúde',
    readTime: '3 min de leitura',
    date: 'Outubro, 2024',
    image: 'https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?auto=format&fit=crop&w=800&h=500&q=80',
    published: true,
    content: `Muitos tutores têm dúvidas sobre o intervalo correto entre os banhos. Cães de pelagem longa como Shih Tzu, Lhasa Apso, Maltês e Yorkshire necessitam de banhos semanais ou quinzenais, acompanhados de escovação e desembaraçamento para evitar nós que causam dores na pele.

Já cães de pelagem curta, como Pugs, Bulldogs e Beagles, podem manter um intervalo de 15 a 21 dias, focando na remoção de subpelo e limpeza de orelhas e dobras faciais.

O uso de cosméticos veterinários hipoalergênicos e água em temperatura morna controlada é vital para não ressecar a derme e garantir o conforto absoluto do pet.`
  },
  {
    id: 'post-3',
    title: 'Tosa na Tesoura vs. Tosa na Máquina: Quando Usar Cada Uma?',
    excerpt: 'Conheça as particularidades das duas técnicas mais requisitadas nos salões de estética e o valor agregado da finalização na tesoura.',
    category: 'Técnicas Groomer',
    readTime: '5 min de leitura',
    date: 'Outubro, 2024',
    image: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&w=800&h=500&q=80',
    published: true,
    content: `A tosa na máquina é eficiente para padronização de comprimento do corpo, tosa higiênica e desbastes maiores. No entanto, a tosa na tesoura é o grande diferencial dos profissionais de elite (Groomers).

A finalização na tesoura permite criar linhas suaves, rostos arredondados no estilo asiático (Asian Style), rostinhos de ursinho (Teddy Bear) e respeitar raças de pelo primitivo como Spitz Alemão (Lulu da Pomerânia) e Samoieda, que NUNCA devem ser raspados na máquina para evitar alopecia.

Dominar a tosa na tesoura permite ao profissional cobrar até 80% a mais pelo serviço, agregando valor artístico e respeito à saúde do animal.`
  }
];

export const INITIAL_LEADS: LeadItem[] = [
  {
    id: 'lead-1',
    name: 'Ana Carolina Santos',
    phone: '(11) 98765-4321',
    interest: 'curso',
    notes: 'Interessada na turma de sábado para transição de carreira.',
    createdAt: '21/10/2026 14:30',
    status: 'novo'
  },
  {
    id: 'lead-2',
    name: 'Marcos Vinicius',
    phone: '(11) 97654-3210',
    interest: 'estetica',
    notes: 'Tutor de Golden Retriever (banho e tosa higiênica quinzenal).',
    createdAt: '20/10/2026 09:15',
    status: 'contatado'
  }
];

const POSTS_KEY = 'sonho_pet_blog_posts';
const LEADS_KEY = 'sonho_pet_leads';

export function getStoredPosts(): BlogPostItem[] {
  if (typeof window === 'undefined') return INITIAL_POSTS;
  const stored = localStorage.getItem(POSTS_KEY);
  if (!stored) {
    localStorage.setItem(POSTS_KEY, JSON.stringify(INITIAL_POSTS));
    return INITIAL_POSTS;
  }
  try {
    return JSON.parse(stored);
  } catch {
    return INITIAL_POSTS;
  }
}

export function saveStoredPost(post: BlogPostItem): BlogPostItem[] {
  const posts = getStoredPosts();
  const index = posts.findIndex((p) => p.id === post.id);
  let updated: BlogPostItem[];
  if (index >= 0) {
    updated = [...posts];
    updated[index] = post;
  } else {
    updated = [post, ...posts];
  }
  if (typeof window !== 'undefined') {
    localStorage.setItem(POSTS_KEY, JSON.stringify(updated));
    window.dispatchEvent(new Event('sonho_pet_posts_updated'));
  }
  return updated;
}

export function deleteStoredPost(id: string): BlogPostItem[] {
  const posts = getStoredPosts();
  const updated = posts.filter((p) => p.id !== id);
  if (typeof window !== 'undefined') {
    localStorage.setItem(POSTS_KEY, JSON.stringify(updated));
    window.dispatchEvent(new Event('sonho_pet_posts_updated'));
  }
  return updated;
}

export function getStoredLeads(): LeadItem[] {
  if (typeof window === 'undefined') return INITIAL_LEADS;
  const stored = localStorage.getItem(LEADS_KEY);
  if (!stored) {
    localStorage.setItem(LEADS_KEY, JSON.stringify(INITIAL_LEADS));
    return INITIAL_LEADS;
  }
  try {
    return JSON.parse(stored);
  } catch {
    return INITIAL_LEADS;
  }
}

export function saveStoredLead(lead: LeadItem): LeadItem[] {
  const leads = getStoredLeads();
  const index = leads.findIndex((l) => l.id === lead.id);
  let updated: LeadItem[];
  if (index >= 0) {
    updated = [...leads];
    updated[index] = lead;
  } else {
    updated = [lead, ...leads];
  }
  if (typeof window !== 'undefined') {
    localStorage.setItem(LEADS_KEY, JSON.stringify(updated));
    window.dispatchEvent(new Event('sonho_pet_leads_updated'));
  }
  return updated;
}

export function deleteStoredLead(id: string): LeadItem[] {
  const leads = getStoredLeads();
  const updated = leads.filter((l) => l.id !== id);
  if (typeof window !== 'undefined') {
    localStorage.setItem(LEADS_KEY, JSON.stringify(updated));
    window.dispatchEvent(new Event('sonho_pet_leads_updated'));
  }
  return updated;
}
