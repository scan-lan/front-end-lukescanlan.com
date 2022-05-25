import ApiArticle from "../types/Article";
import Articles from "../components/Articles";
import Homepage from "../types/Homepage";
import Layout from "../components/Layout";
import NavPage from "../types/NavPage";
import React from "react";
import SEO from "../components/SeoComponent";
import { getFromAPI } from "../lib/api";
import { stringify } from "qs";

interface HomeProps {
  articles: {
    data: ApiArticle[] | null;
  };
  navPages: {
    data: NavPage[] | null;
  };
  homepage: Homepage | null;
}

const Home = ({ articles, navPages, homepage }: HomeProps) => (
  <Layout navPages={navPages?.data || null}>
    <SEO seo={homepage?.data.attributes.seo || null} />
    <Articles articles={articles?.data || null} spacing={1} />
  </Layout>
);

export const getStaticProps = async () => {
  const articlesQueryString = stringify({
    populate: ["category", "writer", "cover", "topics"],
    sort: ["written:desc", "updatedAt:desc"],
  });

  // Run API calls in parallel
  const [articles, navPages, homepage] = await Promise.all([
    getFromAPI<{ data: ApiArticle[] }>("/articles", articlesQueryString),
    getFromAPI<{ data: NavPage[] }>("/nav-pages"),
    getFromAPI<{ data: Homepage }>("/homepage"),
  ]);

  return {
    props: {
      articles: articles || null,
      navPages: navPages || null,
      homepage: homepage || null,
    },
    revalidate: 1,
  };
};

export default Home;
