<script setup>
import { computed, reactive } from 'vue'
import { services } from '../data/services.js'
import { tires } from '../data/tires.js'
import { tireGuide } from '../data/tireGuide.js'
import { hasWhatsApp, whatsappLink } from '../whatsapp.js'

const query = new URLSearchParams(location.search)
const selected = query.get('servicio')
const tire = tires.find((item) => item.id === query.get('llanta'))
const size = tireGuide.find((entry) => entry.id === query.get('medida'))
const brand = size?.brands.find((name) => name === query.get('marca'))
const sizeDetails = size
  ? ['Llanta', brand, size.size].filter(Boolean).join(' ')
  : ''
const form = reactive({
  name: '',
  service: services.find((service) => service.id === selected)?.name ?? '',
  vehicle: '',
  details: tire
    ? `Llanta ${tire.brand} ${tire.model} ${tire.size}`
    : sizeDetails,
})
defineExpose({
  selectService: (service) => {
    form.service = service
  },
})
const valid = computed(() => form.name.trim() && form.service)

function sendRequest() {
  if (!hasWhatsApp || !valid.value) return
  const message = [
    'Hola, Llantera Zapata. Quiero solicitar una cotización.',
    `Nombre: ${form.name.trim()}`,
    `Servicio: ${form.service}`,
    form.vehicle.trim() && `Vehículo o medida: ${form.vehicle.trim()}`,
    form.details.trim() && `Detalles: ${form.details.trim()}`,
  ]
    .filter(Boolean)
    .join('\n')
  location.assign(whatsappLink(message))
}
</script>

<template>
  <form class="request-form panel" @submit.prevent="sendRequest">
    <div>
      <h2>Solicitud de servicio</h2>
      <p class="muted">
        Completa los datos y envía tu solicitud desde WhatsApp.
      </p>
    </div>
    <div class="form-grid">
      <label
        >Nombre
        <input
          v-model="form.name"
          name="name"
          autocomplete="name"
          required
          maxlength="80"
      /></label>
      <label
        >Servicio
        <select v-model="form.service" name="service" required>
          <option value="" disabled>Selecciona un servicio</option>
          <option v-for="service in services" :key="service.id">
            {{ service.name }}
          </option>
        </select>
      </label>
    </div>
    <label
      >Vehículo o medida de llanta
      <input
        v-model="form.vehicle"
        name="vehicle"
        placeholder="Ej. Nissan Versa o 185/65 R15"
        maxlength="100"
      />
    </label>
    <label
      >Detalles de la solicitud
      <textarea
        v-model="form.details"
        name="details"
        rows="4"
        maxlength="400"
        placeholder="Cuéntanos qué necesitas"
      />
    </label>
    <p v-if="!hasWhatsApp" class="muted">
      El número de WhatsApp aún está por configurar.
    </p>
    <button
      class="button button--whatsapp"
      type="submit"
      :disabled="!hasWhatsApp || !valid"
    >
      Abrir solicitud en WhatsApp
    </button>
  </form>
</template>
