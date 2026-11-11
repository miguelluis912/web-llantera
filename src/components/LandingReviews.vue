<script setup>
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { useSliderAutoplay } from '../useSliderAutoplay.js'

const reviews = [
  { author: 'Luis Angel', photo: 'photo.png', text: 'Excelente Servicio, En cuanto a reparación de Neumáticos. Excelentes Precios en Neumáticos, Variedad de Marcas.' },
  { author: 'Gerardo Sosa', photo: 'photo1.png', text: 'Ofrecen servicio de reparación y venta de neumáticos es popular en la zona y tiene precios accesibles.' },
  { author: 'Luis Bravo', photo: 'photo2.png', text: 'Buen servicio, aunque como estorban cuando uno quiere pasar a pie tiene que pasar del otro lado de la calle prácticamente' },
  { author: 'jorge humbeto español ramirez', photo: 'photo3.png', text: 'Ofrecen servicio de reparación y venta de neumáticos es popular en la zona y tiene precios accesibles.' },
  { author: 'Luis Mario Najera Piña', photo: 'photo4.png', text: 'Excelente servicio, rápido, surtido amplio y el mejor precio.' },
  { author: 'j. jibran guadarrama', photo: 'photo5.png', text: 'Ofrecen servicio de reparación y venta de neumáticos es popular en la zona y tiene precios accesibles.' },
]
const mobile = window.matchMedia('(max-width: 639px)')
const tablet = window.matchMedia('(max-width: 899px)')
const columns = ref(mobile.matches ? 1 : tablet.matches ? 2 : 3)
const page = ref(0)
const direction = ref('forward')
const carousel = ref(null)
const total = computed(() => Math.ceil(reviews.length / columns.value))
const visible = computed(() =>
  reviews.slice(page.value * columns.value, (page.value + 1) * columns.value),
)

function move(step) {
  direction.value = step > 0 ? 'forward' : 'backward'
  page.value = (page.value + step + total.value) % total.value
}

const { paused, reducedMotion } = useSliderAutoplay(carousel, () => move(1), 8000)

function resize() {
  const first = page.value * columns.value
  columns.value = mobile.matches ? 1 : tablet.matches ? 2 : 3
  page.value = Math.floor(first / columns.value)
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
    id="testimonios"
    ref="carousel"
    class="border-t border-rule py-20 md:py-28"
    aria-labelledby="review-heading"
    @keydown.left.prevent="move(-1)"
    @keydown.right.prevent="move(1)"
  >
    <div class="container" data-reveal-group>
      <div class="review-showcase" data-reveal>
        <div class="review-showcase__header">
          <div>
            <p class="eyebrow">Reseñas de Google Maps</p>
            <h2 id="review-heading" class="text-[clamp(2.25rem,4vw,4rem)]">Lo que nos dicen</h2>
          </div>
          <a class="button button--outline" href="https://www.google.com/maps?cid=17206591750856149404"
            target="_blank" rel="noopener noreferrer">
            Ver más en Google Maps <span aria-hidden="true">↗</span>
          </a>
        </div>

        <div class="review-showcase__rail">
          <div class="brand-viewport">
            <Transition :name="direction === 'forward' ? 'brands-next' : 'brands-prev'">
              <ul :key="`${page}-${columns}`" class="review-showcase__grid" :style="{ '--columns': columns }"
                aria-label="Opiniones de clientes">
                <li v-for="review in visible" :key="review.author" class="review-card">
                  <blockquote>
                    <p>“{{ review.text }}”</p>
                    <footer>
                      <img :src="'assets/img/testimonials/' + review.photo" alt="" width="44" height="44" loading="lazy" />
                      <div>
                        <strong>{{ review.author }}</strong>
                        <span>Usuario de Google</span>
                      </div>
                    </footer>
                  </blockquote>
                </li>
              </ul>
            </Transition>
          </div>
          <button class="icon-button review-arrow review-arrow--prev" type="button" aria-label="Reseñas anteriores" @click="move(-1)">‹</button>
          <button class="icon-button review-arrow review-arrow--next" type="button" aria-label="Reseñas siguientes" @click="move(1)">›</button>
        </div>

        <div class="review-showcase__status">
          <span :aria-live="paused || reducedMotion ? 'polite' : 'off'">Grupo {{ page + 1 }} de {{ total }}</span>
          <button v-if="!reducedMotion" class="carousel-pause" type="button" @click="paused = !paused">
            {{ paused ? 'Reanudar' : 'Pausar' }}
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.review-showcase {
  padding: clamp(1rem, 3.6vw, 2.5rem);
  border: 1px solid var(--color-rule);
  border-radius: 1.15rem;
  background: var(--panel-tint);
}
.review-showcase__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: .8rem 1.4rem;
  margin-bottom: 1.5rem;
}
.review-showcase__rail {
  position: relative;
}
.review-showcase__grid {
  display: grid;
  grid-template-columns: repeat(var(--columns), minmax(0, 1fr));
  gap: .85rem;
  margin: 0;
  padding: 0;
  list-style: none;
}
.review-card {
  padding: clamp(1.1rem, 2.3vw, 1.65rem);
  border: 1px solid var(--color-rule);
  border-radius: .85rem;
  background: #fff;
}
.review-card blockquote {
  display: flex;
  flex-direction: column;
  min-height: 12rem;
  height: 100%;
  margin: 0;
}
.review-card p {
  margin-bottom: 1.4rem;
  line-height: 1.65;
}
.review-card footer {
  display: flex;
  align-items: center;
  gap: .7rem;
  margin-top: auto;
}
.review-card footer img {
  width: 2.75rem;
  height: 2.75rem;
  flex: 0 0 2.75rem;
  object-fit: cover;
  border-radius: 50%;
}
.review-card footer span {
  display: block;
  color: var(--muted);
  font-size: .8rem;
}
.review-arrow {
  position: absolute;
  z-index: 1;
  top: 50%;
  display: grid;
  place-items: center;
  width: 2.75rem;
  height: 2.75rem;
  padding: 0 0 .16rem;
  border-radius: 50%;
  background: #fff;
  font-size: 1.9rem;
  line-height: 1;
  box-shadow: 0 2px 8px #20201e22;
}
.review-arrow--prev {
  left: 0;
  transform: translate(-45%, -50%);
}
.review-arrow--next {
  right: 0;
  transform: translate(45%, -50%);
}
.review-showcase__status {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: .9rem;
  margin-top: .85rem;
  color: var(--muted);
  font-size: .85rem;
}
</style>
