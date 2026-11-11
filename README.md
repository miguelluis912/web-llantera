# Llantera Zapata

Sitio de Llantera Zapata en Vue 3 y Vite. Las 11 páginas del negocio conservan sus URL originales, incluidos los enlaces directos a cada tip.

## Desarrollo

Requiere Node.js 20.19+ dentro de la rama 20 o Node.js 22.12+.

```sh
npm ci
npm run dev
```

- `src/pages/` contiene el contenido de cada página.
- `src/components/` contiene la navegación, el pie, los logotipos y el formulario de contacto.
- `public/assets/` contiene las fotografías y los logotipos del sitio. Los estilos propios están en `src/style.css`.
- Los HTML de la raíz son los puntos de entrada que Vite compila. Los nombres se conservan para que funcionen en alojamiento estático, incluido un subdirectorio como `/llantera.zapata/`.

## Compilación y publicación

```sh
npm run build
npm run preview
```

Publica el contenido de `dist/` en tu alojamiento estático. Si usas GitHub Pages, configura el despliegue para publicar esa carpeta como artefacto del flujo de trabajo. Abre los enlaces de vista previa a través del servidor de Vite.

## Solicitudes por WhatsApp

Copia `.env.example` a `.env.local` y asigna `VITE_WHATSAPP_NUMBER` al número del negocio con código de país, solo dígitos. Para México, escribe `52` seguido de los 10 dígitos del número. Reinicia Vite o vuelve a compilar para aplicar el cambio.

Si generas `dist/` con Docker, la variable debe estar disponible en la etapa que ejecuta `npm run build`. Configurarla únicamente en el contenedor que sirve los archivos ya compilados no cambia el número.

Las tarjetas de servicios preseleccionan el servicio en el formulario. El formulario prepara el mensaje en el navegador y abre WhatsApp para que el visitante revise y envíe la solicitud.

## Landing en Vue y animaciones

- `src/pages/index.vue` compone la portada, la galería, los servicios, las marcas, los testimonios y el formulario.
- `src/components/Landing*.vue` contiene los bloques reutilizables. Los servicios se generan con `v-for` desde `src/data/services.js`.
- `src/landing.css` carga las utilidades de Tailwind sin aplicar un reset global a las páginas de tips y contacto.
- `src/useLandingMotion.js` registra ScrollTrigger al montar la landing. El contexto de GSAP se revierte al desmontarla y las animaciones se omiten con movimiento reducido. Los efectos de puntero se limitan a dispositivos con ratón.
