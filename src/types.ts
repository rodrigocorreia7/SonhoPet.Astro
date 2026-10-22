export interface TestimonialItem {
  name: string;
  role: string;
  rating: number;
  comment: string;
  date: string;
  verified: boolean;
}

export interface ServiceCardItem {
  number: string;
  badge: string;
  title: string;
  description: string;
  features: string[];
  ctaText: string;
  whatsappMessage: string;
  image: string;
  imageAlt: string;
  highlight: boolean;
}

export interface FaqItem {
  id?: string;
  question: string;
  answer: string;
  category: string;
}

export interface BlogPostItem {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  readTime: string;
  date: string;
  image: string;
  content: string;
  published: boolean;
}

export interface LeadItem {
  id: string;
  name: string;
  phone: string;
  interest: 'curso' | 'estetica' | 'duvidas';
  notes?: string;
  createdAt: string;
  status: 'novo' | 'contatado' | 'matriculado' | 'arquivado';
}
