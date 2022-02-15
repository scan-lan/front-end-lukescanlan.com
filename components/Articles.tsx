import React from "react";
import Grid from "@mui/material/Grid";
import Article from "../types/Article";
import Card from "./Card";

interface ArticlesProps {
  articles: Article[];
}

const Articles = ({ articles }: ArticlesProps) => {
  return (
    <Grid container spacing={3} alignItems="flex-start">
      {articles.map((article) => (
        <Grid item key={article.attributes.slug} xs={12} sm={6} md={4}>
          <Card
            cover={article.attributes.cover.data}
            title={article.attributes.title}
            description={article.attributes.description}
            topics={article.attributes.topics.data.map(
              (topic) => topic.attributes.name
            )}
            date={article.attributes.publishedAt}
            category={article.attributes.category.data.attributes.name}
            slug={article.attributes.slug}
          />
        </Grid>
      ))}
    </Grid>
  );
};

export default Articles;
