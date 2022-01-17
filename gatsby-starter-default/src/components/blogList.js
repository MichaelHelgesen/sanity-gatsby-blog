import * as React from "react"
import { Link } from "gatsby"
import * as style from "../components/blogList_card_v3.module.scss"
import SanityImage from "gatsby-plugin-sanity-image"

/* function urlBuilder(image) {
    const { width, height } = image.asset.metadata.dimensions;
    return (
        `w=1000` +
        `&h=1000` +
        "&fit=crop" +
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
        `&q=50`
    )
} */

const BlogList = ({ props }) => (

    <div className={style.content}>

        {props.map((post, index) => {

            // Create image object for SanityImage
            const blogImage = { ...post.node.image }
            delete blogImage._rawAsset

            return (
                <Link className={style.link}
                    to={post.node.slug ? `/blogg/${post.node.slug.current}` : `/blogg/${post.node.title.toLowerCase().replace(/\s+/g, '-').slice(0, 200)}`}
                    key={index}
                >
                    <div className={style.gradient}>
                        <div className={style.blog_item}>

                            { /* Image credit line */}
                            {post.node.image && post.node.image._rawAsset ?
                                <span className={style.credit_line}>{post.node.image._rawAsset.creditLine}</span>
                                : null
                            }

                            {/* Categories */}
                            <small className={style.dateCategory}>{post.node.date} •
                                { // Create a span for each category defined on item
                                    post.node.category.length > 0 ?
                                        post.node.category.map((cat, index) => (
                                            (index > 0 ? <span key={index}>, <span>{cat.categoryTitle}</span></span> : <span key={index}> {cat.categoryTitle}</span>)
                                        ))
                                    : <span> Ukategorisert </span>
                                }
                            </small>

                            {/* Title */}
                            <h2 className={style.title}>{post.node.title}</h2>

                            {/* Description */}
                            <p style={{ margin: "10px 0 10px 0" }}>{post.node.description}</p>
                        </div>

                        {/* Blog image */}
                        <SanityImage
                            // pass asset, hotspot, and crop fields
                            {...blogImage}
                            // tell Sanity how large to make the image (does not set any CSS)
                            width={300}
                            height={225}
                            alt={post.node.image.alt}
                            // Image style
                            style={{
                                width: "100%",
                                height: "100%",
                                objectFit: "cover"
                            }}
                        />
                    </div>
                </Link>
            )
        })}
        {/* Link container */}
        <div className={style.link}></div>
    </div>
)
export default BlogList