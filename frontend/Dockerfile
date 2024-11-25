FROM node:18 as build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx:alpine
# Ajusta esta línea según el directorio de salida de tu build
COPY --from=build /app/build /usr/share/nginx/html
# O si tu configuración usa otro directorio, podrías usar:
# COPY --from=build /app/dist /usr/share/nginx/html