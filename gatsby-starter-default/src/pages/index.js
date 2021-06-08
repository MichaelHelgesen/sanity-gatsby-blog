import * as React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import * as style from "../pages/index.module.scss"


//import sanityImageUrl from "@sanity/image-url"
//import sanityClient from "@sanity/client"
//import imageUrlBuilder from '@sanity/image-url'
//import SanityImage from "gatsby-plugin-sanity-image"

/* const client = sanityClient({
  dataset: "production",
  projectId: "esnfvjjt",
  apiVersion: '2021-04-24',
  useCdn: true,
})

const builder = imageUrlBuilder(client)

function urlFor(source) {
  return builder.image(source)
} */

export const pageQuery = graphql`
  query {
    book: allSanityBook(sort: {fields: date, order: DESC}) {
      edges {
        node {
          category {
            categoryTitle
          }
          date(formatString: "DD.MM.YYYY")
          description
          id
          internal {
            type
          }
          slug {
            _key
            _type
            current
          }
          title
        }
      }
    }
    post: allSanityPost (sort: {
      fields: date,
      order: DESC
    }){
      edges {
        node {
          _rawContent
          category {
            categoryTitle
          }
          date(formatString: "DD.MM.YYYY")
          description
          internal {
            type
          }
          introduction
          slug {
            current
          }
          title
        }
      }
    }

  }
`
const IndexPage = ({ data }) => {

const { post, book} = data;

console.log("BBOK", book)

const mergedQuery2 = [...data.post.edges, ...data.book.edges].sort(function (a, b) {
  // Format the date to year, month, day to get correct sort order
  const formatDate = (arg) => arg.node.date.slice(6).concat(arg.node.date.slice(3, 5)).concat(arg.node.date.slice(0, 2));
  return formatDate(b) - formatDate(a)
});;


/* console.log("edges", newItem);  */
  // Merge two content-types together and sort by date
  const mergedQuery = data.post.edges
    .concat(data.book.edges)
    .sort(function (a, b) {
      // Format the date to year, month, day to get correct sort order
      const formatDate = (arg) => arg.node.date.slice(6).concat(arg.node.date.slice(3, 5)).concat(arg.node.date.slice(0, 2));
      return formatDate(b) - formatDate(a)
    });

  // Create list items from content
  const posts = mergedQuery2.map(post => (
    <div key={post.node.title}>
      <a className={style.link} href={post.node.slug ? `${post.node.internal.type == "SanityPost" ? "blogg" : "bibliotek"}/${post.node.slug.current}` : `${post.node.internal.type == "SanityPost" ? "blogg" : "bibliotek"}/${post.node.title.toLowerCase().replace(/\s+/g, '-').slice(0, 200)}`}>
        <h2 className={style.title}>{post.node.title}</h2>
        <p style={{ margin: "10px 0 10px 0" }}>{post.node.description}</p>
        <small className={style.dateCategory}>{post.node.date} •
            { // Create a span for each category defined on item
            post.node.category && post.node.category.length ?
              post.node.category.map((cat, index) => (
                (index > 0 ? <span key={index}>, {cat.categoryTitle} </span> : <span key={index}> {cat.categoryTitle}</span>)
              )) :
              <span> Ukategorisert </span>
          }
        </small>
      </a>
    </div>

  ));

  return (
    <Layout>
      {posts}
    </Layout>
  )
}

export default IndexPage
