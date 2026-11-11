<script setup>
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { whatsappLink } from '../whatsapp.js'

const props = defineProps({ page: { type: String, required: true } })
const open = ref(false)
const menuButton = ref(null)
const mainLinks = [
  { label: 'Inicio', page: 'index', href: 'index.html' },
  { label: 'Llantas', page: 'llantas', href: 'llantas.html' },
  { label: 'Servicios', href: 'index.html#servicios' },
  { label: 'Marcas', href: 'index.html#marcas' },
  { label: 'Tips', page: 'services', href: 'services.html' },
]

const landing = props.page === 'index'
const contactForm = landing
  ? '#contacto'
  : props.page === 'contact' ? '#solicitud' : 'contact.html#solicitud'
const quickChat = whatsappLink('Hola, Llantera Zapata. Tengo una pregunta rápida.')
const scrolled = ref(false)
const links = computed(() =>
  landing
    ? [
        { label: 'Nosotros', href: '#nosotros' },
        { label: 'Llantas', page: 'llantas', href: 'llantas.html' },
        { label: 'Servicios', href: '#servicios' },
        { label: 'Galería', href: '#galeria' },
        { label: 'Tips', href: 'services.html' },
      ]
    : mainLinks,
)

function syncScroll() {
  scrolled.value = window.scrollY > 12
}
onMounted(() => {
  if (!landing) return
  syncScroll()
  window.addEventListener('scroll', syncScroll, { passive: true })
})
onUnmounted(() => {
  if (landing) window.removeEventListener('scroll', syncScroll)
})

function closeWithEscape() {
  if (!open.value) return
  open.value = false
  menuButton.value?.focus()
}
</script>

<template>
  <header
    class="site-header"
    :class="{
      'site-header--landing': landing,
      'is-solid': landing && (scrolled || open),
    }"
    @keydown.esc="closeWithEscape"
  >
    <div class="container header-inner">
      <a class="wordmark" href="index.html">
        <span class="wordmark-icon" aria-hidden="true"></span>
        <span>Llantera <strong>Zapata</strong></span>
      </a>
      <button
        ref="menuButton"
        type="button"
        class="menu-toggle"
        aria-controls="site-nav"
        :aria-expanded="open"
        @click="open = !open"
      >
        {{ open ? 'Cerrar' : 'Menú' }}
      </button>
      <nav
        id="site-nav"
        :class="{ 'is-open': open }"
        aria-label="Navegación principal"
      >
        <a
          v-for="link in links"
          :key="link.href"
          :href="link.href"
          :aria-current="link.page === page ? 'page' : undefined"
          @click="open = false"
          >{{ link.label }}</a
        >
        <div class="header-actions">
          <a
            class="header-action header-action--icon"
            :href="contactForm"
            aria-label="Ir al formulario de contacto"
            title="Ir al formulario de contacto"
            @click="open = false"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.47-.89-.79-1.49-1.77-1.66-2.07-.17-.3-.02-.46.13-.61.14-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.03-.52-.07-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.49s1.07 2.89 1.22 3.09c.15.2 2.1 3.2 5.08 4.49.71.31 1.27.49 1.7.63.71.23 1.36.2 1.88.12.57-.09 1.76-.72 2.01-1.42.25-.7.25-1.29.17-1.42-.07-.12-.27-.2-.57-.35Z"/>
              <path d="M12.05 2a9.94 9.94 0 0 0-8.6 14.92L2 22l5.2-1.36A9.95 9.95 0 1 0 12.05 2Zm0 18.21a8.25 8.25 0 0 1-4.2-1.15l-.3-.18-3.09.81.83-3.01-.2-.31a8.27 8.27 0 1 1 6.96 3.84Z"/>
            </svg>
          </a>
          <a
            v-if="quickChat"
            class="header-action header-action--quick"
            :href="quickChat"
            aria-label="Preguntar rápido por WhatsApp"
            @click="open = false"
          >
            Preguntar rápido <span aria-hidden="true">↗</span>
          </a>
        </div>
      </nav>
    </div>
  </header>
</template>

<style scoped>
.header-actions {
  display: flex;
  align-items: center;
  gap: .5rem;
}
.site-header nav .header-action {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: .35rem;
  min-height: 2.75rem;
  padding: .35rem .8rem;
  border: 1px solid var(--nav-line);
  border-radius: .55rem;
  white-space: nowrap;
}
.site-header nav .header-action:hover {
  border-color: var(--accent-light);
}
.site-header nav .header-action--icon {
  width: 2.75rem;
  padding: 0;
  color: var(--accent-light);
}
.header-action--icon svg {
  width: 1.35rem;
  height: 1.35rem;
}
.site-header nav .header-action--quick {
  background: var(--nav-solid);
  font-size: .875rem;
}
@media (max-width: 1023px) {
  .menu-toggle {
    display: block;
  }
  .site-header nav {
    display: none;
    position: absolute;
    top: 100%;
    inset-inline: 0;
    padding: .7rem 1.25rem 1.1rem;
    background: var(--nav-solid);
    border-bottom: 1px solid var(--nav-line);
  }
  .site-header nav.is-open {
    display: grid;
  }
  .site-header nav > a {
    padding-block: .3rem;
  }
}
</style>
