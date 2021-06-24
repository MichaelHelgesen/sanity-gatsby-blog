import * as React from "react"
import { Link } from "gatsby"
import * as style from "../components/bookList.module.scss"

// Function for image settings and generating URL
function urlBuilder(image) {
    return (
      "w=500" +
      "&h=520" +
      "&crop=center" +
      "&fit=crop" +
      "&q=75" +
      `${image.hotspot ? 
        `&fp-x=${image.hotspot.x}` +
        `&fp-x=${image.hotspot.y}` :
        ""}` +
      "&bg=000000"
    )
  }

const BookList = ({ props }) => (
    <div className={style.content}>
        {props.map(post => (
            
                <Link className={style.link} to={post.node.slug ? `/blogg/${post.node.slug.current}` : `/blogg/${post.node.title.toLowerCase().replace(/\s+/g, '-').slice(0, 200)}`}>
                    <img src={`${post.node.image.asset.url}?${urlBuilder(post.node.image)}`} />
                    <small className={style.date}>{post.node.read}</small>
                    <small className={style.author}>{post.node.author}</small>
                    <h2 className={style.title}>{post.node.title}</h2>
                </Link>

        ))}
    </div>
)

export default BookList
