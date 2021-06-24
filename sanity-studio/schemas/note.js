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
        {
            name: "image",
            title: "Bilde",
            type: "bodyImage",
        },
    ],
    orderings: [
        {
            title: 'Dato, nyeste',
            name: 'publishDateDesc',
            by: [
                { field: 'date', direction: 'desc' }
            ]
        },
        {
            title: 'Dato, eldste',
            name: 'publishDateAsc',
            by: [
                { field: 'date', direction: 'asc' }
            ]
        },
    ],
    preview: {
        select: {
            date: 'date',
        },
        prepare(selection) {
            const { date } = selection
            return {
                title: `${date}`
            }
        }
    }
}
