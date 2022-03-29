import StrapiMedia from "./StrapiMedia";

export default interface ApiSEO {
  id?: number;
  metaTitle: string;
  metaDescription: string;
  article?: boolean;
  shareImage?: {
    data: StrapiMedia;
  };
}
