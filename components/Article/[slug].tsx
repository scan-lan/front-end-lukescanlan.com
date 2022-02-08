import ReactMarkdown from "react-markdown";
import Moment from "react-moment";
import { getFromAPI } from "../../lib/api";
import Layout from "../../components/Layout";
import Image from "../../components/Image";
import SEO from "../../components/SEO";
import { getStrapiMedia } from "../../lib/getMedia";
import { stringify } from "querystring";
import Article from "../../types/Article";
import Category from "../../types/Category";

interface ArticleProps {
  article: Article;
  categories: Category[];
}

const Article = ({ article, categories }: ArticleProps) => {
  const imageUrl = getStrapiMedia(article.attributes.cover);

  const seo = {
    metaTitle: article.attributes.title,
    metaDescription: article.attributes.description,
    shareImage: article.attributes.cover,
    article: true,
  };

  return (
    <Layout categories={categories}>
      <SEO seo={seo} />
      <div
        id="banner"
        className="uk-height-medium uk-flex uk-flex-center uk-flex-middle uk-background-cover uk-light uk-padding uk-margin"
        data-src={imageUrl}
        data-srcset={imageUrl}
        data-uk-img
      >
        <h1>{article.attributes.title}</h1>
      </div>
      <div className="uk-section">
        <div className="uk-container uk-container-small">
          <ReactMarkdown>{article.attributes.content}</ReactMarkdown>
          <hr className="uk-divider-small" />
          <div className="uk-grid-small uk-flex-left" data-uk-grid="true">
            <div>
              {article.attributes.writer.picture && (
                <Image
                  image={article.attributes.writer.picture}
                  style={{
                    position: "static",
                    borderRadius: "50%",
                    height: 30,
                  }}
                />
              )}
            </div>
            <div className="uk-width-expand">
              <p className="uk-margin-remove-bottom">
                By {article.attributes.writer.name}
              </p>
              <p className="uk-text-meta uk-margin-remove-top">
                <Moment format="MMM Do YYYY">
                  {article.attributes.publishedAt}
                </Moment>
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export async function getStaticPaths() {
  const articles = await getFromAPI("/articles");

  return {
    paths: articles.map((article) => ({
      params: {
        slug: article.slug,
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
    encodeValuesOnly: true,
  } as any);

  const articles = await getFromAPI(`/articles?${articleQueryParams}`);
  const categories = await getFromAPI("/categories");

  return {
    props: { article: articles[0], categories },
    revalidate: 1,
  };
}

export default Article;
