import React from "react"
import PropTypes from "prop-types"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faReddit, faTwitter } from '@fortawesome/free-brands-svg-icons'
import ScrollUpButton from "react-scroll-up-button"
import SEO from './seo'
import Nav from "./nav"
import "./layout.scss"

const Layout = ({ children, siteTitle, siteDescription, siteKeywords }) => {
  return (
    <>
      {
        siteTitle && (
          <SEO
            title={siteTitle}
            description={siteDescription}
            keywords={siteKeywords || []}
          />
        )
      }
      <Nav />
      <ScrollUpButton ShowAtPosition={500} />
      <main>{children}</main>

      <footer className="footer">
        <div className="content has-text-centered">
          <a target="_BLANK" aria-label="Acceder a twitter" rel="noopener noreferrer" href="https://twitter.com/antoniowebdev" className="button is-text" style={{ marginRight: '25px' }}>
            <span className="icon">
              <FontAwesomeIcon icon={faTwitter} size="2x" />
            </span>
          </a>
          <a target="_BLANK" aria-label="Acceder a reddit" rel="noopener noreferrer" href="https://www.reddit.com/user/antonio-martin" className="button is-text">
            <span className="icon">
              <FontAwesomeIcon icon={faReddit} size="2x" />
            </span>
          </a>
          <br />
          <br />
          <div className="is-size-7">
            {new Date().getFullYear()} Antonio Martin | Todos los derechos reservados
          </div>
        </div>
      </footer>
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
