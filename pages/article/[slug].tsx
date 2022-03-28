/** @jsxImportSource @emotion/react */

import { GetStaticPaths, GetStaticProps } from "next";
import { Theme, css } from "@emotion/react";

import ApiArticle from "../../types/Article";
import ApiSEO from "../../types/SEO";
import ArticleHeader from "../../components/ArticleHeader";
import ArticleMeta from "../../components/ArticleMeta";
import type { Components } from "react-markdown";
import Layout from "../../components/Layout";
import Link from "@mui/material/Link";
import NavPage from "../../types/NavPage";
import PrefaceAccordion from "../../components/PrefaceAccordion";
import ReactMarkdown from "react-markdown";
import SEO from "../../components/SEO";
import StrapiMeta from "../../types/StrapiMeta";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import Typography from "@mui/material/Typography";
import { getFromAPI } from "../../lib/api";
import { getMedia } from "../../lib/getMedia";
import remarkGfm from "remark-gfm";
import { stringify } from "qs";
import { useRouter } from "next/router";

export const getStaticPaths: GetStaticPaths = async () => {
  const articles: { data: ApiArticle[] } = await getFromAPI("/articles");

  return {
    paths: articles.data.map((article) => ({
      params: {
        slug: article.attributes.slug,
      },
    })),
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

  const articles: { data: ApiArticle[]; meta: StrapiMeta } = await getFromAPI(
    "/articles",
    articleQueryParams
  );

  const navPages = await getFromAPI("/nav-pages");

  return {
    props: { article: articles.data[0], navPages: navPages.data },
    revalidate: 1,
  };
};

interface ArticleProps {
  article: ApiArticle;
  navPages: NavPage[];
}

const mainContent = "& p, & ul, & ol, & img";

const contentStyles = (theme: Theme) =>
  css({
    padding: `0 ${theme.spacing(3)} ${theme.spacing(1)}`,

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
        overflow: "scroll",
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

        [mainContent]: {
          fontSize: "1.35rem",
        },
      },

      [theme.breakpoints.down("md")]: {
        "& *": {
          gridColumn: "1 / span 12",
        },

        [mainContent]: {
          gridColumn: "2 / span 10",
          fontSize: "1.2rem",
        },
      },
    },
  });

const componentMapping: Components = {
  h1: ({ node, ...props }) => <Typography variant="h2" {...props} />,
  h2: ({ node, ...props }) => <Typography variant="h3" {...props} />,
  h3: ({ node, ...props }) => <Typography variant="h4" {...props} />,
  h4: ({ node, ...props }) => <Typography variant="h5" {...props} />,
  h5: ({ node, ...props }) => <Typography variant="h6" {...props} />,
  h6: ({ node, ...props }) => <Typography variant="h6" {...props} />,
  p: ({ node, ...props }) => <Typography variant="body1" {...props} />,
  a: ({ node, ...props }) => <Link color="primary.main" {...props} />,
  code: ({ node, inline, className, children, ...props }) => {
    const match = /language-(\w+)/.exec(className || "");
    return !inline && match ? (
      <SyntaxHighlighter language={match[1]} PreTag="div" {...props}>
        {String(children).replace(/\n$/, "")}
      </SyntaxHighlighter>
    ) : (
      <code className={className} {...props}>
        {children}
      </code>
    );
  },
};

const Article = ({ article, navPages }: ArticleProps) => {
  const router = useRouter();

  // If the page is not yet generated, this will be displayed
  // initially until getStaticProps() finishes running
  if (router.isFallback) {
    return (
      <main style={{ display: "grid", height: "80vh", placeContent: "center" }}>
        <Typography variant="h1">Loading...</Typography>
      </main>
    );
  }

  const seo: ApiSEO = {
    metaTitle: article.attributes.title,
    metaDescription: article.attributes.description,
    article: true,
  };

  if (article.attributes.cover.data !== null) {
    seo.shareImage = { data: article.attributes.cover.data };
  }

  return (
    <Layout navPages={navPages}>
      <SEO seo={seo} />
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
        {article.attributes.contentWarning || article.attributes.authorsNote ? (
          <PrefaceAccordion
            contentWarning={article.attributes.contentWarning}
            authorsNote={article.attributes.authorsNote}
          />
        ) : null}
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={componentMapping}
          className="markdown"
        >
          {article.attributes.content}
        </ReactMarkdown>
        <ArticleMeta
          category={article.attributes.category.data}
          published={article.attributes.publishedAt}
          topics={article.attributes.topics.data}
          updated={article.attributes.updatedAt}
          writer={article.attributes.writer.data}
        />
      </main>
    </Layout>
  );
};

export default Article;
