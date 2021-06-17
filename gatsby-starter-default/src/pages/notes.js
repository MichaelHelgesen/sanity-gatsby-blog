import * as React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import BlockContent from '@sanity/block-content-to-react'
import serializers from "../components/serializers"
import * as style from "../templates/blogPost.module.scss"
import * as blogStyle from "../pages/index.module.scss"


export const pageQuery = graphql`
  query {
    allSanityNote(sort: {fields: date, order: DESC}) {
      edges {
        node {
          date(formatString: "DD.MM.YYYY")
          id
          title
          _rawText(resolveReferences:{maxDepth:10})
        }
      }
    }
  }
`
const IndexPage = ({ data }) => {

  const notes = data.allSanityNote.edges;

  const posts = notes.map(post => (
    <div key={post.node.title}>
        <h2 className={blogStyle.title}>{post.node.title}</h2>
        <p style={{ margin: "10px 0 10px 0" }}>{post.node.description}</p>
        <small className={blogStyle.dateCategory}>{post.node.date}
        </small>
    </div>
  
  ));

    return (
      <Layout>
      <div style={{ margin: '0 0 40px 0', position: "relative" }}>
        <div className={style.headerwrap}>
          <div className={style.intro}>
            <h2 className={style.title}>Notater</h2>
            <p className={style.ingress}>Korte tekster om hva jeg har tenkt og gjort en dag, om jeg i det hele tatt har tenkt eller gjort noe.</p>

          </div>

          <div className={style.topcolor}></div>
        </div>
        <div className={style.content}>
          {posts}
        </div>
      </div>
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