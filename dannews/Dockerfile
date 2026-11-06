# Etapa 1: Compilacion de la aplicacion de Angular
FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build -- --configuration production

# Etapa 2: Servidor web Nginx para servir los archivos estaticos
FROM nginx:1.25-alpine
COPY --from=build /app/dist/dannews/browser /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]