import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import BlogCard from './blog-card'

const BlogList = () => {
  const data = useStaticQuery(graphql`
  {
    allMarkdownRemark(sort: {fields: frontmatter___date, order: DESC}) {
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
`)

  return (
    <div className="columns">
      <div className="column is-9 is-touch-12">
        {
          data.allMarkdownRemark.edges.map((post, index) => (
            <BlogCard key={index} node={post.node} />
          ))
        }
      </div>
    </div>
  )
}

export default BlogList