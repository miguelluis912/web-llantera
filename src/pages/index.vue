<script setup>
import { ref } from 'vue'
import '../landing.css'
import BrandLogos from '../components/BrandLogos.vue'
import ContactForm from '../components/ContactForm.vue'
import LandingCard from '../components/LandingCard.vue'
import LandingHero from '../components/LandingHero.vue'
import TireCarousel from '../components/TireCarousel.vue'
import LandingReviews from '../components/LandingReviews.vue'
import { services } from '../data/services.js'
import { useLandingMotion } from '../useLandingMotion.js'

const landing = ref(null)
const quoteForm = ref(null)
useLandingMotion(landing)

const gallery = [
  {
    image: 'presion.webp',
    title: 'Revisión de presión',
    alt: 'Mecánico comprobando la presión de una rueda',
  },
  {
    image: 'balanceo.webp',
    title: 'Balanceo',
    alt: 'Equipo de balanceo de ruedas',
  },
  {
    image: 'moto.webp',
    title: 'Servicio para moto',
    alt: 'Mecánico trabajando en una motocicleta',
  },
]
</script>

<template>
  <main id="main" ref="landing" class="landing">
    <LandingHero />
    <TireCarousel />

    <section id="servicios" class="border-t border-rule py-20 md:py-28">
      <div class="container">
        <div data-reveal-group>
          <p class="eyebrow" data-reveal>Servicios</p>
          <h2 data-reveal class="mb-10 text-[clamp(2.6rem,5vw,5rem)]">
            ¿Qué necesita tu vehículo?
          </h2>
        </div>
        <ul
          class="m-0 grid list-none gap-x-10 gap-y-4 p-0 sm:grid-cols-2 lg:grid-cols-3"
          data-reveal-group
        >
          <li
            v-for="service in services"
            :key="service.id"
            data-reveal
          >
            <LandingCard
              :service="service"
              @quote="quoteForm.selectService($event)"
            />
          </li>
        </ul>
      </div>
    </section>

    <section id="nosotros" class="border-t border-rule py-20 md:py-28">
      <div
        class="container grid items-center gap-9 md:grid-cols-[.85fr_1.15fr] md:gap-20"
        data-reveal-group
      >
        <figure
          data-reveal
          class="m-0 aspect-[5/4] overflow-hidden md:aspect-[5/6]"
        >
          <img
            class="media-img"
            src="assets/img/fotos/montaje.webp"
            alt="Mecánico trabajando en una rueda"
            loading="lazy"
            decoding="async"
          />
        </figure>
        <div data-reveal class="max-w-xl">
          <p class="eyebrow">Sobre nosotros</p>
          <h2 class="text-[clamp(2.6rem,5vw,5rem)]">
            Tu llantera en Valle de Chalco.
          </h2>
          <p class="muted mt-5 text-lg leading-relaxed">
            Te ayudamos a elegir la medida adecuada, instalar tus llantas o
            revisar si una llanta dañada se puede reparar. Atendemos autos y
            motocicletas en San Isidro.
          </p>
        </div>
      </div>
    </section>


    <section id="galeria" class="border-t border-rule py-20 md:py-28">
      <div class="container">
        <div data-reveal-group>
          <p class="eyebrow" data-reveal>Galería</p>
          <h2 data-reveal class="text-[clamp(2.6rem,5vw,5rem)]">
            Llantas y herramientas.
          </h2>
          <p data-reveal class="muted mb-8">
            Fotografías de referencia de los servicios.
          </p>
        </div>
        <div
          class="grid grid-cols-2 gap-3 md:grid-cols-[1.25fr_1fr_1fr] md:gap-5"
          data-reveal-group
        >
          <figure
            v-for="(photo, index) in gallery"
            :key="photo.image"
            data-reveal
            class="gallery-tile m-0"
            :class="{ 'col-span-2 md:col-span-1': index === 0 }"
          >
            <div class="aspect-[4/5] overflow-hidden">
              <img
                class="media-img"
                :src="'assets/img/fotos/' + photo.image"
                :alt="photo.alt"
                loading="lazy"
                decoding="async"
              />
            </div>
            <figcaption class="muted mt-2 text-sm">
              {{ photo.title }}
            </figcaption>
          </figure>
        </div>
      </div>
    </section>

    <BrandLogos />
    <LandingReviews />

    <section
      id="contacto"
      class="contact-anchor border-t border-rule py-20 md:py-28"
    >
      <div
        class="container grid items-start gap-10 md:grid-cols-[.9fr_1.1fr] md:gap-16"
        data-reveal-group
      >
        <div data-reveal>
          <p class="eyebrow">Contacto</p>
          <h2 class="text-[clamp(2.6rem,5vw,5rem)]">
            Cuéntanos qué necesitas.
          </h2>
          <address class="muted mt-6 not-italic">
            Av. Emiliano Zapata MZ 541 Lt 7, San Isidro, 56617 Valle de Chalco
            Solidaridad, Méx.
          </address>
          <p class="muted mt-3">
            Lun–vie 07:00–18:00 · Sáb 07:00–17:00 · Dom 07:00–14:00
          </p>
          <a
            href="https://www.google.com/maps/search/?api=1&amp;query=Vulcanizadora+Zapata+Valle+de+Chalco"
            class="font-semibold underline underline-offset-4"
            >Cómo llegar ↗</a
          >
        </div>
        <div data-reveal>
          <ContactForm ref="quoteForm" />
        </div>
      </div>
    </section>
  </main>
</template>
