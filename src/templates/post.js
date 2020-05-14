import React from 'react'
import Layout from '../components/layout'

export default function Template({ data }) {
  const { markdownRemark } = data
  const { frontmatter, html } = markdownRemark

  return (
    <Layout>
      <section className="section">
        <div className="container">
          <div className="columns">
            <div className="column is-8 is-touch-12">
              <h1 className="title is-2 is-size-3-mobile">{frontmatter.title}</h1>
              <div className="content" dangerouslySetInnerHTML={{ __html: html }} />
            </div>
          </div>
        </div>
      </section>
    </Layout>
  )
}

export const pageQuery = graphql`
  query($path: String!) {
    markdownRemark(frontmatter: { path: { eq: $path } }) {
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