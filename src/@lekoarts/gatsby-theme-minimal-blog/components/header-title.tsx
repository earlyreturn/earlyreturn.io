// @jsx jsx
// shadowing https://git.io/Jk5Gq
import { Link } from 'gatsby'
import { jsx } from 'theme-ui'
import replaceSlashes from '@lekoarts/gatsby-theme-minimal-blog/src/utils/replaceSlashes'
import useSiteMetadata from '@lekoarts/gatsby-theme-minimal-blog/src/hooks/use-site-metadata'
import useMinimalBlogConfig from '@lekoarts/gatsby-theme-minimal-blog/src/hooks/use-minimal-blog-config'

const HeaderTitle = () => {
  const { siteTitle } = useSiteMetadata()
  const { basePath } = useMinimalBlogConfig()

  return (
    <Link
      to={replaceSlashes(`/${basePath}`)}
      aria-label={`${siteTitle} - Back to home`}
      sx={{
        color: `heading`,
        textDecoration: `none`,
        position: `relative`,
        '.header-title::after': {
          modes: {
            dark: { color: `red` },
          },
          backgroundColor: `line`,
          height: `0.6em`,
          width: '100%',
          display: 'block',
          position: 'absolute',
          left: '0.3em',
          content: '""',
          bottom: '0.2em',
          zIndex: -1,
          transition: 'all .1s',
        },
        '.header-title:hover::after': {
          left: '0.4em',
          bottom: '0.1em',
          transition: 'all .1s',
        },
      }}
    >
      <div
        className="header-title"
        sx={{
          my: 0,
          fontWeight: `bold`,
          fontSize: [3, 4],
          fontFamily: `logo`,
        }}
      >
        {siteTitle}
      </div>
    </Link>
  )
}

export default HeaderTitle
