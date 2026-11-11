<script setup>
const tips = [
  {
    page: 'saber-medida',
    image: 'medida.webp',
    title: 'Cómo leer la medida de una llanta',
  },
  {
    page: 'calibrar-llantas',
    image: 'presion.webp',
    title: 'Por qué es importante calibrar las llantas',
  },
  {
    page: 'cambiar-llanta',
    image: 'desgaste.webp',
    title: 'Cuándo cambiar una llanta',
  },
  { page: 'cuidado', image: 'cuidado.webp', title: 'Cómo cuidar tus llantas' },
  {
    page: 'tipo-llanta',
    image: 'tipo.webp',
    title: 'Qué tipos de llantas existen',
  },
  {
    page: 'cortes-llanta',
    image: 'dano.webp',
    title: 'Cómo reconocer daños y cortes',
  },
  {
    page: 'nitrogeno-ventajas',
    image: 'presion.webp',
    title: 'Nitrógeno o aire en las llantas',
  },
]
</script>

<template>
  <main id="main">
    <section class="breadcrumbs">
      <div class="container">
        <h1 class="tips-title">Tips para tus llantas</h1>
      </div>
    </section>

    <section class="section" aria-label="Artículos sobre llantas">
      <div class="container">
        <ul class="service-grid tip-grid">
          <li class="reveal" v-for="tip in tips" :key="tip.page">
            <a class="service-card tip-card" :href="tip.page + '.html'">
              <span class="card-media">
                <img
                  :src="'assets/img/fotos/' + tip.image"
                  alt=""
                  loading="lazy"
                />
              </span>
              <div>
                <h2>{{ tip.title }}</h2>
                <span class="button button--small tip-link" aria-hidden="true"
                  >Leer tip →</span
                >
              </div>
            </a>
          </li>
        </ul>
      </div>
    </section>
  </main>
</template>
