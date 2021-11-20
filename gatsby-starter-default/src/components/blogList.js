import * as React from "react"
import { Link } from "gatsby"
import * as style from "../components/blogList_card_v3.module.scss"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import LazyLoad from 'react-lazyload';

function urlBuilder(image) {
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
}

const BlogList = ({ props }) => (

    <div className={style.content}>
        {props.map((post, index) => (
            
            <Link className={style.link}
                to={post.node.slug ? `/blogg/${post.node.slug.current}` : `/blogg/${post.node.title.toLowerCase().replace(/\s+/g, '-').slice(0, 200)}`}
                key={index}
            >
                <LazyLoad>
                <div className={style.gradient}>
                    <div className={style.blog_item}>
                    <small className={style.dateCategory}>{post.node.date} • 
                            { // Create a span for each category defined on item
                                post.node.category && post.node.category.length ?
                                    post.node.category.map((cat, index) => (
                                        (index > 0 ? <span key={index}>, <span>{cat.categoryTitle}</span></span>: <span key={index}> {cat.categoryTitle}</span>)
                                    )) :
                                    <span> Ukategorisert </span>
                            }
                        </small>
                        <h2 className={style.title}>{post.node.title}</h2>
                        
{/*                         <GatsbyImage image={getImage(post.node.image.asset)} alt="hello"/> 
 */}                        <p style={{ margin: "10px 0 10px 0" }}>{post.node.description}</p>
                    </div>
                    <div 
                        className={style.blog_image}
                        style={{ background: `${post.node.image ? `url(${post.node.image.asset.url}?${urlBuilder(post.node.image)}) no-repeat 50% center` : "gray"}` }}
                    >
                    {post.node.image && post.node.image._rawAsset ? <span className={style.credit_line}>{post.node.image._rawAsset.creditLine}</span>: null}
                </div>
                

                </div>
                </LazyLoad>
            </Link>
            
        ))}
        <div className={style.link}></div>
    </div>
    
) 

export default BlogList