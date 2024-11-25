using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ReservationSystem.Data;
using ReservationSystem.Data.Models;

namespace ReservationSystem.Api.Controllers
{
    // Define la ruta para acceder a los endpoints de este controlador
    [ApiController]
    [Route("api/[controller]")]
    public class ReservationsController : ControllerBase
    {
        private readonly AppDbContext _context;

        // Constructor del controlador que recibe el contexto de la base de datos
        public ReservationsController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/Reservations/viewing
        [HttpGet("viewing")]
        public async Task<ActionResult<IEnumerable<Reservation>>> GetReservations()
        {
            return await _context.Reservations.ToListAsync();
        }

        // GET: api/Reservations/viewing/{id}
        [HttpGet("viewing/{id}")]
        public async Task<ActionResult<Reservation>> GetReservation(int id)
        {
            var reservation = await _context.Reservations.FindAsync(id);

            // Si la reserva no se encuentra, retornamos un NotFound
            if (reservation == null)
            {
                return NotFound();
            }

            return reservation;
        }

        // POST: api/Reservations/booking
        [HttpPost("booking")]
        public async Task<ActionResult<Reservation>> CreateReservation(Reservation reservation)
        {
            // Agregamos la nueva reserva al contexto
            _context.Reservations.Add(reservation);
            // Guardamos los cambios en la base de datos
            await _context.SaveChangesAsync();

            // Retornamos un CreatedAtAction con la ruta para obtener la reserva por su id
            return CreatedAtAction(nameof(GetReservation), new { id = reservation.Id }, reservation);
        }

        // PUT: api/Reservations/modifying/{id}
        [HttpPut("modifying/{id}")]
        public async Task<IActionResult> UpdateReservation(int id, Reservation reservation)
        {
            // Verificamos si el id de la reserva coincide con el id del parámetro
            if (id != reservation.Id)
            {
                return BadRequest();
            }

            // Marcamos la entidad como modificada
            _context.Entry(reservation).State = EntityState.Modified;

            try
            {
                // Guardamos los cambios en la base de datos
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                // Si ocurre una excepción de concurrencia, comprobamos si la reserva existe
                if (!ReservationExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw; // Si no es un error de concurrencia, lo lanzamos para ver el error real
                }
            }

            // Retornamos NoContent para indicar que la actualización fue exitosa
            return NoContent();
        }

        // DELETE: api/Reservations/cancelling/{id}
        [HttpDelete("cancelling/{id}")]
        public async Task<IActionResult> DeleteReservation(int id)
        {
            // Buscamos la reserva por id
            var reservation = await _context.Reservations.FindAsync(id);
            if (reservation == null)
            {
                return NotFound();
            }

            // Eliminamos la reserva y guardamos los cambios
            _context.Reservations.Remove(reservation);
            await _context.SaveChangesAsync();

            // Retornamos NoContent para indicar que la eliminación fue exitosa
            return NoContent();
        }

        // Método privado para verificar si una reserva existe
        private bool ReservationExists(int id)
        {
            return _context.Reservations.Any(e => e.Id == id);
        }
    }
}
