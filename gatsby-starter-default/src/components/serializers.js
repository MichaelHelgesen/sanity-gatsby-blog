import * as React from "react"
import SyntaxHighlighter from 'react-syntax-highlighter'
import { nightOwl, atelierForestLight } from 'react-syntax-highlighter/dist/esm/styles/hljs'
import Image from "gatsby-plugin-sanity-image"
import { CgExternal } from "react-icons/cg"
import BlockContent from '@sanity/block-content-to-react'
import * as style from '../components/serializers.module.scss'


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
            return (
              <div className={style.bodyimage}>
              <Image {...props.node}
              alt={props.node.alt}
              />
              <p className={style.imageDescription}>{props.node.description}</p>
            </div>
            )
          },
          tipField: props => {
            const color = props.node.tipColor || "#baffdc";
            return (
              <div className={style.tipfield} style={{ backgroundColor: `${color}`}}>
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
            return <a href={
              mark.reference.slug ? `/${mark.reference.slug.current}` : `/${mark.reference.title.toLowerCase().replace(/\s+/g, '-').slice(0, 200)}`
            }>{children}</a>
          },
          link: props => {
            return <a className={style.externallink} href={props.mark.href}>{props.children}<CgExternal/></a>
          },
        },
        
      }

export default serializers;