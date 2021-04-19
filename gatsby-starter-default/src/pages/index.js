import * as React from "react"
import { graphql } from "gatsby"
import BlockContent from '@sanity/block-content-to-react'
import Layout from "../components/layout"
import SyntaxHighlighter from 'react-syntax-highlighter'
import { nightOwl } from 'react-syntax-highlighter/dist/esm/styles/hljs'
import { GatsbyImage } from 'gatsby-plugin-image'
import {getGatsbyImageData} from 'gatsby-source-sanity'
import Image from "gatsby-plugin-sanity-image"
import SanityImage from "gatsby-plugin-sanity-image"


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

const imageComponent = ({ image }) => (
  <Image
    // pass asset, hotspot, and crop fields
    {...image.nodes}
    // tell Sanity how large to make the image (does not set any CSS)
    width={500}
    height={300}
    // style it how you want it
    style={{
      width: "100%",
      height: "100%",
      objectFit: "cover",
    }}
  />
)

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
    ),
  },
  types: {
    image: props => {
      return (
        <Image
    // pass asset, hotspot, and crop fields
    {...props.node}
    alt={"df"}
    // tell Sanity how large to make the image (does not set any CSS)
    width={500}
    height={300}
    // style it how you want it
    style={{
      width: "100%",
      height: "100%",
      objectFit: "cover",
    }}
  />
        )
    },
  },
  marks: { code }
}



const IndexPage = ({ data }) => {
  const posts = data.allSanityPost.edges.map(post => (
    <div key={post.node.title} style={{ backgroundColor: '#ddd', padding: '20px', margin: '20px 0' }}>
      <h2>{post.node.title}</h2>
      <small>{post.node.date}</small>
      <p>{post.node.description}</p>
      <div style={{ backgroundColor: '#eee', padding: '20px' }}>
        <BlockContent blocks={post.node._rawContent} serializers={serializers} />
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

