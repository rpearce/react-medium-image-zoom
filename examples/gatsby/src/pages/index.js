import React from "react"
import { Link } from "gatsby"
import { useImageZoom } from 'react-medium-image-zoom'

import Layout from "../components/layout"
import Image from "../components/image"
import SEO from "../components/seo"

const IndexPage = () => (
  <Layout>
    <SEO title="Home" />
    <h1>Hi people</h1>
    <p>Welcome to your new Gatsby site.</p>
    <p>Now go build something great.</p>
    <div style={{ maxWidth: `300px`, marginBottom: `1.45rem` }}>
      <Image />
    </div>
    <div style={{ maxWidth: `300px`, marginBottom: `1.45rem` }}>
      <LambImage />
    </div>
    <Link to="/page-2/">Go to page 2</Link> <br />
    <Link to="/using-typescript/">Go to "Using TypeScript"</Link>
  </Layout>
)

const LambImage = () => {
  const { ref } = useImageZoom()

  return (
    <img
      alt="lamb in a field"
      ref={ref}
      src="https://www.kilcoint.com/img/img-uploads/product_cat_image/sheep-lambing.jpg"
      width="300"
    />
  )
}

export default IndexPage
