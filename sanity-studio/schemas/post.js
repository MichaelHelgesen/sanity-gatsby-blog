
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
            type: 'blogPostImage',
            name: "image"
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
            name: "showMessages",
            type: "showHideGlobalMessages" 
        },
        {
            title: 'Brødtekst',
            name: 'content',
            type: 'array',
            of: [
                {
                    type: 'block',
                    styles: [
                        { title: "Normal", value: "normal" },
                        { title: "H1", value: "h1" },
                        { title: "H2", value: "h2" },
                        { title: "H3", value: "h3" },
                        { title: "H4", value: "h4" },
                        { title: "H5", value: "h5" },
                        { title: "H6", value: "h6" },
                        { title: "Quote", value: "blockquote" },
                      ],
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
                    type: "youtubeLink"
                },
                {
                    title: "Tipsfelt",
                    type: "tipField"
                },
                {
                    type: "codePen"
                }
            ]
        }
    ],
    orderings: [
        {
            title: 'Dato, nyeste',
            name: 'releaseDateDesc',
            by: [
                { field: 'date', direction: 'desc' }
            ]
        },
        {
            title: 'Dato, eldste',
            name: 'releaseDateAsc',
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
    ],
    preview: {
        select: {
            title: 'title',
            description: 'description',
            date: 'date',
            image: 'image'
        },
        prepare(selection) {
            const { title, description, date, image } = selection
            return {
                title: title,
                subtitle: `${date.split('-')[2].slice(0, 2)}.${date.split('-')[1]}.${date.split('-')[0]} - ${description}`,
                media: image
            }
        }
    }
}

