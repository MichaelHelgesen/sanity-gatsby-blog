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
            title: 'Dato',
            name: 'date',
            type: 'datetime',
            validation: Rule => Rule.required()
        },
        {
            title: 'Ingress',
            name: 'description',
            type: 'string',
            validation: Rule => Rule.required()
        },
        {
            title: 'Brødtekst',
            name: 'content',
            type: 'array',
            of: [
                {
                    type: 'block'
                },
                {
                    type: 'image',
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
                },
                {
                    name: 'exampleUsage',
                    title: 'Kodeeksempel',
                    type: "exampleUsage"
                }
            ]
        }
    ]
}

