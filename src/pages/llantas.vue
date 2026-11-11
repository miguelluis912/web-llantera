<script setup>
import { computed, ref } from 'vue'
import TireCard from '../components/TireCard.vue'
import { isMotorcycleCategory, tires } from '../data/tires.js'
import {
  matchesTireSize,
  normalizeSearch,
  sizeQuoteUrl,
  tireGuide,
  vehicleCategories,
} from '../data/tireGuide.js'
import '../landing.css'

const search = ref('')
const brand = ref('')
const rim = ref('')
const category = ref('')
const view = ref('medidas')
const motorcycles = new URLSearchParams(location.search).get('tipo') === 'motos'
const categories = vehicleCategories.filter((item) => isMotorcycleCategory(item.value) === motorcycles)
const inCatalog = (entry) => isMotorcycleCategory(entry.category) === motorcycles
const catalogSizes = tireGuide.filter(inCatalog)
const catalogModels = tires.filter(inCatalog)
document.title = motorcycles ? 'Llantas para moto | Llantera Zapata' : 'Catálogo de llantas | Llantera Zapata'
const brands = [...new Set(catalogSizes.flatMap((entry) => entry.brands))].sort()
const rims = [...new Set(catalogSizes.map((entry) => entry.rim))].sort()
const labels = Object.fromEntries(
  vehicleCategories.map(({ value, label }) => [value, label]),
)
const term = computed(() => normalizeSearch(search.value))
const motorcycleRims = computed(() =>
  motorcycles && ['1817', '1718'].includes(term.value),
)
const shorthand = computed(() => ['19515', '1015'].includes(term.value))
const entries = computed(() => (view.value === 'medidas' ? catalogSizes : catalogModels))
const visible = computed(() =>
  entries.value.filter((entry) => {
    if (category.value && entry.category !== category.value) return false
    if (rim.value && entry.rim !== rim.value) return false
    const entryBrands = entry.brands ?? [entry.brand]
    if (brand.value && !entryBrands.includes(brand.value)) return false
    if (motorcycleRims.value) return ['17', '18'].includes(entry.rim)
    if (matchesTireSize(entry.size, search.value)) return true
    if (shorthand.value) return false
    const description = [...entryBrands, entry.model ?? ''].join(' ')
    return normalizeSearch(description).includes(term.value)
  }),
)
const sizePhotos = computed(() => {
  const photos = new Map()
  for (const tire of catalogModels) {
    if (brand.value && tire.brand !== brand.value) continue
    const key = tire.category + '|' + tire.size.replace(/^P(?=\d)/, '')
    if (!photos.has(key)) photos.set(key, tire)
  }
  return photos
})
function clearFilters() {
  search.value = ''
  brand.value = ''
  rim.value = ''
  category.value = ''
}
</script>

