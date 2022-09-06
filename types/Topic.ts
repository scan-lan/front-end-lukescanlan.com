import ApiArticle from "./Article"

export default interface ApiTopic {
  id: number;
  attributes: {
    name: string;
    slug: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    articles: {
      data: ApiArticle[];
    };
  };
}
