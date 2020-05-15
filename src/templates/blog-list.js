import React from 'react'
import { graphql, Link } from 'gatsby'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronCircleLeft, faChevronCircleRight } from '@fortawesome/free-solid-svg-icons'
import Layout from "../components/layout"
import BlogCard from '../components/blog-card'
import Newsletter from '../components/newsletter'

export default function BlogPostTemplate({ data, pageContext }) {
  const { currentPage, numPages } = pageContext
  const isFirst = currentPage === 1
  const isLast = currentPage === numPages
  const prevPage = currentPage - 1 === 1 ? "/" : (currentPage - 1).toString()
  const nextPage = (currentPage + 1).toString()

  return (
    <Layout>
      <section className="section">
        <div className="container">
          <div className="columns is-multiline">
            <div className="column is-8 is-touch-12">
              {
                isFirst && (
                  <h2 className="title is-4">Últimas publicaciones sobre desarrollo web</h2>
                )
              }
              {
                !isFirst && (
                  <h2 className="title is-4">Árticulos sobre desarrollo web</h2>
                )
              }
              <hr />
              {
                data.allMarkdownRemark.edges.map((post, index) => (
                  <BlogCard key={index} node={post.node} />
                ))
              }
              <br />
              <nav className="pagination is-centered" role="navigation" aria-label="paginacion">
                {!isLast && (<Link to={nextPage} className="pagination-previous" rel="anterior">
                  <span className="icon">
                    <FontAwesomeIcon icon={faChevronCircleLeft} />
                  </span>
                  Artículos anteriores
                </Link>)}
                {!isFirst && (<Link to={prevPage} className="pagination-next" rel="siguiente">
                  Artículos recientes
                  <span className="icon">
                    <FontAwesomeIcon icon={faChevronCircleRight} />
                  </span>
                </Link>)}
              </nav>
            </div>
            <div className="column is-4 is-touch-12">
              <Newsletter />
            </div>
          </div>
        </div>
      </section>
    </Layout>
  )
}

export const pageQuery = graphql`
query blogPageQuery($skip: Int!, $limit: Int!) {
    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      limit: $limit
      skip: $skip
    ) {
    edges {
      node {
        frontmatter {
          title
          path
          date(locale: "es", formatString: "D [de] MMMM, YYYY")
          image {
            childImageSharp {
              fixed(width: 64, height: 64, fit: COVER) {
                ...GatsbyImageSharpFixed
              }
            }
          }
          altImage
        }
        timeToRead
      }
    }
  }
}
`