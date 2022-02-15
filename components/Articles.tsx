import React from "react";
import Grid from "@mui/material/Grid";
import Article from "../types/Article";
import Card from "./Card";
import { useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material";

interface ArticlesProps {
  articles: Article[];
}

const ArticleColumn = ({ numberOfColumns, columnIndex, articleCards }) => {
  let width = 12;
  if (numberOfColumns === 2) {
    width = 6;
  } else if (numberOfColumns === 3) {
    width = 4;
  }
  return (
    <Grid container item direction="column" spacing={3} xs={width}>
      {articleCards.filter((articleCard, i) => {
        if (i % numberOfColumns === columnIndex) return articleCard;
      })}
    </Grid>
  );
};

const Articles = ({ articles }: ArticlesProps) => {
  const theme = useTheme();

  let numberOfColumns = 3;
  if (useMediaQuery(theme.breakpoints.down("md"))) {
    numberOfColumns = 2;
  }
  if (useMediaQuery(theme.breakpoints.down("sm"))) {
    numberOfColumns = 1;
  }

  const articleCards = articles.map((article) => (
    <Grid item key={article.attributes.slug}>
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
  ));

  const columns = [] as JSX.Element[];
  for (let i = 0; i < numberOfColumns; i++) {
    columns.push(
      <ArticleColumn
        numberOfColumns={numberOfColumns}
        columnIndex={i}
        articleCards={articleCards}
        key={i}
      />
    );
  }

  return (
    <Grid container spacing={3}>
      {columns}
    </Grid>
  );
};

export default Articles;
