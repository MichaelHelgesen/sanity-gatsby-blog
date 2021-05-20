export default {
    title: 'Blogginnlegg',
    name: 'post',
    type: 'document',
    fields: [
        {
            title: 'Tittel',
            name: 'title',
            type: 'string',
            validation: Rule => Rule.required()
        },
        {
            title: "Slug",
            name: "slug",
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
            description: "En kort beskrivelse til blogglisten.",
            name: 'description',
            rows: 3,
            title: 'Beskrivelse',
            type: 'text',
            validation: Rule => Rule.required()
        },
        {
            title: 'Ingress',
            name: 'introduction',
            rows: 5,
            type: 'text',
        },
        {
            title: 'Dato',
            name: 'date',
            type: 'datetime',
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
            title: 'Brødtekst',
            name: 'content',
            type: 'array',
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
        }
    ],
    preview: {
        select: {
            title: 'title',
            subtitle: 'description',
        },

    },
}

