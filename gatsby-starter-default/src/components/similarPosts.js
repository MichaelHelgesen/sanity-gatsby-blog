import * as React from "react"
import { graphql, StaticQuery } from "gatsby"
import * as style from "../components/blogList_card_v3.module.scss"
import { Link } from "gatsby"
import Image from "gatsby-plugin-sanity-image"

const SimilarPosts = (props) => {
  console.log(props)
  return (
    <div>
      <StaticQuery
        query={graphql`
      query {
        post: allSanityPost (sort: {
          fields: date,
          order: DESC
        }){
          edges {
            node {
              _rawContent
              category {
                categoryTitle
              }
              date(formatString: "DD.MM.YYYY")
              description
              image {
                alt
                _type
                asset {
                    _id
                  url
                  metadata {
                    dimensions {
                      height
                      width
                    }
                    lqip
                  }
                }
                crop {
                  _key
                  _type
                  top
                  bottom
                  left
                  right
                } 
                hotspot {
                  _key
                  _type
                  x
                  y
                  height
                  width
                }
              }
              internal {
                type
              }
              introduction
              slug {
                current
              }
              title
            }
          }
        }
        book: allSanityBook(sort: {fields: date, order: DESC}) {
            edges {
              node {
                category {
                  categoryTitle
                }
                date(formatString: "DD.MM.YYYY")
                description
                id
                image {
                  alt
                  _type
                  asset {
                      _id
                    url
                    metadata {
                      dimensions {
                        height
                        width
                      }
                      lqip
                    }
                  }
                  crop {
                    _key
                    _type
                    top
                    bottom
                    left
                    right
                  } 
                  hotspot {
                    _key
                    _type
                    x
                    y
                    height
                    width
                  }
                }
                internal {
                  type
                }
                slug {
                  _key
                  _type
                  current
                }
                title
              }
            }
          }
      }
    `} render={data => {
          // Check if there are related blogposts in the same
          // category, that does not match the slug og the curent blogpost.
          function isSameCategory(blogPost) {
            let sameCategory = false
            blogPost.node.category.forEach(function (item) {
              props.category.forEach(function (el) {
                if (item.categoryTitle === el.categoryTitle) {
                  sameCategory = true;
                };
              })
            })
            return sameCategory
          }
          // All posts sorted after date.
          const allPostsSorted = [...data.post.edges, ...data.book.edges].filter(function (post) {
            return post.node.slug.current !== props.slug
          }).sort(function (a, b) {
            // Format the date to year, month, day to get correct sort order
            const formatDate = (arg) => arg.node.date.slice(6).concat(arg.node.date.slice(3, 5)).concat(arg.node.date.slice(0, 2));
            return formatDate(b) - formatDate(a)
          });

          const relatedPosts = allPostsSorted.filter(function (blogpost) {
            return isSameCategory(blogpost)
          });

          let message = "Relevante blogginnlegg"

          let postsToRender = relatedPosts.length > 0 ? relatedPosts : allPostsSorted

          return (<div>
            <div className={style.content} style={{ textAlign: "center", marginBottom: "0" }}>
              <span style={{ textTransform: "uppercase", fontWeight: "700", fontSize: ".8em", width: "100%" }}>{message}</span>
            </div>
            <div className={style.content} >
              {postsToRender.map((post, index) => {
                if (index < props.numberOfPosts) {
                  return (
                    <Link className={style.link}
                      to={post.node.slug ? `/blogg/${post.node.slug.current}` : `/blogg/${post.node.title.toLowerCase().replace(/\s+/g, '-').slice(0, 200)}`}
                      key={index}
                    >
                      <div className={style.gradient}>
                        <div className={style.blog_item}>
                          <small className={style.dateCategory}>{post.node.date} •
                            { // Create a span for each category defined on item
                              post.node.category && post.node.category.length ?
                                post.node.category.map((cat, index) => (
                                  (index > 0 ? <span key={index}>, <span>{cat.categoryTitle}</span></span> : <span key={index}> {cat.categoryTitle}</span>)
                                )) :
                                <span> Ukategorisert </span>
                            }
                          </small>
                          <h2 className={style.title}>{post.node.title}</h2>
                          <p style={{ margin: "10px 0 10px 0" }}>{post.node.description}</p>
                        </div>

                        {post.node.image.asset._id ? <Image
                          // pass asset, hotspot, and crop fields
                          {...post.node.image}
                          // tell Sanity how large to make the image (does not set any CSS)
                          width={500}
                          height={300}
                          alt={"g"}
                          //config={{blur:50}}
                          // style it how you want it
                          style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover"
                          }}
                        /> : null}


                      </div>
                      {post.node.image && post.node.image._rawAsset ? <span className={style.credit_line}>{post.node.image._rawAsset.creditLine}</span> : null}
                    </Link>
                  )
                }
                return null
              })}
              <div className={`${style.link} clear`}></div>
            </div>
          </div>
          )
        }}
      />
    </div>

  )
}
export default SimilarPosts