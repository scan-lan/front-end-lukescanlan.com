/** @jsxImportSource @emotion/react */

import { GetStaticPaths, GetStaticProps } from "next/types";

import ApiArticle from "../../types/Article";
import Articles from "../../components/Articles";
import Layout from "../../components/Layout";
import NavPage from "../../types/NavPage";
import SEO from "../../components/SEO";
import type StrapiMeta from "../../types/StrapiMeta";
import Typography from "@mui/material/Typography";
import { css } from "@emotion/react";
import { getFromAPI } from "../../lib/api";
import type iCategory from "../../types/Category";
import { stringify } from "qs";

interface CategoryProps {
  articles: ApiArticle[];
  category: iCategory;
  navPages: NavPage[];
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
});

const Category = ({ articles, category, navPages }: CategoryProps) => {
  const seo = {
    metaTitle: category.attributes.name,
    metaDescription: `All ${category.attributes.name} articles`,
  };

  return (
    <Layout navPages={navPages}>
      <SEO seo={seo} />
      <div css={titleContainerStyles}>
        <Typography variant="h1">{category.attributes.name}</Typography>
      </div>
      <Articles articles={articles} spacing={1} />
    </Layout>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const categories: { data: iCategory[] } = await getFromAPI("/categories");

  return {
    paths: categories.data.map((category) => ({
      params: {
        slug: category.attributes.slug,
      },
    })),
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const categoryQueryString = stringify({
    filters: {
      slug: {
        $eq: params?.slug,
      },
    },
  });

  const category: { data: iCategory[]; meta: StrapiMeta } = await getFromAPI(
    "/categories",
    categoryQueryString
  );
  const navPages: { data: NavPage[]; meta: StrapiMeta } = await getFromAPI(
    "/nav-pages"
  );

  const articlesQueryString = stringify({
    filters: {
      category: {
        slug: {
          $eq: params?.slug,
        },
      },
    },
    populate: "*",
  });

  const articles: { data: ApiArticle[]; meta: StrapiMeta } = await getFromAPI(
    "/articles",
    articlesQueryString
  );

  return {
    props: {
      articles: articles.data,
      category: category.data[0],
      navPages: navPages.data,
    },
    revalidate: 1,
  };
};

export default Category;
