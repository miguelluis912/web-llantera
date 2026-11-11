<script setup>
import { onMounted, onUnmounted } from 'vue'
import SiteHeader from './components/SiteHeader.vue'
import SiteFooter from './components/SiteFooter.vue'

defineProps({
  Page: { type: Object, required: true },
  pageName: { type: String, required: true },
})

let revealObserver
onMounted(() => {
  document
    .getElementById(location.hash.slice(1))
    ?.scrollIntoView({ behavior: 'instant' })
  if (
    !window.IntersectionObserver ||
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  )
    return

  revealObserver = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue
      entry.target.classList.remove('reveal-pending')
      revealObserver.unobserve(entry.target)
    }
  })
  for (const element of document.querySelectorAll('.reveal')) {
    if (element.getBoundingClientRect().top < window.innerHeight) continue
    element.classList.add('reveal-pending')
    revealObserver.observe(element)
  }
})
onUnmounted(() => revealObserver?.disconnect())
</script>

<template>
  <SiteHeader :page="pageName" />
  <component :is="Page" />
  <SiteFooter :class="{ 'site-footer--landing': pageName === 'index' }" />
</template>
