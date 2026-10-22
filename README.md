# 🐾 Sonho Pet - Astro 5 Edition (com Sistema CRUD)

Versão do site da **Sonho Pet - Escola de Banho e Tosa & Estética Animal** desenvolvida em **Astro 5 + React 19 + Tailwind CSS v4**.

---

## 🚀 Principais Diferenciais desta Versão

1. **Desempenho Extremo (PageSpeed 100/100):** O Astro entrega HTML puro para os motores de busca e carrega o JavaScript apenas para as "ilhas" interativas.
2. **Efeitos e Animações 100% Preservados:**
   * Rastro de patinhas bege no cursor (`PawTrail`).
   * Vídeo Scrolltelling com reprodução fluida no scroll (`UnifiedHeroVideo`).
   * Coração pulsando com batimento cardíaco (`animate-heartbeat`).
   * Simulador interativo de renda para tosadores (`ServicesGrid`).
   * Marquee curvo com patinhas da marca (`CurvedLoop`).
3. **Painel de Controle CRUD Completo (`/admin`):**
   * **Gerenciador de Blog (CRUD):** Criar, Listar, Editar e Excluir artigos com atualização instantânea na home.
   * **Gestão de Leads & Alunos:** Listagem, alteração de status (Novo, Contatado, Matriculado) e exclusão.

---

## 🛠️ Como Executar Localmente

1. Entre na pasta e instale as dependências:
```bash
npm install
```

2. Inicie o servidor de desenvolvimento:
```bash
npm run dev
```

3. Acesse no navegador:
* Site Principal: `http://localhost:3003/`
* Painel CRUD: `http://localhost:3003/admin`

---

## ☁️ Como Hospedar na Vercel ou Cloudflare

### Opção 1: Vercel
1. Crie um repositório no GitHub para esta pasta e envie o código.
2. Acesse [vercel.com](https://vercel.com) e conecte o repositório.
3. A Vercel detectará automaticamente o Astro. Basta clicar em **Deploy**.

### Opção 2: Cloudflare Pages
1. Acesse o painel da [Cloudflare](https://dash.cloudflare.com) > **Workers & Pages** > **Create application** > **Pages** > **Connect to Git**.
2. Selecione o repositório e configure:
   * **Framework preset:** `Astro`
   * **Build command:** `npm run build`
   * **Build output directory:** `dist`
3. Clique em **Save and Deploy**.
