# Sistema de Reservaciones - Backend y Frontend con Docker

## Descripción
Este repositorio contiene un sistema de reservaciones compuesto por un frontend en Svelte y un backend en .NET Core (ASP.NET). Este proyecto utiliza Docker para contenerizar ambos servicios y se conecta a una base de datos SQLite.

## Requisitos
- Docker instalado en tu máquina.

## Estructura del Proyecto
- `/backend`: Código del backend basado en ASP.NET Core.
- `/frontend`: Código del frontend basado en Svelte.
- `docker-compose.yml`: Configuración para ejecutar ambos servicios (frontend y backend) con Docker.

## Pasos para Ejecutar el Proyecto

### 1. Clonar el Repositorio
```bash
git clone https://github.com/belllgg/ReservationSystem.git
cd ReservationSystem
```

### 2. Construir y Ejecutar los Contenedores con Docker Compose
Asegúrate de estar en la raíz del proyecto donde se encuentra el archivo docker-compose.yml. Luego, ejecuta:
```bash
docker-compose build
docker-compose up
```

Estos comandos realizan lo siguiente:
- Construye las imágenes de los contenedores para el frontend y backend
- Levanta ambos servicios en contenedores Docker

### 3. Acceder al Frontend
Una vez que los contenedores estén en funcionamiento, accede al frontend:
- URL: http://localhost:3000

### 4. Acceder al Backend (Swagger)
El backend estará escuchando en el puerto 5136:
- URL Swagger: http://localhost:5136/swagger/index.html

## Docker Compose y Configuración de Puertos

```yaml
version: '3'
services:
  backend:
    build:
      context: ./backend
      dockerfile: Dockerfile
    ports:
      - "5136:8080"
    environment:
      - ASPNETCORE_URLS=http://+:8080
      - ASPNETCORE_ENVIRONMENT=Development
    networks:
      - app-network

  frontend:
    build:
      context: ./frontend
      dockerfile: Dockerfile
    ports:
      - "3000:80"
    depends_on:
      - backend
    networks:
      - app-network

networks:
  app-network:
    driver: bridge
```

### Explicación del Mapeo de Puertos

#### Backend:
- Puerto interno (contenedor): 8080
- Puerto externo (máquina): 5136
- Acceso Swagger: http://localhost:5136/swagger/index.html

#### Frontend:
- Puerto externo (máquina): 3000
- Acceso: http://localhost:3000

## Conexión Entre Frontend y Backend
El frontend (Svelte) hace solicitudes al backend (ASP.NET Core) a través de la URL http://localhost:5136.

## Base de Datos
- Tipo: SQLite
Al ejecutar el proyecto, si la base de datos no existe, se creará automáticamente en el contenedor.

## Desarrollo Local
Para aplicar cambios en el código:
```bash
docker-compose up --build
```
