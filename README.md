João Victor de Jesus Augusto

# 📋 TaskFlow

TaskFlow é um sistema completo de **Gerenciamento de tarefas** com:

* ✅ Autenticação de usuários (Cadastro/Login)
* 🔐 Segurança com **JWT** e senha criptografada (**bcrypt**)
* 🗂️ CRUD completo de tarefas (Criar, Listar, Editar, Concluir, Excluir)
* 🧠 Cada usuário vê **apenas suas próprias tarefas**
* 🗄️ Banco de dados **PostgreSQL**
* 🖥️ Frontend em **React**
* ⚙️ Backend em **Node.js + Express**
* 🎨 Interface moderna em tons de azul

---

# 🧱 Estrutura do Projeto

```
taskflow/
 ├── backend/
 │   ├── src/
 │   │   ├── config/
 │   │   ├── controllers/
 │   │   ├── middlewares/
 │   │   ├── models/
 │   │   ├── routes/
 │   │   └── server.js
 │   └── package.json
 │
 ├── frontend/
 │   ├── src/
 │   │   ├── pages/
 │   │   ├── services/
 │   │   ├── styles.css
 │   │   └── index.js
 │   └── package.json
 
 
```

---

# 🛠️ Tecnologias Usadas

* **Frontend:** React.js + Axios
* **Backend:** Node.js + Express
* **Banco de Dados:** PostgreSQL
* **Autenticação:** JWT + bcrypt
* **Versionamento:** Git

---

# 🗄️ Configurando o Banco de Dados (PostgreSQL)

Abra o **pgAdmin** ou o **psql** e rode:

```sql
CREATE DATABASE taskflow;

\c taskflow;

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(150) UNIQUE NOT NULL,
  password_hash TEXT NOT NULL
);

CREATE TABLE tasks (
  id SERIAL PRIMARY KEY,
  title VARCHAR(150) NOT NULL,
  description TEXT,
  status BOOLEAN DEFAULT false,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE
);
```

---

# ⚙️ Configurando o Backend

## 1️⃣ Entrar na pasta

```bash
cd taskflow/backend
```

## 2️⃣ Instalar dependências

```bash
npm install
```

## 3️⃣ Criar arquivo `.env`

Crie um arquivo chamado `.env` dentro de `backend`:

```
DB_HOST=localhost
DB_USER=postgres
DB_PASSWORD=SUA_SENHA_DO_POSTGRES
DB_NAME=taskflow
DB_PORT=5432
JWT_SECRET=uma_chave_secreta_segura
```

## 4️⃣ Rodar o backend

```bash
npm run dev
```

Se estiver certo, você verá algo como:

```
Servidor rodando na porta 3333
Banco conectado com sucesso
```

Teste no navegador:

```
http://localhost:3333
```

---

# 🎨 Configurando o Frontend

## 1️⃣ Entrar na pasta

```bash
cd taskflow/frontend
```

## 2️⃣ Instalar dependências

```bash
npm install
```

## 3️⃣ Rodar o frontend

```bash
npm start
```

Vai abrir automaticamente:

```
http://localhost:3000
```

---

# 🧪 Usuário de Teste

Você pode logar, por exemplo:

* **Nome:** João Teste
* **Email:** [joao@teste.com]
* **Senha:** 123456

Faça login com esse email e senha para acessar uma conta já criada, e também pode fazer um cadastro com outro e-mail qualquer.

---

# 🚀 Como Rodar o Projeto Completo (Resumo)

### Backend:

```bash
cd backend
npm install
npm run dev
```

### Frontend:

```bash
cd frontend
npm install
npm start
```

# 🔒 Segurança

* Cada usuário só acessa **suas próprias tarefas**

---

# ✨ Funcionalidades

* ✅ Cadastro de usuário
* ✅ Login seguro
* ✅ Criar tarefas
* ✅ Listar tarefas do usuário
* ✅ Editar tarefas
* ✅ Marcar como concluída/pendente
* ✅ Excluir tarefas
* ✅ Interface bonita e responsiva

---

# 📌 Observação Importante

Se algo der erro:

* Confira se o **PostgreSQL está rodando**
* Confira se a **senha do banco no `.env` está correta**
* Confira se o **backend está ligado antes do frontend**
* Confira se está rodando os comandos **na pasta certa**

---

# ❤️ Autor

Projeto desenvolvido por João Victor de Jesus Augusto como sistema completo de gerenciamento de tarefas usando **React + Node + PostgreSQL**.

---
*
