# 🎬 LPE Nextflix

Uma plataforma de streaming inspirada na Netflix, desenvolvida com **Next.js** para fins acadêmicos. Os usuários podem visualizar filmes e séries, com autenticação, controle de vídeos e organização por categorias.

---

## 🔗 Acesse o Projeto

▶️ **Site em Produção:**  
https://lpe-nextflix-99z529utu-manuabigszs-projects.vercel.app/

---

## 🧠 Tecnologias Utilizadas

- [Next.js](https://nextjs.org/) — Framework React full-stack
- [React Bootstrap](https://react-bootstrap.github.io/) — Componentes visuais
- [NextAuth.js](https://next-auth.js.org/) — Autenticação
- [PostgreSQL](https://www.postgresql.org/) — Banco de dados relacional
- [Prisma ORM](https://www.prisma.io/) — Mapeamento objeto-relacional
- [Render](https://render.com/) — Hospedagem do banco de dados
- [Vercel](https://vercel.com/) — Deploy do frontend

---

## 📁 Estrutura do Projeto

```
├── /app                # Rotas e páginas
├── /components         # Componentes reutilizáveis (menu, sliders etc.)
├── /bd                 # Casos de uso e integrações com o banco de dados
├── /lib                # Configurações (ex: autenticação)
├── /public             # Arquivos estáticos
├── /styles             # Estilizações globais
└── README.md
```

---

## ⚙️ Configuração Local

### 1. Clone o repositório

```bash
git clone https://github.com/seu-usuario/lpe-nextflix.git
cd lpe-nextflix
```

### 2. Instale as dependências

```bash
npm install
# ou
yarn
```

### 3. Configure as variáveis de ambiente

Crie um arquivo `.env.local` com:

```env
DATABASE_URL="sua_string_do_render"
NEXTAUTH_SECRET="um_segredo_seguro"
NEXTAUTH_URL="http://localhost:3000"
```

### 4. Migrate o banco de dados

```bash
npx prisma migrate dev
```

### 5. Rode o servidor local

```bash
npm run dev
# ou
yarn dev
```

Abra em [http://localhost:3000](http://localhost:3000)

---

## ✅ Funcionalidades

- Login e cadastro com NextAuth
- Menu responsivo com links dinâmicos
- Visualização de vídeos organizados por tipo
- Painel privado para gerenciar categorias e vídeos (admin)
- Scroll dinâmico no menu

---

## 📦 Produção

- 🔁 **Backend:** Banco de dados PostgreSQL no [Render](https://render.com)
- 🌐 **Frontend:** Aplicação Next.js hospedada na [Vercel](https://vercel.com)

---

## 👨‍💻 Autor

<p>
    <img 
      align=left 
      margin=10 
      width=80 
      src="https://avatars.githubusercontent.com/u/80135269?v=4"
    />
    <p>&nbsp&nbsp&nbspManuela Bertella Ossanes<br>
    &nbsp&nbsp&nbsp
    <a href="https://github.com/manuabigsz">
    GitHub</a>&nbsp;|&nbsp;
    <a href="https://www.linkedin.com/in/manuela-bertella-ossanes-690166204/">LinkedIn</a>
&nbsp;|&nbsp;
    <a href="https://www.instagram.com/manuossz/">
    Instagram</a>
&nbsp;|&nbsp;</p>
</p>
<br/><br/>
<p>
---

## 📄 Licença

Este projeto é acadêmico e de uso livre para fins educacionais.
