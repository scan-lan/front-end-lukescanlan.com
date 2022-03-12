import { GetStaticPaths, GetStaticProps } from "next";

import ApiArticle from "../../types/Article";
import Container from "@mui/material/Container";
import Image from "next/image";
import Layout from "../../components/Layout";
import NavPage from "../../types/NavPage";
import ReactMarkdown from "react-markdown";
import SEO from "../../components/SEO";
import StrapiMeta from "../../types/StrapiMeta";
import Typography from "@mui/material/Typography";
import { getFromAPI } from "../../lib/api";
import { getMedia } from "../../lib/getMedia";
import { stringify } from "qs";

interface ArticleProps {
  article: ApiArticle;
  navPages: NavPage[];
}

const Article = ({ article, navPages }: ArticleProps) => {
  const image = getMedia(article.attributes.cover.data, "xl");

  const seo = {
    metaTitle: article.attributes.title,
    metaDescription: article.attributes.description,
    shareImage: article.attributes.cover,
    article: true,
  };

  return (
    <Layout navPages={navPages}>
      <SEO seo={seo} />
      <Image
        src={image.url}
        alt={article.attributes.cover.data.attributes.alternativeText}
        width={image.width}
        height={image.height}
      />
      <Container maxWidth="lg">
        <Typography variant="h2">{article.attributes.title}</Typography>
      </Container>
      <Container maxWidth="sm">
        <ReactMarkdown>{article.attributes.content}</ReactMarkdown>
      </Container>
    </Layout>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const articles: { data: ApiArticle[] } = await getFromAPI("/articles");

  return {
    paths: articles.data.map((article) => ({
      params: {
        slug: article.attributes.slug,
      },
    })),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const articleQueryParams = stringify({
    filters: {
      slug: {
        $eq: params?.slug,
      },
    },
    populate: ["writer", "writer.picture", "cover", "category"],
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

export default Article;
