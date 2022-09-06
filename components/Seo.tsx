import ApiSeo from "../types/ApiSeo"
import { GlobalContext } from "../pages/_app"
import Head from "next/head"
import React from "react"
import { getMediaURL } from "../lib/getMedia"
import iSeo from "../types/Seo"
import { useContext } from "react"

interface SeoProps {
  seo: ApiSeo | iSeo | null
  article?: boolean
}

const Seo = ({ seo, article = false }: SeoProps) => {
  const global = useContext(GlobalContext)

  const seoWithDefaults = {
    ...global?.attributes.defaultSeo,
    ...seo,
  }
  const sitename = global?.attributes.siteName
    ? global.attributes.siteName
    : "lukescanlan.com"
  const title =
    article && seoWithDefaults.metaTitle
      ? `${seoWithDefaults.metaTitle} | ${sitename}`
      : seoWithDefaults.metaTitle

  const fullSeo = {
    ...seoWithDefaults,
    // Add title suffix
    metaTitle: !title || title === "unknown" ? sitename : title,
    // Get full image URL
    shareImage: seoWithDefaults?.shareImage
      ? typeof seoWithDefaults.shareImage === "string"
        ? seoWithDefaults.shareImage
        : getMediaURL(seoWithDefaults.shareImage.data, "m")
      : null,
  }

  return (
    <Head>
      {fullSeo.metaTitle && (
        <>
          <title>{fullSeo.metaTitle}</title>
          <meta property="og:title" content={fullSeo.metaTitle} />
          <meta name="twitter:title" content={fullSeo.metaTitle} />
        </>
      )}
      {fullSeo.metaDescription && (
        <>
          <meta name="description" content={fullSeo.metaDescription} />
          <meta property="og:description" content={fullSeo.metaDescription} />
          <meta name="twitter:description" content={fullSeo.metaDescription} />
        </>
      )}
      {fullSeo.shareImage && (
        <>
          <meta property="og:image" content={fullSeo.shareImage} />
          <meta name="twitter:image" content={fullSeo.shareImage} />
          <meta name="image" content={fullSeo.shareImage} />
        </>
      )}
      {article && <meta property="og:type" content="article" />}
      <meta name="twitter:card" content="summary_large_image" />
    </Head>
  )
}

export default Seo
