import { CgInternal } from "react-icons/cg";

export default {
    name: "dictionaryLink",
    icon: CgInternal,
    type: "object",
    title: "Ordlink",
    fields: [
        {
            name: "reference",
            type: "reference",
            title: "Referanse",
            to: [
                {  
                    type: "programmingDictionary",
                }
            ]
        }
    ]
}
