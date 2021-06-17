import * as React from "react"
import { graphql } from "gatsby"
import BlockContent from '@sanity/block-content-to-react'
import Layout from "../components/layout"
import serializers from "../components/serializers"
import * as style from "../templates/blogPost.module.scss"
import * as blogStyle from "../pages/index.module.scss"

export const pageQuery = graphql`
query ($id: String!, $category: String!) {
  categories: sanityCategories(id: {eq: $id}) {
        id
        categoryTitle
        _rawCategoryDescription
  }
  posts: allSanityPost(filter: {category: {elemMatch: {categoryTitle: {eq: $category}}}}) {
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
    books: allSanityBook {
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
}
`



const category = ({ data }) => {

const categories = data.categories;
let blogPosts

if (categories.categoryTitle === "Bokomtale") {
  blogPosts = data.books.edges;
} else {
  blogPosts = data.posts.edges;
}

// Create list items from content
const posts = blogPosts.map(post => (
  <div key={post.node.title}>
    <a className={blogStyle.link} href={post.node.slug ? `${post.node.internal.type === "SanityPost" ? "blogg" : "bibliotek"}/${post.node.slug.current}` : `${post.node.internal.type === "SanityPost" ? "blogg" : "bibliotek"}/${post.node.title.toLowerCase().replace(/\s+/g, '-').slice(0, 200)}`}>
      <h2 className={blogStyle.title}>{post.node.title}</h2>
      <p style={{ margin: "10px 0 10px 0" }}>{post.node.description}</p>
      <small className={blogStyle.dateCategory}>{post.node.date} •
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


console.log(posts)
  return (
    <Layout>
      <div style={{ margin: '0 0 40px 0', position: "relative" }}>
        <div className={style.headerwrap}>
          <div className={style.intro}>
            <h2 className={style.title}>{categories.categoryTitle}</h2>
            <p className={style.ingress}>{
              <BlockContent
              blocks={categories._rawCategoryDescription}
              serializers={serializers}
            />
            }</p>

          </div>

          <div className={style.topcolor}></div>
        </div>
        <div className={style.content}>
          {posts}
        </div>
      </div>
    </Layout>
  )
}

export default category

