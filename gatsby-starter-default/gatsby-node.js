exports.onCreateNode = ({ node }) => {
    console.log(`Node created of type "${node.internal.type}"`)
}

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
        const id = node.id;
        const title = node.title.toLowerCase().replace(/\s+/g, '-').slice(0, 200);
        const slug = !node.slug ? title : node.slug.current;
        const type = node.internal.type;
        createPage({
            path: type == "SanityPost" ? `/blogg/${slug}` : `/bibliotek/${slug}`,
            component: type == "SanityPost" ? require.resolve(`./src/templates/blogPost.js`) : require.resolve(`./src/templates/book.js`),
            context: { id },
        })
    }



        // Create single blogpost
        data.posts.edges.forEach(({ node }) => {
            createPages(node)
        })
    
        // Create single bookpage
        data.books.edges.forEach(({ node }) => {
            createPages(node)
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