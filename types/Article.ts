import ApiCategory from "./Category";
import ApiTopic from "./Topic";
import ApiWriter from "./Writer";
import StrapiMedia from "./StrapiMedia";

export default interface ApiArticle {
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
      data: ApiWriter | null;
    };
    cover: {
      data: StrapiMedia;
    };
    category: {
      data: ApiCategory | null;
    };
    topics: {
      data: ApiTopic[] | null;
    };
  };
}
