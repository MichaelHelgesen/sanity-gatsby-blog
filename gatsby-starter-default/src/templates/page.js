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
      categories: allSanityCategories {
        edges {
          node {
            categoryTitle
            color
            id
            _rawCategoryDescription
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
    }
`
const Page = ({ data }) => {

    const mergedContent = [...data.post.edges, ...data.book.edges].sort(function (a, b) {
        // Format the date to year, month, day to get correct sort order
        const formatDate = (arg) => arg.node.date.slice(6).concat(arg.node.date.slice(3, 5)).concat(arg.node.date.slice(0, 2));
        return formatDate(b) - formatDate(a)
    });
    const categories = data.categories.edges;

    // Filtrert kategori-liste
    const categoryList = categories.map(cat => (
      <Link className={style.categories} style={{ backgroundColor: `#${cat.node.color}` }} to={`/blogg/kategorier/${cat.node.categoryTitle.toLowerCase()}`}>{cat.node.categoryTitle}</Link>
    )
    ).sort(function (a, b) {
      const catA = a.props.children.toUpperCase(); // Ignorere store og små bokstaver
      const catB = b.props.children.toUpperCase();
      if (catA < catB) {
        return -1;
      }
      if (catA > catB) {
        return 1;
      }
      return 0;
    });
    
    let posts

    if (data.page.title === "Blogg") {
        posts = <BlogList props={mergedContent} />
    } else if (data.page.title === "Notater") {
        posts = <Notes props={data.notes.edges} />
    } else if (data.page.title === "Bibliotek") {
        posts = <BookList props={data.book.edges} />
    } else if (data.page.title === "Kategorier") {
        posts = <CategoryList props={data.categories.edges} />
    }

    return (
        <Layout>
            <div style={{ margin: '0 0 40px 0', position: "relative" }}>
                <div className={style.headerwrap}>
                    <div className={style.intro}>
                        <small className={style.breadcrumb}>
                            <Link to={`/`}>hjem</Link>{data.page.title === "Kategorier" ? <span> / <Link to={`/blogg/`}>blogg</Link>:</span> : <span>:</span> }
                        </small>
                        <h1 className={style.title}>{data.page.title}</h1>
                        <p className={style.ingress}>{data.page.introduction}</p>
                        {data.page.title === "Blogg" ? categoryList : null}
                    </div>

                    <div className={style.topcolor}></div>
                </div>
                <div>
                    {posts ? posts : <div className={style.content}><BlockContent blocks={data.page._rawContent} serializers={serializers} /></div>}
                </div>
            </div>
        </Layout>
    )
}




export default Page