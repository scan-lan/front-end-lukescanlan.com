import StrapiMedia from "./StrapiMedia";

export default interface ApiWriter {
  id: number;
  attributes: {
    name: string;
    email: string;
    createdAt: Date;
    updatedAt: Date;
    publishedAt: Date;
    picture: StrapiMedia;
  };
}
