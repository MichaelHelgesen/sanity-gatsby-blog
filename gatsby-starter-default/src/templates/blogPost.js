import * as React from "react"
import { graphql, Link } from "gatsby"
import BlockContent from '@sanity/block-content-to-react'
import Layout from "../components/layout"
import serializers from "../components/serializers"
import serializers2 from "../components/serializers2"
import SimilarPosts from "../components/similarPosts"
import { Helmet } from "react-helmet"
import * as style from "../templates/blogPost.module.scss"
import TableOfContents from "../components/blogContents"
//import BlogDictionary from "../components/blogDictionary"
//import SimpleReactLightbox from "simple-react-lightbox"
//import { SRLWrapper } from "simple-react-lightbox";
import SanityImage from "gatsby-plugin-sanity-image"

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
                _id
                gatsbyImageData (
                  width: 200
                  placeholder: BLURRED
                  formats: [AUTO, WEBP, AVIF]
                )
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
              toggleImage
            }
            date(formatString: "DD.MM.YYYY")
            description
            category {
                categoryTitle
            }
            showMessages {
              bottomText
              topText
              index
            }
            introduction
            _rawContent(resolveReferences:{maxDepth:10})
      }
      dictionary: allSanityProgrammingDictionary {
        edges {
          node {
            englishWord
            norwegianWord
            _rawContent(resolveReferences:{maxDepth:10})
          }
        }
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
  const showMessages = { ...post.showMessages }

  // Function for image settings and generating URL
  /*   function urlBuilder(image) {
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
    } */

  const createSlug = (string) => string.toLowerCase().replace(/\s+/g, '-').slice(0, 200);

  return (
    <Layout>
      <Helmet>
        <meta charSet="utf-8" />
        <title>{post.title}{data.site.siteMetadata.titleTemplate}</title>
        <link rel="canonical" href={`${data.site.siteMetadata.url}/blogg/${post.slug ? post.slug.current : createSlug(post.title)}`} />
      </Helmet>
      <div className={style.headerwrap} style={!post.image || !post.image.toggleImage ? { paddingTop: "2.9rem" } : null}>
        {/*         {post.image && post.image.toggleImage ? <div className={style.blogPostImage} style={{ background: `url(${post.image.asset.url}?${urlBuilder(post.image)}) no-repeat center center`, backgroundSize: "cover" }}> {post.image._rawAsset.creditLine ? <span className={style.creditLine}>{post.image._rawAsset.creditLine}</span> : null}</div> : null}
 */}        {post.image.asset._id ? <div className={style.blogPostImage} >
          <SanityImage
            // pass asset, hotspot, and crop fields
            {...post.image}
            // tell Sanity how large to make the image (does not set any CSS)
            width={1000}
            height={600}
            alt={post.image.alt}
            //config={{blur:50}}
            // style it how you want it
            style={{
              width: "100%",
              minHeight: "300px",
              height: "40vw",
              maxHeight: "50vh",
              objectFit: "cover"
            }}
          /> </div> : null}
        <div className={post.image && post.image.toggleImage ? style.introWithImage : style.intro}>
          {post.image._rawAsset.creditLine ? <span className={style.creditLine}>{post.image._rawAsset.creditLine}</span> : null}
          <div className={style.introWrapper}>
            <small className={style.breadcrumb}>
              <Link to={`/`}>hjem</Link> / <Link to={`/blogg/`}>blogg</Link> /
            </small>

            <h1 className={style.title}>{post.title}</h1>
            <small className={style.dateCategory}>{post.date} ???
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
          {showMessages.topText !== false ?
            <div className={style.disclaimer}>
              <h5>F??r du leser</h5>
              <p><Link to={"/om-mikke"}>Jeg er i en kontinuerlig l??ringsprosess.</Link> <b>Teksten reflekterer dermed min forst??else av emnet, basert p?? tilgjengelig informasjon ved publiseringsdato.</b> Feil og utdatert data kan forekomme. <a href={`mailto:post@mikkesblogg.no?subject=Henvendelse ang??ende ${post.title} p?? Mikkesblogg.no`}>Send meg gjerne en e-post</a> dersom du kommer over noe som b??r rettes.</p>
            </div>
            : null
          }
          {/* <BlogDictionary
              rawContent={post._rawContent}
              serializers={serializers}
              words={dictionary}
           /> */}
          {showMessages.index !== true ?
            <div classList={style.tableOfContent}>
              <TableOfContents
                rawContent={post._rawContent}
                serialiser={serializers2}
                title={post.title}
              />
            </div>
            : null
          }
          {post._rawContent ?

            <BlockContent
              blocks={post._rawContent}
              serializers={serializers}
            />
            : null
          }
        </div>
        {showMessages.bottomText !== false ?
          <div className={style.byline}>
            <span>MIKKES BLOGG</span>
            <h5>Takk for interessen</h5>
            <p>Har du en kommentar, et sp??rsm??l, ris, ros, eller ??nsker ?? p??peke feil eller mangler, kan du <a href={`mailto:post@mikkesblogg.no?subject=Henvendelse ang??ende ${post.title} p?? Mikkesblogg.no`}>sende meg en e-post</a>. Jeg setter stor pris p?? en tilbakemelding.</p>
          </div>
          : null}
      </div>
      <SimilarPosts category={post.category} slug={post.slug.current} numberOfPosts={6} />
      <div className={style.content} style={{ paddingTop: "1.45rem" }} >
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
