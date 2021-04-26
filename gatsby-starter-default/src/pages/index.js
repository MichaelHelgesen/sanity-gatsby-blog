import * as React from "react"
import { graphql } from "gatsby"
import BlockContent from '@sanity/block-content-to-react'
import Layout from "../components/layout"
import SyntaxHighlighter from 'react-syntax-highlighter'
import { nightOwl } from 'react-syntax-highlighter/dist/esm/styles/hljs'
import Image from "gatsby-plugin-sanity-image"
//import sanityImageUrl from "@sanity/image-url"
//import sanityClient from "@sanity/client"
//import imageUrlBuilder from '@sanity/image-url'
import SanityImage from "gatsby-plugin-sanity-image"

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
          date(formatString: "DD.MM.YYYY")
          description
          _rawContent
        }
      }
    }
  }
`

const serializers = {
  types: {
    exampleUsage: props => (
      <SyntaxHighlighter language={props.node.language} style={nightOwl} showLineNumbers wrapLines={true} lineNumberStyle
        lineProps={lineNumber => {
          let style = { display: 'block' };
          if (props.node.highlightedLines) {
            if (props.node.highlightedLines.includes(lineNumber)) {
              style.backgroundColor = '#063558';
            }
          }
          return { style };
        }}
      >
        {props.node.code}
      </SyntaxHighlighter>
    ),
    image: props => {
      return (
        <Image {...props.node}
        alt={"d"}
        />
      )
    },
  },
  marks: {
    code: props => {
      return (
        <span className={"inline-code"}>
          <SyntaxHighlighter language={"text"} style={nightOwl} PreTag={"span"} >
            {props.children}
          </SyntaxHighlighter>
        </span>
      )
    } 
  }
}


const IndexPage = ({ data }) => {
  const posts = data.allSanityPost.edges.map(post => (
    <div key={post.node.title} style={{ backgroundColor: '#ddd', padding: '20px', margin: '20px 0' }}>
      <h2>{post.node.title}</h2>
      <small>{post.node.date}</small>
      <p>{post.node.description}</p>
      <div style={{ backgroundColor: '#eee', padding: '20px' }}>
        <BlockContent
          blocks={post.node._rawContent}
          serializers={serializers}
        />
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

