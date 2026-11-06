// Real photos from Ceñez Trading's workshop and job sites. Add new ones at the top.
export type ProjectPhoto = {
  src: string
  alt: string
  caption: string
  stage: 'Workshop' | 'Installation' | 'Finished'
  productId?: string
}

export const projects: ProjectPhoto[] = [
  {
    src: '/products/8.jpg',
    alt: 'Long grey fiberglass lap pool filled with clear water, with full-width steps, set into bare ground before decking.',
    caption: 'Lap pool, filled and ready for decking',
    stage: 'Finished',
    productId: 'fp-lap-01',
  },
  {
    src: '/products/2.jpg',
    alt: 'Blue pool with a built-in spa section being set into a hillside excavation at sunset.',
    caption: 'Pool with spa, hillside site',
    stage: 'Installation',
    productId: 'fp-spa-01',
  },
  {
    src: '/products/5.jpg',
    alt: 'Blue plunge pool with curved corner steps installed in a garden at night, before decking.',
    caption: 'Plunge pool in a garden',
    stage: 'Installation',
    productId: 'fp-rect-01',
  },
  {
    src: '/products/1.jpg',
    alt: 'Pool-and-spa shell in the workshop showing reinforcing ribs and plumbing stubs on the outside.',
    caption: 'Pool with spa, finished in the workshop',
    stage: 'Workshop',
    productId: 'fp-spa-01',
  },
  {
    src: '/products/7.jpg',
    alt: 'Long white fiberglass pool with a rounded end, braced with timber during installation.',
    caption: 'Rounded-end pool, braced during install',
    stage: 'Installation',
    productId: 'fp-roman-01',
  },
  {
    src: '/products/3.jpg',
    alt: 'Freeform blue fiberglass shell standing on its side while a worker finishes the inside.',
    caption: 'Freeform shell, gelcoat finishing',
    stage: 'Workshop',
    productId: 'fp-free-01',
  },
  {
    src: '/products/4.jpg',
    alt: 'Installed plunge pool at night showing the skimmer, lights and bench ledge.',
    caption: 'Skimmer and lights fitted',
    stage: 'Installation',
    productId: 'fp-rect-01',
  },
  {
    src: '/products/6.jpg',
    alt: 'Worker connecting plumbing in the trench beside a pool-and-spa shell.',
    caption: 'Plumbing before backfill',
    stage: 'Installation',
    productId: 'fp-spa-01',
  },
  {
    src: '/products/product1.jpg',
    alt: 'Blue plunge pool shell with corner steps on grass in an open field before installation.',
    caption: 'Plunge pool shell, ready for delivery',
    stage: 'Workshop',
    productId: 'fp-rect-01',
  },
]
