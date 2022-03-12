import StrapiMedia from "./StrapiMedia";

export default interface ApiSEO {
  id?: number;
  metaTitle: string;
  metaDescription: string;
  shareImage: {
    data: StrapiMedia;
  };
}
