<script setup>
import { computed, reactive } from 'vue'
import { services } from '../data/services.js'
import { hasWhatsApp, whatsappLink } from '../whatsapp.js'

const options = [
  { value: 'servicio', label: 'Servicio' },
  { value: 'reparacion', label: 'Reparación' },
  { value: 'medida', label: 'Medida de llanta' },
]
const form = reactive({
  type: 'servicio',
  name: '',
  service: '',
  vehicle: '',
  issue: '',
  size: '',
  needsHelp: false,
})
const heading = computed(
  () => options.find((option) => option.value === form.type).label,
)

function sendQuery() {
  if (!hasWhatsApp || !form.name.trim()) return
  const lines = [
    'Hola, Llantera Zapata. Quiero hacer una consulta.',
    `Consulta: ${heading.value}`,
    `Nombre: ${form.name.trim()}`,
  ]
  if (form.type === 'servicio') {
    if (!form.service) return
    lines.push(`Servicio: ${form.service}`)
  }
  if (form.type === 'reparacion') {
    if (!form.issue.trim()) return
    lines.push(`Problema: ${form.issue.trim()}`)
  }
  if (form.type === 'medida') {
    if (form.needsHelp) {
      if (!form.vehicle.trim()) return
      lines.push('Necesito ayuda para identificar la medida de mis llantas.')
    } else {
      if (!form.size.trim()) return
      lines.push(`Medida: ${form.size.trim()}`)
    }
  }
  if (form.vehicle.trim()) lines.push(`Vehículo: ${form.vehicle.trim()}`)
  location.assign(whatsappLink(lines.join('\n')))
}
</script>

<template>
  <form
    class="quick-query"
    aria-labelledby="quick-query-title"
    @submit.prevent="sendQuery"
  >
    <div>
      <p class="eyebrow">Consulta rápida</p>
      <h2 id="quick-query-title">¿Cómo te ayudamos?</h2>
    </div>
    <fieldset class="quick-query__types">
      <legend class="sr-only">Tipo de consulta</legend>
      <label v-for="option in options" :key="option.value">
        <input
          v-model="form.type"
          type="radio"
          name="query-type"
          :value="option.value"
        />
        <span>{{ option.label }}</span>
      </label>
    </fieldset>
    <label
      >Tu nombre
      <input
        v-model="form.name"
        name="query-name"
        autocomplete="name"
        maxlength="80"
        required
      />
    </label>
    <label v-if="form.type === 'servicio'"
      >Servicio que te interesa
      <select v-model="form.service" name="query-service" required>
        <option disabled value="">Selecciona un servicio</option>
        <option v-for="service in services" :key="service.id">
          {{ service.name }}
        </option>
      </select>
    </label>
    <label v-if="form.type === 'reparacion'"
      >¿Qué le pasó a tu llanta?
      <textarea
        v-model="form.issue"
        name="query-issue"
        rows="2"
        maxlength="350"
        placeholder="Ej. pierde aire o tiene una ponchadura"
        required
      ></textarea>
    </label>
    <template v-if="form.type === 'medida'">
      <label class="quick-query__help">
        <input v-model="form.needsHelp" type="checkbox" name="query-help" />
        Necesito ayuda para saber la medida
      </label>
      <label v-if="!form.needsHelp"
        >Medida de la llanta
        <input
          v-model="form.size"
          name="query-size"
          maxlength="40"
          placeholder="Ej. 185/65 R15"
          required
        />
      </label>
    </template>
    <label
      >Vehículo{{
        form.type === 'medida' && form.needsHelp ? '' : ' (opcional)'
      }}
      <input
        v-model="form.vehicle"
        name="query-vehicle"
        maxlength="120"
        placeholder="Marca, modelo y año"
        :required="form.type === 'medida' && form.needsHelp"
      />
    </label>
    <button class="button" type="submit" :disabled="!hasWhatsApp">
      Consultar por WhatsApp <span aria-hidden="true">↗</span>
    </button>
    <p class="quick-query__note">
      {{
        hasWhatsApp
          ? 'Revisa el mensaje en WhatsApp y envíalo para iniciar tu consulta.'
          : 'El número de WhatsApp está pendiente de configurar.'
      }}
    </p>
  </form>
</template>

<style scoped>
.quick-query {
  position: relative;
  z-index: 1;
  display: grid;
  gap: 0.9rem;
  width: 100%;
  padding: clamp(1.2rem, 3vw, 2rem);
  border: 1px solid var(--color-rule);
  border-radius: 0.4rem;
  background: var(--color-paper);
}
.quick-query h2 {
  font-size: clamp(1.8rem, 3vw, 2.4rem);
}
.quick-query .eyebrow {
  margin-bottom: 0.6rem;
}
.quick-query label:not(.quick-query__types label) {
  display: grid;
  gap: 0.3rem;
  font-size: 0.88rem;
  font-weight: 600;
}
.quick-query input:not([type='radio']):not([type='checkbox']),
.quick-query select,
.quick-query textarea {
  width: 100%;
  min-width: 0;
  border: 1px solid var(--color-rule);
  border-radius: 0.25rem;
  padding: 0.55rem 0.65rem;
  background: #fff;
  color: var(--color-charcoal);
  font: inherit;
}
.quick-query textarea {
  resize: vertical;
}
.quick-query__types {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 0.3rem;
  padding: 0;
  border: 0;
  margin: 0;
}
.quick-query__types label {
  position: relative;
}
.quick-query__types input {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  margin: 0;
  opacity: 0;
  cursor: pointer;
}
.quick-query__types span {
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  min-height: 2.75rem;
  padding: 0.4rem;
  border: 1px solid var(--color-rule);
  border-radius: 0.25rem;
  font-size: 0.8rem;
}
.quick-query__types input:checked + span {
  border-color: var(--accent);
  color: var(--accent-hover);
  background: var(--accent-soft);
}
.quick-query__types input:focus-visible + span {
  outline: 2px solid var(--accent);
  outline-offset: 3px;
}
.quick-query label.quick-query__help {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}
.quick-query__help input {
  accent-color: var(--accent);
}
.quick-query__note {
  color: var(--muted);
  font-size: 0.78rem;
  margin: 0;
}
</style>
