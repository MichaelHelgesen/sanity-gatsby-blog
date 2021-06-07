import * as React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import * as style from "../pages/notes.module.scss"
import BlockContent from '@sanity/block-content-to-react'
import serializers from "../components/serializers"

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


    const posts = data.allSanityNote.edges.map(post => (
        <div key={post.node.title} className={style.link}>
            <h2 className={style.title}>{post.node.title}</h2>
            <div>
                {post.node._rawText ?
                    <BlockContent
                        blocks={post.node._rawText}
                        serializers={serializers}
                    /> : null
                }
            </div>
        </div>

    ));

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