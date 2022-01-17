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
            default:
                norwegianMonth = "";
        }
        return (
            {
                day: day,
                month: norwegianMonth,
                year: year
            }
        )
    }

    return (
        <div>
            {props.map((post, index) => (
                <div key={index} className={style.noteWrap}>
                    <div className={style.contentWrap}>
                        <h2 className={style.title}>
                            <span className={style.day}>{dateToNorwegian(post.node.date).day}</span>
                            <span className={style.month}>{dateToNorwegian(post.node.date).month}</span>
                            <span className={style.year}>{dateToNorwegian(post.node.date).year}</span>
                        </h2>
                        <div className={style.mainText}><BlockContent blocks={post.node._rawText} serializers={serializers} /></div>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default Notes