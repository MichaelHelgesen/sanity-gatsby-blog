export default {
    name: "tipField",
    title: "Tipsfelt",
    type: "object",
    fields: [
        {
            name: 'tipText',
            title: 'Tekst',
            type: 'text',
        },
        {
            name: "tipColor",
            title: "Variant",
            type: "string",
            options: {
                list: [
                    {title: 'Grønn', value: 'green'},
                    {title: 'Gul', value: 'yellow'},
                    {title: 'Rød', value: 'red'}
                ]
            }
        }
    ],
}