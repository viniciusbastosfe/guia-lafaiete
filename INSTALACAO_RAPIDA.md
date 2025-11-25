# Instalacao Rapida - Guia Lafaiete v2.0.0

Autor: Vinicius Bastos (https://midias.me)
Tempo estimado: 15-20 minutos

## Pre-requisitos

- Node.js 18+
- npm ou yarn
- Git
- Conta no Supabase

## Passo a Passo

### 1. Clone o Repositorio
git clone https://github.com/seu-usuario/guia-lafaiete.git
cd guia-lafaiete

### 2. Instale as Dependencias
npm install

### 3. Configure o Supabase
1. Crie um projeto no Supabase
2. Execute os scripts SQL na ordem (001 a 004)
3. Crie o primeiro usuario admin
4. Execute o script 005 com o UUID do usuario

### 4. Configure o arquivo .env
Copie o .env.example para .env e preencha com suas credenciais do Supabase

### 5. Inicie o servidor
npm run dev

### 6. Acesse a aplicacao
http://localhost:3000

Para mais detalhes, consulte o ROADMAP.md
