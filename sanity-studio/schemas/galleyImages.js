export default {
    name: "gallery",
    title: "Galleri",
    type: "document",
    fields: [
        {
            name: "title",
            title: "Tittel",
            type: "string"
        },
        {
            name: "text",
            title: "Beskrivelse",
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
            ]
        },
        {
            name: "image",
            title: "Bilde",
            type: "bodyImage",
        },
    ]
}
