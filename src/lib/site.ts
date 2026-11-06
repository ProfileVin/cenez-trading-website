// Client details: replace placeholders once the client supplies them (spec §2).
export const site = {
  brand: 'Ceñez Trading',
  phone: '[PHONE]',
  phoneHref: 'tel:+630000000000',
  email: '[EMAIL]',
  address: '[ADDRESS]',
}

// Gelcoat colors seen in the client's photos. Confirm the full list with the client.
export const gelcoatColors = [
  { name: 'Cobalt blue', hex: '#1D63D8' },
  { name: 'Light blue', hex: '#5FA8E8' },
  { name: 'White', hex: '#F4F7FA' },
  { name: 'Grey', hex: '#9AA5AE' },
]

// Features a buyer can ask for when customizing a model.
export const customOptions = [
  'Corner steps',
  'Full-width steps',
  'Bench ledge',
  'Built-in spa section',
  'Underwater lights',
  'Skimmer & return fittings',
  'Pump & filter package',
]

export const customSteps = [
  { title: 'Pick a starting point', body: 'Choose one of our models, or describe the shape you have in mind.' },
  { title: 'Set size, color and features', body: 'Tell us the length, width and depth you need, the gelcoat color, and extras like steps, seats, a spa or lights.' },
  { title: 'Approve the drawing', body: 'We send a drawing and a quote for your pool before anything is built.' },
  { title: 'Built, delivered, installed', body: 'The shell is molded in our workshop, trucked to your site and set into the ground.' },
]

// Shared by all pool products (spec §4, wording from the design canvas).
export const installSteps = [
  { title: 'Site check', body: 'We confirm delivery access, soil type and groundwater level before anything is dug.' },
  { title: 'Excavation & base', body: 'The hole is dug slightly larger than the shell, then a compacted, level sand or gravel bed is laid.' },
  { title: 'Set & plumb', body: 'The shell is lowered in, levelled, and connected to the pump, filter and fittings.' },
  { title: 'Fill & backfill together', body: 'Water and backfill rise at the same pace so the pressure stays even on both sides of the wall.' },
  { title: 'Coping & deck', body: 'A concrete collar locks the flange in place, then your deck or tile finish goes on top.' },
]

export const beforeYouBuy = [
  {
    tag: 'Groundwater',
    highlight: true,
    title: 'Near fields or low ground?',
    body: 'A high water table can push an empty shell upward. Ask us about a hydrostatic relief valve and a gravel drainage layer, and never drain the pool in rainy season without advice.',
  },
  {
    tag: 'Access',
    title: 'Room for one big delivery',
    body: 'The shell travels in one piece. The route to your yard needs space for the truck and a crane or a crew to lift it into place.',
  },
  {
    tag: 'Care',
    title: 'Less scrubbing, same chemistry',
    body: 'Smooth gelcoat gives algae little to hold on to. Keep the water balanced to protect the finish from fading and staining.',
  },
]
