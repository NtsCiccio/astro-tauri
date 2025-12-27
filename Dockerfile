# Build stage
FROM node:25.1.0-alpine AS builder

WORKDIR /app

# Copia i file di configurazione
COPY package*.json ./
COPY .nvmrc ./
COPY astro.config.mjs ./
COPY tsconfig.json ./

# Installa le dipendenze
RUN npm ci

# Copia il codice sorgente
COPY src ./src
COPY public ./public

# Build dell'applicazione Astro
RUN npm run build

# Production stage
FROM nginx:alpine AS production

# Copia i file buildati da Astro
COPY --from=builder /app/dist /usr/share/nginx/html

# Copia configurazione nginx personalizzata
COPY nginx.conf /etc/nginx/nginx.conf

# Verifica che nginx.conf sia valido
RUN nginx -t

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]

