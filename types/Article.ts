import Category from "./Category";
import StrapiMedia from "./StrapiMedia";

export default interface Article {
  id: number;
  attributes: {
    title: string;
    content: string;
    written: Date;
    createdAt: Date;
    updatedAt: Date;
    publishedAt: Date;
    slug: string;
    description: string;
    authorsNote?: string;
    contentWarning?: string;
    writer: null;
    cover?: StrapiMedia;
    category: {
      data: Category;
    };
    topics: null[];
  };
}
