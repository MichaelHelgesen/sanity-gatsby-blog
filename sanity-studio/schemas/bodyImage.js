export default {
  name: 'bodyImage',
  type: 'image',
  title: 'Bilde',
  fields: [
    {
      type: 'text',
      name: 'description',
      title: 'Bildetekst',
      description: `En bildetekst ved behov`,
      options: {
        isHighlighted: true
      }
    },
    {
      type: 'text',
      name: 'alt',
      title: 'Alternative text',
      description: `Some of your visitors cannot see images, 
          be they blind, color-blind, low-sighted; 
          alternative text is of great help for those 
          people that can rely on it to have a good idea of 
          what\'s on your page.`,
      options: {
        isHighlighted: true
      }
    },
  ],
  options: {
    hotspot: true,
  },
}