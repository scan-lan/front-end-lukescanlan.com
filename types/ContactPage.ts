import StrapiMedia from "./StrapiMedia";

export default interface ContactPage {
  id: number;
  attributes: {
    createdAt: Date;
    updatedAt: Date;
    publishedAt: Date;
    blurb: string;
    contactImage: {
      data: StrapiMedia;
    };
  };
}
