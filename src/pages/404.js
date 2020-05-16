import React from "react"
import { Link } from 'gatsby'

import Layout from "../components/layout"

const NotFoundPage = () => (
  <Layout siteTitle="404: Pagina no encontrada">
    <br />
    <h1 
      className="title is-1 has-text-centered has-text-warning"
      style={{fontSize: '6rem'}}
    >
      404
    </h1>
    <p className="title is-3 has-text-centered">No hemos podido encontrar esta página.</p>
    <p className="has-text-centered">Te dejo aquí <Link to="/">las últimas publicaciones</Link> para que te pongas al día.</p>
  </Layout>
)

export default NotFoundPage
