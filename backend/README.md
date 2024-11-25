
Código fuente del servicio backend:

Implementa los siguientes endpoints REST en el controlador de reservas:

GET /api/Reservations/viewing: Obtiene todas las reservas
GET /api/Reservations/viewing/{id}: Obtiene una reserva por ID
POST /api/Reservations/booking: Crea una nueva reserva
PUT /api/Reservations/modifying/{id}: Actualiza una reserva existente
DELETE /api/Reservations/cancelling/{id}: Elimina una reserva

## Ejecutar
Ubicacion raiz del backed

dotnet build
cd ReservationSystem.Api
dotnet run

- Acceso Swagger: http://localhost:5136/swagger/index.html


## Base de Datos
- Tipo: SQLite
Al ejecutar el proyecto, si la base de datos no existe, se creará automáticamente en el contenedor.


