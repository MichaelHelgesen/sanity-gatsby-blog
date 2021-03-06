
export default {
    name: "globalMessage",
    title: "Global beskjed",
    type: "document",
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
                    { title: 'Grønn', value: '186, 255, 220' },
                    { title: 'Gul', value: '237, 237, 156' },
                    { title: 'Rød', value: '255, 186, 186' }
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
                            },
                            {
                                name: "epost",
                                type: "emailLink"
                            },
                        ],
                        decorators: [
                            { title: 'Strong', value: 'strong' },
                            { title: 'Emphasis', value: 'em' },
                            { title: "Code", value: "code" },
                            { title: "Underline", value: "underline" },
                            { title: "Strike", value: "strike-through" }
                        ]
                    },
                    styles: [
                        { title: 'Normal', value: 'normal' },
                    ],

                }
            ]
        },
    ],
    preview: {
        select: {
            title: 'tipTitle',
            subtitle: 'tipContent',
        },

    }
    
}

