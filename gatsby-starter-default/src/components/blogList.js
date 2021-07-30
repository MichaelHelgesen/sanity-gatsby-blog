import * as React from "react"
import { Link } from "gatsby"
import * as style from "../components/blogList.module.scss"

const BlogList = ({ props, limit }) => (
    <div className={style.content}>
        {props.map(post => (
            <div key={post.node.title}>
                <Link className={style.link} to={post.node.slug ? `/blogg/${post.node.slug.current}` : `/blogg/${post.node.title.toLowerCase().replace(/\s+/g, '-').slice(0, 200)}`}>
                    <h2 className={style.title}>{post.node.title}</h2>
                    <p style={{ margin: "10px 0 10px 0" }}>{post.node.description}</p>
                    <small className={style.dateCategory}>{post.node.date} •
                        { // Create a span for each category defined on item
                            post.node.category && post.node.category.length ?
                                post.node.category.map((cat, index) => (
                                    (index > 0 ? <span key={index}>, <Link to={`/blogg/kategorier/${cat.categoryTitle.toLowerCase()}`}>{cat.categoryTitle}</Link> </span> : <span key={index}> <Link to={`/blogg/kategorier/${cat.categoryTitle.toLowerCase()}`}>{cat.categoryTitle}</Link></span>)
                                )) :
                                <span> Ukategorisert </span>
                        }
                    </small>
                </Link>
            </div>
        ))}
    </div>
)

export default BlogList