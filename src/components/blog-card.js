import React from 'react'
import Img from 'gatsby-image'

const BlogCard = ({ node }) => {
  const { frontmatter, timeToRead } = node
  return (
    <a href={frontmatter.path} className="media blog-list">
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
      <p className="is-size-7 has-text-grey-light">
      {frontmatter.date} - {timeToRead} {timeToRead > 1 ? 'minutos' : 'minuto'} de lectura
      </p>
      </div>
    </a>
  )
}

export default BlogCard