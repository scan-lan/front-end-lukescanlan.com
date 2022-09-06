import ApiSeo from "./ApiSeo"

export default interface AboutPage {
  id: number;
  attributes: {
    what: string;
    where: string;
    who: string;
    why: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    seo: ApiSeo | null;
  };
}
