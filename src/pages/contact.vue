<script setup>
import ContactForm from '../components/ContactForm.vue'
import { whatsappLink } from '../whatsapp.js'

const directChat = whatsappLink(
  'Hola, Llantera Zapata. Me gustaría solicitar información.',
)
const mapUrl =
  'https://www.google.com/maps/search/?api=1&query=Vulcanizadora+Zapata+Valle+de+Chalco'
</script>

<template>
  <main id="main">
    <section class="page-heading">
      <div class="container">
        <p class="eyebrow">Atención en Valle de Chalco</p>
        <h1>Contacto y cotizaciones</h1>
      </div>
    </section>
    <section class="section" id="solicitud">
      <div class="container contact-grid">
        <ContactForm />
        <aside class="panel visit-card">
          <h2>Visita la llantera</h2>
          <address>
            Av. Emiliano Zapata MZ 541 Lt 7, San Isidro, 56617 Valle de Chalco
            Solidaridad, Méx.
          </address>
          <a :href="mapUrl" target="_blank" rel="noopener noreferrer"
            >Cómo llegar ↗</a
          >
          <h3>Horario</h3>
          <ul>
            <li>Lunes a viernes · 07:00 a 18:00</li>
            <li>Sábado · 07:00 a 17:00</li>
            <li>Domingo · 07:00 a 14:00</li>
          </ul>
          <a
            v-if="directChat"
            :href="directChat"
            class="button button--whatsapp"
            >Abrir chat de WhatsApp</a
          >
        </aside>
      </div>
    </section>
  </main>
</template>
