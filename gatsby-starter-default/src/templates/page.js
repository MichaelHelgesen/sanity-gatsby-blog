import * as React from "react"
import { Link, graphql } from "gatsby"
import Layout from "../components/layout"
import BlockContent from '@sanity/block-content-to-react'
import serializers from "../components/serializers"
import * as style from "../templates/page.module.scss"
import BlogList from "../components/blogList"
import Notes from "../components/notesList"
import BookList from "../components/bookList"
import CategoryList from "../components/categoryList"
import { Helmet } from "react-helmet"
import ImageGallery from "../components/imageGallery"
import Dictionary from "../components/dictionary"

export const pageQuery = graphql`
query ($id: String!){
     page: sanityPage(id: {eq: $id}) {
        id
        introduction
        title
        _rawContent(resolveReferences:{maxDepth:10})
      }
    book: allSanityBook(sort: {fields: date, order: DESC}) {
        edges {
          node {
            author
            category {
              categoryTitle
            }
            date(formatString: "DD.MM.YYYY")
            description
            id
            image {
                alt
                asset { 
                  _id
                  gatsbyImageData(width: 600, height: 520, placeholder: BLURRED, layout: CONSTRAINED)
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
            internal {
              type
            }
            read(formatString: "DD.MM.YYYY")
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
      cloudinary: allCloudinaryImages {
        edges {
          node {
            id
        resources {
          secure_url
          filename
          folder
          aspect_ratio
          resource_type
          type
          asset_id
          display_name
          format
          height
          public_id
          width
        }
          }
        }
      }
      notes: allSanityNote (sort: {fields: date, order: DESC}) {
        edges {
          node {
            date(formatString: "D. MMMM YYYY")
            id
            title
            _rawText(resolveReferences:{maxDepth:10})
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
                bottom
                left
                right
                top
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

const findNumberOfCategoriesInArray = (array, category) => (
  array.map(function (item) {
    return item.node.category.filter(function (cat) {
      return cat.categoryTitle === category
    })
  }).filter(function (el) {
    return el.length > 0
  }).length
)

const Page = ({ data }) => {

  const mergedContent = [...data.post.edges, ...data.book.edges].sort(function (a, b) {
    // Format the date to year, month, day to get correct sort order
    const formatDate = (arg) => arg.node.date.slice(6).concat(arg.node.date.slice(3, 5)).concat(arg.node.date.slice(0, 2));
    return formatDate(b) - formatDate(a)
  });

  const categories = data.categories.edges;

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
    const catA = a.props.children[0].toUpperCase(); // Ignorere store og små bokstaver
    const catB = b.props.children[0].toUpperCase();
    if (catA < catB) {
      return -1;
    }
    if (catA > catB) {
      return 1;
    }
    return 0;
  });

  let posts
  console.log(data.page.title)
  console.log(data.page._rawContent)

  switch (data.page.title) {
    case "Blogg": posts = <BlogList props={mergedContent} />
      break;
    case "Notater": posts = <Notes props={data.notes.edges} />
      break;
    case "Bibliotek": posts = <BookList props={data.book.edges} />
      break;
    case "Kategorier": posts = <CategoryList categories={data.categories.edges} posts={mergedContent} />
      break;
    case "Galleri": posts = <ImageGallery props={data.cloudinary.edges} />
      break;
    case "Dataordliste": posts = <Dictionary props={data.dictionary.edges} />
      break;
   // default: posts = <div className={style.content}><BlockContent blocks={data.page._rawContent} serializers={serializers} /></div>
  }

  return (
    <Layout>
      <Helmet>
        <meta charSet="utf-8" />
        <title>{data.page.title}{data.site.siteMetadata.titleTemplate}</title>
        <link rel="canonical" href={`${data.site.siteMetadata.url}/${data.page.title.toLowerCase()}`} />
      </Helmet>
      <div style={{ margin: '0', position: "relative" }}>
        <div className={style.headerwrap}>
          <div className={style.intro}>
            <small className={style.breadcrumb}>
              <Link to={`/`}>hjem</Link>{data.page.title === "Kategorier" ? <span> / <Link to={`/blogg/`}>blogg</Link> /</span> : <span> /</span>}
            </small>
            <h1 className={style.title}>{data.page.title}</h1>
            <p className={style.ingress}>{data.page.introduction}</p>
            {data.page.title === "Blogg" ? <div className={style.categoryWrapper}>{categoryList}</div> : null}
          </div>
          <div className={style.topcolor}></div>
        </div>
        <div>
          {posts}
        </div>
        {data.page.title === "Blogg" ? <div style={{ height: "2.9rem" }}></div> : null}
      </div>
    </Layout>
  )
}

export default Page