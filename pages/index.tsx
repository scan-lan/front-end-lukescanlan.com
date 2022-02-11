import { stringify } from "qs";
import React from "react";
import Articles from "../components/Articles";
import Layout from "../components/Layout";
import Seo from "../components/SEO";
import { getFromAPI } from "../lib/api";
import Article from "../types/Article";
import Category from "../types/Category";
import SEO from "../types/SEO";
import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

interface HomeProps {
  articles: {
    data: Article[];
  };
  categories: {
    data: Category[];
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

const Home = ({ articles, categories, homepage }: HomeProps) => (
  <div>
    <Container maxWidth="lg" sx={{ backgroundColor: "#889" }}>
      {["This text", "That text", "Other text"].map((title, i) => (
        <Card key={i}>
          <CardContent>
            <Typography variant="h4">{title}</Typography>
          </CardContent>
        </Card>
      ))}
    </Container>
  </div>
);

export async function getStaticProps() {
  const articlesQueryString = stringify({
    populate: ["category", "writer", "cover", "topics"],
  });

  // Run API calls in parallel
  const [articles, categories, homepage] = await Promise.all([
    getFromAPI("/articles"),
    getFromAPI("/categories"),
    getFromAPI("/homepage"),
  ]);

  return {
    props: { articles, categories, homepage },
    revalidate: 1,
  };
}

export default Home;
