# Usa Node 20 con PNPM
FROM node:20

# Instalar PNPM globalmente
RUN npm install -g pnpm

# Crear carpeta de la app
WORKDIR /app

# Copiar archivos de proyecto
COPY package.json pnpm-lock.yaml ./
RUN pnpm install

# Copiar todo el proyecto
COPY . .

# Exponer el puerto de Expo Web
EXPOSE 8081

# Ejecutar Expo Web
CMD ["pnpm", "expo", "start", "--web"]