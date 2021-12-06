import * as React from "react"



const serializers2 = {
  container: ({ children, className }) => (
    <ul className={className}>{children}</ul>
  ),
  list: props => null,
  listItem: props => null,
  types: {
    exampleUsage: props => null,
    bodyImage: props => null,
    tipField: props => null,
    youtubeLink: props => null,
    codePen: props => null,
    block: props => {
      switch (props.node.style) {
        case "h1":
          return <li className={`index-title h1`}>
            <a href={`#${props.node._key}`}>{props.children}</a>
          </li>

        case "h2":
          return <li className={`index-title h2`}>
          <a href={`#${props.node._key}`}>{props.children}</a>
          
        </li>

        case "h3":
          return <li className={`index-title h3`}>
          <a href={`#${props.node._key}`}>{props.children}</a>
          
        </li>

        case "h4":
          return <li className={`index-title h4`}>
          <a href={`#${props.node._key}`}>{props.children}</a>
          
        </li>

        case "h5":
          return <li className={`index-title h5`}>
          <a href={`#${props.node._key}`}>{props.children}</a>
          
        </li>

        case "h6":
          return <li className={`index-title h2`}>
          <a href={`#${props.node._key}`}>{props.children}</a>
          
        </li>

        case "blockquote":
          return null

        case "normal":
          return null

        default:
          return null
      }
    }
  }

}

export default serializers2;
