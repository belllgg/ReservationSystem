import { W as ensure_array_like, R as pop, P as push, T as store_get, V as unsubscribe_stores } from "../../chunks/index.js";
import { w as writable } from "../../chunks/index2.js";
import { e as escape_html } from "../../chunks/escaping.js";
import "sweetalert2";
const replacements = {
  translate: /* @__PURE__ */ new Map([
    [true, "yes"],
    [false, "no"]
  ])
};
function attr(name, value, is_boolean = false) {
  if (value == null || !value && is_boolean || value === "" && name === "class") return "";
  const normalized = name in replacements && replacements[name].get(value) || value;
  const assignment = is_boolean ? "" : `="${escape_html(normalized, true)}"`;
  return ` ${name}${assignment}`;
}
const BASE_URL = "http://localhost:5136/api/Reservations";
const reservationApi = {
  // Obtener todas las reservas (usando /viewing)
  async getAll() {
    const response = await fetch(`${BASE_URL}/viewing`);
    if (!response.ok) {
      throw new Error("Error al obtener las reservas");
    }
    return response.json();
  },
  // Obtener una reserva por su ID
  async getById(id) {
    const response = await fetch(`${BASE_URL}/viewing/${id}`);
    if (!response.ok) {
      throw new Error("Error al obtener la reserva");
    }
    return response.json();
  },
  // Crear una nueva reserva (usando /booking)
  async create(newReservation) {
    const response = await fetch(`${BASE_URL}/booking`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newReservation)
    });
    if (!response.ok) {
      throw new Error("Error al crear la reserva");
    }
    return response.json();
  },
  // Actualizar una reserva existente (usando /modifying)
  async update(id, updatedReservation) {
    const response = await fetch(`${BASE_URL}/modifying/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(updatedReservation)
    });
    if (!response.ok) {
      throw new Error("Error al actualizar la reserva");
    }
  },
  // Eliminar una reserva (usando /cancelling)
  async delete(id) {
    const response = await fetch(`${BASE_URL}/cancelling/${id}`, {
      method: "DELETE"
    });
    if (!response.ok) {
      throw new Error("Error al eliminar la reserva");
    }
  }
};
function createReservationStore() {
  const { subscribe, set, update } = writable([]);
  return {
    subscribe,
    // Cargar todas las reservaciones
    loadReservations: async () => {
      try {
        const reservations = await reservationApi.getAll();
        set(reservations);
      } catch (error) {
        console.error("Error loading reservations:", error);
        throw error;
      }
    },
    // Agregar una nueva reservación
    addReservation: async (newReservation) => {
      try {
        const created = await reservationApi.create(newReservation);
        update((reservations) => [...reservations, created]);
        return created;
      } catch (error) {
        console.error("Error creating reservation:", error);
        throw error;
      }
    },
    // Actualizar una reservación existente
    updateReservation: async (reservation) => {
      try {
        update(
          (reservations) => reservations.map(
            (r) => r.id === reservation.id ? { ...r, ...reservation } : r
          )
        );
        return reservation;
      } catch (error) {
        console.error("Error updating reservation:", error);
        throw error;
      }
    },
    // Eliminar una reservación
    deleteReservation: async (id) => {
      try {
        await reservationApi.delete(id);
        update(
          (reservations) => reservations.filter((r) => r.id !== id)
        );
      } catch (error) {
        console.error("Error deleting reservation:", error);
        throw error;
      }
    }
  };
}
const reservationStore = createReservationStore();
function ReservationForm($$payload, $$props) {
  push();
  let date = "";
  let startTime = "";
  let endTime = "";
  let customerName = "";
  let customerEmail = "";
  let customerPhone = "";
  let servicePrice = 0;
  let isLoading = false;
  const services = [
    { name: "Corte de Cabello", price: 20 },
    { name: "Masaje Relajante", price: 50 },
    { name: "Paseo Guiado", price: 100 },
    { name: "Habitación Simple", price: 150 },
    { name: "Habitación Doble", price: 200 }
  ];
  const inputClasses = "w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all duration-200 outline-none";
  const labelClasses = "font-medium text-gray-700 mb-2 block";
  const each_array = ensure_array_like(services);
  $$payload.out += `<div class="min-h-screen bg-gradient-to-br from-indigo-600 to-purple-700 py-12 px-4 sm:px-6 lg:px-8"><div class="max-w-4xl mx-auto"><div class="bg-white rounded-2xl shadow-lg p-8 space-y-8"><div class="text-center mb-6"><h2 class="text-4xl font-semibold text-indigo-700 mb-3">Crear una Nueva Reservación</h2> <p class="text-gray-600">Llena los detalles a continuación para crear una nueva reservación.</p></div> `;
  {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--> `;
  {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--> <form class="space-y-6"><div class="bg-gray-50 p-6 rounded-xl"><h3 class="font-semibold text-indigo-700 mb-4">📅 Información de la Reserva</h3> <div class="grid grid-cols-1 sm:grid-cols-2 gap-6"><div><label for="date"${attr("class", labelClasses)}>Fecha</label> <input type="date" id="date"${attr("value", date)} required${attr("class", inputClasses)}></div> <div><label for="startTime"${attr("class", labelClasses)}>Hora Inicio</label> <input type="time" id="startTime"${attr("value", startTime)} required${attr("class", inputClasses)}></div> <div><label for="endTime"${attr("class", labelClasses)}>Hora Fin</label> <input type="time" id="endTime"${attr("value", endTime)} required${attr("class", inputClasses)}></div></div></div> <div class="bg-gray-50 p-6 rounded-xl"><h3 class="font-semibold text-indigo-700 mb-4">👤 Datos del Cliente</h3> <div class="grid grid-cols-1 sm:grid-cols-2 gap-6"><div><label for="customerName"${attr("class", labelClasses)}>Nombre Completo</label> <input type="text" id="customerName"${attr("value", customerName)} required placeholder="Ej: Juan Pérez"${attr("class", inputClasses)}></div> <div><label for="customerEmail"${attr("class", labelClasses)}>Email</label> <input type="email" id="customerEmail"${attr("value", customerEmail)} required placeholder="ejemplo@correo.com"${attr("class", inputClasses)}></div> <div class="sm:col-span-2"><label for="customerPhone"${attr("class", labelClasses)}>Teléfono</label> <input type="tel" id="customerPhone"${attr("value", customerPhone)} required placeholder="+1 234 567 8900"${attr("class", inputClasses)}></div></div></div> <div class="bg-gray-50 p-6 rounded-xl"><h3 class="font-semibold text-indigo-700 mb-4">💼 Detalles del Servicio</h3> <div class="grid grid-cols-1 sm:grid-cols-2 gap-6"><div><label for="serviceName"${attr("class", labelClasses)}>Servicio</label> <select id="serviceName" required${attr("class", inputClasses)}><option value="" disabled selected>Selecciona un servicio</option><!--[-->`;
  for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
    let service = each_array[$$index];
    $$payload.out += `<option${attr("value", service.name)}${attr("data-price", service.price)}>${escape_html(service.name)} - $${escape_html(service.price)}</option>`;
  }
  $$payload.out += `<!--]--></select></div> <div><label for="servicePrice"${attr("class", labelClasses)}>Precio</label> <input type="number" id="servicePrice"${attr("value", servicePrice)} required min="0" step="0.01"${attr("class", inputClasses)}></div></div></div> <button type="submit" class="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-4 rounded-xl focus:outline-none focus:ring-4 focus:ring-indigo-200 transition-all duration-200"${attr("disabled", isLoading, true)}>`;
  {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--> <span>${escape_html("Crear Reservación")}</span></button></form></div></div></div>`;
  pop();
}
function _page($$payload, $$props) {
  push();
  var $$store_subs;
  let reservations;
  let filterName = "";
  let filterService = "";
  let filterDate = "";
  reservations = store_get($$store_subs ??= {}, "$reservationStore", reservationStore);
  reservations.filter((reservation) => {
    const matchesName = reservation.customerName.toLowerCase().includes(filterName.toLowerCase());
    const matchesService = reservation.serviceName.toLowerCase().includes(filterService.toLowerCase());
    const matchesDate = true;
    const matchesStatus = true;
    return matchesName && matchesService && matchesDate && matchesStatus;
  });
  $$payload.out += `<div class="container svelte-xv75jl"><div class="form-container svelte-xv75jl"><div class="card svelte-xv75jl">`;
  ReservationForm($$payload);
  $$payload.out += `<!----></div></div> <div class="reservations-container svelte-xv75jl"><div class="card svelte-xv75jl"><h2 class="card-title svelte-xv75jl">Lista de Reservaciones</h2> <button class="btn export svelte-xv75jl">Exportar a Excel</button> <div class="filters-container svelte-xv75jl"><input type="text" placeholder="Filtrar por Nombre"${attr("value", filterName)} class="filter-input svelte-xv75jl"> <input type="text" placeholder="Filtrar por Servicio"${attr("value", filterService)} class="filter-input svelte-xv75jl"> <input type="date"${attr("value", filterDate)} class="filter-input svelte-xv75jl"> <select class="filter-input svelte-xv75jl"><option value="">Filtrar por Estado</option><option value="Pending">Pendiente</option><option value="Confirmed">Confirmada</option><option value="Cancelled">Cancelada</option></select></div> `;
  {
    $$payload.out += "<!--[-->";
    $$payload.out += `<p class="loading-text svelte-xv75jl">Cargando...</p>`;
  }
  $$payload.out += `<!--]--></div></div></div>`;
  if ($$store_subs) unsubscribe_stores($$store_subs);
  pop();
}
export {
  _page as default
};
