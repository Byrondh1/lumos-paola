export type ProductCategory = 'floral' | 'special' | 'arrangements' | 'premium'

export interface Product {
  id: string
  name: string
  description: string
  category: ProductCategory
  isFeatured?: boolean
  image?: string
  variants?: string[]   // Fotos adicionales de modelos — se muestran en el popup al hacer hover
}

export const CATEGORY_LABELS: Record<ProductCategory, string> = {
  floral: 'Formas Florales',
  special: 'Especiales & Religiosas',
  arrangements: 'Arreglos',
  premium: 'Línea Premium',
}

export const PRODUCTS: Product[] = [
  // Formas Florales
  {
    id: 'rosas',
    name: 'Velas de Rosas',
    description: 'Individuales o en sets. Elegancia floral capturada en cera artesanal con aromas únicos.',
    category: 'floral',
    image: '/images/products/rosas.jpg',
    variants: [
      '/images/products/rosas-2.jpg',
      '/images/products/rosas-3.jpg',
      '/images/products/rosas-4.jpg',
    ],
  },
  {
    id: 'girasoles',
    name: 'Velas de Girasoles',
    description: 'Individuales o en sets. Ideales para dar luz y energía a cualquier espacio.',
    category: 'floral',
    image: '/images/products/girasoles.jpg',
    variants: [
      '/images/products/girasoles-2.jpg',
      '/images/products/girasoles-3.jpg',
    ],
  },
  {
    id: 'margaritas',
    name: 'Velas de Margaritas',
    description: 'Individuales o en sets. Un toque sencillo y elegante para tu hogar.',
    category: 'floral',
    image: '/images/products/margaritas.jpg',
    variants: [
      '/images/products/margaritas-2.jpg',
      '/images/products/margaritas-3.jpg',
    ],
  },
  {
    id: 'peonias',
    name: 'Velas de Peonías',
    description: 'Individuales o en sets. Muy buscadas por su volumen y sofisticación.',
    category: 'floral',
    image: '/images/products/peonias.jpg',
    variants: [
      '/images/products/peonias-2.jpg',
      '/images/products/peonias-3.jpg',
    ],
  },
  // Especiales & Religiosas
  {
    id: 'lupita',
    name: 'Vela "La Lupita"',
    description: 'Virgen de Guadalupe en cera artesanal. Un diseño con mucha identidad, devoción y amor.',
    category: 'special',
    isFeatured: true,
    image: '/images/products/lupita.jpg',
    variants: [
      '/images/products/lupita-2.jpg',
      '/images/products/lupita-3.jpg',
      '/images/products/lupita-4.jpg',
    ],
  },
  {
    id: 'recordatorios',
    name: 'Velas para Recordatorios',
    description: 'Diseños específicos y personalizados para Bodas, Bautizos y Graduaciones.',
    category: 'special',
    image: '/images/products/recordatorios.jpg',
    variants: [
      '/images/products/recordatorios-2.jpg',
      '/images/products/recordatorios-3.jpg',
      '/images/products/recordatorios-4.jpg',
    ],
  },
  // Arreglos
  {
    id: 'arreglo-14',
    name: 'Arreglo de 14 Flores',
    description: 'Combinaciones florales en cera, perfectas como detalle especial para cualquier ocasión.',
    category: 'arrangements',
    image: '/images/products/arreglo-14.jpg',
    variants: [
      '/images/products/arreglo-14-2.jpg',
      '/images/products/arreglo-14-3.jpg',
    ],
  },
  {
    id: 'arreglo-20',
    name: 'Arreglo de 20 Flores',
    description: 'Una opción más lujosa y completa. El regalo ideal para sorprender a alguien especial.',
    category: 'arrangements',
    image: '/images/products/arreglo-20.jpg',
    variants: [
      '/images/products/arreglo-20-2.jpg',
      '/images/products/arreglo-20-3.jpg',
    ],
  },
  {
    id: 'canasta',
    name: 'Canasta de Regalo',
    description: 'Mezcla de velas aromáticas y flores decorativas. El regalo perfecto en una presentación única.',
    category: 'arrangements',
    image: '/images/products/canasta.jpg',
    variants: [
      '/images/products/canasta-2.jpg',
      '/images/products/canasta-3.jpg',
    ],
  },
  // Línea Premium
  {
    id: 'caja-mom',
    name: 'Caja "MOM"',
    description: 'Especial para el Día de la Madre. Una experiencia de aroma y amor en una caja única.',
    category: 'premium',
    image: '/images/products/caja-mom.jpg',
    variants: [
      '/images/products/caja-mom-2.jpg',
      '/images/products/caja-mom-3.jpg',
    ],
  },
  {
    id: 'caja-love',
    name: 'Caja "I ❤️ U"',
    description: 'Perfecta para San Valentín o aniversarios. Transmite amor con cada destello.',
    category: 'premium',
    image: '/images/products/caja-love.jpg',
    variants: [
      '/images/products/caja-love-2.jpg',
      '/images/products/caja-love-3.jpg',
    ],
  },
  {
    id: 'caja-personalizada',
    name: 'Cajas Personalizadas',
    description: 'Empaques robustos y elegantes que el cliente puede conservar. 100% a tu medida.',
    category: 'premium',
    image: '/images/products/caja-personalizada.jpg',
    variants: [
      '/images/products/caja-personalizada-2.jpg',
      '/images/products/caja-personalizada-3.jpg',
      '/images/products/caja-personalizada-4.jpg',
    ],
  },
]
