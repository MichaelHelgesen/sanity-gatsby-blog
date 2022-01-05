/* exports.onCreateNode = ({ node }) => {
    console.log(`Node created of type "${node.internal.type}"`)
} */





/* let cloudinary = require("cloudinary")

cloudinary.config({
    cloud_name: "mikkesblogg",
    api_key: "689568281515846",
    api_secret: "RAb_aIzf7cFfjQxZWn4SUBcOUYI",
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
} */



exports.createPages = async function ({ actions, graphql }) {
    const { createPage } = actions;
    const { data } = await graphql(`
    query {
        books: allSanityBook (sort: {
            fields: date,
            order: DESC
        }) 
        {
            edges {
                node {
                    id
                    internal {
                        type
                    }
                    title
                    slug {
                        current
                    }
        
                }
            }       
        }
        categories: allSanityCategories {
            edges {
              node {
                id
                categoryTitle
                internal {
                  type
                }
              }
            }
        }
        pages: allSanityPage {
            edges {
              node {
                id
                internal {
                    type
                  }
                slug {
                  current
                }
                title
              }
            }
          }
        posts: allSanityPost (sort: {
            fields: date,
            order: DESC
        }) 
        {
            edges {
                node {
                    id
                    internal {
                        type
                    }
                    title
                    slug {
                        current
                    }
                }
            }       
        }
    }
`)

    const createPages = (node) => {
        let id = node.id
        const createSlug = (string) => string.toLowerCase().replace(/\s+/g, '-').slice(0, 200);
        let titleAsSlug
        let slug
        let pathUrl
        let pageComponent
        let category

        if (node.internal.type === "SanityCategories") {
            titleAsSlug = createSlug(node.categoryTitle)
            category = node.categoryTitle;
            pathUrl = "/blogg/kategorier/";
            pageComponent = require.resolve(`./src/templates/category.js`);
        } else if (node.internal.type === "SanityPage") {
            titleAsSlug = createSlug(node.title);
            pathUrl = "/";
            pageComponent = require.resolve(`./src/templates/page.js`);
        } else {
            titleAsSlug = createSlug(node.title);
            pathUrl = "/blogg/";
            pageComponent = (node.internal.type === "SanityPost" ? require.resolve(`./src/templates/blogPost.js`) : require.resolve(`./src/templates/book.js`));
        }

        slug = !node.slug ? titleAsSlug : node.slug.current;

        createPage({
            path: `${pathUrl}${slug}`,
            component: pageComponent,
            context: { id, category },
        })
    }



    // Create single blog post
    data.posts.edges.forEach(({ node }) => {
        createPages(node)
    })

    // Create single book page
    data.books.edges.forEach(({ node }) => {
        createPages(node)
    })

    // Create single category page
    data.categories.edges.forEach(({ node }) => {
        createPages(node)
    })

    // Create single pages
    data.pages.edges.forEach(({ node }) => {
        if (node.title != "Hjem") {
            createPages(node)
        }
    })
}











/*     const mergedData = [...data.posts.edges, ...data.books.edges].forEach(({ node }) => {
        createPages(node);
    })
 */


/* mergedData.forEach(({ node }) => {
    createPages(node);
}) */

    // Create paginated pages for posts

/*     const postPerPage = 3;
    const numPages = Math.ceil(data.allSanityPost.edges.length / postPerPage) */

/* Array.from({ length: numPages }).forEach((_, i) => {
    actions.createPages({
        path: i === 0 ? `/` : `/${i + 1}`,
        component: require.resolve("./src/templates/allPosts.js"),
        context: {
            limit: postPerPage,
            skip: i * postPerPage,
            numPages,
            currentPage: i + 1,
        }
    })
}) */