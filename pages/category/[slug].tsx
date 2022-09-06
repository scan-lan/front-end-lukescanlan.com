/** @jsxImportSource @emotion/react */

import { GetStaticPaths, GetStaticProps } from "next/types"

import ApiArticle from "../../types/Article"
import type ApiCategory from "../../types/Category"
import Articles from "../../components/Articles"
import Custom404 from "../404"
import Head from "next/head"
import Layout from "../../components/Layout"
import NavPage from "../../types/NavPage"
import Seo from "../../components/Seo"
import Skeleton from "@mui/material/Skeleton"
import type StrapiMeta from "../../types/StrapiMeta"
import Typography from "@mui/material/Typography"
import { css } from "@emotion/react"
import { getFromAPI } from "../../lib/api"
import { stringify } from "qs"
import { useRouter } from "next/router"

export const getStaticPaths: GetStaticPaths = async () => {
  const categories = await getFromAPI<{ data: ApiCategory[] }>("/categories")

  return {
    paths: categories
      ? categories.data.map((category) => ({
          params: {
            slug: category.attributes.slug,
          },
        }))
      : [],
    fallback: true,
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const categoryQueryString = stringify({
    filters: {
      slug: {
        $eq: params?.slug,
      },
    },
  })

  const category = await getFromAPI<{ data: ApiCategory[]; meta: StrapiMeta }>(
    "/categories",
    categoryQueryString
  )
  const navPages = await getFromAPI<{ data: NavPage[]; meta: StrapiMeta }>(
    "/nav-pages"
  )

  const articlesQueryString = stringify({
    filters: {
      category: {
        slug: {
          $eq: params?.slug,
        },
      },
    },
    populate: "*",
    sort: ["written:desc", "updatedAt:desc"],
  })

  const articles = await getFromAPI<{ data: ApiArticle[]; meta: StrapiMeta }>(
    "/articles",
    articlesQueryString
  )

  return {
    props: {
      articles: articles?.data || null,
      category: category?.data[0] || null,
      navPages: navPages?.data || null,
    },
    revalidate: 1,
  }
}

interface CategoryProps {
  articles: ApiArticle[] | null;
  category: ApiCategory | null;
  navPages: NavPage[] | null;
}

const titleContainerStyles = css({
  display: "grid",
  // backgroundColor: "#5c7b65",
  marginBottom: "8px",
  gridTemplateColumns: "repeat(12, 1fr)",
  "& h1": {
    gridColumn: "span 12",
    textAlign: "right",
    padding: "10rem 1rem",
    color: "#5c7b65",
  },
})

const Category = ({ articles, category, navPages }: CategoryProps) => {
  const router = useRouter()

  if (router.isFallback) {
    return (
      <Layout navPages={null}>
        <Seo seo={null} />
        <div css={titleContainerStyles}>
          <Skeleton variant="text">
            <Typography variant="h1">Non-Fiction</Typography>
          </Skeleton>
        </div>
        <Articles articles={null} spacing={1} />
      </Layout>
    )
  }

  if (category === null || articles === null) {
    return (
      <>
        <Head>
          <meta name="robots" content="noindex" />
        </Head>
        <Custom404 navPages={navPages} />
      </>
    )
  }

  const seo = {
    metaTitle: category.attributes.name,
    metaDescription: `All ${category.attributes.name} articles`,
  }

  return (
    <Layout navPages={navPages}>
      <Seo seo={seo} />
      <div css={titleContainerStyles}>
        {category ? (
          <Typography variant="h1">{category.attributes.name}</Typography>
        ) : (
          <Skeleton variant="text">
            <Typography variant="h1">Non-Fiction</Typography>
          </Skeleton>
        )}
      </div>
      <Articles articles={articles} spacing={1} />
    </Layout>
  )
}

export default Category
