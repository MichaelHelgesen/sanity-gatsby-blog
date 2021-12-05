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
            title: "Se innholdsfortegnelse",
            scrolling: false
        }

        this.handleClick = this.handleClick.bind(this)
        this.handleScroll = this.handleScroll.bind(this)
        this.closeClick = this.closeClick.bind(this)
    }

    handleClick(e) {
        let test = "ok"
        let setSome = () => {
            this.setState({ class: "hidden" })
            this.setState({ icon: <CgMenu /> })
            this.setState({ title: "Se innholdsfortegnelse" })
        }
        document.documentElement.onclick = function(e) {
            if (e.target != document.getElementById('title-span')) {
                setSome()
            }
          }
          this.setState({ class: test})
        console.log(this.state.class)
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

    closeClick() {
        this.state.class = "hidden"
    }


    componentDidMount() {
        window.addEventListener('scroll', this.handleScroll);
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll);
    }
    handleScroll(event) {
        var rect = document.querySelector(".test").getBoundingClientRect();
        var rect2 = document.querySelector(".indexWrap").getBoundingClientRect();
        //console.log(window.scrollY)
        if (rect2.y > 0 && this.state.scrolling === true) {
            this.setState({ scrolling: false });
        }
        else if (rect.y <= 0 && this.state.scrolling !== true) {
            this.setState({ scrolling: true });
        }
    }

    render() {
        return (
            <div className={`indexWrap`} style={{position:"relative", minHeight:"80px", zIndex: "999", maxWidth: "calc(780px - 2.175rem)"}}>
                
                <div className={`${style.tableOfContent} test`} style={{ position: this.state.scrolling ? 'fixed' : 'relative', top: "1px", maxWidth: "calc(780px - 2.175rem)" }}>
                    
                    <div className={style.indexTitle} style={{borderRadius: "5px", boxShadow: this.state.scrolling ? '3px 3px 3px gray' : 'none'}}>
                        
                        <span id="title-span" onClick={this.handleClick}>{this.state.title}{this.state.icon}</span></div>
                    
                    <div className={`${this.state.class} ll`}>
                        
                        <ul className={"indexList"} style={{background:"white"}} onClick={this.handleClick}>
                            <li><a href="#top">{this.title}</a></li>
                            <BlockContent
                                blocks={this.rawContent}
                                serializers={serializers2}
                                className={"indexLinks"}
                            />
                        </ul>
                    </div>
                </div>
            </div>
        )
    }
}

export default TableOfContents



