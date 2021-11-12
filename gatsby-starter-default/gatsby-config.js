require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
})

module.exports = {
  siteMetadata: {
    title: `Mikkes blogg`,
    titleTemplate: " · Mikkes blogg",
    url: "https://www.mikkesblogg.no", // No trailing slash allowed!
    description: `Omprogrammerer selvet ved å lese, skrive og lære`,
    author: `Mikke`,
  },
  plugins: [
    `gatsby-plugin-preload-fonts`,
    `gatsby-plugin-sass`,
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-image`,
    `cloudinary`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/gatsby-icon.png`, // This path is relative to the root of the site.
      },
    },
    `gatsby-plugin-gatsby-cloud`,
    {
      resolve: 'gatsby-source-sanity',
      options: {
        projectId: 'esnfvjjt',
        dataset: 'production',
        watchMode: true,
      },
    },
    {
      resolve: "gatsby-plugin-sanity-image",
      options: {
        // Sanity project info (required)
        projectId: "esnfvjjt",
        dataset: "production",
        // Additional params to include with every image.
    // This is optional and the default is shown
    // below—if you like what you see, don’t set it.
    defaultImageConfig: {
      quality: 75,
      fit: "max",
      auto: "format",
    },

    // If you prefer a different fragment name, such
    // as `MagicImage`, enter it here. This needs to
    // be unique your GraphQL types. `WithPreview`
    // will be appended for the second fragment (e.g.
    // MagicImageWithPreview).
    fragmentName: "Image",

    // By default, image fields are typed as SanityImage,
    // but there are cases where you might want to use
    // a custom schema or where custom image types are
    // not under the SanityImage type. In this case, you
    // can alter the type that the fragment is defined
    // on here without redefining the fragments.
    fragmentTypeName: "SanityImage",

    // If you prefer to retreive data another way or
    // if you want to define the fragment you use
    // separately, you can opt-out of having fragments
    // included entirely.
    includeFragments: true,

    // This config directive allows you to specify the
    // field that should be retrieved and used as alt
    // text when no `alt` prop is passed to the image
    // component. See docs for more detail.
    altFieldName: "alt",

    // Custom image types are also supported; refer to
    // full documentation for usage instructions.
    customImageTypes: [],

      },
    }
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
}
