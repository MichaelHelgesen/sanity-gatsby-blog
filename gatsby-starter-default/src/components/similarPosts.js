import * as React from "react"
import { graphql, StaticQuery } from "gatsby"

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
                    

                    return (
                        <div>
                            {newArr.map((element, index) => {
                                    return <p key={index}>{element.node.title}</p>
                                })
                            }
                        </div>
                    )
                }}
            />
        </div>
    )
}
export default SimilarPosts