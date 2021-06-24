import React from "react"
import { Link } from "gatsby"
import * as style from "../components/menu.module.scss"

const Menu = () => (
    <ul className={style.menu}>
        <li>
            <Link to="/" activeClassName={style.activeLink}>Hjem</Link>
        </li>
        <li>
        <Link to="/blogg" activeClassName={style.activeLink} partiallyActive={true}>Blogg</Link>
        </li>
        <li>
        <Link to="/notater" activeClassName={style.activeLink} partiallyActive={true}>Notater</Link>
        </li>
        <li>
        <Link to="/bibliotek" activeClassName={style.activeLink} partiallyActive={true}>Bibliotek</Link>
        </li>
        <li>
            <Link to="/om-mikke" activeClassName={style.activeLink} partiallyActive={true}>Om Mikke</Link>
        </li>
    </ul>
)

export default Menu