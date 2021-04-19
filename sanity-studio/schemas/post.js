// in post.js

export default {
    title: 'Blogginnlegg',
    name: 'post',
    type: 'document',
    fields: [
        {
            title: 'Title',
            name: 'title',
            type: 'string',
            validation: Rule => Rule.required()
        },
        {
            title: 'Date',
            name: 'date',
            type: 'datetime',
            validation: Rule => Rule.required()
        },
        {
            title: 'Description',
            name: 'description',
            type: 'string',
            validation: Rule => Rule.required()
        },
        {
            title: 'Content',
            name: 'content',
            type: 'array',
            of: [
                    {
                        type: 'block'
                    },
                    {
                        type: 'image'
                    },
                    {
                        name: 'exampleUsage',
                        title: 'Example usage',
                        type: 'code',
                        options: {
                            theme: "monokai"
                        }
                      }
                ]
        }
    ]
}

