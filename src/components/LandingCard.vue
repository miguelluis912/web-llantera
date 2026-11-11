<script setup>
defineProps({
  service: { type: Object, required: true },
})
defineEmits(['quote'])
</script>

<template>
  <article data-lift class="landing-service-card">
    <div class="landing-service-card__media">
      <img
        :src="'assets/img/fotos/' + service.image"
        alt=""
        loading="lazy"
        decoding="async"
      />
    </div>
    <div class="landing-service-card__body">
      <h3>{{ service.name }}</h3>
      <p class="muted">{{ service.description }}</p>
      <a href="#contacto" class="button button--small" @click="$emit('quote', service.name)">
        Cotizar <span aria-hidden="true">↗</span><span class="sr-only"> {{ service.name }}</span>
      </a>
    </div>
  </article>
</template>
