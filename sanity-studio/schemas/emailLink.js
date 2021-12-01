export default {
    name: 'emailLink',
    title: 'Epost-adresse',
    type: 'object',
    fields: [
        {
            description: 'E-post-adresse',
            name: 'epost',
            type: 'url',
            validation: Rule => Rule.uri({
                scheme: ['mailto']
              })
        },
        {
            description: 'Emne',
            name: 'subject',
            type: 'string',
        }
    ]
}