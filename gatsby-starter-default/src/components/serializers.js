import * as React from "react"
import SyntaxHighlighter from 'react-syntax-highlighter'
import { nightOwl } from 'react-syntax-highlighter/dist/esm/styles/hljs'
import Image from "gatsby-plugin-sanity-image"
import { FaExternalLinkAlt } from 'react-icons/fa'

    const serializers = {
        types: {
          exampleUsage: props => (
            <SyntaxHighlighter language={props.node.language || "text"} style={nightOwl} showLineNumbers wrapLines={true} lineNumberStyle
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
          bodyImage: props => {
            return (
              <div>
              <Image {...props.node}
              alt={props.node.alt}
              />
              <p className={"image-description"}>{props.node.description}</p>
            </div>
            )
          },
          tipField: props => {
            const color = props.node.tipColor ? props.node.tipColor : "green";
            return (
              <div>
                <p style={{ backgroundColor: `${color}`, padding: '20px' }}>
                  {props.node.tipText}
                </p>
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
          internalLink: ({mark, children}) => {
            return <a href={mark.reference.slug.current}>{children}</a>
          },
          link: props => {
            return <a href={props.mark.href}>{props.children}<FaExternalLinkAlt/></a>
          },
        },
        
      }

export default serializers;