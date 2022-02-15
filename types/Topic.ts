import Article from "./Article";

export default interface Topic {
  id: number;
  attributes: {
    name: string;
    slug: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    articles: {
      data: Article[];
    };
  };
}
