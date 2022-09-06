import "../styles/globals.css"

import App, { AppContext } from "next/app"
import { CacheProvider, EmotionCache } from "@emotion/react"
import { ThemeProvider, responsiveFontSizes } from "@mui/material/styles"

import type { AppProps } from "next/app"
import CssBaseline from "@mui/material/CssBaseline"
import Global from "../types/Global"
import Head from "next/head"
import React from "react"
import { createContext } from "react"
import createEmotionCache from "../lib/createEmotionCache"
import { createTheme } from "@mui/material/styles"
import { getFromAPI } from "../lib/api"
import { getMediaURL } from "../lib/getMedia"
import { lightThemeOptions } from "../styles/theme/lightThemeOptions"
import { stringify } from "qs"

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache
}

// Store Strapi Global object in context
export const GlobalContext = createContext<Global | null>(null)

const clientSideEmotionCache = createEmotionCache()
const lightTheme = responsiveFontSizes(createTheme(lightThemeOptions))

const MyApp = ({
  Component,
  emotionCache = clientSideEmotionCache,
  pageProps,
}: MyAppProps) => {
  const { global } = pageProps as { global: Global | null }

  const favicon = global?.attributes.favicon.data
    ? getMediaURL(global.attributes.favicon.data)
    : null

  return (
    <>
      {favicon && (
        <Head>
          <link rel="shortcut icon" href={favicon} />
        </Head>
      )}
      <CacheProvider value={emotionCache}>
        <ThemeProvider theme={lightTheme}>
          <GlobalContext.Provider value={global}>
            <CssBaseline />
            <Component {...pageProps} />
          </GlobalContext.Provider>
        </ThemeProvider>
      </CacheProvider>
    </>
  )
}

// getInitialProps disables automatic static optimization for pages that don't
// have getStaticProps. So article, category and home pages still get SSG.
// Hopefully we can replace this with getStaticProps once this issue is fixed:
// https://github.com/vercel/next.js/discussions/10949
MyApp.getInitialProps = async (context: AppContext) => {
  const globalQueryString = stringify({
    populate: ["favicon", "defaultSeo.shareImage"],
  })

  // Calls page's `getInitialProps` and fills `appProps.pageProps`
  const appProps = await App.getInitialProps(context)

  // Fetch global site settings from Strapi
  const global = await getFromAPI<{ data: Global }>(
    "/global",
    globalQueryString
  )

  // Pass the data to our page via props
  return { ...appProps, pageProps: { global: global?.data || null } }
}

export default MyApp
