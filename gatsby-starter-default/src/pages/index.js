import * as React from "react"
import { graphql, Link } from "gatsby"
import BlockContent from '@sanity/block-content-to-react'
import Layout from "../components/layout"
import serializers from "../components/serializers"
import * as style from "../pages/index.module.scss"
import BlogList from "../components/blogList"
import { Helmet } from "react-helmet"


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
          image {
            alt
            _type
            asset {
              url
              _id
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
    categories: allSanityCategories(sort: {fields: categoryTitle, order: ASC}) {
      edges {
        node {
          
      categoryTitle
      color
      id
      _rawCategoryDescription
        }
      }
    }
    pages: sanityPage(title: {eq: "Hjem"}) {
      bilde1 {
        alt
        _type
        asset {
          url
          _id
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
      bilde2 {
        alt
        _type
        asset {
          url
          _id
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
      id
      title
      _rawContent(resolveReferences:{maxDepth:10})
      introduction
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
          image {
            alt
            _type
            _rawAsset(resolveReferences:{maxDepth:10})
            asset {
              url
              _id
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
    site {
      siteMetadata {
        author
        description
        title
        titleTemplate
        url
      }
    }

  }
`

const findNumberOfCategoriesInArray = (array, category) => (
  array.map(function (item) {
    return item.node.category.filter(function (cat) {
      return cat.categoryTitle === category
    })
  }).filter(function (el) {
    return el.length > 0
  }).length
)




const IndexPage = ({ data }) => {

  const mergedContent = [...data.post.edges, ...data.book.edges].sort(function (a, b) {
    // Format the date to year, month, day to get correct sort order
    const formatDate = (arg) => arg.node.date.slice(6).concat(arg.node.date.slice(3, 5)).concat(arg.node.date.slice(0, 2));
    return formatDate(b) - formatDate(a)
  });
  const categories = data.categories.edges;
  const page = data.pages;
  const posts = <BlogList props={mergedContent.slice(0, 9)} />

  // Filtrert kategori-liste
  const categoryList = categories.map((cat, index) => {
    if (findNumberOfCategoriesInArray(mergedContent, cat.node.categoryTitle) !== 0) {
      return (
        <Link
          key={index}
          className={style.categories}
          style={{ backgroundColor: `#${cat.node.color}` }}
          to={`/blogg/kategorier/${cat.node.categoryTitle.toLowerCase()}`}>
          {cat.node.categoryTitle}&nbsp;<span style={{ fontWeight: 400 }}>({findNumberOfCategoriesInArray(mergedContent, cat.node.categoryTitle)})</span>
        </Link>
      )
    }
    return null
  }
  ).sort(function (a, b) {
    const navnA = a.props.children[0].toUpperCase(); // Ignorere store og små bokstaver
    const navnB = b.props.children[0].toUpperCase();
    if (navnA < navnB) {
      return -1;
    }
    if (navnA > navnB) {
      return 1;
    }
    return 0;
  });
// ---




  return (
    <Layout>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Velkommen til Mikkes blogg!</title>
        <link rel="canonical" href={data.site.siteMetadata.url} />
      </Helmet>
      <div style={{ margin: '0 0 40px 0', position: "relative" }}>
        <div className={style.headerwrap}>
          <div className={style.headerBg}>
            <div className={style.introField}>
              <span className={style.welcome}>VELKOMMEN TIL MIKKES BLOGG</span>
              <h1><span className={style.laer}>lær</span>ing <span className={style.via}>via</span><br/> <span className={style.del}>del</span>ing</h1>
              <BlockContent
                blocks={page._rawContent}
                serializers={serializers} />
                <div className={style.categoryList}>
              {categoryList} {/* <Link to={"/blogg/kategorier"}>Se alle kategoriene</Link> */}
              </div>
            </div>
          </div>
          <div className={style.topBg}
          style={{background:`url(${page.bilde2.asset.url}) no-repeat center center fixed`, backgroundSize:"200%", opacity:".3"}}
          ></div>
          <div className={style.topcolor}
            style={{background:`url(${page.bilde1.asset.url}) no-repeat`}}
          ></div>
          
        </div>
        <div className={style.content} style={{ textAlign: "center", marginBottom: "0" }}>
          <span style={{ textTransform: "uppercase", fontWeight: "700", fontSize: ".8em" }}>Siste blogginnlegg</span>
        </div>
        <div>
          {posts}
        </div>
        <div className={style.content} style={{ paddingTop: "1.45rem" }}>
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
      </div>
    </Layout>
  )
}

export default IndexPage

