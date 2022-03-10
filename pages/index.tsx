import { stringify } from "qs";
import React from "react";
import Articles from "../components/Articles";
import Layout from "../components/Layout";
import Seo from "../components/SEO";
import { getFromAPI } from "../lib/api";
import Article from "../types/Article";
import SEO from "../types/SEO";
import Container from "@mui/material/Container";
import NavPage from "../types/NavPage";

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
        seo: SEO;
        hero: {
          title: string;
        };
      };
    };
  };
}

const Home = ({ articles, navPages, homepage }: HomeProps) => (
  <Layout navPages={navPages.data}>
    <Container maxWidth="lg">
      <Articles articles={articles.data} />
    </Container>
  </Layout>
);

export async function getStaticProps() {
  const articlesQueryString = stringify({
    populate: ["category", "writer", "cover", "topics"],
    sort: ["publishedAt:desc", "updatedAt:desc"],
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
