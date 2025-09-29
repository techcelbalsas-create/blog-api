# Blog API (Node + Express + Prisma + PostgreSQL)

## Requisitos
- Node.js 18+
- PostgreSQL (ou use Docker)
- npm

## Setup local
1. Clone o repositório e entre na pasta:
git clone <https://github.com/techcelbalsas-create/blog-api>
cd blog-api
# 📝 Blog API

Este projeto é uma API RESTful simples para gerenciamento de **Usuários**, **Categorias** e **Postagens**, desenvolvida com **Node.js**, **Express** e **Prisma ORM**.

---

## 🚀 Tecnologias Utilizadas
- Node.js
- Express.js
- Prisma (ORM para banco de dados SQL)
- SQLite (banco de dados leve usado por padrão, mas pode ser trocado por MySQL ou PostgreSQL)
- bcryptjs (hash de senhas)
- Joi (validação de dados)

---

## ⚙️ Configuração do Projeto Localmente

### 1️⃣ Pré-requisitos
Antes de começar, você precisa ter instalado no seu computador:
- [Node.js](https://nodejs.org/) (versão 18 ou superior)
- [npm](https://www.npmjs.com/) (vem junto com o Node.js)

---

Instalar dependências
npm install

Na raiz do projeto existe um arquivo chamado .env.example.
Faça uma cópia dele e renomeie para .env:
cp .env.example .env

Conteúdo do .env (padrão com SQLite):
DATABASE_URL="file:./dev.db"

Criar e popular o banco de dados
Execute os comandos abaixo para criar as tabelas e inserir dados iniciais:
npx prisma migrate dev --name init
npx prisma db seed

Rodar o servidor
npm run dev

O servidor estará disponível em:
http://localhost:3000





