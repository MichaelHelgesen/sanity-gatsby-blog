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
            title: 'Beskrivelse',
            type: 'string',
            validation: Rule => Rule.required()
        },
        {
            title: 'Ingress',
            name: 'introduction',
            type: 'string',
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
                    to: [
                        { type: 'categories' },
                    ]
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
    ]
}

