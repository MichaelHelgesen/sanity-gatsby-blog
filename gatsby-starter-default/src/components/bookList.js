import * as React from "react"
import { Link } from "gatsby"
import * as style from "../components/bookList.module.scss"

// Function for image settings and generating URL
function urlBuilder(image, w, h, q) {
    const { width, height } = image.asset.metadata.dimensions;
    return (
        `w=${w}` +
        `&h=${h}` +
        `${image.hotspot ?
            "&crop=focalpoint" +
            `&fp-x=${image.hotspot.x}` +
            `&fp-y=${image.hotspot.y}`
            : "&crop=center"}` +
        `${image.crop ?
            "&rect=" +
            `${Math.floor(width * image.crop.left)},` + // Crop from left
            `${Math.floor(height * image.crop.top)},` + // Crop from top
            `${Math.floor(width - (width * image.crop.left + width * image.crop.right))},` +  
            `${Math.floor(height - (width * image.crop.top + width * image.crop.bottom))}`
            :
            ""}` +
        "&fit=crop" +
        `&q=${q}`
    )
}

const BookList = ({ props }) => (
    <div className={style.content}>
        {props.map(post => (

            <Link className={style.link} to={post.node.slug ? `/blogg/${post.node.slug.current}` : `/blogg/${post.node.title.toLowerCase().replace(/\s+/g, '-').slice(0, 200)}`}>
                <img src={`${post.node.image.asset.url}?${urlBuilder(post.node.image, 500, 520, 75)}`} alt={post.node.image.alt ? post.node.image.alt : ""} />
                <small className={style.date}>{post.node.read}</small>
                <small className={style.author}>{post.node.author}</small>
                <h2 className={style.title}>{post.node.title}</h2>
            </Link>

        ))}
        <div className={style.clear}></div>
    </div>
)

export default BookList
