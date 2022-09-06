/** @jsxImportSource @emotion/react */

import { Theme, css } from "@emotion/react"

import ApiArticle from "../types/Article"
import Card from "./Card"
import Masonry from "@mui/lab/Masonry"
import SkeletonCard from "./Card/SkeletonCard"
import { useCallback } from "react"

interface ArticlesProps {
  articles: ApiArticle[] | null
  spacing?: number
}

const columnBreakpoints = [
  ["xl", 4],
  ["lg", 3],
  ["sm", 2],
  ["xs", 1],
] as const

const Articles = ({ articles, spacing = 3 }: ArticlesProps) => {
  const mainStyles = useCallback(
    (theme: Theme) =>
      css({
        width: "100%",
        paddingTop: theme.spacing(spacing),

        "& .masonry": {
          gridColumn: "2 / span 10",
          width: `calc(100% + ${theme.spacing(spacing)})`,
        },
      }),
    [spacing]
  )

  const articleCards = articles
    ? articles.map((article) => (
        <Card
          key={article.attributes.slug}
          cover={article.attributes.cover.data}
          title={article.attributes.title}
          description={article.attributes.description}
          topics={
            article.attributes.topics.data
              ? article.attributes.topics.data.map(
                  (topic) => topic.attributes.name
                )
              : []
          }
          date={article.attributes.written || article.attributes.publishedAt}
          category={article.attributes.category.data?.attributes.name || null}
          slug={article.attributes.slug}
        />
      ))
    : Array.from<number>({ length: 8 }).map((_, i) => (
        <SkeletonCard key={i.toString()} />
      ))

  const possibleColumns = Object.fromEntries(
    columnBreakpoints.filter(([_, value]) => value <= articleCards.length)
  )

  return (
    <main css={mainStyles} className="twelve-column">
      <Masonry columns={possibleColumns} spacing={spacing} className="masonry">
        {articleCards}
      </Masonry>
    </main>
  )
}

export default Articles
