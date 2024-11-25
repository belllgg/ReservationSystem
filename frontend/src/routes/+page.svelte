<script lang="ts">
    import { onMount } from 'svelte';
    import { reservationStore } from '$lib/stores/reservationStore';
    import ReservationForm from '$lib/components/ReservationForm.svelte';
    import type { Reservation } from '$lib/types/reservation';
    import * as XLSX from 'xlsx';
    import Swal from 'sweetalert2';

    let loading = true;
    let error = '';
    // Usar $: para hacer la variable reactiva
    $: reservations = $reservationStore;
    
    let filterName = '';
    let filterService = '';
    let filterDate = '';
    let filterStatus = '';

    onMount(async () => {
        try {
            await reservationStore.loadReservations();
        } catch (e) {
            error = 'Error loading reservations';
        } finally {
            loading = false;
        }
    });

    const formatDate = (date: string) => {
        return new Date(date).toLocaleDateString();
    };

    const formatTime = (time: string) => {
        return time.slice(0, 5);
    };

    const handleDelete = async (id: number) => {
        const result = await Swal.fire({
            title: '¿Estás seguro?',
            text: "No podrás revertir esta acción",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, eliminar',
            cancelButtonText: 'Cancelar'
        });

        if (result.isConfirmed) {
            try {
                await reservationStore.deleteReservation(id);
                // Actualizar la lista después de eliminar
                reservations = reservations.filter(r => r.id !== id);
                Swal.fire(
                    '¡Eliminado!',
                    'La reservación ha sido eliminada.',
                    'success'
                );
            } catch (error) {
                Swal.fire(
                    'Error',
                    'No se pudo eliminar la reservación.',
                    'error'
                );
            }
        }
    };

   const handleUpdate = async (reservation: Reservation) => {
    try {
        const { value: formValues } = await Swal.fire({
            title: 'Actualizar Reservación',
            html: `
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px; width: 500px;">
                    <input id="swal-input1" class="swal2-input" style="height: 35px; width: 100%;" value="${reservation.customerName}" placeholder="Nombre del Cliente"/>
                    <input id="swal-input2" class="swal2-input" style="height: 35px; width: 100%;" value="${reservation.servicePrice}" placeholder="Precio del Servicio"/>
                    <input id="swal-input3" class="swal2-input" style="height: 35px; width: 100%;" value="${reservation.date}" placeholder="Fecha"/>
                    <input id="swal-input4" class="swal2-input" style="height: 35px; width: 100%;" value="${reservation.startTime}" placeholder="Hora de Inicio"/>
                    <input id="swal-input5" class="swal2-input" style="height: 35px; width: 100%;" value="${reservation.endTime}" placeholder="Hora de Fin"/>
                    <input id="swal-input6" class="swal2-input" style="height: 35px; width: 100%;" value="${reservation.serviceName}" placeholder="Nombre del Servicio"/>
                    <div style="grid-column: span 2;">
                        <select id="swal-input7" class="swal2-input" style="height: 35px; width: 50%; padding: 5px; box-sizing: border-box; overflow: hidden;">
                            <option value="Pending" ${reservation.status === 'Pending' ? 'selected' : ''}>Pendiente</option>
                            <option value="Confirmed" ${reservation.status === 'Confirmed' ? 'selected' : ''}>Confirmada</option>
                            <option value="Cancelled" ${reservation.status === 'Cancelled' ? 'selected' : ''}>Cancelada</option>
                        </select>
                    </div>
                </div>
            `,
            focusConfirm: false,
            preConfirm: () => {
                return {
                    customerName: (document.getElementById('swal-input1') as HTMLInputElement).value,
                    servicePrice: parseFloat((document.getElementById('swal-input2') as HTMLInputElement).value),
                    date: (document.getElementById('swal-input3') as HTMLInputElement).value,
                    startTime: (document.getElementById('swal-input4') as HTMLInputElement).value,
                    endTime: (document.getElementById('swal-input5') as HTMLInputElement).value,
                    serviceName: (document.getElementById('swal-input6') as HTMLInputElement).value,
                    status: (document.getElementById('swal-input7') as HTMLSelectElement).value
                };
            }
        });

        if (!formValues) return;

        const updatedReservation: Reservation = {
            ...reservation,
            customerName: formValues.customerName,
            servicePrice: formValues.servicePrice,
            date: formValues.date,
            startTime: formValues.startTime,
            endTime: formValues.endTime,
            serviceName: formValues.serviceName,
            status: formValues.status
        };

        await reservationStore.updateReservation(updatedReservation);

        await Swal.fire({
            title: '¡Actualizado!',
            text: 'La reservación ha sido actualizada exitosamente.',
            icon: 'success'
        });

    } catch (error) {
        console.error('Error al actualizar:', error);

        await Swal.fire({
            title: 'Error',
            text: 'No se pudo actualizar la reservación. Por favor, intente nuevamente.',
            icon: 'error'
        });
    }
};



    const exportToExcel = () => {
        const ws = XLSX.utils.json_to_sheet(reservations.map(reservation => ({
            Nombre: reservation.customerName,
            Servicio: reservation.serviceName,
            Fecha: formatDate(reservation.date),
            Hora: `${formatTime(reservation.startTime)} - ${formatTime(reservation.endTime)}`,
            Precio: `$${reservation.servicePrice}`,
            Estado: reservation.status
        })));

        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Reservaciones');
        XLSX.writeFile(wb, 'reservaciones.xlsx');
    };

    // Hacer la función de filtrado reactiva
    $: filteredReservations = reservations.filter(reservation => {
        const matchesName = reservation.customerName.toLowerCase().includes(filterName.toLowerCase());
        const matchesService = reservation.serviceName.toLowerCase().includes(filterService.toLowerCase());
        const matchesDate = filterDate ? formatDate(reservation.date) === filterDate : true;
        const matchesStatus = filterStatus ? reservation.status === filterStatus : true;

        return matchesName && matchesService && matchesDate && matchesStatus;
    });
