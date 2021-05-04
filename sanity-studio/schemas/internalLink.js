export default {
    name: "internalLink",
    type: "object",
    title: "Intern link",
    fields: [
        {
            name: "reference",
            type: "reference",
            title: "Referanse",
            to: [
                {  
                    type: "post"
                },
            ]
        }
    ]
}
