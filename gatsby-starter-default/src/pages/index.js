import * as React from "react"
import { graphql } from "gatsby"
import { StaticImage } from "gatsby-plugin-image"
import BlockContent from '@sanity/block-content-to-react'
import Layout from "../components/layout"
import SEO from "../components/seo"
import SyntaxHighlighter from 'react-syntax-highlighter'
import { nightOwl } from 'react-syntax-highlighter/dist/esm/styles/hljs'
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

const code = props => {
  return (
    <span className={"inline-code"}>
    <SyntaxHighlighter language={"text"} style={nightOwl} PreTag={"span"} >
      {props.children}
    </SyntaxHighlighter>
    </span>
  )
}

const serializers = {
  types: {
    exampleUsage: props => (
      <SyntaxHighlighter language={props.node.language} style={nightOwl} showLineNumbers>
      {props.node.code}
    </SyntaxHighlighter>
    )
  },
  marks: {code}
}



const IndexPage = ({ data }) => {
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
      <h1>Blogginnlegg:</h1>
      {posts}
    </Layout>
  )
}

export default IndexPage

