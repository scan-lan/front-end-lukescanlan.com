import ApiArticle from "../types/Article";
import ApiSEO from "../types/SEO";
import Articles from "../components/Articles";
import Layout from "../components/Layout";
import NavPage from "../types/NavPage";
import React from "react";
import SEO from "../components/SEO";
import { getFromAPI } from "../lib/api";
import { stringify } from "qs";
import { styled } from "@mui/system";

interface HomeProps {
  articles: {
    data: ApiArticle[];
  };
  navPages: {
    data: NavPage[];
  };
  homepage: {
    data: {
      attributes: {
        seo: ApiSEO;
        hero: {
          title: string;
        };
      };
    };
  };
}

const ArticleContainer = styled("main")(({ theme }) => ({
  display: "grid",
  width: "100%",
  gridTemplateColumns: "repeat(12, 1fr)",
  gridTemplateAreas: `". articles articles articles articles articles articles articles articles articles articles ."`,
  // [theme.breakpoints.down("lg")]: {},
}));

const Home = ({ articles, navPages, homepage }: HomeProps) => (
  <Layout navPages={navPages.data}>
    <SEO seo={homepage.data.attributes.seo} />
    <ArticleContainer>
      <Articles articles={articles.data} spacing={1} />
    </ArticleContainer>
  </Layout>
);

export const getStaticProps = async () => {
  const articlesQueryString = stringify({
    populate: ["category", "writer", "cover", "topics"],
    sort: ["written:desc", "publishedAt:desc"],
  });

  // Run API calls in parallel
  const [articles, navPages, homepage] = await Promise.all([
    getFromAPI("/articles", articlesQueryString),
    getFromAPI("/nav-pages"),
    getFromAPI("/homepage"),
  ]);

  return {
    props: { articles, navPages, homepage },
    revalidate: 1,
  };
};

export default Home;
