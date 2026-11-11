// Referencias de fabricantes y catálogos técnicos. La disponibilidad se consulta con la llantera.
const lines = [
  {
    brand: 'Michelin',
    model: 'Primacy SUV+',
    image: 'msuv.webp',
    category: 'suv',
    sizes: ['225/65R17', '225/60R18'],
  },
  {
    brand: 'Pirelli',
    model: 'Scorpion AS 4',
    image: 'scorpion.webp',
    category: 'suv',
    sizes: ['225/65R17'],
  },
  {
    brand: 'Goodyear',
    model: 'Wrangler Fortitude HT',
    image: 'wrangler.webp',
    category: 'suv',
    sizes: ['225/60R18', '235/60R17'],
  },
  {
    brand: 'Hankook',
    model: 'Vantra LT RA18',
    image: 'vantra-og.webp',
    category: 'van',
    sizes: ['195R15C', '185R14C', '195R14C'],
  },
  {
    brand: 'Euzkadi',
    model: 'Radial R/T All Terrain',
    image: 'euzkadi.webp',
    category: 'pickup',
    sizes: ['10R15LT'],
  },
  {
    brand: 'Toyo',
    model: 'Open Country A/T III',
    image: 'open.webp',
    category: 'pickup',
    sizes: [
      '31x10.50R15',
      '30x9.50R15',
      '235/75R15',
      '255/70R15',
      '245/70R16',
      '265/70R16',
      '265/75R16',
      '225/65R17',
    ],
  },
  {
    brand: 'Michelin',
    model: 'Agilis',
    image: 'agilis.webp',
    category: 'van',
    sizes: [
      '195/70R15C',
      '195R15C',
      '205/65R15C',
      '215/70R15C',
      '225/70R15C',
      '185/75R16C',
      '205/65R16C',
      '205/75R16C',
      '205/75R14C',
      '185R14C',
      '195R14C',
    ],
  },
  {
    brand: 'Michelin',
    model: 'Agilis CrossClimate',
    image: 'cross.webp',
    category: 'van',
    sizes: ['225/75R16C', '235/65R16C', '195/75R16C'],
  },

  {
    brand: 'Toyo',
    model: 'Extensa A/S II',
    image: 'extensa.webp',
    sizes: [
      '185/65R15',
      '195/65R15',
      '195/60R15',
      '205/65R15',
      '205/60R16',
      '215/55R16',
    ],
  },
  {
    brand: 'Pirelli',
    model: 'Cinturato P1',
    image: 'p1.webp',
    sizes: ['185/65R15', '195/65R15'],
  },
  {
    brand: 'Michelin',
    model: 'Energy XM2+',
    image: 'xm2.webp',
    sizes: ['205/55R16', '195/65R15', '185/65R15', '185/60R15'],
  },
  {
    brand: 'Tornel',
    model: 'Real',
    image: 'real.webp',
    sizes: [
      'P175/65R14',
      'P185/65R15',
      'P185/60R14',
      'P175/70R14',
      'P165/70R13',
      'P195/55R15',
    ],
  },
  {
    brand: 'Mirage',
    model: 'MR-162',
    image: 'mr162.webp',
    sizes: [
      '175/70R13',
      '175/65R14',
      '175/65R15',
      '185/55R15',
      '185/60R14',
      '185/60R15',
    ],
  },
  {
    brand: 'Goodyear',
    model: 'Assurance',
    image: 'assurance.webp',
    sizes: ['185/65R15'],
  },
  {
    brand: 'Bridgestone',
    model: 'Ecopia EP150',
    image: 'ecopia.webp',
    sizes: ['185/65R15', '195/55R15', '165/65R14'],
  },
  {
    brand: 'Pirelli',
    model: 'Cinturato P7',
    image: 'p7.webp',
    sizes: ['205/55R16'],
  },
  {
    brand: 'Pirelli',
    model: 'Cinturato P7 (P7C2)',
    image: 'p7c2.webp',
    sizes: ['215/55R17', '225/45R17'],
  },
  {
    brand: 'Michelin',
    model: 'Primacy 4',
    image: 'primacy4.webp',
    sizes: ['195/65R15', '185/65R15'],
  },
  {
    brand: 'Michelin',
    model: 'Primacy 4+',
    image: 'primacyplus.webp',
    sizes: ['205/55R16', '215/55R17', '225/45R17'],
  },
]

// Medidas publicadas en las fichas de Pirelli e Italika.
lines.push(
  {
    brand: 'Pirelli',
    model: 'SL 26',
    image: 'sl26.webp',
    category: 'motoneta',
    sizes: ['120/90-10', '130/90-10'],
  },
  {
    brand: 'Italika',
    model: 'City Road',
    image: 'cityscooter.webp',
    category: 'motoneta',
    sizes: ['130/60-13'],
  },
  {
    brand: 'Italika',
    model: 'City Road',
    image: 'cityroad.webp',
    category: 'moto-trabajo',
    sizes: ['2.75-17', '2.75-18', '3.00-18'],
  },
  {
    brand: 'Pirelli',
    model: 'Angel City',
    image: 'angel.webp',
    category: 'moto-trabajo',
    sizes: ['90/80-17'],
  },
)

export const isMotorcycleCategory = (category) =>
  category === 'motoneta' || category === 'moto-trabajo'

// Intercala las líneas para que el carrusel muestre distintas marcas desde el inicio.
export const tires = lines
  .flatMap(({ brand, model, image, sizes, category = 'auto' }) =>
    sizes.map((size, position) => ({
      id: [brand, model, size].join('|'),
      brand,
      model,
      size,
      rim: size.match(/(?:R|-)(\d+)/)[1],
      category,
      image,
      position,
    })),
  )
  .sort((a, b) => a.position - b.position)
