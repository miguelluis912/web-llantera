import { onMounted, onUnmounted } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)
const preference = '(prefers-reduced-motion: no-preference)'

export function useLandingMotion(root) {
  let media

  onMounted(() => {
    const scope = root.value
    media = gsap.matchMedia(scope)
    // Vue monta el DOM primero. GSAP registra y revierte sus efectos por media query.
    media.add(preference, () => {
      const visibleAtStart =
        scope.querySelector('#inicio').getBoundingClientRect().bottom > 0
      if (visibleAtStart) {
        gsap.from('[data-hero-line]', {
          y: 20,
          opacity: 0,
          duration: 0.75,
          stagger: 0.09,
          ease: 'power3.out',
          clearProps: 'opacity,transform',
        })
      }

      const hero = {
        trigger: '#inicio',
        start: 'top top',
        end: 'bottom top',
        scrub: 0.65,
      }
      gsap.to('[data-parallax-photo]', {
        yPercent: 7,
        ease: 'none',
        scrollTrigger: hero,
      })
      gsap.to('[data-parallax-decor]', {
        y: -24,
        ease: 'none',
        scrollTrigger: hero,
      })

      for (const group of scope.querySelectorAll('[data-reveal-group]')) {
        // Los bloques ya visibles quedan listos para lectura al cargar o seguir un ancla.
        if (group.getBoundingClientRect().top < window.innerHeight) continue
        gsap.from(group.querySelectorAll('[data-reveal]'), {
          y: 26,
          opacity: 0,
          stagger: 0.08,
          duration: 0.7,
          ease: 'power3.out',
          clearProps: 'opacity,transform',
          scrollTrigger: { trigger: group, start: 'top 90%', once: true },
        })
      }
    })

    media.add(`${preference} and (hover: hover) and (pointer: fine)`, () => {
      const events = new AbortController()
      const options = { signal: events.signal }
      for (const button of scope.querySelectorAll('[data-magnetic]')) {
        const moveX = gsap.quickTo(button, 'x', {
          duration: 0.4,
          ease: 'power3.out',
        })
        const moveY = gsap.quickTo(button, 'y', {
          duration: 0.4,
          ease: 'power3.out',
        })
        button.addEventListener(
          'pointermove',
          (event) => {
            if (event.pointerType !== 'mouse') return
            const bounds = button.getBoundingClientRect()
            moveX((event.clientX - bounds.left - bounds.width / 2) * 0.14)
            moveY((event.clientY - bounds.top - bounds.height / 2) * 0.14)
          },
          options,
        )
        button.addEventListener(
          'pointerleave',
          () => {
            moveX(0)
            moveY(0)
          },
          options,
        )
      }

      for (const card of scope.querySelectorAll('[data-lift]')) {
        const lift = gsap.quickTo(card, 'y', {
          duration: 0.45,
          ease: 'power3.out',
        })
        card.addEventListener(
          'pointerenter',
          (event) => {
            if (event.pointerType === 'mouse') lift(-5)
          },
          options,
        )
        card.addEventListener('pointerleave', () => lift(0), options)
      }
      return () => events.abort()
    })
  })

  onUnmounted(() => media?.revert())
}
