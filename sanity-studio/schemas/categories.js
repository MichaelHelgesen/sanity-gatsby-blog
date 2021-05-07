export default {
    name: "categories",
    title: "Kategorier",
    type: "document",
    fields: [
        {
            title: 'Kategorinavn',
            name: 'categoryTitle',
            type: 'string',
            validation: Rule => Rule.required()
        },
    ]
}