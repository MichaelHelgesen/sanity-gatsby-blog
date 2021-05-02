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
                    type: 'bodyImage',   
                },
                {
                    type: "image",
                    hidden: true
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

