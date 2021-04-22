import * as React from "react"
import { graphql } from "gatsby"
import BlockContent from '@sanity/block-content-to-react'
import Layout from "../components/layout"
import SyntaxHighlighter from 'react-syntax-highlighter'
import { nightOwl } from 'react-syntax-highlighter/dist/esm/styles/hljs'
import Image from "gatsby-plugin-sanity-image"


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
          _rawContent(resolveReferences: {maxDepth: 10})
        }
      }
    }
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
      <SyntaxHighlighter language={props.node.language} style={nightOwl} showLineNumbers wrapLines={true} lineNumberStyle
      lineProps={lineNumber => {
        const ADDED = [1, 2];
        let style = { display: 'block' };
        if(props.node.highlightedLines) {
          if (props.node.highlightedLines.includes(lineNumber)){
            console.log(lineNumber);
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
        <Image
          // pass asset, hotspot, and crop fields
          {...props.node}
          alt={"df"}
        // tell Sanity how large to make the image (does not set any CSS)
        /* width={1200}
       height={300} */
        // style it how you want it

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

