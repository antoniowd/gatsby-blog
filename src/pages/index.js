import React from "react"
import Layout from "../components/layout"
import BlogList from "../components/blog-list"

const IndexPage = () => {
  return (
    <Layout>
      <section className="section">
        <div className="container">
          <BlogList />
        </div>
        </section>
    </Layout>
  )
}

export default IndexPage
