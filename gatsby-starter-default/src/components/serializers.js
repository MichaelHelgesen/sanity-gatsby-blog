import * as React from "react"
import { Link } from "gatsby"
import SyntaxHighlighter from 'react-syntax-highlighter'
import { nightOwl, atelierForestLight } from 'react-syntax-highlighter/dist/esm/styles/hljs'
import { CgExternal } from "react-icons/cg"
import BlockContent from '@sanity/block-content-to-react'
import getYouTubeId from "get-youtube-id"
import * as style from '../components/serializers.module.scss'

function urlBuilder(image) {
  const { width, height } = image.asset.metadata.dimensions;
  return (
    "w=780" +
    "&q=75" +
    // Check if there is a crop
    `${image.crop ?
      "&rect=" +
      `${Math.floor(width * image.crop.left)},` + // Crop from left
      `${Math.floor(height * image.crop.top)},` + // Crop from top
      `${Math.floor(width - (width * image.crop.left + width * image.crop.right))},` + // 
      `${Math.floor(height - (width * image.crop.top + width * image.crop.bottom))}`
      :
      ""}`
  )
}

const serializers = {
  types: {
    exampleUsage: props => (
      <SyntaxHighlighter language={props.node.language || "text"} style={atelierForestLight} showLineNumbers wrapLines={true} lineNumberStyle
        lineProps={lineNumber => {
          let style = { display: 'block' };
          if (props.node.highlightedLines) {
            if (props.node.highlightedLines.includes(lineNumber)) {
              /* style.backgroundColor = '#d2d1d0';  e8dfd5 */
              style.backgroundColor = '#e8dfd5';
            }
          }
          return { style };
        }}
      >
        {props.node.code}
      </SyntaxHighlighter>
    ),
    bodyImage: props => {
      {
        console.log("PROPS", props)
        console.log("url", urlBuilder(props.node))
      }
      return (
        <div className={style.bodyimage}>
          <img src={`${props.node.asset.url}?${urlBuilder(props.node)}`} />
          {/* <GatsbyImage image={getGatsbyImageData(props.node.asset.id, {fit: "FILLMAX", width:"1000", placeholder: "blurred"}, client)} alt={props.node.alt} /> */}
          {/* <img
            src={urlFor(props.node)
              .auto('format')
              .width(1000)
              .fit('clip')
              .quality(75)
              .url()}
          /> */}
          {/*<Image
    
    {...props.node}
    style={{
      width: "100%",
      height: "100%",
      objectFit: "cover",
    }}
  />*/}
          <p className={style.imageDescription}>{props.node.description}</p>
        </div>
      )
    },
    tipField: props => {
      const color = props.node.tipColor || "#baffdc";
      return (
        <div className={style.tipfield} style={{ backgroundColor: `${color}` }}>
          <h5>
            {props.node.tipText || props.node.tipTitle || null}
          </h5>
          {props.node.tipContent ?
            <BlockContent
              blocks={props.node.tipContent}
              serializers={serializers}
            />
            : null
          }
        </div>
      )
    },
    youtubeLink: props => {
      const id = getYouTubeId(props.node.youTubeEmbed)
      const url = `https://youtube.com/embed/${id}`
      return (
        <div>
          <iframe
            width="100%"
            height="400"
            src={`${url}`}
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
          >
          </iframe>
        </div>
      )
    },
    codePen: props => {
      return (
        <div
          className="codepen_embed"
          dangerouslySetInnerHTML={{ __html: props.node.codePenEmbed }}
        >
        </div>
      )
    }
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
    },
    internalLink: ({ mark, children }) => {
      return <Link to={
        mark.reference.slug ? `/blogg/${mark.reference.slug.current}` : `/blogg/${mark.reference.title.toLowerCase().replace(/\s+/g, '-').slice(0, 200)}`
      }>{children}</Link>
    },
    link: props => {
      return <a className={style.externallink} href={props.mark.href}>{props.children}<CgExternal /></a>
    },
  },

}

export default serializers;