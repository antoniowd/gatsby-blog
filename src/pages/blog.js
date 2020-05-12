import React from 'react'
import { StaticQuery, graphql } from 'gatsby'
import Layout from '../components/layout'

const Blog = () => {
  return (
    <Layout>
      <section className="section">
        <div className="container">
          <StaticQuery
            query={graphql`
            {
              allStrapiArticle {
                edges {
                  node {
                    strapiId
                    title
                    slug
                  }
                }
              }
            }
          `}
            render={data => (
              <>
                {
                  data.allStrapiArticle.edges.map(article => (
                    <h3 key={article.node.strapiId} className="title is-h3">{article.node.title}</h3>
                  ))
                }
              </>
            )}
          />
        </div>
      </section>
    </Layout>
  )
}

export default Blog