<template>
  <main id="main" class="landing">
    <section class="section" aria-labelledby="catalog-title">
      <div class="container">
        <a class="inline-block mb-5" href="index.html#llantas"
          >← Volver al inicio</a
        >
        <h1 id="catalog-title">{{ motorcycles ? 'Llantas para moto' : 'Catálogo de llantas' }}</h1>
        <nav class="catalog-views" aria-label="Tipo de catálogo">
          <a class="button button--small" href="llantas.html" :aria-current="!motorcycles ? 'page' : undefined">Autos y camionetas</a>
          <a class="button button--small" href="llantas.html?tipo=motos" :aria-current="motorcycles ? 'page' : undefined">Motonetas y motos de trabajo</a>
        </nav>
        <p class="muted mt-4">
          {{ motorcycles
            ? 'Consulta medidas para motonetas y motos de trabajo. Revisa la medida y la posición delantera o trasera indicada en el manual de tu moto.'
            : 'Explora medidas para autos, SUV, pickups y vans de trabajo. Confirma la medida y el índice de carga en la etiqueta del vehículo o su manual antes de pedir una cotización.' }}
        </p>

        <form
          class="tire-filters"
          role="search"
          aria-label="Filtrar catálogo"
          @submit.prevent
        >
          <label>
            Buscar medida, marca o modelo
            <input
              v-model="search"
              type="search"
              :placeholder="motorcycles ? 'Ej. 130-90-10, R17 o 18-17' : 'Ej. 175-70-13, 195-15 o 10-15'"
            />
          </label>
          <label>
            Vehículo
            <select v-model="category">
              <option value="">Todas las categorías</option>
              <option
                v-for="item in categories"
                :key="item.value"
                :value="item.value"
              >
                {{ item.label }}
              </option>
            </select>
          </label>
          <label>
            Marca
            <select v-model="brand">
              <option value="">Todas las marcas</option>
              <option v-for="name in brands" :key="name">{{ name }}</option>
            </select>
          </label>
          <label>
            Rin
            <select v-model="rim">
              <option value="">Todos los rines</option>
              <option v-for="value in rims" :key="value" :value="value">
                Rin {{ value }}
              </option>
            </select>
          </label>
          <button
            class="button button--outline"
            type="button"
            @click="clearFilters"
          >
            Limpiar filtros
          </button>
        </form>

        <fieldset class="catalog-views">
          <legend class="sr-only">Vista del catálogo</legend>
          <label
            ><input
              v-model="view"
              type="radio"
              name="catalog-view"
              value="medidas"
            />
            Por medida</label
          >
          <label
            ><input
              v-model="view"
              type="radio"
              name="catalog-view"
              value="modelos"
            />
            Por modelo</label
          >
        </fieldset>

        <p v-if="motorcycleRims" class="catalog-note">
          Resultados para rines 17 y 18. Revisa la medida completa antes de cotizar.
        </p>
        <p v-else-if="shorthand" class="catalog-note">
          Estas referencias tienen marcajes distintos. Confirma el texto
          completo de la llanta y las especificaciones del vehículo antes de
          elegir.
        </p>
        <p class="muted mt-5 mb-4" role="status">
          {{ visible.length }} de {{ entries.length }}
          {{
            view === 'medidas'
              ? 'opciones por categoría'
              : 'referencias de modelo'
          }}
        </p>
        <p v-if="view === 'medidas'" class="muted">
          Las categorías son orientativas. Las marcas son opciones para
          preguntar, sujetas a disponibilidad.
        </p>
        <p v-else class="muted">
          Las fotos corresponden al modelo. La presentación puede variar por medida. Confirma disponibilidad con la llantera.
        </p>

        <ul
          v-if="visible.length && view === 'medidas'"
          class="m-0 grid list-none gap-5 p-0 sm:grid-cols-2 lg:grid-cols-3"
        >
          <li v-for="entry in visible" :key="entry.id" class="size-card">
            <p class="eyebrow">
              {{ labels[entry.category] }} · Rin {{ entry.rim }}
            </p>
            <h2>{{ entry.size }}</h2>
            <figure v-if="sizePhotos.has(entry.id)" class="size-card__photo">
              <img
                :src="'assets/img/catalogo/' + sizePhotos.get(entry.id).image"
                alt=""
                loading="lazy"
                decoding="async"
              />
              <figcaption>
                Referencia: {{ sizePhotos.get(entry.id).brand }} {{ sizePhotos.get(entry.id).model }}
              </figcaption>
            </figure>
            <p v-if="entry.brands.length" class="muted">
              {{ entry.brands.join(' · ') }}
            </p>
            <p v-else-if="motorcycles" class="muted">Marca y modelo por confirmar.</p>
            <a
              class="button button--small"
              :href="sizeQuoteUrl(entry, brand)"
              :aria-label="
                'Consultar ' + entry.size + (brand ? ' ' + brand : '')
              "
            >
              Consultar medida <span aria-hidden="true">↗</span>
            </a>
          </li>
        </ul>
        <ul
          v-else-if="visible.length"
          class="m-0 grid list-none gap-5 p-0 sm:grid-cols-2 lg:grid-cols-3"
        >
          <li v-for="tire in visible" :key="tire.id">
            <TireCard :tire="tire" />
          </li>
        </ul>
        <p v-else class="panel">
          No encontramos una referencia con esos filtros.
          <a href="index.html#inicio">Consulta tu medida</a> con la llantera.
        </p>
      </div>
    </section>
  </main>
</template>

<style scoped>
.tire-filters {
  display: grid;
  grid-template-columns: minmax(11rem, 2fr) repeat(3, minmax(0, 1fr)) auto;
  gap: 0.8rem;
  align-items: end;
  padding: 1.2rem;
  margin-top: 1.5rem;
  border: 1px solid var(--line);
  border-radius: 0.65rem;
  background: var(--panel-tint);
}
.tire-filters label {
  display: grid;
  gap: 0.35rem;
  font-weight: 650;
}
.tire-filters input,
.tire-filters select {
  width: 100%;
  min-height: 2.85rem;
  padding: 0.5rem 0.65rem;
  border: 1px solid var(--line);
  border-radius: 0.25rem;
  background: #fff;
  color: var(--ink);
}
.catalog-views {
  display: flex;
  flex-wrap: wrap;
  gap: 0.7rem 1.3rem;
  margin: 1.5rem 0 0;
  padding: 0.65rem 0;
  border: 0;
}
.catalog-views label {
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  font-weight: 650;
}
.catalog-views a[aria-current='page'] {
  background: var(--accent);
  color: #fff;
}
.catalog-views input {
  accent-color: var(--accent);
}
.catalog-note {
  margin-top: 0.8rem;
  padding: 0.75rem 1rem;
  border-left: 3px solid var(--accent);
  background: var(--panel-tint);
}
.size-card {
  display: flex;
  flex-direction: column;
  align-items: start;
  padding: 1.2rem;
  border: 1px solid var(--line);
  border-radius: 0.65rem;
  background: #fff;
}
.size-card__photo {
  width: 100%;
  margin: 0 0 1rem;
}
.size-card__photo img {
  width: 100%;
  height: 8rem;
  object-fit: contain;
}
.size-card__photo figcaption {
  margin-top: .35rem;
  color: var(--muted);
  font-size: .8rem;
}
.size-card h2 {
  font-size: clamp(1.7rem, 3vw, 2.25rem);
}
.size-card .eyebrow {
  margin-bottom: 0.45rem;
}
.size-card .button {
  margin-top: auto;
}
@media (max-width: 1000px) {
  .tire-filters {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}
@media (max-width: 520px) {
  .tire-filters {
    grid-template-columns: 1fr;
  }
}
</style>
