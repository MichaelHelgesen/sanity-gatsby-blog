import * as React from "react"
import PropTypes from "prop-types"
import { Link } from "gatsby"
import UnderConstruction from "../components/underConstruction"
import * as style from "../components/header.module.scss"

const Header = ({ siteTitle }) => (
  <header>
    <div className={style.wrapper}>
      <h1>
        <Link
          to="/"
        >
          {siteTitle}
        </Link>
      </h1>
      <UnderConstruction />
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
