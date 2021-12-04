import * as React from "react"
import BlockContent from '@sanity/block-content-to-react'
import serializers2 from "./serializers2"
import * as style from "../components/blogContents.module.scss"
import { CgMenu } from "react-icons/cg"; 
import { CgClose } from "react-icons/cg";

class TableOfContents extends React.Component {
    constructor(props) {
        const { rawContent, title } = props

        super()

        this.title = title
        this.rawContent = rawContent

        this.state = {
            class: "hidden",
            icon: <CgMenu />,
            title: "Se innholdsfortegnelse"
        }
        this.handleClick = this.handleClick.bind(this)
    }

    handleClick() {
        if (this.state.class === "hidden") {
            this.setState({ class: "ok" })
            this.setState({ icon: <CgClose /> })
            this.setState({ title: "Lukk innholdsfortegnelse" })
        }
        else {
            this.setState({ class: "hidden" })
            this.setState({ icon: <CgMenu /> })
            this.setState({ title: "Se innholdsfortegnelse" })
        }
    }

    render() {
        return (
            <div className={style.tableOfContent}>
                <div className={style.indexTitle}><span onClick={this.handleClick}>{this.state.title}{this.state.icon}</span></div>
                <div className={this.state.class}>
                    <ul className={"indexList"}>
                        <li><a href="#top">{this.title}</a></li>
                        <BlockContent
                            blocks={this.rawContent}
                            serializers={serializers2}
                            className={"indexLinks"}
                        />
                    </ul>
                </div>
            </div>
        )
    }
}

export default TableOfContents



