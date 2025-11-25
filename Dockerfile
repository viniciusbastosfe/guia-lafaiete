# Etapa 1: build do Vite
FROM node:20-alpine AS build

WORKDIR /app

# Copia apenas arquivos de dependência primeiro (cache melhor)
COPY package.json package-lock.json ./
RUN npm install

# Copia o restante do código
COPY . .

# Gera a build de produção do Vite
RUN npm run build

# Etapa 2: servidor web leve (nginx) só pra servir a pasta dist
FROM nginx:alpine

# Remove config default (opcional, mas deixa mais limpo)
RUN rm -rf /usr/share/nginx/html/*

# Copia os arquivos gerados pelo Vite para o Nginx
COPY --from=build /app/dist /usr/share/nginx/html

# Copia configuração Nginx customizada para SPA
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expõe a porta HTTP
EXPOSE 80

# Sobe o nginx em foreground
CMD ["nginx", "-g", "daemon off;"]
