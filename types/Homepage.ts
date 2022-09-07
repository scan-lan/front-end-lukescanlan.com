import ApiSeo from "./ApiSeo"

export default interface Homepage {
  data: {
    attributes: {
      seo: ApiSeo | null
      hero: {
        title: string
      }
    }
  }
}
