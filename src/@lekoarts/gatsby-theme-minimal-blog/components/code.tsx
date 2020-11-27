/* eslint react/destructuring-assignment: 0 */
// shadowing https://git.io/JkHMB
import React from "react"
import { useColorMode } from "theme-ui"
import Highlight, { defaultProps } from "prism-react-renderer"
import loadable from "@loadable/component"

import lightTheme from "../../../themes/github"
import darkTheme from "../../../themes/oceanicNext"

import Copy from "@lekoarts/gatsby-theme-minimal-blog/src/components/copy"
import useMinimalBlogConfig from "@lekoarts/gatsby-theme-minimal-blog/src/hooks/use-minimal-blog-config"

// add additional syntax highlightings
import Prism from "prism-react-renderer/prism";
(typeof global !== "undefined" ? global : window).Prism = Prism;
require("prismjs/components/prism-rust");
require("prismjs/components/prism-swift");

// edit custom Themes
lightTheme.plain.backgroundColor = "#F3F5F8"
darkTheme.plain.backgroundColor = "#181A26"

type CodeProps = {
  codeString: string
  language: string
  noLineNumbers?: boolean
  metastring?: string
  [key: string]: any
}

function getParams(className = ``): any[] {
  const [lang = ``, params = ``] = className.split(`:`)

  return [
    // @ts-ignore
    lang.split(`language-`).pop().split(`{`).shift(),
  ].concat(
    // @ts-ignore
    params.split(`&`).reduce((merged, param) => {
      const [key, value] = param.split(`=`)
      // @ts-ignore
      merged[key] = value
      return merged
    }, {})
  )
}

const RE = /{([\d,-]+)}/

const calculateLinesToHighlight = (meta: string) => {
  if (!RE.test(meta)) {
    return () => false
  }
  const lineNumbers = RE.exec(meta)![1]
    .split(`,`)
    .map((v) => v.split(`-`).map((x) => parseInt(x, 10)))
  return (index: number) => {
    const lineNumber = index + 1
    const inRange = lineNumbers.some(([start, end]) =>
      end ? lineNumber >= start && lineNumber <= end : lineNumber === start
    )
    return inRange
  }
}

const LazyLiveProvider = loadable(async () => {
  const Module = await import(`react-live`)
  const { LiveProvider, LiveEditor, LiveError, LivePreview } = Module
  return (props: any) => (
    <LiveProvider {...props}>
      {props.showCopyButton && <Copy content={props.code} />}
      <LiveEditor data-name="live-editor" />
      <LiveError />
      <LivePreview data-name="live-preview" />
    </LiveProvider>
  )
})

const Code = ({
  codeString,
  noLineNumbers = false,
  className: blockClassName,
  metastring = ``,
  ...props
}: CodeProps) => {
  const { showLineNumbers, showCopyButton } = useMinimalBlogConfig()
  const colorMode = useColorMode()[0]

  const [language, { title = `` }] = getParams(blockClassName)
  const shouldHighlightLine = calculateLinesToHighlight(metastring)

  const hasLineNumbers = !noLineNumbers && language !== `noLineNumbers` && showLineNumbers

  const theme = colorMode === 'light' ? lightTheme : darkTheme;

  if (props[`react-live`]) {
    return (
      <div className="react-live-wrapper">
        <LazyLiveProvider code={codeString} noInline theme={theme} showCopyButton={showCopyButton} />
      </div>
    )
  }
  return (
    <Highlight {...defaultProps} code={codeString} language={language} theme={theme} >
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <React.Fragment>
          {title && (
            <div className="code-title">
              <div>{title}</div>
            </div>
          )}
          <div className="gatsby-highlight" data-language={language} style={{borderRadius: 6}}>
            <pre className={className} style={style} data-linenumber={hasLineNumbers}>
              {showCopyButton && <Copy content={codeString} fileName={title} />}
              <code className={`language-${language}`}>
                {tokens.map((line, i) => {
                  const lineProps = getLineProps({ line, key: i })

                  if (shouldHighlightLine(i)) {
                    lineProps.className = `${lineProps.className} highlight-line`
                  }

                  return (
                    <div {...lineProps}>
                      {hasLineNumbers && <span className="line-number-style">{i + 1}</span>}
                      {line.map((token, key) => (
                        <span {...getTokenProps({ token, key })} />
                      ))}
                    </div>
                  )
                })}
              </code>
            </pre>
          </div>
        </React.Fragment>
      )}
    </Highlight>
  )
}

export default Code
