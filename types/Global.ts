import SEO from "./SEO";
import StrapiMedia from "./StrapiMedia";

export default interface Global {
  data: {
    id: number;
    attributes: {
      createdAt: Date;
      updatedAt: Date;
      publishedAt: Date;
      siteName: string;
      favicon: StrapiMedia;
      defaultSEO: SEO;
    };
  };
}
