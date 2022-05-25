import ApiSeo from "./ApiSeo";

export default interface Homepage {
  data: {
    attributes: {
      seo: ApiSeo;
      hero: {
        title: string;
      };
    };
  };
}
