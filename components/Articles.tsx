import React from "react";
import Article from "../types/Article";
import Card from "./Card";
import { Masonry } from "@mui/lab";

interface ArticlesProps {
  articles: Article[];
}

const Articles = ({ articles }: ArticlesProps) => {
  const articleCards = articles.map((article) => (
    <Card
      key={article.attributes.slug}
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
  ));

  return (
    <Masonry columns={{ xs: 1, sm: 2, md: 3 }} spacing={3}>
      {articleCards}
    </Masonry>
  );
};

export default Articles;
