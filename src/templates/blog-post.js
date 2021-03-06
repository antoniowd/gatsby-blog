import React from 'react'
import { Link, graphql } from 'gatsby'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons'
import Layout from '../components/layout'
import SEO from '../components/seo'
import Newsletter from '../components/newsletter'

export default function BlogPostTemplate({ data, pageContext }) {
  const { markdownRemark } = data
  const { frontmatter, html, excerpt, timeToRead } = markdownRemark
  const { previous, next } = pageContext
  const image = frontmatter.image
    ? frontmatter.image.childImageSharp.resize
    : null

  return (
    <Layout>
      <SEO
        title={frontmatter.title}
        description={excerpt}
        image={image}
        altImage={frontmatter.altImage}
        keywords={frontmatter.keywords}
        pathname={frontmatter.slug}
      />
      <section className="section">
        <div className="container">
          <div className="columns is-multiline">
            <div className="column is-8 is-touch-12">
              <h1 className="title is-2 is-size-3-mobile">{frontmatter.title}</h1>

              <div className="columns subtitle is-gapless is-vcentered">
                <div className="column">
                  <p className="is-size-7 has-text-grey-dark">
                    {frontmatter.date} - {timeToRead} {timeToRead > 1 ? 'minutos' : 'minuto'} de lectura
                  </p>
                </div>
                <div className="column is-6 has-text-right  has-text-left-mobile">
                  {
                    frontmatter.keywords.map((key, index) => (
                      <span
                        key={index}
                        className="tag is-success is-light"
                        style={{ marginRight: '0.5rem', fontSize: '0.65rem' }}
                      >
                        {key}
                      </span>)
                    )
                  }
                </div>
              </div>
              <div className="content" dangerouslySetInnerHTML={{ __html: html }} />
              <hr />


              <p className="title is-4 has-text-centered">También te puede interesar</p>
              <div className="columns">
                <div className="column">
                  {previous && (
                    <h3 className="title is-5 has-text-centered">
                      <Link to={previous.frontmatter.slug} rel="Articulo anterior">
                        <div className="columns is-vcentered is-mobile">
                          <div className="column is-1">
                            <FontAwesomeIcon icon={faArrowLeft} />
                          </div>
                          <div className="column is-11">
                            {previous.frontmatter.title}
                          </div>
                        </div>
                      </Link>
                    </h3>
                  )}
                </div>
                <div className="column">
                  {next && (
                    <h3 className="title is-5 has-text-centered">
                      <Link to={next.frontmatter.slug} rel="Articulo siguiente">
                        <div className="columns is-vcentered is-mobile">
                          <div className="column is-11">
                            {next.frontmatter.title}
                          </div>
                          <div className="column is-1">
                            <FontAwesomeIcon icon={faArrowRight} />
                          </div>
                        </div>
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
    </Layout >
  )
}

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    markdownRemark(frontmatter: { slug: { eq: $slug } }) {
      excerpt(pruneLength: 160)
      html
      frontmatter {
        date(locale: "es", formatString: "D [de] MMMM, YYYY")
        slug
        title
        image {
          childImageSharp {
            resize(width: 1200) {
              src
              height
              width
            }
          }
        }
        altImage
        keywords
      }
      timeToRead
    }
  }
`