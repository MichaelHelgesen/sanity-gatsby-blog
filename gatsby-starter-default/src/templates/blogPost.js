import * as React from "react"
import { graphql } from "gatsby"
import BlockContent from '@sanity/block-content-to-react'
import Layout from "../components/layout"
import serializers from "../components/serializers"
import {GatsbyImage} from 'gatsby-plugin-image'
import * as style from "../templates/blogPost.module.scss"

export const pageQuery = graphql`
  query ($id: String!){
    sanityPost(id: {eq: $id}) {
            id
            title
            date(formatString: "DD.MM.YYYY")
            description
            category {
                categoryTitle
            }
            introduction
            _rawContent(resolveReferences:{maxDepth:10})
      }
  }
`

const blogPost = ({ data }) => {
  const post = data.sanityPost;

  return (
    <Layout>
      <div className={style.content}>
        <h2 className={style.title}>{post.title}</h2>
        <small className={style.dateCategory}>{post.date}
          {
            post.category.length ?
              post.category.map((cat, index) => (
                <span key={index}> #{cat.categoryTitle} </span>
              )) :
              <span> #Ukategorisert </span>
          }
        </small>
        <p className={style.ingress}>{
          post.introduction || post.description
        }</p>
        <div>
          {post._rawContent ?
            <BlockContent
              blocks={post._rawContent}
              serializers={serializers}
            /> : null
          }
        </div>
      </div>
    </Layout>
  )
}

export default blogPost