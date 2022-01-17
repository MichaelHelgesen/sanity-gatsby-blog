import * as React from "react"
import { Link } from "gatsby"
import * as style from "../components/bookList.module.scss"
import SanityImage from "gatsby-plugin-sanity-image"

const BookList = ({ props }) => (
    <div className={style.content}>
        {props.map((post, index) => (

            <Link key={index} className={style.link} to={post.node.slug ? `/blogg/${post.node.slug.current}` : `/blogg/${post.node.title.toLowerCase().replace(/\s+/g, '-').slice(0, 200)}`}>
                {post.node.image.asset._id ? <SanityImage
                    // pass asset, hotspot, and crop fields
                    {...post.node.image}
                    // tell Sanity how large to make the image (does not set any CSS)
                    width={300}
                    height={225}
                    alt={post.node.image.alt}
                    // Image style
                    style={{
                        width: "100%",
                        objectFit: "cover"
                    }}
                />
                    : null}
                <small className={style.date}>{post.node.read}</small>
                <small className={style.author}>{post.node.author}</small>
                <h2 className={style.title}>{post.node.title}</h2>
            </Link>
        ))}
        <div className={style.clear}></div>
    </div>
)

export default BookList

