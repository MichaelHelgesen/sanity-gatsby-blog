import * as React from "react"
import { graphql, Link } from "gatsby"
import * as style from "../pages/index.module.scss"

export const singlePageQuery = graphql`
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
const BlogListTest = ({ data }) => {
console.log(data)


    // Create list items from content
    return (
        <p>ddl</p>
    )
}

export default BlogListTest