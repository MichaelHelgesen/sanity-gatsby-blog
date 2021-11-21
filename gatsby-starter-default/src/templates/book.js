import * as React from "react"
import { Link, graphql } from "gatsby"
import BlockContent from '@sanity/block-content-to-react'
import Layout from "../components/layout"
import serializers from "../components/serializers"
import SimilarPosts from "../components/similarPosts"
import { Helmet } from "react-helmet"
import * as style from "../templates/book.module.scss"
import Image from "gatsby-plugin-sanity-image"


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
          category {
            categoryTitle
          }
          image {
            alt
            asset { 
              _id
              url
              metadata {
                dimensions {
                  height
                  width
                }
                lqip
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
  console.log(post.category)
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
      <div style={{ margin: '0 0 20px 0', position: "relative" }}>
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
{/*             <img className={style.bookIntroImage} src={`${post.image.asset.url}?${urlBuilder(post.image)}`} alt={post.image.alt ? post.image.alt : ""}/>
 */}            {post.image.asset._id ? <Image
                        // pass asset, hotspot, and crop fields
                        {...post.image}
                        className={style.bookIntroImage}
                        // tell Sanity how large to make the image (does not set any CSS)
                        width={850}
                        height={500}
                        alt={"g"}
                        //config={{blur:50}}
                        // style it how you want it
                        style={{
                           
                            height: "auto",
                        }}
                    /> : null}
          </div>
</div>
          <div className={style.topcolor}></div>
        </div>
        <div className={style.content} style={{paddingTop:"0!important"}}>
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
<div className={style.byline}>
          <span>MIKKES BLOGG</span>
          <h5>Takk for interessen</h5>
          <p>Har du en kommentar, et spørsmål, ris, ros, eller ønsker å påpeke feil eller mangler, kan du sende meg en mail. Jeg setter stor pris på en tilbakemelding.</p>
        </div>
        </div>
        
      </div>
        <SimilarPosts category={post.category} slug={post.slug.current} numberOfPosts={3} />
        <div className={style.content}>
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
