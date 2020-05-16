// import { Link, StaticQuery, graphql } from "gatsby"
import React, { useState } from "react"
import cn from 'classnames'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faReddit, faTwitter } from '@fortawesome/free-brands-svg-icons'
import Logo from '../images/logo.png'

const Nav = () => {
  const [active, setActive] = useState(false)

  return (
    <nav className="navbar has-shadow is-spaced" role="navigation" arial-label="navegacion principal">
      <div className="container">
        <div className="navbar-brand">
          <a className="navbar-item" href="/">
            <img src={Logo} />
          </a>

          <button type="button"
            className={cn('navbar-burger', 'burger', 'button', 'is-text', { 'is-active': active })}
            onClick={() => setActive(current => !current)}
            aria-label="menu"
            aria-expanded="false"
          >
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </button>
        </div>

        <div className={cn('navbar-menu', { 'is-active': active })}>
          <div className="navbar-start">
            <div className="navbar-item"></div>
            {/* <a href="/cursos" className="navbar-item">Cursos</a>
            <a href="/blog" className="navbar-item">Blog</a> */}
          </div>

          <div className="navbar-end">
            <div className="buttons">
              <div className="navbar-item">
                <a target="_BLANK" aria-label="Acceder a twitter" rel="noopener noreferrer" href="https://twitter.com/antoniowebdev" className="button is-text">
                  <span className="icon is-medium twitter-color">
                    <FontAwesomeIcon icon={faTwitter} size="2x" />
                  </span>
                </a>
                <a target="_BLANK" aria-label="Acceder a reddit" rel="noopener noreferrer" href="https://www.reddit.com/user/antonio-martin" className="button is-text">
                  <span className="icon is-medium reddit-color">
                    <FontAwesomeIcon icon={faReddit} size="2x" />
                  </span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Nav
