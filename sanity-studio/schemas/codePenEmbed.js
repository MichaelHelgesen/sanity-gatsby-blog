import * as React from "react"

const CodePenPreview = ({value}) => {

    if(!value.embedCode) {
        return(
            <div>Lim inn CopePen-kode</div>
        )
    }
	return (
        <div
            className="content"
            dangerouslySetInnerHTML={{__html: value.embedCode}}
        >
        </div>
    )
}



export default {
    name: 'codePen',
    title: 'CodePen-embed',
    type: 'object',
    fields: [
        {
            name: "codePenEmbed",
            rows: 10,
            title: "CodePen-embed",
            type: "text",
        }
    ],
    preview: {
        select: {
            embedCode: "codePenEmbed"
        },
        component: CodePenPreview
    } 
}
