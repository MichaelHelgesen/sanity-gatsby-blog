import * as React from "react"
import { Link } from "gatsby"
import SyntaxHighlighter from 'react-syntax-highlighter'
import { nightOwl, atelierForestLight } from 'react-syntax-highlighter/dist/esm/styles/hljs'
import { CgExternal, CgLink } from "react-icons/cg"
import BlockContent from '@sanity/block-content-to-react'
import getYouTubeId from "get-youtube-id"
import * as style from '../components/serializers.module.scss'
import Image from "gatsby-plugin-sanity-image"
import SimpleReactLightbox from "simple-react-lightbox"
import { SRLWrapper } from "simple-react-lightbox";

function urlBuilder(image) {
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
}

const options = {
  caption: {
    showCaption: false
  },
  settings: {
    lightboxTransitionSpeed: 0.05
  }
}



const serializers = {
  types: {
    block: props => {
      const style = props.node.style || "normal";
      if (style == "h1") {
        return (
          <h1 id={`title-${props.node._key}`}>
            <span id={`${props.node._key}`} className={"anchor"}></span>
            <a href={`#${props.node._key}`}></a>
            {props.children}
          </h1>
        );
      }
      if (style == "h2") {
        return (
          <h2 id={`title-${props.node._key}`}>
            <span id={`${props.node._key}`} className={"anchor"}></span>
            <a href={`#${props.node._key}`} className={"titleLink"}><CgLink className={"linkIcon"} /></a>
            {props.children}
          </h2>
        );
      }
      if (style == "h3") {
        return (
          <h3 id={`title-${props.node._key}`}>
            <span id={`${props.node._key}`} className={"anchor"}></span>
            <a href={`#${props.node._key}`} className={"titleLink"}><CgLink className={"linkIcon"} /></a>
            {props.children}
          </h3>
        );
      }
      if (style == "h4") {
        return (
          <h4 id={`title-${props.node._key}`}>
            <span id={`${props.node._key}`} className={"anchor"}></span>
            <a href={`#${props.node._key}`} className={"titleLink"}><CgLink className={"linkIcon"} /></a>
            {props.children}
          </h4>
        );
      }
      if (style == "h5") {
        return (
          <h5 id={`title-${props.node._key}`}>
            <span id={`${props.node._key}`} className={"anchor"}></span>
            <a href={`#${props.node._key}`} className={"titleLink"}><CgLink className={"linkIcon"} /></a>
            {props.children}
          </h5>
        );
      }
      if (style == "h6") {
        return (
          <h6 id={`title-${props.node._key}`}>
            <span id={`${props.node._key}`} className={"anchor"}></span>
            <a href={`#${props.node._key}`} className={"titleLink"}><CgLink className={"linkIcon"} /></a>
            {props.children}
          </h6>
        );
      }
  
      return style === "blockquote" ? (
        <blockquote>– {props.children}</blockquote>
      ) : (
        <p>{props.children}</p>
      );
    },
    exampleUsage: props => {
      return (<SyntaxHighlighter language={props.node.language || "text"} style={atelierForestLight} showLineNumbers wrapLines={true} lineNumberStyle
        lineProps={lineNumber => {
          let style = { display: 'block' };
          let setClassName = {}
          if (props.node.highlightedLines) {
            if (props.node.highlightedLines.includes(lineNumber)) {
              /* style.backgroundColor = '#d2d1d0';  e8dfd5 */
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
            
              {/* <img src={`${props.node.asset.url}?${urlBuilder(props.node)}`} alt={props.node.alt}/> */}
              <Image
                // pass asset, hotspot, and crop fields
                {...props.node}
                // tell Sanity how large to make the image (does not set any CSS)
                width={1000}
                alt={props.node.alt}
                //config={{blur:50}}
                // style it how you want it
                style={{
                  width: "100vw",
                  height: "auto",
                }}
              />
           

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
      let color = props.node.tipColor || "186, 255, 220";
      switch (props.node.tipColor) {
        case "#baffdc": color = "186, 255, 220";
          break;
        case "#ffbaba": color = "255, 186, 186";
          break;
        case "#ffffde": color = "237, 237, 156";
          break;
        default: color = "186, 255, 220";
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
    internalLink: ({ mark, children }) => {
      const link = mark.reference.slug ? mark.reference._type === "post" ? `/blogg/${mark.reference.slug.current}` : `/${mark.reference.slug.current}` : mark.reference._type === "post" ? `/blogg/${mark.reference.title.toLowerCase().replace(/\s+/g, '-').slice(0, 200)}` : `/${mark.reference.title.toLowerCase().replace(/\s+/g, '-').slice(0, 200)}`
      return <Link to={
        link
      }>{children}</Link>
    },
    link: props => {
      return <a className={style.externallink} href={props.mark.href} rel="external">{props.children}<CgExternal /></a>
    },
    epost: props => {
      return <a className={style.mail} href={props.mark.epost}>{props.children}</a>
    },
  },
  

}

export default serializers;
