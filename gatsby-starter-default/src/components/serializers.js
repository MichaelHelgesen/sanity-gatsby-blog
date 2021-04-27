import * as React from "react"
import SyntaxHighlighter from 'react-syntax-highlighter'
import { nightOwl } from 'react-syntax-highlighter/dist/esm/styles/hljs'
import Image from "gatsby-plugin-sanity-image"

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


export default serializers;