</script>

<div class="container">
    <div class="form-container">
        <div class="card">
            <ReservationForm />
        </div>
    </div>

    <div class="reservations-container">
        <div class="card">
            <h2 class="card-title">Lista de Reservaciones</h2>
            <button class="btn export" on:click={exportToExcel}>Exportar a Excel</button>
            
            <div class="filters-container">
                <input type="text" placeholder="Filtrar por Nombre" bind:value={filterName} class="filter-input"/>
                <input type="text" placeholder="Filtrar por Servicio" bind:value={filterService} class="filter-input"/>
                <input type="date" bind:value={filterDate} class="filter-input"/>
                <select bind:value={filterStatus} class="filter-input">
                    <option value="">Filtrar por Estado</option>
                    <option value="Pending">Pendiente</option>
                    <option value="Confirmed">Confirmada</option>
                    <option value="Cancelled">Cancelada</option>
                </select>
            </div>
            
            {#if loading}
                <p class="loading-text">Cargando...</p>
            {:else if error}
                <p class="error-text">{error}</p>
            {:else if reservations.length === 0}
                <p class="no-reservations">No se encontraron reservaciones</p>
            {:else}
                <table class="reservations-table">
                    <thead>
                        <tr>
                            <th>Nombre</th>
                            <th>Servicio</th>
                            <th>Fecha</th>
                            <th>Hora</th>
                            <th>Precio</th>
                            <th>Estado</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {#each filteredReservations as reservation}
                            <tr>
                                <td>{reservation.customerName}</td>
                                <td>{reservation.serviceName}</td>
                                <td>{formatDate(reservation.date)}</td>
                                <td>{formatTime(reservation.startTime)} - {formatTime(reservation.endTime)}</td>
                                <td>${reservation.servicePrice}</td>
                                <td>
                                    <span class="status 
                                        {reservation.status === 'Pending' ? 'pending' : 
                                        reservation.status === 'Confirmed' ? 'confirmed' : 'cancelled'}">
                                        {reservation.status}
                                    </span>
                                </td>
                                <td>
                                    <button class="btn update" on:click={() => handleUpdate(reservation)}>✏️</button>
                                    <button class="btn delete" on:click={() => handleDelete(reservation.id)}>✘</button>
                                </td>
                            </tr>
                        {/each}
                    </tbody>
                </table>
            {/if}
        </div>
    </div>
</div>

<style>
    .container {
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 2rem;
        font-family: 'Arial', sans-serif;
    }

    .form-container {
        width: 100%;
        max-width: 800px;
        margin-bottom: 3rem;
    }

    .card {
        background-color: #fff;
        border-radius: 10px;
        box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
        padding: 2rem;
        text-align: center;
    }

    .card-title {
        font-size: 24px;
        font-weight: 600;
        color: #333;
    }

    .reservations-container {
        width: 100%;
        max-width: 1000px;
    }

    .reservations-table {
        width: 100%;
        border-collapse: collapse;
        margin-top: 1rem;
        box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
    }

    .reservations-table th, .reservations-table td {
        padding: 1rem;
        text-align: left;
        border-bottom: 1px solid #f0f0f0;
    }

    .reservations-table th {
        background-color: #f8f9fa;
    }

    .status {
        padding: 0.3rem 0.6rem;
        border-radius: 12px;
        color: white;
        font-weight: 500;
    }

    .status.pending {
        background-color: #ffc107;
    }

    .status.confirmed {
        background-color: #28a745;
    }

    .status.cancelled {
        background-color: #dc3545;
    }

    .btn {
        padding: 0.5rem 1rem;
        border-radius: 5px;
        font-weight: 600;
        border: none;
        cursor: pointer;
        transition: background-color 0.3s ease;
        margin: 0 0.25rem;
    }

    .btn.update {
        background-color: #007bff;
        color: white;
    }

    .btn.update:hover {
        background-color: #0056b3;
    }

    .btn.delete {
        background-color: #dc3545;
        color: white;
    }

    .btn.delete:hover {
        background-color: #c82333;
    }

    .btn.export {
        background-color: #17a2b8;
        color: white;
        margin-bottom: 20px;
    }

    .btn.export:hover {
        background-color: #138496;
    }

    .loading-text {
        color: #888;
    }

    .error-text {
        color: #dc3545;
    }

    .no-reservations {
        color: #6c757d;
    }

    .filters-container {
        display: flex;
        gap: 10px;
        margin-bottom: 20px;
    }

    .filter-input {
        padding: 0.5rem;
        font-size: 1rem;
        border-radius: 5px;
        border: 1px solid #ccc;
    }
</style>