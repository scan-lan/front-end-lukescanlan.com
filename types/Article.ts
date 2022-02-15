import Category from "./Category";
import StrapiMedia from "./StrapiMedia";
import Topic from "./Topic";
import Writer from "./Writer";

export default interface Article {
  id: number;
  attributes: {
    title: string;
    content: string;
    written: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    slug: string;
    description: string;
    authorsNote?: string;
    contentWarning?: string;
    writer: {
      data: Writer;
    };
    cover: {
      data: StrapiMedia;
    };
    category: {
      data: Category;
    };
    topics: {
      data: Topic[];
    };
  };
}
