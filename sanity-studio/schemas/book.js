export default {
    name: "book",
    title: "Bøker",
    type: "document",
    fields: [
        {
            name: "title",
            title: "Tittel",
            type: "string",
            validation: Rule => Rule.required()
        },
        {
            name: "author",
            title: "Forfatter",
            type: "string",
            validation: Rule => Rule.required()
        },
        {
            name: "read",
            title: "Lest",
            type: "date",
            validation: Rule => Rule.required()
        },
        {
            name: "score",
            title: "Vurdering",
            type: "number"
        },
        {
            name: "category",
            title: "Kategori",
            type: "string"
        },
        {
            name: "level",
            title: "Nivå",
            type: "string"
        },
        {
            name: "published",
            title: "Publisert",
            type: "number",
            validation: Rule => Rule.required()
        },
        {
            name: "pages",
            title: "Sideantall",
            type: "number"
        },
        {
            name: "summary",
            title: "Oppsummert i tre setninger",
            type: "array",
            of: [
                {
                    type: 'block',
                    marks: {
                        annotations: [
                            {
                                name: 'link',
                                type: 'externalLink',
                            },
                            {
                                name: "internalLink",
                                type: "internalLink",

                            }
                        ]
                    },
                },
                {
                    type: 'bodyImage',
                },
                {
                    title: 'Kodeeksempel',
                    type: "exampleUsage"
                },
                {
                    title: "Tipsfelt",
                    type: "tipField"
                }
            ]
        },
        {
            name: "reason_to_read",
            title: "Hvorfor lese den",
            type: "array",
            of: [
                {
                    type: 'block',
                    marks: {
                        annotations: [
                            {
                                name: 'link',
                                type: 'externalLink',
                            },
                            {
                                name: "internalLink",
                                type: "internalLink",

                            }
                        ]
                    },
                },
                {
                    type: 'bodyImage',
                },
                {
                    title: 'Kodeeksempel',
                    type: "exampleUsage"
                },
                {
                    title: "Tipsfelt",
                    type: "tipField"
                }
            ]
        },
        {
            name: "affect",
            title: "Hvordan påvirket boken meg",
            type: "array",
            of: [
                {
                    type: 'block',
                    marks: {
                        annotations: [
                            {
                                name: 'link',
                                type: 'externalLink',
                            },
                            {
                                name: "internalLink",
                                type: "internalLink",

                            }
                        ]
                    },
                },
                {
                    type: 'bodyImage',
                },
                {
                    title: 'Kodeeksempel',
                    type: "exampleUsage"
                },
                {
                    title: "Tipsfelt",
                    type: "tipField"
                }
            ]
        },
        {
            name: "quotes",
            title: "Favoritt-sitater",
            type: "array",
            of: [
                {
                    title: "Sitater",
                    type: "quote",
                },
            ],
            validation: Rule => Rule.max(3)
        },
        {
            name: "image",
            title: "Bilde",
            type: "image",
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
        },
        {
            name: "date",
            title: "Publiseringsdato",
            type: "date",
            validation: Rule => Rule.required()
        },
    ]
}