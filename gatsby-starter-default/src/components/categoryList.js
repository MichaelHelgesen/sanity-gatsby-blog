import * as React from "react"
import { Link } from "gatsby"
import BlockContent from '@sanity/block-content-to-react'
import serializers from "../components/serializers"
import * as style from "../components/categoryList.module.scss"



const CategoryList = ({ props }) => (
  <div className={style.content}>
    {props.map(post => (
      <Link className={style.link} to={`/blogg/kategorier/${post.node.categoryTitle.toLowerCase()}`}>
        <h2 style={{ background: `#${post.node.color}` }} className={style.title}>{post.node.categoryTitle}</h2>
        <div>
          <BlockContent blocks={post.node._rawCategoryDescription} serializers={serializers} />
        </div>
      </Link>
    ))}
    <div className={style.clear}></div>
    <div className={style.clear}></div>
    <div className={style.clear}></div>
  </div>
)

export default CategoryList
