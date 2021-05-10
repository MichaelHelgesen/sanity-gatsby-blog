export default {
    name: "tipField",
    title: "Tipsfelt",
    type: "object",
    fields: [
        {
            description: "Velg passende tittel",
            name: "tipTitle",
            title: "Tittel",
            type: "string",
            options: {
                list: [
                    "Merk",
                    "Obs",
                    "Tips",
                    "Husk",
                ]
            }
        },
        {
            description: "Hvis ingen av de over passer kan du skrive egen kort tittel her.",
            name: 'tipText',
            rows: 1,
            title: 'Egendefinert tittel',
            type: 'text',
        },
        {
            description: "Velg farge på bakgrunn",
            name: "tipColor",
            title: "Variant",
            type: "string",
            options: {
                list: [
                    { title: 'Grønn', value: '#baffdc' },
                    { title: 'Gul', value: '#ffffde' },
                    { title: 'Rød', value: '#ffbaba' }
                ]
            }
        },
        {
            description: "Innholdet i feltet. Hold det kort.",
            name: "tipContent",
            title: "Tekster",
            type: "array",
            of: [
                {
                    type: "block",
                    lists: [
                        // None
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
                        ],
                        decorators: [
                            { title: 'Strong', value: 'strong' },
                            { title: 'Emphasis', value: 'em' }
                        ]
                    },
                    styles: [
                        { title: 'Normal', value: 'normal' },
                    ],

                }
            ]
        },
    ],
}