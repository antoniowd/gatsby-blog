import React from 'react'
import Img from 'gatsby-image'

const BlogCard = ({ node }) => {
  const { frontmatter, timeToRead } = node
  return (
    <a href={frontmatter.slug} className="media blog-list">
      <div className="media-left">
        <figure className="image is-64x64">
          <Img
            fixed={frontmatter.image.childImageSharp.fixed} alt={frontmatter.altImage}
            style={{ position: 'initial', width: 'auto', height: 'auto' }}
          />
        </figure>
      </div>
      <div className="media-content">
        <h3 className="title is-5 is-size-6-mobile blog-title" style={{ marginBottom: '0.4rem' }}>
          {frontmatter.title}
        </h3>
        <div className="columns is-gapless">
          <div className="column">
            <span className="is-size-7 has-text-grey-dark">
              {frontmatter.date} - {timeToRead} {timeToRead > 1 ? 'minutos' : 'minuto'} de lectura
            </span>
          </div>
          <div className="column has-text-right">
            {
              frontmatter.keywords.map((key, index) => (
                <span
                  key={index}
                  className="tag is-success is-light"
                  style={{ marginRight: '0.1rem', fontSize: '0.65rem' }}
                >
                  {key}
                </span>)
              )
            }
          </div>
        </div>

      </div>
    </a>
  )
}

export default BlogCard