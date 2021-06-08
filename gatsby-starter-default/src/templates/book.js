import * as React from "react"
import { graphql } from "gatsby"
import BlockContent from '@sanity/block-content-to-react'
import Layout from "../components/layout"
import serializers from "../components/serializers"
import * as style from "../templates/book.module.scss"

export const pageQuery = graphql`
  query ($id: String!){
    sanityBook(id: {eq: $id}) {
            id
            title
            date(formatString: "DD.MM.YYYY")
            _rawSummary(resolveReferences:{maxDepth:10})
            _rawAffect(resolveReferences:{maxDepth:10})
            _rawReasonToRead(resolveReferences:{maxDepth:10})
            quotes {
              fav_quote
            }
      }
  }
`

const book = ({ data }) => {
  const post = data.sanityBook;

  return (
    <Layout>
      <div style={{ margin: '60px 0 40px 0' }}>
        <h2 className={style.title}>{post.title}</h2>
        <div >
          <h3>Boken oppsummert i tre setninger</h3>
          {post._rawSummary ?
            <BlockContent
              blocks={post._rawSummary}
              serializers={serializers}
            /> : null
          }

        </div>

        <div >
        <h3>Hvorfor lese den?</h3>
          {post._rawReasonToRead ?
            <BlockContent
              blocks={post._rawReasonToRead}
              serializers={serializers}
            /> : null
          }
        </div>

        <div >
        <h3>Hvordan påvirket den meg?</h3>
          {post._rawAffect ?
            <BlockContent
              blocks={post._rawAffect}
              serializers={serializers}
            /> : null
          }
        </div>
        <div>
        <h3>Mine tre favoritt-sitater</h3>
          {post.quotes.map((quote) =>
            (<p>{quote.fav_quote}</p>)
          )}
        </div>

      </div>
    </Layout>
  )
}

export default book