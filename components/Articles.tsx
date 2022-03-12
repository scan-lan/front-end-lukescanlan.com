/** @jsxImportSource @emotion/react */

import ApiArticle from "../types/Article";
import Card from "./Card";
import { Masonry } from "@mui/lab";
import { css } from "@emotion/react";

interface ArticlesProps {
  articles: ApiArticle[];
  spacing?: number;
}

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
      date={article.attributes.publishedAt}
      category={article.attributes.category.data.attributes.name}
      slug={article.attributes.slug}
    />
  ));

  return (
    <Masonry
      columns={{ xl: 4, lg: 3, sm: 2, xs: 1 }}
      spacing={spacing}
      css={articlesCss}
    >
      {articleCards}
    </Masonry>
  );
};

export default Articles;
