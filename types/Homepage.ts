import ApiSEO from "./SEO";

export default interface Homepage {
  data: {
    attributes: {
      seo: ApiSEO;
      hero: {
        title: string;
      };
    };
  };
}
