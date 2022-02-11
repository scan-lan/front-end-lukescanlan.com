import React from "react";
import App from "next/app";
import Head from "next/head";
import type { AppProps } from "next/app";
import { createContext } from "react";
import { stringify } from "qs";
import { CacheProvider, EmotionCache } from "@emotion/react";
import { ThemeProvider, CssBaseline, createTheme } from "@mui/material";
import { getStrapiMedia } from "../lib/getMedia";
import Global from "../types/Global";
import { getFromAPI } from "../lib/api";
import "../styles/globals.css";
import createEmotionCache from "../lib/createEmotionCache";
import { lightThemeOptions } from "../styles/theme/lightThemeOptions";
import "../styles/globals.css";

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

// Store Strapi Global object in context
export const GlobalContext = createContext({});

const clientSideEmotionCache = createEmotionCache();
const lightTheme = createTheme(lightThemeOptions);

const MyApp = ({
  Component,
  emotionCache = clientSideEmotionCache,
  pageProps,
}: MyAppProps) => {
  const { global }: { global: Global } = pageProps;

  return (
    <>
      <Head>
        <link
          rel="shortcut icon"
          href={getStrapiMedia(global.data.attributes.favicon)}
        />
      </Head>
      <CacheProvider value={emotionCache}>
        <ThemeProvider theme={lightTheme}>
          <GlobalContext.Provider value={global}>
            <CssBaseline />
            <Component {...pageProps} />
          </GlobalContext.Provider>
        </ThemeProvider>
      </CacheProvider>
    </>
  );
};

// getInitialProps disables automatic static optimization for pages that don't
// have getStaticProps. So article, category and home pages still get SSG.
// Hopefully we can replace this with getStaticProps once this issue is fixed:
// https://github.com/vercel/next.js/discussions/10949
MyApp.getInitialProps = async (ctx: any) => {
  const globalQueryString = stringify({
    populate: ["favicon", "defaultSEO", "defaultSEO.shareImage"],
  });

  // Calls page's `getInitialProps` and fills `appProps.pageProps`
  const appProps = await App.getInitialProps(ctx);

  // Fetch global site settings from Strapi
  const global: Global = await getFromAPI("/global", globalQueryString);

  // Pass the data to our page via props
  return { ...appProps, pageProps: { global } };
};

export default MyApp;
