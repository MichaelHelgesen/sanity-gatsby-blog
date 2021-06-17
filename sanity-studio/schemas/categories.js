export default {
    name: "categories",
    title: "Kategorier",
    type: "document",
    fields: [
        {
            name: 'categoryTitle',
            title: 'Kategorinavn',
            type: 'string',
            validation: Rule => Rule.required()
        },
        {
            name: 'categoryDescription',
            title: 'Beskrivelse', 
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
    
                                }
                            ]
                        },
                    }
            ]
          }

    ]
}