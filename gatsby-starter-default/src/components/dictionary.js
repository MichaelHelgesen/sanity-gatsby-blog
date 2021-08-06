import * as React from "react"
import * as style from "../components/dictionary.module.scss"
import BlockContent from '@sanity/block-content-to-react'
import serializers from "../components/serializers"

const removeSpacesInString = (string) => (
    string.replace(/\s+/g, '')
)

const findUniqueLettersInWords = (arr) => {
    let arrayOfLetters = []
    arr.forEach(({ node }) => {
        const index = arrayOfLetters.findIndex((e) => e.letter === node.englishWord.slice(0, 1));
        if (index === -1) {
            arrayOfLetters.push({ letter: node.englishWord.slice(0, 1), anchorName: removeSpacesInString(node.englishWord) });
        }
    })
    return arrayOfLetters
}



const Dictionary = ({ props }) => (

    <div className={style.content}>
        <div className={style.index}>

            {/* Create index of letters */}
            <span>Indeks: </span>
            {
                findUniqueLettersInWords(props).map((node, index) => (
                    <a key={index} href={`#${node.anchorName}`}>{node.letter}</a>
                ))
            }
        </div>
        

        {props.map((post, index) => (
            <div key={index}>
                <div>
                    <h2 className={style.title}>
                        <a href={`#${removeSpacesInString(post.node.englishWord)}`} name={removeSpacesInString(post.node.englishWord)} aria-current="location">
                            <span className={style.english_word}>{post.node.englishWord}</span>
                        </a>: <span className={style.norwegian_word}>{post.node.norwegianWord}</span></h2>
                    <div className={style.explanation}>
                        <BlockContent blocks={post.node._rawContent} serializers={serializers} />
                    </div>
                </div>
            </div>
        ))}
    </div>
)

export default Dictionary