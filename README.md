# API Kalita Fotografia

Este é o setup inicial da API do projeto **Kalita Fotografia**, construída com **Node.js**, **Express**, **TypeScript** e integrada com **Prisma** para gerenciamento de banco de dados.

O projeto já conta com dependências essenciais para segurança, validação, envio de e-mails e boas práticas em APIs RESTful.

---

## Tecnologias e Dependências

### Principais

* **Node.js** – Runtime para executar o backend.
* **Express** – Framework web para criar rotas e middlewares.
* **TypeScript** – Tipagem estática para JavaScript.
* **Prisma** – ORM moderno para manipulação de banco de dados.
* **Zod** – Validação de schemas e dados de entrada.
* **bcrypt** – Hash de senhas.
* **cookie-parser** – Parse de cookies.
* **cors** – Controle de políticas de acesso.
* **express-rate-limit** – Limitação de requisições para segurança.
* **dotenv** – Gerenciamento de variáveis de ambiente.
* **nodemailer / resend** – Envio de e-mails.
* **jose** – Criptografia e JWT.

### DevDependencies

* **nodemon** – Reinicia o servidor automaticamente durante o desenvolvimento.
* **prettier** – Formatação de código.
* **tsx** – Execução de arquivos TypeScript diretamente.
* **@types/...** – Tipagens para TypeScript.

---

## Scripts Disponíveis

| Script          | Descrição                                                     |
| --------------- | ------------------------------------------------------------- |
| `npm run dev`   | Executa a aplicação em modo desenvolvimento com `nodemon`.    |
| `npm run build` | Compila o TypeScript para JavaScript em `dist/`.              |
| `npm start`     | Executa a aplicação compilada em produção (`dist/server.js`). |
| `npm test`      | Script placeholder para testes.                               |

---

## Setup Inicial

### 1. Clonar o repositório

```bash
git clone <URL_DO_REPOSITORIO>
cd api_kalita_fotografia
```

### 2. Instalar dependências

```bash
# Usando npm
npm install

# Ou usando yarn
yarn
```

### 3. Configurar variáveis de ambiente

Crie um arquivo `.env` na raiz do projeto com as variáveis necessárias, por exemplo:

```
DATABASE_URL="postgresql://user:password@localhost:5432/kalita"
JWT_SECRET="seu_segredo_aqui"
EMAIL_USER="email@provedor.com"
EMAIL_PASS="senha_do_email"
```

> Ajuste conforme seu ambiente local.

### 4. Rodar a aplicação

```bash
npm run dev
```

O servidor estará disponível em `http://localhost:3000` (ou porta configurada).

---

## Estrutura do Projeto

```
api_kalita_fotografia/
├─ src/
│  ├─ routes/          # Rotas da aplicação
│  ├─ controllers/     # Lógica dos endpoints
│  ├─ services/        # Serviços e integrações (email, auth, etc)
│  ├─ middlewares/     # Middlewares (auth, rate-limit, cors)
│  ├─ prisma/          # Configurações e migrations do Prisma
│  └─ utils/           # Funções auxiliares
├─ .env
├─ package.json
├─ tsconfig.json
└─ .gitignore
```

---

## Observações

* Recomenda-se rodar **`npm run build`** antes de subir em produção.
* O `.gitignore` já deve incluir arquivos como `node_modules/`, `dist/` e variáveis sensíveis.
* Todas as rotas devem validar os dados com **Zod** para garantir segurança e consistência.

---

## Contribuição

1. Faça um fork do projeto.
2. Crie uma branch com a feature ou bugfix.
3. Abra um Pull Request descrevendo as alterações.

---

Feito com ❤️ para a **Comunidade Frontend Fusion**.
