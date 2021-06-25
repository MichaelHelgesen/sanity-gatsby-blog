import * as React from "react"
import { Link } from "gatsby"
import BlockContent from '@sanity/block-content-to-react'
import serializers from "../components/serializers"
import * as style from "../components/categoryList.module.scss"




const CategoryList = ({ categories, posts }) => {

  const findNumberOfCategoriesInArray = (array, category) => (
    array.map(function (item) {
      return item.node.category.filter(function (cat) {
        return cat.categoryTitle === category
      })
    }).filter(function (el) {
      return el.length > 0
    }).length
  )


  /*   const categoriesArray = data.categories.edges.map((item) => (
      item.node.categoryTitle
    )) */


  return (
    <div className={style.content}>
      {categories.map(post => (
        <Link className={style.link} to={`/blogg/kategorier/${post.node.categoryTitle.toLowerCase()}`}>
          <h2 style={{ background: `#${post.node.color}` }} className={style.title}>
            {post.node.categoryTitle} ({findNumberOfCategoriesInArray(posts, post.node.categoryTitle)})
          </h2>
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
}

export default CategoryList
