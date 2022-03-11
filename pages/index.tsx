import React from "react";
import { stringify } from "qs";
import Articles from "../components/Articles";
import Layout from "../components/Layout";
import { getFromAPI } from "../lib/api";
import Article from "../types/Article";
import iSEO from "../types/SEO";
import SEO from "../components/SEO";
import NavPage from "../types/NavPage";
import { styled } from "@mui/system";

interface HomeProps {
  articles: {
    data: Article[];
  };
  navPages: {
    data: NavPage[];
  };
  homepage: {
    data: {
      attributes: {
        seo: iSEO;
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

export async function getStaticProps() {
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
}

export default Home;
