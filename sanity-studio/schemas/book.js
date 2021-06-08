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
            name: "slug",
            title: "Slug",
            type: "slug",
            options: {
                source: "title",
                maxLength: 200,
                slugify: input => input
                    .toLowerCase()
                    .replace(/\s+/g, '-')
                    .slice(0, 200)
            }
        },
        {
            description: "En kort beskrivelse.",
            name: 'description',
            rows: 3,
            title: 'Beskrivelse',
            type: 'text',
            validation: Rule => Rule.required()
        },
        {
            name: "category",
            title: "Kategori",
            type: "array",
            of: [
                {
                    type: 'reference',
                    to: [{ type: 'categories' }],
                    options: {
                        filter: ({ parent }) => {
                            const existingCategories = parent.map(item => {
                                return item._ref;
                            })
                            return {
                                filter: "_id in $ref == false",
                                params: {
                                    ref: existingCategories
                                }
                            }
                        }
                    }
                },
            ],
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
            name: "bookCategory",
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
            type: "bodyImage"
        },
        {
            name: "date",
            title: "Publiseringsdato",
            type: "date",
            validation: Rule => Rule.required()
        },
    ],
    orderings: [
        {
            title: 'Dato, nyeste',
            name: 'publishDateDesc',
            by: [
                { field: 'date', direction: 'desc' }
            ]
        },
        {
            title: 'Dato, eldste',
            name: 'publishDateAsc',
            by: [
                { field: 'date', direction: 'asc' }
            ]
        },
        {
            title: 'Tittel, synkende',
            name: 'titleAsc',
            by: [
                { field: 'title', direction: 'asc' }
            ]
        },
        {
            title: 'Tittel, stigende',
            name: 'titleDesc',
            by: [
                { field: 'title', direction: 'desc' }
            ]
        },
        {
            title: 'Forfatter, synkende',
            name: 'authorAsc',
            by: [
                { field: 'author', direction: 'asc' }
            ]
        },
        {
            title: 'Forfatter, stigende',
            name: 'authorDesc',
            by: [
                { field: 'author', direction: 'desc' }
            ]
        },
    ],
    preview: {
        select: {
            author: 'author',
            date: 'date',
            image: 'image',
            title: 'title',
        },
        prepare(selection) {
            console.log("SELECTION", selection)
            const { author, date, image, title } = selection
            return {
                title: `${title} - ${author}`,
                subtitle: `${date.split('-')[2].slice(0, 2)}.${date.split('-')[1]}.${date.split('-')[0]}`,
                media: image
            }
        }
    }
}