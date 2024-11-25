import type { Reservation } from './types/reservation';

const BASE_URL = 'http://localhost:5136/api/Reservations';

export const reservationApi = {
    // Obtener todas las reservas (usando /viewing)
    async getAll(): Promise<Reservation[]> {
        const response = await fetch(`${BASE_URL}/viewing`);
        if (!response.ok) {
            throw new Error('Error al obtener las reservas');
        }
        return response.json();
    },

    // Obtener una reserva por su ID
    async getById(id: number): Promise<Reservation> {
        const response = await fetch(`${BASE_URL}/viewing/${id}`);
        if (!response.ok) {
            throw new Error('Error al obtener la reserva');
        }
        return response.json();
    },

    // Crear una nueva reserva (usando /booking)
    async create(newReservation: Omit<Reservation, 'id' | 'createdAt'>): Promise<Reservation> {
        const response = await fetch(`${BASE_URL}/booking`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newReservation),
        });
        if (!response.ok) {
            throw new Error('Error al crear la reserva');
        }
        return response.json();
    },

    // Actualizar una reserva existente (usando /modifying)
    async update(id: number, updatedReservation: Reservation): Promise<void> {
        const response = await fetch(`${BASE_URL}/modifying/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedReservation),
        });
        if (!response.ok) {
            throw new Error('Error al actualizar la reserva');
        }

        // El backend responde con 204 No Content, no es necesario retornar nada
    },

    // Eliminar una reserva (usando /cancelling)
    async delete(id: number): Promise<void> {
        const response = await fetch(`${BASE_URL}/cancelling/${id}`, {
            method: 'DELETE',
        });
        if (!response.ok) {
            throw new Error('Error al eliminar la reserva');
        }
    },
};
