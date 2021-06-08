exports.onCreateNode = ({ node }) => {
    console.log(`Node created of type "${node.internal.type}"`)
}

exports.createPages = async function ({ actions, graphql }) {
    const { createPage } = actions;
    const { data } = await graphql(`
    query {
        allSanityPost (sort: {
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
        allSanityBook (sort: {
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

    const mergedData = data.allSanityPost.edges.concat(data.allSanityBook.edges);

    mergedData.forEach(({ node }) => {
        const id = node.id;
        const title = node.title.toLowerCase().replace(/\s+/g, '-').slice(0, 200);
        const slug = !node.slug ? title : node.slug.current;
        const type = node.internal.type;
        createPage({
            path: type == "SanityPost" ? `/blogg/${slug}` : `/bibliotek/${slug}`,
            component: type == "SanityPost" ? require.resolve(`./src/templates/blogPost.js`) : require.resolve(`./src/templates/book.js`),
            context: { id },
        })
    })

    /* // Create single blogpost
    data.allSanityPost.edges.forEach(({ node }) => {
        const title = node.title.toLowerCase().replace(/\s+/g, '-').slice(0, 200);
        const id = node.id;
        const slug = !node.slug ? title : node.slug.current;
        createPage({
            path: `/blogg/${slug}`,
            component: require.resolve(`./src/templates/blogPost.js`),
            context: { id },
        })
    })

    // Create single bookpage
    data.allSanityBook.edges.forEach(({ node }) => {
        const title = node.title.toLowerCase().replace(/\s+/g, '-').slice(0, 200);
        const id = node.id;
        const slug = !node.slug ? title : node.slug.current;
        createPage({
            path: `/bibliotek/${slug}`,
            component: require.resolve(`./src/templates/blogPost.js`),
            context: { id },
        })
    }) */
}



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