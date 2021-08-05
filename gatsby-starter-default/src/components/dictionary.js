import * as React from "react"
import { Link } from "gatsby"
import * as style from "../components/dictionary.module.scss"
import BlockContent from '@sanity/block-content-to-react'
import serializers from "../components/serializers"

const Dictionary = ({ props }) => (
    <div className={style.content}>
        {props.map((post, index) => (
            <div key={index}>
                <div>
                    <h2 className={style.title}><span className={style.english_word}>{post.node.englishWord}</span>: <span className={style.norwegian_word}>{post.node.norwegianWord}</span></h2>
                    <div className={style.explanation}>
                        <BlockContent blocks={post.node._rawContent} serializers={serializers} />
                    </div>

                </div>
            </div>
        ))}
    </div>
)

export default Dictionary