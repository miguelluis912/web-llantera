<script setup>
import QuickServiceForm from './QuickServiceForm.vue'
</script>

<template>
  <section id="inicio" class="landing-hero">
    <div class="landing-hero__backdrop" aria-hidden="true">
      <img
        data-parallax-photo
        src="assets/img/fotos/portada.webp"
        alt=""
        decoding="async"
        fetchpriority="high"
      />
      <div data-parallax-decor class="landing-hero__wash"></div>
    </div>
    <div class="container landing-hero__content">
      <div class="landing-hero__copy">
        <p data-hero-line class="eyebrow">Llantera Zapata · Valle de Chalco</p>
        <h1 class="my-5 text-[clamp(2.75rem,6vw,6.2rem)] tracking-[-.065em]">
          <span data-hero-line class="block">Llantas para tu</span>
          <span data-hero-line class="block">auto o moto.</span>
        </h1>
        <p data-hero-line class="muted mt-6 max-w-md text-lg leading-relaxed">
          Venta, montaje, balanceo y reparación. Cuéntanos qué necesita tu
          vehículo y cotiza por WhatsApp.
        </p>
        <div data-hero-line class="mt-7 flex flex-wrap items-center gap-4">
          <a class="button" data-magnetic href="#contacto">
            Solicitar cotización <span aria-hidden="true">↗</span>
          </a>
          <a
            class="font-semibold underline underline-offset-4"
            href="#servicios"
            >Ver servicios</a
          >
        </div>
      </div>
      <QuickServiceForm />
    </div>
  </section>
</template>

<style scoped>
.landing-hero {
  position: relative;
  isolation: isolate;
  overflow: hidden;
  background: var(--color-paper);
}
.landing-hero__content {
  display: grid;
  grid-template-columns: minmax(0, 1.15fr) minmax(0, 0.85fr);
  gap: clamp(2rem, 5vw, 5rem);
  align-items: center;
  min-height: min(54rem, 100svh);
  padding-block: 8rem 5rem;
}
.landing-hero__copy {
  position: relative;
  z-index: 1;
  max-width: 48rem;
}
.landing-hero__backdrop {
  position: absolute;
  z-index: -1;
  inset: 0;
  pointer-events: none;
}
.landing-hero__backdrop img {
  position: absolute;
  inset: -8% -4%;
  width: 108%;
  height: 116%;
  object-fit: cover;
  object-position: center;
  filter: blur(1px) saturate(1);
  opacity: 1;
}
.landing-hero__wash {
  position: absolute;
  inset: -3rem 0;
  background: linear-gradient(
    90deg,
    var(--color-paper) 5%,
    color-mix(in srgb, var(--color-paper) 87%, transparent) 40%,
    color-mix(in srgb, var(--color-paper) 18%, transparent) 100%
  );
}
@media (max-width: 1023px) {
  .landing-hero__content {
    grid-template-columns: 1fr;
    min-height: auto;
    padding-block: 7rem 4rem;
  }
.landing-hero__backdrop img {
  object-position: center 25%;
  opacity: 0.35;
}
}
</style>
