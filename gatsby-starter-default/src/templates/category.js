import * as React from "react"
import { graphql, Link } from "gatsby"
import BlockContent from '@sanity/block-content-to-react'
import Layout from "../components/layout"
import serializers from "../components/serializers"
import * as style from "../templates/blogPost.module.scss"
import BlogList from "../components/blogList"

export const pageQuery = graphql`
query ($id: String!, $category: String!) {
  categories: sanityCategories(id: {eq: $id}) {
        id
        categoryTitle
        _rawCategoryDescription
  }
  posts: allSanityPost(filter: {category: {elemMatch: {categoryTitle: {eq: $category}}}}, sort: {fields: date, order: DESC}) {
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
    books: allSanityBook(sort: {fields: date, order: DESC}) {
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

  const posts = <BlogList props={blogPosts} />

  return (
    <Layout>
      <div style={{ margin: '0 0 40px 0', position: "relative" }}>
        <div className={style.headerwrap}>
          <div className={style.intro}>
          <small className={style.breadcrumb}>
              <Link to={`/`}>hjem</Link> / <Link to={`/blogg/`}>blogg</Link> / <Link to={`/blogg/kategorier`}>kategorier</Link> /
            </small>
            <h1 style={{display: "flex"}} className={style.title}>{categories.categoryTitle}&nbsp;<span style={{opacity: .5, fontWeight: 400, fontSize: ".5em", lineHeight: 1.65}}>({blogPosts.length})</span></h1>
            <div className={style.ingress}>{
              <BlockContent
                blocks={categories._rawCategoryDescription}
                serializers={serializers}
              />
            }</div>

          </div>

          <div className={style.topcolor}></div>
        </div>
        <div>
          {posts}
        </div>
      </div>
    </Layout>
  )
}

export default category

