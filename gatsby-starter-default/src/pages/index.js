import * as React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import * as style from "../pages/index.module.scss"
//import sanityImageUrl from "@sanity/image-url"
//import sanityClient from "@sanity/client"
//import imageUrlBuilder from '@sanity/image-url'
//import SanityImage from "gatsby-plugin-sanity-image"

/* const client = sanityClient({
  dataset: "production",
  projectId: "esnfvjjt",
  apiVersion: '2021-04-24',
  useCdn: true,
})

const builder = imageUrlBuilder(client)

function urlFor(source) {
  return builder.image(source)
} */

export const pageQuery = graphql`
  query {
    allSanityPost (sort: {
      fields: date,
      order: DESC
    }){
      edges {
        node {
          title
          slug {
            current
          }
          date(formatString: "DD.MM.YYYY")
          description
          introduction
          category {
            categoryTitle
          }
          _rawContent
        }
      }
    }
  }
`
const IndexPage = ({ data }) => {

  const posts = data.allSanityPost.edges.map(post => (
    <div key={post.node.title} style={{}}>
      <a className={style.link} href={post.node.slug ? post.node.slug.current : post.node.title.toLowerCase().replace(/\s+/g, '-').slice(0, 200)}>
        <h2 className={style.title}>{post.node.title}</h2>
        <p style={{ margin: "10px 0 10px 0" }}>{post.node.description}</p>
        <small className={style.dateCategory}>{post.node.date} •
          {
            post.node.category.length ?
              post.node.category.map((cat, index) => (
                (index > 0 ? <span key={index}>, {cat.categoryTitle} </span> : <span key={index}> {cat.categoryTitle}</span>)
              )) :
              <span> #Ukategorisert </span>
          }
        </small>
        {/* <a href={post.node.slug ? post.node.slug.current : post.node.title.toLowerCase().replace(/\s+/g, '-').slice(0, 200)}>Les mer</a> */}
      </a>
    </div>

  ))
  return (
    <Layout>
      <div className={"intro"}>
        <p>
          Velkommen! Jeg ønsker ikke å vente med å skrive til bloggen er ferdig utviklet.
          Av den grunn kan designet virke noe simpelt, men endringer og forbedringer vil gjennomføres med jevne mellomrom.
        </p>
      </div>
      {posts}
    </Layout>
  )
}

export default IndexPage

/*
<div key={post.node.title} style={{ backgroundColor: 'white', border: "1px solid rgb(236, 236, 236)", borderRadius: "5px", margin: '20px 0', boxShadow: "grey 0px 13px 30px -35px" }}>
    <a style={{textDecoration: "none", color: "inherit", padding: '20px', display: "block"}}  href={post.node.slug ? post.node.slug.current : post.node.title.toLowerCase().replace(/\s+/g, '-').slice(0, 200)}>
      <h2 style={{ padding: "0 0 10px 0", margin: "0", fontSize: "1.4rem", lineHeight:"1.6rem"}}>{post.node.title}</h2>
      <small style={{fontSize:".75rem", color: "rgb(144 144 144);"}}>{post.node.date} -
        {
          post.node.category.length ?
            post.node.category.map((cat, index) => (
              <span key={index}> #{cat.categoryTitle} </span>
            )) :
            <span> #Ukategorisert </span>
        }
      </small>
      <p style={{margin: "10px 0 0 0"}}>{post.node.description}</p>
      </a>
    </div>
*/