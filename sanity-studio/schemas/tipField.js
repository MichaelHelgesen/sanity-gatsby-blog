export default {
    name: "tipField",
    title: "Tipsfelt",
    type: "object",
    fields: [
        {
            name: "tipTitle",
            title: "Tittel",
            type: "string",
            options: {
                list: [
                    "Title 1",
                    "Title 2"
                ]
            }
        },
        {
            name: 'tipText',
            title: 'Tekst',
            type: 'text',
        },
        {
            name: "tipContent",
            title: "Tekster",
            type: "array",
            of: [
                {
                    type: "block",
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
                }
            ]
        },
        {
            name: "tipColor",
            title: "Variant",
            type: "string",
            options: {
                list: [
                    {title: 'Grønn', value: '#baffdc'},
                    {title: 'Gul', value: '#ffffde'},
                    {title: 'Rød', value: '#ffbaba'}
                ]
            }
        }
    ],
}