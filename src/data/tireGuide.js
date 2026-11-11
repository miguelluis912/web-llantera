import { tires } from './tires.js'

export const vehicleCategories = [
  { value: 'auto', label: 'Autos' },
  { value: 'suv', label: 'SUV y crossovers' },
  { value: 'pickup', label: 'Pickups y camionetas' },
  { value: 'van', label: 'Urvan y vans de trabajo' },
  { value: 'motoneta', label: 'Motonetas' },
  { value: 'moto-trabajo', label: 'Motos de trabajo' },
]

// Las tres marcas de cada fila proceden de la lista de consulta del negocio.
const guide = {
  auto: [
    ['155/70R13', 'Mirage', 'Blackhawk', 'Hankook'],
    ['165/70R13', 'Atlas Green', 'Mirage', 'Goodyear'],
    ['175/70R13', 'Mirage', 'Michelin', 'Goodyear'],
    ['185/70R13', 'Goodyear', 'Michelin', 'Mirage'],
    ['165/65R14', 'Mirage', 'Michelin', 'Firestone'],
    ['175/65R14', 'Bridgestone', 'Michelin', 'Mirage'],
    ['175/70R14', 'Mirage', 'Michelin', 'Goodyear'],
    ['185/60R14', 'Michelin', 'Goodyear', 'Blackhawk'],
    ['185/65R14', 'Michelin', 'Firestone', 'Joyroad'],
    ['195/70R14', 'Mirage', 'Michelin', 'Firestone'],
    ['175/65R15', 'Mirage', 'Michelin', 'Goodyear'],
    ['185/55R15', 'Mirage', 'Michelin', 'Goodyear'],
    ['185/60R15', 'Michelin', 'Goodyear', 'Mirage'],
    ['185/65R15', 'Michelin', 'Goodyear', 'Bridgestone'],
    ['195/60R15', 'Michelin', 'Euzkadi', 'Joyroad'],
    ['195/65R15', 'Michelin', 'Continental', 'Mirage'],
    ['205/65R15', 'Blackhawk', 'Michelin', 'Goodyear'],
    ['185/55R16', 'Michelin', 'Firestone', 'Mirage'],
    ['195/55R16', 'Mirage', 'Michelin', 'Goodyear'],
    ['195/60R16', 'Mirage', 'Michelin', 'Goodyear'],
    ['205/55R16', 'Michelin', 'Pirelli', 'Bridgestone'],
    ['215/55R16', 'Roadtrack', 'Michelin', 'Goodyear'],
    ['215/50R17', 'Mirage', 'GT Radial', 'Michelin'],
    ['215/55R17', 'Michelin', 'Bridgestone', 'Blackhawk'],
    ['255/45R19', 'Michelin', 'Pirelli', 'Continental'],
    ['255/45R20', 'Michelin', 'Pirelli', 'Continental'],
  ],
  suv: [
    ['215/65R16', 'Firestone', 'Michelin', 'Goodyear'],
    ['225/65R16', 'Michelin', 'Goodyear', 'Yokohama'],
    ['225/60R17', 'Michelin', 'Goodyear', 'Bridgestone'],
    ['225/65R17', 'Michelin', 'Pirelli', 'Yokohama'],
    ['235/60R17', 'Goodyear', 'Michelin', 'Yokohama'],
    ['245/65R17', 'Hankook', 'Michelin', 'Goodyear'],
    ['215/50R18', 'Bridgestone', 'Michelin', 'Pirelli'],
    ['225/60R18', 'Goodyear', 'Michelin', 'Continental'],
    ['235/60R18', 'Michelin', 'Blackhawk', 'Yokohama'],
    ['235/65R18', 'Yokohama', 'Michelin', 'Goodyear'],
    ['225/55R19', 'Michelin', 'Pirelli', 'Yokohama'],
    ['245/55R19', 'Michelin', 'Continental', 'Goodyear'],
    ['245/50R20', 'Blackhawk', 'Michelin', 'Pirelli'],
  ],
  pickup: [
    ['255/70R17', 'Michelin', 'Goodyear', 'BFGoodrich'],
    ['265/70R18', 'Michelin', 'Goodyear', 'BFGoodrich'],
    ['275/55R20', 'Pirelli', 'Michelin', 'BFGoodrich'],
  ],
  // Nissan publica 195/80 R-15 en la ficha de Urvan Panel 2025.
  van: [['195/80R15']],
  motoneta: [['130/90-13']],
}

export const normalizeSearch = (value) =>
  value.toLowerCase().replace(/[^a-z0-9]/g, '')

const entries = new Map()
function addSize(category, size, brands) {
  const nominalSize = size.replace(/^P(?=\d)/, '')
  const id = category + '|' + nominalSize
  if (!entries.has(id)) {
    entries.set(id, {
      id,
      category,
      size: nominalSize,
      rim: nominalSize.match(/(?:R|-)(\d+)/)[1],
      brands: new Set(),
    })
  }
  for (const brand of brands) entries.get(id).brands.add(brand)
}
for (const [category, rows] of Object.entries(guide)) {
  for (const [size, ...brands] of rows) addSize(category, size, brands)
}
for (const tire of tires) addSize(tire.category, tire.size, [tire.brand])

export const tireGuide = [...entries.values()]
  .map((entry) => ({ ...entry, brands: [...entry.brands] }))
  .sort(
    (a, b) =>
      Number(a.rim) - Number(b.rim) ||
      a.size.localeCompare(b.size, 'es', { numeric: true }),
  )

// Los nombres coloquiales ayudan a encontrar opciones, sin indicar equivalencias.
export function matchesTireSize(size, query) {
  const term = normalizeSearch(query).replace(/^p(?=\d)/, '')
  const nominal = normalizeSearch(size)
  if (term === '19515') return ['195r15c', '19580r15'].includes(nominal)
  if (term === '1015') return ['10r15lt', '31x1050r15'].includes(nominal)
  if (/^r\d{2}$/.test(term)) {
    return size.match(/(?:R|-)(\d+)/)?.[1] === term.slice(1)
  }
  if (nominal.includes(term)) return true
  const compact = /^r?\d[0-9r]+[a-z]*$/.test(term) ? term.replace('r', '') : ''
  return Boolean(compact && nominal.replace('r', '').includes(compact))
}

export function sizeQuoteUrl(entry, brand = '') {
  const query = new URLSearchParams({ servicio: 'venta', medida: entry.id })
  if (brand) query.set('marca', brand)
  return 'contact.html?' + query + '#solicitud'
}
