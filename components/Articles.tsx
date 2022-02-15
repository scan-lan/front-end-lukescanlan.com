import React from "react";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Article from "../types/Article";
import Card from "./Card";

interface ArticlesProps {
  articles: Article[];
}

const Articles = ({ articles }: ArticlesProps) => {
  const leftArticles = articles.filter((article, i) => {
    if (i % 2 === 0) return article;
  });
  const rightArticles = articles.filter((article, i) => {
    if (i % 2 === 1) return article;
  });
  // const leftArticlesCount = Math.ceil(articles.length / 5);
  // const leftArticles = articles.slice(0, leftArticlesCount);
  // const rightArticles = articles.slice(leftArticlesCount, articles.length);

  return (
    <Stack direction="row" spacing={3} width={"100%"}>
      <Stack spacing={3}>
        {leftArticles.map((article) => (
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
        ))}
      </Stack>
      <Stack spacing={3}>
        {rightArticles.map((article) => (
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
        ))}
      </Stack>
    </Stack>
  );
};

export default Articles;
