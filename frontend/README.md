El código del frontend gestiona la funcionalidad del sistema de reservas, incluyendo:

Cargar y mostrar la lista de reservas desde el backend.
Implementar opciones de filtrado para buscar reservas por nombre, servicio, fecha y estado.
Proporcionar funcionalidad para crear, actualizar y eliminar reservas.
Exportar los datos de reservas a una hoja de cálculo de Excel.

Los principales componentes y características incluyen:

El componente ReservationForm para crear y actualizar reservas.
Filtrado reactivo basado en las entradas del usuario.
Formateo de fechas y horas para la visualización.
Diálogos de confirmación para eliminar reservas.
Manejo de errores y gestión del estado de carga.
Estilos con las clases de utilidad de Tailwind CSS.

El código utiliza Svelte como framework de UI y se integra con el reservationStore para interactuar con la API del backend.

El manejo de errores en el código del frontend se realiza de la siguiente manera:

Cuando se produce un error al cargar las reservas, se establece un mensaje de error en la variable error y se muestra en la interfaz de usuario.
Si ocurre algún error al actualizar o eliminar una reserva, se muestran diálogos de Swal para informar al usuario sobre el problema y permitirle intentarlo de nuevo.

Específicamente:

En la función handleDelete, se utiliza Swal.fire para mostrar un diálogo de confirmación antes de eliminar una reserva. Si la eliminación es exitosa, se actualiza la lista de reservas filtrada. Si ocurre un error, se muestra un mensaje de error.

En la función handleUpdate, se utiliza Swal.fire para mostrar un diálogo con un formulario para actualizar los detalles de una reserva. Si la actualización es exitosa, se muestra un mensaje de éxito. Si ocurre un error, se muestra un mensaje de error.

## Ejecutar
Ubicacion raiz del frontend

npm run dev

- Acceso: http://localhost:5173

