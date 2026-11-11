<script setup>
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { useSliderAutoplay } from '../useSliderAutoplay.js'

const brands = [
  ['BFGoodrich', 'bfgoodrich', 'All-Terrain T/A KO3', 'marcas/bfgoodrich.webp'],
  ['Bridgestone', 'bridgestone', 'Ecopia EP150', 'catalogo/ecopia.webp'],
  ['Continental', 'continental', 'ExtremeContact DWS06 Plus', 'marcas/continental.webp'],
  ['Dunlop', 'dunlop', 'Enasave EC300+', 'marcas/dunlop.webp'],
  ['Euzkadi', 'euzkadi', 'Radial R/T All Terrain', 'catalogo/euzkadi.webp'],
  ['Firestone', 'firestone', 'F700', 'marcas/firestone.webp'],
  ['General Tire', 'general', 'Grabber A/TX', 'marcas/general.webp'],
  ['Goodride', 'goodride', 'RP28', 'marcas/goodride.webp'],
  ['Goodyear', 'goodyear', 'Assurance', 'catalogo/assurance.webp'],
  ['Hankook', 'hankook', 'Vantra LT RA18', 'catalogo/vantra-og.webp'],
  ['Kumho', 'kumho', 'Solus TA31', 'marcas/kumho.webp'],
  ['Maxxis', 'maxxis', 'Bravo AT-771', 'marcas/maxxis.webp'],
  ['Michelin', 'michelin', 'Primacy 4', 'catalogo/primacy4.webp'],
  ['Pirelli', 'pirelli', 'Cinturato P7', 'catalogo/p7.webp'],
  ['Sailun', 'sailun', 'Atrezzo Eco', 'marcas/sailun.webp'],
  ['Sumitomo', 'sumitomo', 'HTR A/S P03', 'marcas/sumitomo.webp'],
  ['Toyo Tires', 'toyo', 'Extensa A/S II', 'catalogo/extensa.webp'],
  ['Yokohama', 'yokohama', 'Geolandar A/T G015', 'marcas/yokohama.webp'],
]
const mobile = window.matchMedia('(max-width: 639px)')
const tablet = window.matchMedia('(max-width: 899px)')
const groupSize = ref(mobile.matches ? 1 : tablet.matches ? 2 : 3)
const total = computed(() => Math.ceil(brands.length / groupSize.value))
const active = ref(0)
const direction = ref('forward')
const carousel = ref(null)
const { paused, reducedMotion } = useSliderAutoplay(
  carousel,
  () => move(1),
  4000,
)
const visibleBrands = computed(() =>
  brands.slice(active.value * groupSize.value, (active.value + 1) * groupSize.value),
)

function move(step) {
  direction.value = step > 0 ? 'forward' : 'backward'
  active.value = (active.value + step + total.value) % total.value
}
function updateGroupSize() {
  const first = active.value * groupSize.value
  groupSize.value = mobile.matches ? 1 : tablet.matches ? 2 : 3
  active.value = Math.floor(first / groupSize.value)
}

onMounted(() => {
  mobile.addEventListener('change', updateGroupSize)
  tablet.addEventListener('change', updateGroupSize)
})
onUnmounted(() => {
  mobile.removeEventListener('change', updateGroupSize)
  tablet.removeEventListener('change', updateGroupSize)
})
</script>

