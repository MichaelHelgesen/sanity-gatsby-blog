import * as React from "react"
import PropTypes from "prop-types"
import { Link } from "gatsby"
import Menu from "./menu"
import * as style from "../components/header.module.scss"

const Header = ({ siteTitle }) => (
  <header>
    <div className={style.wrapper}>
      <span>
        <Link
          to="/"
        >
          {siteTitle}
        </Link>
      </span>
      <Menu />
    </div>
  </header>
)


Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
