import * as React from "react"
import { graphql, Link } from "gatsby"
import BlockContent from '@sanity/block-content-to-react'
import Layout from "../components/layout"
import serializers from "../components/serializers"
import SimilarPosts from "../components/similarPosts"
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
            image {
              alt
              _type
              _rawAsset(resolveReferences:{maxDepth:10})
              asset { 
                url
                metadata {
                  dimensions {
                    height
                    width
                  }
                }
              }
              crop {
                _key
                _type
                top
                bottom
                left
                right
              } 
              hotspot {
                _key
                _type
                x
                y
                height
                width
              }
              toggleImage
            }
            date(formatString: "DD.MM.YYYY")
            description
            category {
                categoryTitle
            }
            globalMessage {
              tipColor
              tipText
              tipTitle
              _rawTipContent(resolveReferences: {maxDepth: 10})
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

  // Function for image settings and generating URL
  function urlBuilder(image) {
    const { width, height } = post.image.asset.metadata.dimensions;
    return (
      "w=1000" +
      "&h=500" +
      "&fit=crop" +
      "&q=75" +
      "&bg=000000" +
      // Check if there is a crop
      `${image.hotspot ?
        "&crop=focalpoint" +
        `&fp-x=${image.hotspot.x}` +
        `&fp-y=${image.hotspot.y}`
        : "&crop=center"}` +
      // Check if there is a crop
      `${image.crop ?
        "&rect=" +
        `${Math.floor(width * image.crop.left)},` +
        `${Math.floor(height * image.crop.top)},` +
        `${Math.floor(width - (width * image.crop.left + width * image.crop.right))},` +
        `${Math.floor(height - (width * image.crop.top + width * image.crop.bottom))}`
        :
        ""}`
    )
  }

  const createSlug = (string) => string.toLowerCase().replace(/\s+/g, '-').slice(0, 200);

  return (
    <Layout>
      <Helmet>
        <meta charSet="utf-8" />
        <title>{post.title}{data.site.siteMetadata.titleTemplate}</title>
        <link rel="canonical" href={`${data.site.siteMetadata.url}/blogg/${post.slug ? post.slug.current : createSlug(post.title)}`} />
      </Helmet>
      <div className={style.headerwrap} style={!post.image || !post.image.toggleImage ? { paddingTop: "2.9rem" } : null}>
        {post.image && post.image.toggleImage ? <div className={style.blogPostImage} style={{ background: `url(${post.image.asset.url}?${urlBuilder(post.image)}) no-repeat center center`, backgroundSize: "cover" }}> {post.image._rawAsset.creditLine ? <span className={style.creditLine}>{post.image._rawAsset.creditLine}</span> : null}</div> : null}

        <div className={post.image && post.image.toggleImage ? style.introWithImage : style.intro}>
          <div className={style.introWrapper}>
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
        </div>
        <div className={style.topcolor}></div>
      </div>

      <div className={style.content}>
        <div>
          {post.globalMessage.length ?
            <div className={style.globalMessage} style={{ backgroundColor: `rgba(${post.globalMessage[0].tipColor || "186, 255, 220"}, .7)`, border: `3px solid rgb(${post.globalMessage[0].tipColor || "186, 255, 220"})` }}>
              <h5>
                {post.globalMessage[0].tipText || post.globalMessage[0].tipTitle || null}
              </h5>
                <BlockContent
                  blocks={post.globalMessage[0]._rawTipContent}
                  serializers={serializers}
                />
            </div> : null
          }
          {post._rawContent ?
            <BlockContent
              blocks={post._rawContent}
              serializers={serializers}
            /> : null
          }
        </div>
        <div className={style.byline}>
          <span>MIKKES BLOGG</span>
          <h5>Takk for interessen</h5>
          <p>Har du en kommentar, et spørsmål, ris, ros, eller ønsker å påpeke feil eller mangler, kan du sende meg en mail. Jeg setter stor pris på en tilbakemelding.</p>
        </div>
      </div>
        <SimilarPosts category={post.category} slug={post.slug.current} numberOfPosts={3} />
        <div className={style.content} style={{paddingTop: "1.45rem"}} >
          <div className={style.knapper}>
            <Link
              to="/blogg" className={style.categories}>
              Se alle blogginnlegg
            </Link>
            <Link
              to="/blogg/kategorier" className={style.categories}>
              Se alle kategorier
            </Link>
          </div>
        </div>
    </Layout>
  )
}

export default blogPost
