export default {
    name: 'blogPostImage',
    type: 'image',
    title: 'Blogg-bilde',
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
      {
        type: "boolean",
        name: "toggleImage",
        title: "Vise bildet i blogginnlegget?",
        options: {
          isHighlighted: true
        }
      },
    ],
    options: {
      hotspot: true,
      metadata: ["lqip"],
    },
    preview: {
      select: {
        title: 'alt',
        description: "description",
        media: 'asset'
      },
    },
  }