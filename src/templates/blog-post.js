import React from 'react'
import { Link, graphql } from 'gatsby'
import Layout from '../components/layout'
import Newsletter from '../components/newsletter'

export default function BlogPostTemplate({ data, pageContext }) {
  const { markdownRemark } = data
  const { frontmatter, html, excerpt, timeToRead } = markdownRemark
  const { previous, next } = pageContext

  return (
    <Layout
      siteTitle={frontmatter.title}
      siteDescription={excerpt}
    >
      <section className="section">
        <div className="container">
          <div className="columns is-multiline">
            <div className="column is-8 is-touch-12">
              <h1 className="title is-2 is-size-3-mobile">{frontmatter.title}</h1>
              <div className="columns is-mobile subtitle">
                <div className="column">
                  {/* redes sociales */}
                </div>
                <div className="column has-text-right">
                  <p className="is-size-7 has-text-grey-light">
                    {frontmatter.date} - {timeToRead} {timeToRead > 1 ? 'minutos' : 'minuto'} de lectura
                  </p>
                </div>
              </div>
              <div className="content" dangerouslySetInnerHTML={{ __html: html }} />
              <hr />
              <p className="title is-4 has-text-centered">También te puede interesar</p>
              <div className="columns">
                <div className="column">
                  {previous && (
                    <h3 className="title is-5 has-text-centered">
                      <Link to={previous.frontmatter.path} rel="Articulo anterior">
                        {previous.frontmatter.title}
                      </Link>
                    </h3>
                  )}
                </div>
                <div className="column">
                  {next && (
                    <h3 className="title is-5 has-text-centered">
                      <Link to={next.frontmatter.path} rel="Articulo siguiente">
                        {next.frontmatter.title}
                      </Link>
                    </h3>
                  )}
                </div>
              </div>
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
  query BlogPostByPath($path: String!) {
    markdownRemark(frontmatter: { path: { eq: $path } }) {
      excerpt(pruneLength: 160)
      html
      frontmatter {
        date(locale: "es", formatString: "D [de] MMMM, YYYY")
        path
        title
        image {
          childImageSharp {
            fluid(maxWidth: 1000, fit: COVER) {
              ...GatsbyImageSharpFluid
            }
          }
        }
        altImage
      }
      timeToRead
    }
  }
`