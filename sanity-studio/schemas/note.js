export default {
    name: "note",
    title: "Notater",
    type: "document",
    fields: [
        {
            name: "title",
            title: "Tittel",
            type: "string"
        },
        {
            name: "date",
            title: "Dato",
            type: "date"
        },
        {
            name: "text",
            title: "Tekst",
            type: "array",
            of: [
                {
                    type: 'block',
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
                },
                {
                    type: 'bodyImage',
                },
                {
                    title: 'Kodeeksempel',
                    type: "exampleUsage"
                },
                {
                    title: "Tipsfelt",
                    type: "tipField"
                }
            ]
        },
    ]
}
