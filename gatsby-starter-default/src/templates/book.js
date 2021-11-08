import * as React from "react"
import { Link, graphql } from "gatsby"
import BlockContent from '@sanity/block-content-to-react'
import Layout from "../components/layout"
import serializers from "../components/serializers"
import { Helmet } from "react-helmet"
import * as style from "../templates/book.module.scss"


export const pageQuery = graphql`
  query ($id: String!){
    sanityBook(id: {eq: $id}) {
          _rawAffect(resolveReferences:{maxDepth:10})
          _rawReasonToRead(resolveReferences:{maxDepth:10})
          _rawSummary(resolveReferences:{maxDepth:10})
          _rawImpression(resolveReferences:{maxDepth:10})
          date(formatString: "DD.MM.YYYY")
          description
          id
          slug {
            current
          }
          image {
            alt
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
          }
          quotes {
            fav_quote
          }
          title    
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



const book = ({ data }) => {
  const post = data.sanityBook;
  //const imageData = getGatsbyImageData(post.image.asset.id, {maxWidth: 1024}, sanityConfig)

  // Function for image settings and generating URL
  function urlBuilder(image) {
    const { width, height } = post.image.asset.metadata.dimensions;
    return (
      "w=1000" +
      "&fit=clip" +
      "&q=75" +
      "&bg=000000" +
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

  return (
    <Layout>
      <Helmet>
        <meta charSet="utf-8" />
        <title>{post.title}{data.site.siteMetadata.titleTemplate}</title>
        <link rel="canonical" href={`${data.site.siteMetadata.url}/blogg/${post.slug.current}`} />
      </Helmet>
      <div style={{ margin: '0 0 40px 0', position: "relative" }}>
        <div className={style.headerwrap}>
          <div className={style.intro}>
            <div className={style.introWrapper}>
            <small className={style.breadcrumb}>
              <Link to={`/`}>hjem</Link> / <Link to={`/blogg/`}>blogg</Link> /
            </small>
            <h1 className={style.title}>{post.title}</h1>
            <small className={style.dateCategory}>{post.date} •
              <span> <Link to="/blogg/kategorier/bokomtale">Bokomtaler</Link> • <Link to={`/bibliotek/`}>Bibliotek</Link></span>
            </small>
            <p className={style.ingress}>{post.description}</p>
            <img className={style.bookIntroImage} src={`${post.image.asset.url}?${urlBuilder(post.image)}`} alt={post.image.alt ? post.image.alt : ""}/>
          </div>
</div>
          <div className={style.topcolor}></div>
        </div>
        <div className={style.content}>
          {post._rawSummary ?
            <div>
              <h3>Boken oppsummert i tre setninger</h3>
              {post._rawSummary ?
                <BlockContent
                  blocks={post._rawSummary}
                  serializers={serializers}
                /> : null
              }
            </div>
            : null}

          {post._rawReasonToRead ?
            <div >
              <h3>Hvorfor lese den?</h3>
              {post._rawReasonToRead ?
                <BlockContent
                  blocks={post._rawReasonToRead}
                  serializers={serializers}
                /> : null
              }
            </div>
            : null}

          {post._rawImpression ?
            <div>
              <h3>Mitt inntrykk</h3>
              {post._rawSummary ?
                <BlockContent
                  blocks={post._rawImpression}
                  serializers={serializers}
                /> : null
              }
            </div>
            : null}

          {post._rawAffect ?
            <div >
              <h3>Hvordan påvirket den meg?</h3>
              {post._rawAffect ?
                <BlockContent
                  blocks={post._rawAffect}
                  serializers={serializers}
                /> : null
              }
            </div>
            : null}

          {post.quotes.length ?
            <div className={style.quotes}>
              <h3>Mine tre favoritt-sitater</h3>
              {post.quotes.map((quote, index) =>
                (<p key={index}>{quote.fav_quote}</p>)
              )}
            </div>
            : null}

        </div>
      </div>
    </Layout>
  )
}

export default book


/* hotspot {
  _key
  _type
  x
  y
  height
  width
}
crop {
  _key
  _type
  top
  bottom
  left
  right
}
metadata {
                _key
                _type
                lqip
                hasAlpha
                isOpaque
                _rawLocation
                _rawDimensions
                _rawPalette
              }
              gatsbyImageData(fit: FILLMAX, placeholder: BLURRED)
              id
*/
