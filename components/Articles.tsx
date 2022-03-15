/** @jsxImportSource @emotion/react */

import ApiArticle from "../types/Article";
import Card from "./Card";
import Masonry from "@mui/lab/Masonry";
import { css } from "@emotion/react";
import { styled } from "@mui/system";

interface ArticlesProps {
  articles: ApiArticle[];
  spacing?: number;
}

const ArticlesContainer = styled("main")(({ theme }) => ({
  display: "grid",
  width: "100%",
  gridTemplateColumns: "repeat(12, 1fr)",
  gridTemplateAreas: `". articles articles articles articles articles articles articles articles articles articles ."`,
}));

const Articles = ({ articles, spacing = 3 }: ArticlesProps) => {
  const articlesCss = css({
    gridArea: "articles",
    width: `calc(100% + ${spacing * 8}px)`,
  });

  const articleCards = articles.map((article) => (
    <Card
      key={article.attributes.slug}
      cover={article.attributes.cover.data}
      title={article.attributes.title}
      description={article.attributes.description}
      topics={article.attributes.topics.data.map(
        (topic) => topic.attributes.name
      )}
      date={article.attributes.written}
      category={
        article.attributes.category.data?.attributes.name
          ? article.attributes.category.data.attributes.name
          : null
      }
      slug={article.attributes.slug}
    />
  ));

  const columns: { xl?: number; lg?: number; sm?: number; xs?: number } = {
    xl: 4,
    lg: 3,
    sm: 2,
    xs: 1,
  };

  if (articleCards.length < 4) {
    delete columns.xl;
    if (articleCards.length < 3) {
      delete columns.lg;
      if (articleCards.length < 2) {
        delete columns.sm;
      }
    }
  }

  return (
    <ArticlesContainer>
      <Masonry columns={columns} spacing={spacing} css={articlesCss}>
        {articleCards}
      </Masonry>
    </ArticlesContainer>
  );
};

export default Articles;
