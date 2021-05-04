export default {
  name: 'bodyImage',
  type: 'image',
  title: 'Bilde',
  fields: [
    {
      type: 'string',
      name: 'alt',
      title: 'Alt-tekst',
      description: 'En alt-tekst som beskriver bildet.',
      options: {
        isHighlighted: true
      }
    },
    {
      type: 'string',
      name: 'description',
      title: 'Bildetekst',
      description: `En bildetekst ved behov`,
      options: {
        isHighlighted: true
      }
    },
  ],
  options: {
    hotspot: true,
  },
}