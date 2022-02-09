import Article from "./Article";

export default interface Category {
  id: number;
  attributes: {
    name: string;
    slug: string;
    createdAt: Date;
    updatedAt: Date;
    publishedAt: Date;
    articles: {
      data: Article[];
    };
  };
}
