import StrapiMedia from "./StrapiMedia";

export default interface Writer {
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
