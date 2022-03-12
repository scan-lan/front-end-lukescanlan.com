import { GetStaticPaths, GetStaticProps } from "next/types";

import ApiArticle from "../../types/Article";
import Articles from "../../components/Articles";
import Layout from "../../components/Layout";
import NavPage from "../../types/NavPage";
import SEO from "../../components/SEO";
import type StrapiMeta from "../../types/StrapiMeta";
import { getFromAPI } from "../../lib/api";
import type iCategory from "../../types/Category";
import { stringify } from "qs";

interface CategoryProps {
  category: iCategory;
  navPages: NavPage[];
  articles: ApiArticle[];
}

const Category = ({ category, articles, navPages }: CategoryProps) => {
  const seo = {
    metaTitle: category.attributes.name,
    metaDescription: `All ${category.attributes.name} articles`,
  };

  return (
    <Layout navPages={navPages}>
      <SEO seo={seo} />
      <div className="uk-section">
        <div className="uk-container uk-container-large">
          <h1>{category.attributes.name}</h1>
          <Articles articles={articles} />
        </div>
      </div>
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
    fallback: false,
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
      category: category.data[0],
      categories: navPages.data,
      articles: articles.data,
    },
    revalidate: 1,
  };
};

export default Category;
