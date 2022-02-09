import Category from "./Category";
import StrapiMedia from "./StrapiMedia";
import Writer from "./Writer";

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
    writer: {
      data: Writer;
    };
    cover: StrapiMedia;
    category: {
      data: Category;
    };
    topics: null[];
  };
}
