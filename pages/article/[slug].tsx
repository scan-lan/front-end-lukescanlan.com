import ReactMarkdown from "react-markdown";
import { stringify } from "qs";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Image from "next/image";
import { getFromAPI } from "../../lib/api";
import Layout from "../../components/Layout";
import SEO from "../../components/SEO";
import { getMedia } from "../../lib/getMedia";
import Article from "../../types/Article";
import Category from "../../types/Category";
import StrapiMeta from "../../types/StrapiMeta";

interface ArticleProps {
  article: Article;
  categories: Category[];
}

const Article = ({ article, categories }: ArticleProps) => {
  const image = getMedia(article.attributes.cover.data, "xl");
  console.log(image);

  const seo = {
    metaTitle: article.attributes.title,
    metaDescription: article.attributes.description,
    shareImage: article.attributes.cover,
    article: true,
  };

  return (
    <Layout categories={categories}>
      <SEO seo={seo} />
      <Typography variant="h1">{article.attributes.title}</Typography>
      <Image
        src={image.url}
        alt={article.attributes.cover.data.attributes.alternativeText}
        width={image.width}
        height={image.height}
      />
      <Container maxWidth="sm">
        <ReactMarkdown>{article.attributes.content}</ReactMarkdown>
      </Container>
    </Layout>
  );
};

export async function getStaticPaths() {
  const articles: { data: Article[] } = await getFromAPI("/articles");

  return {
    paths: articles.data.map((article) => ({
      params: {
        slug: article.attributes.slug,
      },
    })),
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const articleQueryParams = stringify({
    filters: {
      slug: {
        $eq: params.slug,
      },
    },
    populate: ["writer", "writer.picture", "cover", "category"],
  });

  const articles: { data: Article[]; meta: StrapiMeta } = await getFromAPI(
    "/articles",
    articleQueryParams
  );

  const categories = await getFromAPI("/categories");

  return {
    props: { article: articles.data[0], categories: categories.data },
    revalidate: 1,
  };
}

export default Article;
