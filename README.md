Reservation System - Backend and Frontend with Docker
Este repositorio contiene un sistema de reservaciones compuesto por un frontend en Svelte y un backend en .NET Core (ASP.NET). Este proyecto utiliza Docker para contenerizar ambos servicios y se conecta a una base de datos SQLite.

Requisitos
Docker instalado en tu máquina.

Estructura del Proyecto
/backend: Código del backend basado en ASP.NET Core.
/frontend: Código del frontend basado en Svelte.
docker-compose.yml: Configuración para ejecutar ambos servicios (frontend y backend) con Docker.
Pasos para Ejecutar el Proyecto

1. Clonar el Repositorio
Primero, clona el repositorio en tu máquina local:


git clone https://github.com/tu-usuario/reservation-system.git
cd reservation-system

2. Construir y Ejecutar los Contenedores con Docker Compose
Asegúrate de estar en la raíz del proyecto donde se encuentra el archivo docker-compose.yml. Luego, ejecuta el siguiente comando para construir y ejecutar ambos contenedores (frontend y backend):

docker-compose up --build
Este comando realiza lo siguiente:
Construye las imágenes de los contenedores para el frontend y el backend.
Levanta ambos servicios en contenedores Docker.

3. Acceder al Frontend
Una vez que los contenedores estén en funcionamiento, puedes acceder al frontend de la aplicación en el siguiente enlace:
http://localhost:3000
El frontend está mapeado al puerto 3000 de su máquina.

4. Acceder al Backend (Swagger)
El backend estará escuchando en el puerto 5136 de su máquina, pero dentro del contenedor estará en el puerto 8080. Para ver la interfaz de Swagger y probar las API, abre el siguiente enlace en tu navegador:
http://localhost:5136/swagger/index.html
En este enlace podrás interactuar con las API del backend, revisar los endpoints disponibles, y probar los métodos del sistema de reservaciones.

Docker Compose y Configuración de Puertos
El archivo docker-compose.yml contiene la configuración para los puertos y redes. Aquí están los detalles de la configuración de puertos:

yaml

version: '3'
services:
  backend:
    build:
      context: ./backend
      dockerfile: Dockerfile
    ports:
      - "5136:8080"  # Mapea el puerto 5136 en tu máquina al puerto 8080 del contenedor (backend)
    environment:
      - ASPNETCORE_URLS=http://+:8080  # El backend escucha en el puerto 8080 dentro del contenedor
      - ASPNETCORE_ENVIRONMENT=Development
    networks:
      - app-network

  frontend:
    build:
      context: ./frontend
      dockerfile: Dockerfile
    ports:
      - "3000:80"  # El frontend sigue en el puerto 3000 en tu máquina
    depends_on:
      - backend
    networks:
      - app-network

networks:
  app-network:
    driver: bridge
Explicación del Mapeo de Puertos

Backend:
El contenedor backend está escuchando en el puerto 8080 dentro del contenedor.
Este puerto está mapeado al puerto 5136 en tu máquina local.
Para interactuar con el backend a través de Swagger, usa http://localhost:5136/swagger/index.html.

Frontend:
El contenedor frontend (Svelte) está mapeado al puerto 3000 de tu máquina.
Puedes acceder al frontend en http://localhost:3000.
Cómo Funciona la Conexión Entre Frontend y Backend
El frontend (Svelte) hace solicitudes al backend (ASP.NET Core) a través de la URL http://localhost:5136 para acceder a las API.


Base de Datos
El backend está configurado para usar SQLite como base de datos. Al ejecutar el proyecto, si la base de datos no existe, se creará automáticamente en el contenedor.

Desarrollo Local
Si necesitas hacer cambios en el frontend o backend, puedes modificar el código fuente directamente en las carpetas frontend y backend, luego reconstruir los contenedores utilizando:

docker-compose up --build
Esto reconstruirá las imágenes y aplicará los cambios que hayas realizado.