<template>
  <section id="marcas" ref="carousel" class="section brand-section" aria-labelledby="brand-title">
    <div class="container">
      <div class="brand-showcase reveal">
        <div class="brand-showcase__header">
          <div>
            <p class="eyebrow">Marcas</p>
            <h2 id="brand-title">Encuentra la llanta que buscas</h2>
            <p class="muted">Modelos de referencia. Consulta disponibilidad por marca y medida.</p>
          </div>
          <a class="button button--small" href="#contacto">Consultar disponibilidad <span aria-hidden="true">↗</span></a>
        </div>

        <div class="brand-showcase__rail">
          <div class="brand-viewport">
            <Transition :name="direction === 'forward' ? 'brands-next' : 'brands-prev'">
              <ul :key="active" class="brand-showcase__grid" :style="{ '--columns': groupSize }" aria-label="Marcas de llantas">
                <li v-for="[name, logo, model, photo] in visibleBrands" :key="logo" class="brand-tile">
                  <div class="brand-tile__visual">
                    <img class="brand-tile__photo" :src="`assets/img/${photo}`" alt="" loading="lazy" decoding="async" />
                  </div>
                  <div class="brand-tile__caption">
                    <span class="brand-tile__logo">
                      <img :src="`assets/img/marcas/${logo}.png`" alt="" loading="lazy" decoding="async" />
                    </span>
                    <div>
                      <strong>{{ name }}</strong>
                      <span class="brand-tile__model">{{ model }}</span>
                    </div>
                  </div>
                </li>
              </ul>
            </Transition>
          </div>
          <button type="button" class="icon-button brand-showcase__arrow brand-showcase__arrow--prev" aria-label="Marcas anteriores" @click="move(-1)">‹</button>
          <button type="button" class="icon-button brand-showcase__arrow brand-showcase__arrow--next" aria-label="Marcas siguientes" @click="move(1)">›</button>
        </div>

        <div class="brand-showcase__status">
          <span :aria-live="paused || reducedMotion ? 'polite' : 'off'">Grupo {{ active + 1 }} de {{ total }}</span>
          <button v-if="!reducedMotion" type="button" class="carousel-pause" @click="paused = !paused">
            {{ paused ? 'Reanudar' : 'Pausar' }}
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.brand-showcase {
  padding: clamp(1rem, 3.6vw, 2.5rem);
  border: 1px solid var(--color-rule);
  border-radius: 1.15rem;
  background: var(--panel-tint);
}
.brand-showcase__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: .8rem 1.4rem;
  margin-bottom: 1.5rem;
}
.brand-showcase__header p:last-child {
  margin-bottom: 0;
}
.brand-showcase__rail {
  position: relative;
}
.brand-showcase__grid {
  display: grid;
  grid-template-columns: repeat(var(--columns), minmax(0, 1fr));
  gap: .85rem;
  padding: 0;
  margin: 0;
  list-style: none;
}
.brand-tile {
  display: flex;
  flex-direction: column;
  overflow: hidden;
  border: 1px solid var(--color-rule);
  border-radius: .85rem;
  background: #fff;
}
.brand-tile__visual {
  display: grid;
  place-items: center;
  aspect-ratio: 4 / 3;
  grid-template: minmax(0, 1fr) / minmax(0, 1fr);
  overflow: hidden;
}
.brand-tile__photo {
  width: 86%;
  height: 86%;
  min-height: 0;
  object-fit: contain;
  transition: transform .6s cubic-bezier(.22, 1, .36, 1);
}
.brand-tile__caption {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: .45rem .65rem;
  flex: 1;
  padding: clamp(.65rem, 1.5vw, 1rem);
  border-top: 1px solid var(--color-rule);
}
.brand-tile__model {
  display: block;
  color: var(--muted);
  font-size: .85rem;
}
.brand-tile__logo {
  display: grid;
  place-items: center;
  width: 5.5rem;
  height: 2.5rem;
  padding: .25rem .4rem;
  border-radius: .35rem;
  background: #fff;
}
.brand-tile__logo img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}
.brand-showcase__arrow {
  position: absolute;
  top: 50%;
  z-index: 1;
  display: grid;
  place-items: center;
  width: 2.75rem;
  height: 2.75rem;
  padding: 0 0 .16rem;
  border-radius: 50%;
  background: #fff;
  color: var(--color-charcoal);
  font-size: 1.9rem;
  line-height: 1;
  box-shadow: 0 2px 8px #20201e22;
}
.brand-showcase__arrow--prev {
  left: 0;
  transform: translate(-45%, -50%);
}
.brand-showcase__arrow--next {
  right: 0;
  transform: translate(45%, -50%);
}
.brand-showcase__status {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: .9rem;
  margin-top: .85rem;
  color: var(--muted);
  font-size: .85rem;
}
@media (hover: hover) and (prefers-reduced-motion: no-preference) {
  .brand-tile:hover .brand-tile__photo {
    transform: scale(1.055);
  }
}
</style>
