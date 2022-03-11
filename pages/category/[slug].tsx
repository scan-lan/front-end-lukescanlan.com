import Articles from "../../components/Articles";
import { getFromAPI } from "../../lib/api";
import Layout from "../../components/Layout";
import SEO from "../../components/SEO";
import Category from "../../types/Category";
import StrapiMeta from "../../types/StrapiMeta";
import { stringify } from "qs";
import Article from "../../types/Article";
import { GetStaticPaths, GetStaticProps } from "next/types";
import NavPage from "../../types/NavPage";

interface CategoryProps {
  category: Category;
  navPages: NavPage[];
  articles: Article[];
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
  const categories: { data: Category[] } = await getFromAPI("/categories");

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

  const category: { data: Category[]; meta: StrapiMeta } = await getFromAPI(
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

  const articles: { data: Article[]; meta: StrapiMeta } = await getFromAPI(
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
