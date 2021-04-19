import * as React from "react"
import { useEffect } from "react"
import { graphql } from "gatsby"
import { StaticImage } from "gatsby-plugin-image"
import BlockContent from '@sanity/block-content-to-react'
import Layout from "../components/layout"
import SEO from "../components/seo"
import Prism from "prismjs"

export const pageQuery = graphql`
  query {
    allSanityPost{
      edges {
    node {
    title
      date
      description
      _rawContent(resolveReferences: {maxDepth: 10})
    }
      }}
}
`





const IndexPage = ({ data }) => {
  const code = props => {
    return (
      <code className="language-javascript">{props.children}</code>
    
    )
  }
  
  const serializers = {
    types: {
      exampleUsage: props => (
        <pre>
              <code className={`language-${props.node.language}`}>{props.node.code}</code>
            </pre>
      )
    },
    marks: {code}
  }
  
  useEffect(() => {
    // call the highlightAll() function to style our code blocks
    Prism.highlightAll()
  })




  const posts = data.allSanityPost.edges.map(post => (
    <div key={post.node.title} style={{backgroundColor: '#ddd', padding: '20px', margin: '20px 0'}}>
      <h2>{post.node.title}</h2>
      <small>{post.node.date}</small>
      <p>{post.node.description}</p>
      <div style={{backgroundColor: '#eee', padding: '20px'}}>
        <BlockContent blocks={post.node._rawContent} serializers={serializers}/>
      </div>
    </div>
  ))
  return (
    <Layout>
      <h1>My blog posts:</h1>
      {posts}
    </Layout>
  )
}

export default IndexPage

