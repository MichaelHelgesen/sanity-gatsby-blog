export default {
    title: 'Sider',
    name: 'page',
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
            title: 'Ingress',
            name: 'introduction',
            rows: 5,
            type: 'text',
        },
        {
            type: 'blogPostImage',
            name: "bilde1"
        },
        {
            type: 'blogPostImage',
            name: "bilde2"
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
    orderings: [
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
            description: 'introduction'
        },
        prepare(selection) {
            const { title, description, date } = selection
            return {
                title: title,
                subtitle: `${description}`,
            }
        }
    }
}

