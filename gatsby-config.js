require('dotenv').config({
  path: '.env',
})

module.exports = {
  siteMetadata: {
    siteTitle: 'early return',
    siteTitleAlt: 'Coding Fun',
    banner: '/banner.png',
  },
  plugins: [
    {
      resolve: '@lekoarts/gatsby-theme-minimal-blog',
      options: {
        blogPath: '/',
        navigation: [
          {
            title: '',
            slug: '',
          },
        ],
        externalLinks: [
          {
            name: 'Twitter',
            url: 'https://twitter.com/earlyreturnio',
          },
          {
            name: 'RSS',
            url: 'https://earlyreturn.io/rss.xml',
          },
        ],
      },
    },
    'gatsby-plugin-sitemap',
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'early return',
        short_name: 'early return',
        description: 'Returning Early',
        start_url: '/',
        background_color: '#fff',
        theme_color: '#6B46C1',
        display: 'standalone',
        icons: [
          {
            src: '/android-chrome-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: '/android-chrome-512x512.png',
            sizes: '512x512',
            type: 'image/png',
          },
        ],
      },
    },
    'gatsby-plugin-offline',
    'gatsby-plugin-netlify',
  ],
}
