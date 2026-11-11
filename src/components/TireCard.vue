<script setup>
const props = defineProps({ tire: { type: Object, required: true } })
const query = new URLSearchParams({ servicio: 'venta', llanta: props.tire.id })
const quoteUrl = 'contact.html?' + query + '#solicitud'
</script>

<template>
  <article class="tire-card">
    <div class="tire-card__photo">
      <img
        :src="'assets/img/catalogo/' + tire.image"
        :alt="tire.brand + ' ' + tire.model"
        loading="lazy"
        decoding="async"
      />
    </div>
    <div class="tire-card__body">
      <p class="eyebrow">{{ tire.brand }}</p>
      <h3>{{ tire.size }}</h3>
      <p class="muted">{{ tire.model }}</p>
      <a
        class="button button--small"
        :href="quoteUrl"
        :aria-label="
          'Cotizar ' + tire.brand + ' ' + tire.model + ' ' + tire.size
        "
      >
        Cotizar <span aria-hidden="true">↗</span>
      </a>
    </div>
  </article>
</template>

<style scoped>
.tire-card {
  height: 100%;
  overflow: hidden;
  border: 1px solid var(--line);
  border-radius: 0.65rem;
  background: #fff;
}
.tire-card__photo {
  aspect-ratio: 16 / 9;
  overflow: hidden;
  background: #fff;
  border-bottom: 1px solid var(--line);
}
.tire-card__photo img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  padding: 0.75rem;
}
.tire-card__body {
  padding: clamp(1rem, 2.5vw, 1.4rem);
}
.tire-card__body .eyebrow {
  margin-bottom: 0.45rem;
}
.tire-card__body h3 {
  font-size: clamp(1.65rem, 3vw, 2.25rem);
}
</style>
