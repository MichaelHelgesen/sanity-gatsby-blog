import { CgInternal } from "react-icons/cg";

export default {
    name: "internalLink",
    icon: CgInternal,
    type: "object",
    title: "Intern link",
    fields: [
        {
            name: "reference",
            type: "reference",
            title: "Referanse",
            to: [
                {  
                    type: "post",
                },
                {
                    type: "book",
                }
            ]
        }
    ]
}
