import * as React from "react"
import { graphql, StaticQuery } from "gatsby"
import * as style from "../components/blogList_card_v3.module.scss"
import { Link } from "gatsby"

const SimilarPosts = (props) => {
    let numberOfPosts = props.numberOfPosts;
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
                  url
                  metadata {
                    dimensions {
                      height
                      width
                    }
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
      }
    `} render={data => {

                    const posts = data.post.edges

                    let categoryArray = [];

                    props.category.forEach(element => {
                        categoryArray.push(element.categoryTitle);
                    });

                    const filteredPosts = data.post.edges.filter((post) => {
                        let sameCategory = false;
                        post.node.category.map(function (cat) {
                            if (categoryArray.includes(cat.categoryTitle)) {
                                return sameCategory = true;
                            }
                            else {
                                return null
                            }
                        })
                          if (sameCategory && (props.slug !== post.node.slug.current)) {
                            return post
                        } else {
                            return null
                        }
                    })

                    
                    let randomPosts = []

                    function randomNumber(num){
                        if (!randomPosts.includes(num)) {
                            randomPosts.push(num)
                        } else {
                            randomNumber(Math.floor((Math.random() * filteredPosts.length)))    
                        }
                    }

                    if (filteredPosts.length > 3) {
                        for (let i = 3; i > 0; i--) {
                            randomNumber(Math.floor((Math.random() * filteredPosts.length)))
                        }
                    }

                    let newArr = filteredPosts.filter((post, index) => randomPosts.includes(index));
                    console.log("newArr", newArr);
                    

                    function urlBuilder(image) {
                        console.log(image.hotspot)
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



                    return (
                        <div className={style.content}>
        {newArr.map((post, index) => (
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
                                        (index > 0 ? <span key={index}>, <span>{cat.categoryTitle}</span></span>: <span key={index}> {cat.categoryTitle}</span>)
                                    )) :
                                    <span> Ukategorisert </span>
                            }
                        </small>
                        <h2 className={style.title}>{post.node.title}</h2>
                        <p style={{ margin: "10px 0 10px 0" }}>{post.node.description}</p>
                    </div>
                    <div 
                        className={style.blog_image}
                        style={{ background: `${post.node.image ? `url(${post.node.image.asset.url}?${urlBuilder(post.node.image)}) no-repeat 50% center` : "gray"}` }}
                    >
                    {post.node.image && post.node.image._rawAsset ? <span className={style.credit_line}>{post.node.image._rawAsset.creditLine}</span>: null}
                </div>
                

                </div>
            </Link>
        ))}
        <div className={style.link}></div>
    </div>
                        
                        
                        
                        
                        
/*                         <div>
                            {newArr.map((element, index) => {
                                    return <p key={index}>{element.node.title}</p>
                                })
                            }
                        </div> */
                    )
                }}
            />
        </div>
    )
}
export default SimilarPosts