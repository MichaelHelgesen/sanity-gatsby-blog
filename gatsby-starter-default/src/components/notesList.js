import * as React from "react"
import BlockContent from '@sanity/block-content-to-react'
import serializers from "../components/serializers"
import * as style from "../components/notesList.module.scss"

const Notes = ({ props }) => {
    
    const dateToNorwegian = (date) => {
        const day = date.slice(0, date.indexOf("."));
        const year = date.slice(-4);
        const englishMonth = date.slice((date.indexOf(".") + 2), -5)
        let norwegianMonth

        switch (englishMonth) {
            case "January":
                norwegianMonth = "januar";
            break;
            case "February":
                norwegianMonth = "februar";
            break;
            case "March":
                norwegianMonth = "mars";
            break;
            case "April":
                norwegianMonth = "april";
            break;
            case "May":
                norwegianMonth = "mai";
            break;
            case "June":
                norwegianMonth = "juni";
            break;
            case "July":
                norwegianMonth = "juli";
            break;
            case "August":
                norwegianMonth = "august";
            break;
            case "September":
                norwegianMonth = "september";
            break;
            case "October":
                norwegianMonth = "oktober";
            break;
            case "November":
                norwegianMonth = "november";
            break;
            case "December":
                norwegianMonth = "desember";
            break;
        }
        
        return (
            `${day}. ${norwegianMonth} ${year}`
        )
    }
    
    return (
        <div className={style.content}>
            {props.map(post => (
                <div key={post.node.title} className={style.noteWrap}>
                    <div className={style.contentWrap}>
                        <h2 className={style.title}>{dateToNorwegian(post.node.date)}</h2>
                        <p className={style.mainText}><BlockContent blocks={post.node._rawText} serializers={serializers} /></p>
                    </div>
                </div>

            ))}
        </div>
    )
}




export default Notes