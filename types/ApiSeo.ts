import StrapiMedia from "./StrapiMedia";

export default interface ApiSeo {
  id: number;
  metaTitle: string;
  metaDescription: string;
  shareImage?: {
    data: StrapiMedia;
  };
}
