import * as React from "react"
import { Link } from "gatsby"
import SyntaxHighlighter from 'react-syntax-highlighter'
import { nightOwl, atelierForestLight } from 'react-syntax-highlighter/dist/esm/styles/hljs'
import { CgExternal, CgLink } from "react-icons/cg"
import BlockContent from '@sanity/block-content-to-react'
import getYouTubeId from "get-youtube-id"
import * as style from '../components/serializers.module.scss'
import SanityImage from "gatsby-plugin-sanity-image"

/* function urlBuilder(image) {
  const { width, height } = image.asset.metadata.dimensions;
  return (
    "w=1000" +
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
} */

// Options for lightbox
const options = {
  caption: {
    showCaption: false
  },
  settings: {
    lightboxTransitionSpeed: 0.05
  }
}

const removeSpacesInString = (string) => (
  string.replace(/[^A-Z0-9]+/ig, "-").toLowerCase()
)

const convertTitle = (title => {
  if (title[0].props) {
    return title[0].props.node.children[0].replace(/[^A-Z0-9]+/ig, "-").toLowerCase()
  }
  else {
    return title[0].replace(/[^A-Z0-9]+/ig, "-").toLowerCase()
  }
})

const titleMaker = (prop => (
  <span>
    <span id={`${convertTitle(prop)}`} className={"anchor"}></span>
    <a href={`#${convertTitle(prop)}`} aria-label="Anchor link"><CgLink className={"linkIcon"} /></a>
    {prop}
  </span>
))


const serializers = {
  types: {
    block: props => {
      const style = props.node.style
      switch (props.node.style || "normal") {
        case "h1":
          return (
            <h1 id={`title-${convertTitle(props.children)}`}>
              {titleMaker(props.children, style)}
            </h1>
          )
        case "h2":
          return (
            <h2 id={`title-${convertTitle(props.children)}`} className={"titleLink"}>
              {titleMaker(props.children, style)}
            </h2>
          )
        case "h3":
          return (
            <h3 id={`title-${convertTitle(props.children)}`} className={"titleLink"}>
              {titleMaker(props.children, style)}
            </h3>
          )
        case "h4":
          return (
            <h4 id={`title-${convertTitle(props.children)}`} className={"titleLink"}>
              {titleMaker(props.children, style)}
            </h4>
          )
        case "h5":
          return (
            <h5 id={`title-${convertTitle(props.children)}`} className={"titleLink"}>
              {titleMaker(props.children, style)}
            </h5>
          )
        case "h6":
          return (
            <h6 id={`title-${convertTitle(props.children)}`} className={"titleLink"}>
              {titleMaker(props.children, style)}
            </h6>
          )
        case "blockquote": return (<blockquote>- {props.children}</blockquote>)
        default: return (<p>{props.children}</p>)
      }
    },
    exampleUsage: props => {
      return (<SyntaxHighlighter language={props.node.language || "text"} style={atelierForestLight} showLineNumbers wrapLines={true} lineNumberStyle
        lineProps={lineNumber => {
          let style = { display: 'block' };
          let setClassName = {}
          if (props.node.highlightedLines) {
            if (props.node.highlightedLines.includes(lineNumber)) {
              style.backgroundColor = '#e8dfd5';
              setClassName.class = "highlightedLines"
            }
          }
          return { style, ...setClassName };
        }}
      >
        {props.node.code}
      </SyntaxHighlighter>)
    },
    bodyImage: props => {
      return (
        <div className={style.bodyimage}>
          <SanityImage
            // pass asset, hotspot, and crop fields
            {...props.node}
            // tell Sanity how large to make the image (does not set any CSS)
            width={300}
            height={Math.round(300 / props.node.asset.metadata.dimensions.aspectRatio)}
            alt={props.node.alt}
            //config={{blur:50}}
            // style it how you want it
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover"
            }}
          />
          {/* Image description */}
          <p className={style.imageDescription}>{props.node.description}</p>
        </div>
      )
    },
    tipField: props => {
      let color;
      switch (props.node.tipColor) {
        case "#baffdc": color = "186, 255, 220";
          break;
        case "#ffbaba": color = "255, 186, 186";
          break;
        case "#ffffde": color = "237, 237, 156";
          break;
        default: color = props.node.tipColor;
      };
      return (
        <div className={style.tipfield} style={{ backgroundColor: `rgba(${color}, .7)`, border: `3px solid rgb(${color})` }}>
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
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          >
          </iframe>
        </div>
      )
    },
    codePen: props => {
      return (
        <div
          className={style.codepen_embed}
          dangerouslySetInnerHTML={{ __html: props.node.codePenEmbed }}
        >
        </div>
      )
    },
  },
  marks: {
    code: props => {
      return (
        <span className="inline-code">
          <SyntaxHighlighter language={"text"} style={nightOwl} PreTag={"span"} >
            {props.children}
          </SyntaxHighlighter>
        </span>
      )
    },
    dictionaryLink: ({ mark, children }) => {
      const link = `#${removeSpacesInString(mark.reference.englishWord)}`
      return <a href={
        link
      }>{children}</a>
    },
    internalLink: ({ mark, children }) => {
      const link = mark.reference.slug ? (mark.reference._type === "post" || mark.reference._type === "book")  ? `/blogg/${mark.reference.slug.current}` : `/${mark.reference.slug.current}` : mark.reference._type === "post" ? `/blogg/${mark.reference.title.toLowerCase().replace(/\s+/g, '-').slice(0, 200)}` : `/${mark.reference.title.toLowerCase().replace(/\s+/g, '-').slice(0, 200)}`
      return <Link to={
        link
      }>{children}</Link>
    },
    link: props => {
      return <a className={style.externallink} href={props.mark.href} rel="external">{props.children}<span><CgExternal /></span></a>
    },
    epost: props => {
      return <a className={style.mail} href={props.mark.epost}>{props.children}</a>
    },
  },
}

export default serializers;
