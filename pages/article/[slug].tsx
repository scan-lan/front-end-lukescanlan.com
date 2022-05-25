/** @jsxImportSource @emotion/react */

import { GetStaticPaths, GetStaticProps } from "next";
import { Theme, css } from "@emotion/react";

import ApiArticle from "../../types/Article";
import ArticleHeader from "../../components/ArticleHeader";
import ArticleMeta from "../../components/ArticleMeta";
import Layout from "../../components/Layout";
import Markdown from "../../components/Markdown";
import NavPage from "../../types/NavPage";
import PrefaceAccordion from "../../components/PrefaceAccordion";
import SEO from "../../components/SeoComponent";
import Seo from "../../types/Seo";
import Skeleton from "@mui/material/Skeleton";
import StrapiMeta from "../../types/StrapiMeta";
import Typography from "@mui/material/Typography";
import { getFromAPI } from "../../lib/api";
import { getMedia } from "../../lib/getMedia";
import { stringify } from "qs";
import { useRouter } from "next/router";

export const getStaticPaths: GetStaticPaths = async () => {
  const articles = await getFromAPI<{ data: ApiArticle[] }>("/articles");

  return {
    paths: articles
      ? articles.data.map((article) => ({
          params: {
            slug: article.attributes.slug,
          },
        }))
      : [],
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const articleQueryParams = stringify({
    filters: {
      slug: {
        $eq: params?.slug,
      },
    },
    populate: ["writer", "writer.picture", "cover", "category", "topics"],
  });

  const articles = await getFromAPI<{ data: ApiArticle[]; meta: StrapiMeta }>(
    "/articles",
    articleQueryParams
  );

  const navPages = await getFromAPI<{ data: NavPage[] }>("/nav-pages");

  return {
    props: {
      article: articles?.data[0] || null,
      navPages: navPages?.data || null,
    },
    revalidate: 1,
  };
};

interface ArticleProps {
  article: ApiArticle | null;
  navPages: NavPage[];
}

const mainContent = "& p, & ul, & ol, & img, & .p-skeleton";

const contentStyles = (theme: Theme) =>
  css({
    "& .markdown": {
      display: "grid",
      gridTemplateColumns: "repeat(12, 1fr)",

      "& a": {
        textDecorationThickness: ".16rem",
        "&:focus": {
          textDecorationColor: theme.palette.primary.main,
        },
      },

      "p + p, p + h2, p + h3, p + h4, p + h5, p + h6": {
        paddingTop: "1rem",
      },

      "& pre": {
        width: "100%",
      },

      "& code": {
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.primary.contrastText,
      },

      "& *": {
        gridColumn: "3 / span 8",
      },

      [mainContent]: {
        width: "100%",
        maxWidth: "55ch",
        justifySelf: "center",
      },

      [theme.breakpoints.down("lg")]: {
        "& *": {
          gridColumn: "2 / span 10",
        },
      },

      [theme.breakpoints.down("md")]: {
        "& *": {
          gridColumn: "1 / span 12",
        },

        "h2, h3, h4, h5, h6": {
          paddingLeft: theme.spacing(1),
        },

        [mainContent]: {
          gridColumn: "2 / span 10",
        },
      },
    },
  });

const Article = ({ article, navPages }: ArticleProps) => {
  const router = useRouter();

  // If the page is not yet generated, this will be displayed
  // initially until getStaticProps() finishes running
  if (router.isFallback || article === null) {
    return (
      <Layout navPages={navPages}>
        <ArticleHeader cover={null} title={null} />
        <main css={contentStyles}>
          <div className="markdown">
            {Array.from<number>({ length: 40 }).map((_, i) => (
              <Skeleton
                variant="text"
                width="100%"
                className="p-skeleton"
                key={i.toString()}
              >
                <Typography variant="body1">.</Typography>
              </Skeleton>
            ))}
          </div>
        </main>
      </Layout>
    );
  }

  if (article !== null) {
    const seo: Seo = {
      metaTitle: article.attributes.title,
      metaDescription: article.attributes.description,
    };

    if (article.attributes.cover.data !== null) {
      seo.shareImage = { data: article.attributes.cover.data };
    }

    return (
      <Layout navPages={navPages}>
        <SEO seo={seo} article />
        <ArticleHeader
          cover={
            article.attributes.cover.data
              ? {
                  image: getMedia(article.attributes.cover.data, "xl"),
                  altText:
                    article.attributes.cover.data.attributes.alternativeText,
                }
              : null
          }
          title={article.attributes.title}
        />
        <main css={contentStyles}>
          {article.attributes.contentWarning ||
          article.attributes.authorsNote ? (
            <PrefaceAccordion
              contentWarning={article.attributes.contentWarning}
              authorsNote={article.attributes.authorsNote}
            />
          ) : null}
          <Markdown>{article.attributes.content}</Markdown>
          <ArticleMeta
            written={article.attributes.written}
            updated={article.attributes.updatedAt}
            category={article.attributes.category.data}
            topics={article.attributes.topics.data}
            published={article.attributes.publishedAt}
            writer={article.attributes.writer.data}
          />
        </main>
      </Layout>
    );
  }
};

export default Article;
