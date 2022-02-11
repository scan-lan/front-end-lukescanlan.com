import React from "react";
import App from "next/app";
import Head from "next/head";
import type { AppProps } from "next/app";
import { createContext } from "react";
import { stringify } from "qs";
import { getStrapiMedia } from "../lib/getMedia";
import Global from "../types/Global";
import { getFromAPI } from "../lib/api";
import "../styles/globals.css";

// Store Strapi Global object in context
export const GlobalContext = createContext({});

const MyApp = ({ Component, pageProps }: AppProps) => {
  const { global }: { global: Global } = pageProps;

  return (
    <>
      <Head>
        <link
          rel="shortcut icon"
          href={getStrapiMedia(global.data.attributes.favicon)}
        />
      </Head>
      <GlobalContext.Provider value={global}>
        <Component {...pageProps} />
      </GlobalContext.Provider>
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
