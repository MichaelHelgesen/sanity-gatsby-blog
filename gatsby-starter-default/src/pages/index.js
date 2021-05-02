import * as React from "react"
import { graphql } from "gatsby"
import BlockContent from '@sanity/block-content-to-react'
import Layout from "../components/layout"
import serializers from "../components/serializers"
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
          _rawContent
        }
      }
    }
  }
`




const IndexPage = ({ data }) => {
  const posts = data.allSanityPost.edges.map(post => (
    <div key={post.node.title} style={{ backgroundColor: '#ddd', padding: '20px', margin: '20px 0' }}>
      <h2>{post.node.title}</h2>
      <small>{post.node.date}</small>
      <p>{post.node.description}</p>
      <a href={post.node.slug ? post.node.slug.current : post.node.title.toLowerCase().replace(/\s+/g, '-').slice(0, 200)}>Les mer</a>
    </div>
  ))
  return (
    <Layout>
      <div className={"intro"}>
        <p>
          Hei, og velkommen til Mikkes blogg! Jeg ønsker ikke å vente med å skrive til bloggen er ferdig utviklet. 
          Av den grunn kan designet virke noe simpelt, men endringer og forbedringer vil gjennomføres med jevne mellomrom. 
        </p>
      </div>
      <h2>Blogginnlegg:</h2>
      {posts}
    </Layout>
  )
}

export default IndexPage

