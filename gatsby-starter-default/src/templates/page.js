import * as React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import BlockContent from '@sanity/block-content-to-react'
import serializers from "../components/serializers"
import * as style from "../templates/blogPost.module.scss"
import BlogList from "../components/blogList"


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
      const posts = <BlogList props={mergedContent} />

    return (
      <Layout>
      <div style={{ margin: '0 0 40px 0', position: "relative" }}>
        <div className={style.headerwrap}>
          <div className={style.intro}>
            <h2 className={style.title}>{data.page.title}</h2>
            <p className={style.ingress}>{data.page.introduction}</p>

          </div>

          <div className={style.topcolor}></div>
        </div>
        <div className={style.content}>
            {
                data.page.title === "Blogg" ? posts : null
            }
        </div>
      </div>
    </Layout>
    )
}




export default Page