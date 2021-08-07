import * as React from "react"
import { graphql, Link } from "gatsby"
import BlockContent from '@sanity/block-content-to-react'
import Layout from "../components/layout"
import serializers from "../components/serializers"
import { Helmet } from "react-helmet"
import * as style from "../templates/blogPost.module.scss"

export const pageQuery = graphql`
  query ($id: String!){
    sanityPost(id: {eq: $id}) {
            id
            title
            slug {
              current
            }
            date(formatString: "DD.MM.YYYY")
            description
            category {
                categoryTitle
            }
            introduction
            _rawContent(resolveReferences:{maxDepth:10})
      }
      site {
        siteMetadata {
          title
          titleTemplate
          description
          author
          url
        }
      }
  }
`

const blogPost = ({ data }) => {
  const post = data.sanityPost;

  const createSlug = (string) => string.toLowerCase().replace(/\s+/g, '-').slice(0, 200);

  return (
    <Layout>
      <Helmet>
        <meta charSet="utf-8" />
        <title>{post.title}{data.site.siteMetadata.titleTemplate}</title>
        <link rel="canonical" href={`${data.site.siteMetadata.url}/blogg/${post.slug.current? post.slug.current : createSlug(post.title)}`} />
      </Helmet>
      <div className={style.headerwrap}>
        <div className={style.intro}>
          <small className={style.breadcrumb}>
            <Link to={`/`}>hjem</Link> / <Link to={`/blogg/`}>blogg</Link> /
          </small>
          <h1 className={style.title}>{post.title}</h1>
          <small className={style.dateCategory}>{post.date} •
            { // Create a span for each category defined on item
              post.category && post.category.length ?
                post.category.map((cat, index) => (
                  (index > 0 ? <span key={index}>, <Link to={`/blogg/kategorier/${cat.categoryTitle.toLowerCase()}`}>{cat.categoryTitle}</Link></span> : <span key={index}> <Link to={`/blogg/kategorier/${cat.categoryTitle.toLowerCase()}`}>{cat.categoryTitle}</Link></span>)
                )) :
                <span> Ukategorisert </span>
            }
          </small>
          <p className={style.ingress}>{
            post.introduction || post.description
          }</p>
        </div>
        <div className={style.topcolor}></div>
      </div>
      <div className={style.content}>
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
