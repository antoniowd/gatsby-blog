require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`
})

module.exports = {
  siteMetadata: {
    title: `AntonioWebDev`,
    author: `Antonio Martin`,
    description: `Blog de programación de aplicaciones web. Todo lo que necesitas para aprender programación del lado del servidor y cliente. También analizo los mejores cursos de programacion web.`,
    keywords: ['desarrollo web', 'aplicaciones web', 'javascript', 'php', 'node.js', 'html', 'css', 'gatsbyjs', 'reactjs'],
    siteUrl: 'https://antonioweb.dev',
    image: '/images/image-og.png',
    social: {
      twitter: '@antoniowebdev',
    },
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-sass`,
    `gatsby-plugin-sitemap`,
    {
      resolve: 'gatsby-plugin-mailchimp',
      options: {
        endpoint: process.env.MAILCHIMP_ENDPOINT,
      },
    },
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: process.env.GA_ID,
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-prismjs`,
          },
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 912,
            },
          },
          {
            resolve: "gatsby-remark-external-links",
            options: {
              target: "_blank",
              rel: "noreferrer"
            }
          }
        ]
      }
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `conent`,
        path: `${__dirname}/src/content`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `AntonioWebDev`,
        short_name: `AntonioWebDev`,
        description: 'Blog de programación de aplicaciones web. Todo lo que necesitas para aprender programación del lado del servidor y cliente. También analizo los mejores cursos de programacion web.',
        lang: 'es',
        start_url: `/`,
        background_color: `#07a04c`,
        theme_color: `#07a04c`,
        display: `minimal-ui`,
        icon: `src/images/logo.png`, // This path is relative to the root of the site.
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    `gatsby-plugin-offline`,
  ],
}
