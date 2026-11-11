import { onMounted, onUnmounted, ref } from 'vue'

export function useSliderAutoplay(carousel, advance, interval) {
  const paused = ref(false)
  const motion = window.matchMedia('(prefers-reduced-motion: reduce)')
  const reducedMotion = ref(motion.matches)
  let timer

  function updateMotion() {
    reducedMotion.value = motion.matches
  }

  onMounted(() => {
    motion.addEventListener('change', updateMotion)
    timer = window.setInterval(() => {
      if (paused.value || reducedMotion.value || document.hidden) return
      const element = carousel.value
      if (!element || element.matches(':hover, :focus-within')) return
      const { top, bottom } = element.getBoundingClientRect()
      if (top < window.innerHeight && bottom > 0) advance()
    }, interval)
  })
  onUnmounted(() => {
    motion.removeEventListener('change', updateMotion)
    window.clearInterval(timer)
  })
  return { paused, reducedMotion }
}
