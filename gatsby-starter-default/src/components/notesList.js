import * as React from "react"
import BlockContent from '@sanity/block-content-to-react'
import serializers from "../components/serializers"
import * as style from "../components/notesList.module.scss"

const Notes = ({ props }) => (
    <div className={style.content}>
    {props.map(post => (
        <div key={post.node.title} className={style.noteWrap}>
            <h2 className={style.title}>{post.node.date}</h2>
            <p style={{ margin: "10px 0 10px 0" }}><BlockContent blocks={post.node._rawText} serializers={serializers} /></p>
        </div>

    ))}
    </div>
)




export default Notes