import * as React from "react"
import { Link } from "gatsby"
import * as style from "../components/footer.module.scss"

const Footer = () => (
    <footer className={style.footerStyle}>
      <div className={style.wrapper}>
    <div>Laget med <a href="https://www.gatsbyjs.com">Gatsby</a> og <a href="https://www.sanity.io">Sanity</a> av <Link to="/om-mikke">Mikke</Link>.</div><div>Siden inneholder ingen sporingsmekanismer.</div>
    <div>© {new Date().getFullYear()}</div>
    </div>
  </footer>
)


export default Footer
