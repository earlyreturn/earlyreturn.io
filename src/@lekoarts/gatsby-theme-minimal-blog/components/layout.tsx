// @jsx jsx
// shadowing https://git.io/Jk7pu
import React from 'react'
import { Global } from '@emotion/core'
import { Box, Container, jsx } from 'theme-ui'
import 'typeface-ibm-plex-sans'
import 'typeface-ibm-plex-mono'
import SEO from '@lekoarts/gatsby-theme-minimal-blog/src/components/seo'
import Header from '@lekoarts/gatsby-theme-minimal-blog/src/components/header'
import Footer from '@lekoarts/gatsby-theme-minimal-blog/src/components/footer'
import SkipNavLink from '@lekoarts/gatsby-theme-minimal-blog/src/components/skip-nav'
import CodeStyles from '../styles/code'

type LayoutProps = { children: React.ReactNode; className?: string }

const Layout = ({ children, className = `` }: LayoutProps) => (
  <React.Fragment>
    <Global
      styles={(theme) => ({
        '*': {
          boxSizing: `inherit`,
        },
        html: {
          WebkitTextSizeAdjust: `100%`,
        },
        img: {
          borderStyle: `none`,
        },
        pre: {
          fontFamily: `monospace`,
          fontSize: `1em`,
        },
        '[hidden]': {
          display: `none`,
        },
        '::selection': {
          backgroundColor: theme.colors.text,
          color: theme.colors.background,
        },
        a: {
          transition: `all 0.3s ease-in-out`,
          color: `text`,
        },
      })}
    />
    <SEO />
    <SkipNavLink>Skip to content</SkipNavLink>
    <Container>
      <Header />
      <Box id="skip-nav" sx={{ ...CodeStyles }} className={className}>
        {children}
      </Box>
      <Footer />
    </Container>
  </React.Fragment>
)

export default Layout
