<script setup>
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { isMotorcycleCategory, tires } from '../data/tires.js'
import { useSliderAutoplay } from '../useSliderAutoplay.js'
import TireCard from './TireCard.vue'

const carTires = tires.filter((tire) => !isMotorcycleCategory(tire.category))
const carousel = ref(null)
const mobile = window.matchMedia('(max-width: 639px)')
const tablet = window.matchMedia('(max-width: 899px)')
const columns = ref(mobile.matches ? 1 : tablet.matches ? 2 : 3)
const page = ref(0)
const direction = ref('forward')
const pages = computed(() => Math.ceil(carTires.length / columns.value))
const visible = computed(() =>
  carTires.slice(page.value * columns.value, (page.value + 1) * columns.value),
)

function move(step) {
  direction.value = step > 0 ? 'forward' : 'backward'
  page.value = (page.value + step + pages.value) % pages.value
}
const { paused, reducedMotion } = useSliderAutoplay(
  carousel,
  () => move(1),
  6500,
)

function resize() {
  const firstVisible = page.value * columns.value
  columns.value = mobile.matches ? 1 : tablet.matches ? 2 : 3
  page.value = Math.floor(firstVisible / columns.value)
}

onMounted(() => {
  mobile.addEventListener('change', resize)
  tablet.addEventListener('change', resize)
})
onUnmounted(() => {
  mobile.removeEventListener('change', resize)
  tablet.removeEventListener('change', resize)
})
</script>

<template>
  <section
    id="llantas"
    ref="carousel"
    class="section border-t border-rule"
    aria-labelledby="tire-heading"
    @keydown.left.prevent="move(-1)"
    @keydown.right.prevent="move(1)"
  >
    <div class="container" data-reveal-group>
      <div class="tire-showcase" data-reveal>
        <div class="tire-showcase__header">
          <div>
            <h2 id="tire-heading">Llantas para auto y camioneta</h2>
            <p class="muted">
              Explora {{ carTires.length }} referencias por marca y medida con fotos de cada modelo.
            </p>
          </div>
          <div class="actions">
            <a class="button" href="llantas.html">Ver catálogo de llantas <span aria-hidden="true">↗</span></a>
            <a class="button button--outline" href="llantas.html?tipo=motos">Ver llantas para moto</a>
          </div>
        </div>
        <div class="tire-showcase__rail">
          <div class="brand-viewport">
            <Transition
              :name="direction === 'forward' ? 'brands-next' : 'brands-prev'"
            >
              <ul
                :key="page + '-' + columns"
                class="tire-showcase__grid"
                :style="{ '--columns': columns }"
                aria-label="Referencias de llantas"
              >
                <li v-for="tire in visible" :key="tire.id">
                  <TireCard :tire="tire" />
                </li>
              </ul>
            </Transition>
          </div>
          <button
            class="icon-button tire-arrow tire-arrow--prev"
            type="button"
            aria-label="Llantas anteriores"
            @click="move(-1)"
          >
            ‹
          </button>
          <button
            class="icon-button tire-arrow tire-arrow--next"
            type="button"
            aria-label="Llantas siguientes"
            @click="move(1)"
          >
            ›
          </button>
        </div>
        <div class="tire-showcase__status">
          <span :aria-live="paused || reducedMotion ? 'polite' : 'off'"
            >Grupo {{ page + 1 }} de {{ pages }}</span
          >
          <button
            v-if="!reducedMotion"
            class="carousel-pause"
            type="button"
            @click="paused = !paused"
          >
            {{ paused ? 'Reanudar' : 'Pausar' }}
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.tire-showcase {
  padding: clamp(1rem, 3.6vw, 2.5rem);
  border: 1px solid var(--line);
  border-radius: 1.15rem;
  background: var(--panel-tint);
}
.tire-showcase__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 0.8rem 1.4rem;
  margin-bottom: 1.5rem;
}
.tire-showcase__header p {
  margin-bottom: 0;
}
.tire-showcase__rail {
  position: relative;
}
.tire-showcase__grid {
  display: grid;
  grid-template-columns: repeat(var(--columns), minmax(0, 1fr));
  gap: 0.85rem;
  margin: 0;
  padding: 0;
  list-style: none;
}
.tire-arrow {
  position: absolute;
  z-index: 1;
  top: 50%;
  display: grid;
  place-items: center;
  padding: 0 0 0.16rem;
  background: #fff;
  font-size: 1.9rem;
  line-height: 1;
  box-shadow: 0 2px 8px #20201e22;
}
.tire-arrow--prev {
  left: 0;
  transform: translate(-45%, -50%);
}
.tire-arrow--next {
  right: 0;
  transform: translate(45%, -50%);
}
.tire-showcase__status {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.9rem;
  margin-top: 0.85rem;
  color: var(--muted);
  font-size: 0.85rem;
}
</style>
