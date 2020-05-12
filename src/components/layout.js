import React from "react"
import PropTypes from "prop-types"
import Seo from "./seo"
import Nav from "./nav"
import "./layout.scss"

const Layout = ({ children }) => {
  return (
    <>
      <Seo title="blog" />
      <Nav />
      <main>{children}</main>
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
