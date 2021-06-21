import * as React from "react"
import { Link } from "gatsby"
import * as style from "../pages/index.module.scss"

const BlogList = ({ props }) => (
    // Create list items from content
    props.map(post => (
        <div key={post.node.title}>
            <a className={style.link} href={post.node.slug ? `${post.node.internal.type === "SanityPost" ? "/blogg" : "/bibliotek"}/${post.node.slug.current}` : `${post.node.internal.type === "SanityPost" ? "blogg" : "bibliotek"}/${post.node.title.toLowerCase().replace(/\s+/g, '-').slice(0, 200)}`}>
                <h3 className={style.title}>{post.node.title}</h3>
                <p style={{ margin: "10px 0 10px 0" }}>{post.node.description}</p>
                <small className={style.dateCategory}>{post.node.date} •
                    { // Create a span for each category defined on item
                        post.node.category && post.node.category.length ?
                            post.node.category.map((cat, index) => (
                                (index > 0 ? <span key={index}>, <Link to={`/kategorier/${cat.categoryTitle.toLowerCase()}`}>{cat.categoryTitle}</Link> </span> : <span key={index}> <Link to={`/kategorier/${cat.categoryTitle.toLowerCase()}`}>{cat.categoryTitle}</Link></span>)
                            )) :
                            <span> Ukategorisert </span>
                    }
                </small>
            </a>
        </div>
    ))
)

export default BlogList