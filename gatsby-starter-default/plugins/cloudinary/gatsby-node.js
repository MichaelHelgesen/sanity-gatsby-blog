let cloudinary = require("cloudinary")

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true
})

exports.sourceNodes = async function ({ actions, createNodeId, createContentDigest }) {
    const { createNode } = actions

    await cloudinary.v2.search.expression("folder:mikkesblogg/*")
        .sort_by("created_at", "asc")
        .max_results(200)
        .execute()
        .then((result) => {
            
            const myResults = { ...result }
            
            const nodeContent = JSON.stringify(myResults)

            const nodeMeta = {
                id: createNodeId(`my-data-${myResults.asset_id}`),
                parent: null,
                children: [],
                internal: {
                    type: `cloudinaryImages`,
                    mediaType: `text/html`,
                    content: nodeContent,
                    contentDigest: createContentDigest(myResults)
                }
            }
            
            const node = Object.assign({}, myResults, nodeMeta)

            createNode(node)
        }
    )
}