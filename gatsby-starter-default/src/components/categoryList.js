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
      {categories.map(post => {
        if (findNumberOfCategoriesInArray(posts, post.node.categoryTitle) !== 0) {
          return (
            <Link className={style.link} to={`/blogg/kategorier/${post.node.categoryTitle.toLowerCase()}`}>
              <h2 style={{ background: `#${post.node.color}` }} className={style.title}>
                {post.node.categoryTitle}&nbsp;<span style={{ opacity: .5 }}>({findNumberOfCategoriesInArray(posts, post.node.categoryTitle)})</span>
              </h2>
              <div>
                <BlockContent blocks={post.node._rawCategoryDescription} serializers={serializers} />
              </div>
            </Link>
          )
        }
        
        return null
      })}
      <div className={style.clear}></div>
      <div className={style.clear}></div>
      <div className={style.clear}></div>
    </div>
  )
}

export default CategoryList
