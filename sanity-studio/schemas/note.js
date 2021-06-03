export default {
    name: "note",
    title: "Notater",
    type: "document",
    fields: [
        {
            name: "title",
            title: "Tittel",
            type: "string"
        },
        {
            name: "date",
            title: "Dato",
            type: "date"
        },
        {
            name: "text",
            title: "Tekst",
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
    ]
}
