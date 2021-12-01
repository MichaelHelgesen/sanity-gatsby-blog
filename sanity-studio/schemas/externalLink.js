export default {
    name: 'externalLink',
    title: 'Ekstern lenke',
    type: 'object',
    fields: [
        {
            description: 'Lenke til ekstern side',
            name: 'href',
            type: 'url',
            validation: Rule => Rule.uri({
                scheme: ['http', 'https', 'mailto', 'tel']
              })
        }
    ]
}