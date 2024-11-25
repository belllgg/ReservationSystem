<script lang="ts">
    import { fade } from 'svelte/transition';
    import { reservationStore } from '../stores/reservationStore';

    let date = '';
    let startTime = '';
    let endTime = '';
    let customerName = '';
    let customerEmail = '';
    let customerPhone = '';
    let serviceName = '';
    let servicePrice = 0;
    let error = '';
    let success = '';
    let isLoading = false;
    let reservations = [];

    // Opciones de servicios
    const services = [
        { name: 'Corte de Cabello', price: 20 },
        { name: 'Masaje Relajante', price: 50 },
        { name: 'Paseo Guiado', price: 100 },
        { name: 'Habitación Simple', price: 150 },
        { name: 'Habitación Doble', price: 200 }
    ];

    async function loadReservations() {
        try {
            reservations = await reservationStore.getReservations();
        } catch (e) {
            console.error("Error al cargar las reservas", e);
        }
    }

    async function handleSubmit() {
        isLoading = true;
        error = '';
        success = '';
        
        try {
            const newReservation = {
                date,
                startTime,
                endTime,
                customerName,
                customerEmail,
                customerPhone,
                serviceName,
                servicePrice,
                status: 'Pending'
            };
            
            await reservationStore.addReservation(newReservation);
            success = '¡Reservación creada exitosamente! 🎉';
            loadReservations();
            
            date = '';
            startTime = '';
            endTime = '';
            customerName = '';
            customerEmail = '';
            customerPhone = '';
            serviceName = '';
            servicePrice = 0;
        } catch (e) {
            error = 'Error al crear la reservación ❌';
            console.error(e);
        } finally {
            isLoading = false;
        }
    }

    const inputClasses = "w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all duration-200 outline-none";
    const labelClasses = "font-medium text-gray-700 mb-2 block";

    // Actualiza el precio cuando se selecciona un servicio
    function updateServicePrice(event) {
        const selectedService = services.find(service => service.name === event.target.value);
        if (selectedService) {
            servicePrice = selectedService.price;
        }
    }
</script>

<div class="min-h-screen bg-gradient-to-br from-indigo-600 to-purple-700 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-4xl mx-auto">
        <div class="bg-white rounded-2xl shadow-lg p-8 space-y-8" in:fade>
            <div class="text-center mb-6">
                <h2 class="text-4xl font-semibold text-indigo-700 mb-3">Crear una Nueva Reservación</h2>
                <p class="text-gray-600">Llena los detalles a continuación para crear una nueva reservación.</p>
            </div>

            {#if error}
                <div class="mb-6 p-4 bg-red-50 border-l-4 border-red-500 rounded-lg flex items-center space-x-3" 
                     transition:fade>
                    <div class="text-red-700">{error}</div>
                </div>
            {/if}
            
            {#if success}
                <div class="mb-6 p-4 bg-green-50 border-l-4 border-green-500 rounded-lg flex items-center space-x-3" 
                     transition:fade>
                    <div class="text-green-700">{success}</div>
                </div>
            {/if}

            <form on:submit|preventDefault={handleSubmit} class="space-y-6">
                <!-- Información de la Reserva -->
                <div class="bg-gray-50 p-6 rounded-xl">
                    <h3 class="font-semibold text-indigo-700 mb-4">📅 Información de la Reserva</h3>
                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div>
                            <label for="date" class={labelClasses}>Fecha</label>
                            <input
                                type="date"
                                id="date"
                                bind:value={date}
                                required
                                class={inputClasses}
                            />
                        </div>
                        <div>
                            <label for="startTime" class={labelClasses}>Hora Inicio</label>
                            <input
                                type="time"
                                id="startTime"
                                bind:value={startTime}
                                required
                                class={inputClasses}
                            />
                        </div>
                        <div>
                            <label for="endTime" class={labelClasses}>Hora Fin</label>
                            <input
                                type="time"
                                id="endTime"
                                bind:value={endTime}
                                required
                                class={inputClasses}
                            />
                        </div>
                    </div>
                </div>

                <!-- Datos del Cliente -->
                <div class="bg-gray-50 p-6 rounded-xl">
                    <h3 class="font-semibold text-indigo-700 mb-4">👤 Datos del Cliente</h3>
                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div>
                            <label for="customerName" class={labelClasses}>Nombre Completo</label>
                            <input
                                type="text"
                                id="customerName"
                                bind:value={customerName}
                                required
                                placeholder="Ej: Juan Pérez"
                                class={inputClasses}
                            />
                        </div>
                        <div>
                            <label for="customerEmail" class={labelClasses}>Email</label>
                            <input
                                type="email"
                                id="customerEmail"
                                bind:value={customerEmail}
                                required
                                placeholder="ejemplo@correo.com"
                                class={inputClasses}
                            />
                        </div>
                        <div class="sm:col-span-2">
                            <label for="customerPhone" class={labelClasses}>Teléfono</label>
                            <input
                                type="tel"
                                id="customerPhone"
                                bind:value={customerPhone}
                                required
                                placeholder="+1 234 567 8900"
                                class={inputClasses}
                            />
                        </div>
                    </div>
                </div>

                <!-- Detalles del Servicio -->
                <div class="bg-gray-50 p-6 rounded-xl">
                    <h3 class="font-semibold text-indigo-700 mb-4">💼 Detalles del Servicio</h3>
                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div>
                            <label for="serviceName" class={labelClasses}>Servicio</label>
                            <select
                                id="serviceName"
                                bind:value={serviceName}
                                on:change={updateServicePrice}
                                required
                                class={inputClasses}
                            >
                                <option value="" disabled selected>Selecciona un servicio</option>
                                {#each services as service}
                                    <option value={service.name} data-price={service.price}>
                                        {service.name} - ${service.price}
                                    </option>
                                {/each}
                            </select>
                        </div>
                        <div>
                            <label for="servicePrice" class={labelClasses}>Precio</label>
                            <input
                                type="number"
                                id="servicePrice"
                                bind:value={servicePrice}
                                required
                                min="0"
                                step="0.01"
                                class={inputClasses}
                            />
                        </div>
                    </div>
                </div>

                <!-- Botón de Envío -->
                <button
                    type="submit"
                    class="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-4 rounded-xl
                           focus:outline-none focus:ring-4 focus:ring-indigo-200 transition-all duration-200"
                    disabled={isLoading}
                >
                    {#if isLoading}
                        <div class="w-5 h-5 border-t-2 border-b-2 border-white rounded-full animate-spin"></div>
                    {/if}
                    <span>{isLoading ? 'Creando...' : 'Crear Reservación'}</span>
                </button>
            </form>
        </div>
    </div>
</div>
