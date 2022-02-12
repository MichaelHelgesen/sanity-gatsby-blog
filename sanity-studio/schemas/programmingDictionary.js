export default {
    name: 'programmingDictionary',
    title: 'Dataord',
    type: 'document',
    fields: [
        {
            name: "englishWord",
            title: "Engelsk ord",
            type: "string",
            validation: Rule => Rule.required()
        },
        {
            name: "norwegianWord",
            title: "Norsk ord",
            type: "string",
            validation: Rule => Rule.required()
        },
        {
            title: 'Forklaring',
            name: 'content',
            type: 'array',
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
                            },
                            {
                                name: "dictionaryLink",
                                type: "dictionaryLink",
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
                    type: "youtubeLink" 
                },
                {
                    title: "Tipsfelt",
                    type: "tipField"
                },
                {
                    type: "codePen"
                }
            ]
        }
    ],
}
