import { writable } from 'svelte/store';
import type { Reservation } from '../types/reservation';
import { reservationApi } from '../api';

function createReservationStore() {
    const { subscribe, set, update } = writable<Reservation[]>([]);

    return {
        subscribe,

        // Cargar todas las reservaciones
        loadReservations: async () => {
            try {
                const reservations = await reservationApi.getAll();
                set(reservations); // Actualiza el store con las reservas cargadas
            } catch (error) {
                console.error('Error loading reservations:', error);
                throw error; // Permite manejar errores en el componente
            }
        },

        // Agregar una nueva reservación
        addReservation: async (newReservation: Omit<Reservation, 'id' | 'createdAt'>) => {
            try {
                const created = await reservationApi.create(newReservation);
                update(reservations => [...reservations, created]); // Actualiza el store con la nueva reserva
                return created;
            } catch (error) {
                console.error('Error creating reservation:', error);
                throw error;
            }
        },

        // Actualizar una reservación existente
        updateReservation: async (reservation: Reservation) => {
            try {
                // No es necesario obtener la reservación actualizada del backend si se retorna 204
                update(reservations =>
                    reservations.map(r =>
                        r.id === reservation.id ? { ...r, ...reservation } : r
                    )
                ); // Actualiza la reserva en el store localmente
                return reservation;
            } catch (error) {
                console.error('Error updating reservation:', error);
                throw error;
            }
        },

        // Eliminar una reservación
        deleteReservation: async (id: number) => {
            try {
                await reservationApi.delete(id);

                update(reservations =>
                    reservations.filter(r => r.id !== id)
                ); // Elimina la reserva del store localmente
            } catch (error) {
                console.error('Error deleting reservation:', error);
                throw error;
            }
        }
    };
}

export const reservationStore = createReservationStore();
