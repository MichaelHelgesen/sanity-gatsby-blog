import * as React from "react"
import { graphql } from "gatsby"
import BlockContent from '@sanity/block-content-to-react'
import Layout from "../components/layout"
import serializers from "../components/serializers"

export const pageQuery = graphql`
  query ($id: String!){
    sanityPost(id: {eq: $id}) {
            id
            title
            date(formatString: "DD.MM.YYYY")
            description
            category {
                categoryTitle
            }
            introduction
            _rawContent(resolveReferences:{maxDepth:10})
      }
  }
`

const blogPost = ({ data }) => {
    const post = data.sanityPost;
    
      return (
        <Layout>
          <div className={"intro"}>
            <p>
              Hei, og velkommen til Mikkes blogg. Jeg ønsker ikke å vente med å skrive til bloggen er ferdig utviklet. 
              Av den grunn kan designet virke noe simpelt, men endringer og forbedringer vil gjennomføres med jevne mellomrom. 
            </p>
          </div>
          <div style={{ margin: '60px 0 40px 0' }}>
          <h2>{post.title}</h2>
          <small>{post.date}
        {
          post.category.length ?
            post.category.map((cat, index) => (
              <span key={index}> #{cat.categoryTitle} </span>
            )) :
            <span> #Ukategorisert </span>
        }
      </small>
          <p className={"ingress"}>{
            post.introduction || post.description
          }</p>
          <div >
            {post._rawContent ?
            <BlockContent
            blocks={post._rawContent}
            serializers={serializers}
          /> : null
            }
            
          </div>
        </div>
        </Layout>
      )
    }
  
  export default blogPost