import React from "react"
import { Link } from "gatsby"
import * as style from "../components/menu.module.scss"

const Menu = () => (
    <ul className={style.menu}>
        <li>
            <Link to="/">Hjem</Link>
        </li>
        <li>
        <Link to="/blogg">Blogg</Link>
        </li>
        <li>
        <Link to="/kategorier">Kategorier</Link>
        </li>
        <li>
        <Link to="/bibliotek">Bibliotek</Link>
        </li>
        <li>
        <Link to="/notater">Notater</Link>
        </li>
        <li>
            <Link to="/om-mikke">Om Mikke</Link>
        </li>
    </ul>
)

export default Menu