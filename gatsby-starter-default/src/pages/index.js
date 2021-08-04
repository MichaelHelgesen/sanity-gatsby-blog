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
      id
      title
      _rawContent
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
  const posts = <BlogList props={mergedContent.slice(0, 10)} />
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

  return (
    <Layout>
      <Helmet>
        <meta charSet="utf-8" />
        <title>{data.site.siteMetadata.title}</title>
        <link rel="canonical" href={data.site.siteMetadata.url} />
      </Helmet>
      <div style={{ margin: '0 0 40px 0', position: "relative" }}>
        <div className={style.headerwrap}>
          <div>
            <div className={style.introField}>
              <h1>{page.introduction}</h1>
              <p><BlockContent
                blocks={page._rawContent}
                serializers={serializers} />
              </p>
              {categoryList} {/* <Link to={"/blogg/kategorier"}>Se alle kategoriene</Link> */}
            </div>
          </div>
          <div className={style.topcolor}></div>
        </div>
        <div className={style.content}>
          <span style={{ textTransform: "uppercase", opacity: ".5", fontWeight: "700", fontSize: ".8em" }}>Siste ti blogginnlegg</span>
        </div>
        <div>
          {posts}
        </div>
        <div className={style.content} style={{ paddingTop: "1.45rem" }}>
          <Link
            to="/blogg" className={style.categories}
            style={{ backgroundColor: "rgb(166, 95, 3)", fontSize: "1rem", padding: "5px 30px" }}>
            Se alle
          </Link>
        </div>
      </div>
    </Layout>
  )
}

export default IndexPage

