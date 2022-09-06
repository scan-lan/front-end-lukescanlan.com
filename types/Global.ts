import ApiSeo from "./ApiSeo"
import StrapiMedia from "./StrapiMedia"

export default interface Global {
  id: number;
  attributes: {
    createdAt: Date;
    updatedAt: Date;
    publishedAt: Date;
    siteName: string;
    favicon: {
      data: StrapiMedia;
    };
    defaultSeo: ApiSeo | null;
  };
}
