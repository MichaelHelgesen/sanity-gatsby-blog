// in post.js

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
                    options: {
                        hotspot: true,

                    },
                },
                {
                    name: 'exampleUsage',
                    title: 'Kodeeksempel',
                    type: 'code',
                    options: {
                        theme: "monokai"
                    }
                }
            ]
        }
    ]
}

