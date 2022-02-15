import StrapiMedia from "./StrapiMedia";

export default interface SEO {
  id?: number;
  metaTitle: string;
  metaDescription: string;
  shareImage: {
    data: StrapiMedia;
  };
}
