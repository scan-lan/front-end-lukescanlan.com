import ApiSeo from "./ApiSeo"

export type AboutQuestion = "what" | "where" | "why" | "who"
export type AboutPageState = Record<AboutQuestion, boolean>

export default interface AboutPage {
  id: number
  attributes: {
    createdAt: string
    updatedAt: string
    publishedAt: string
    seo: ApiSeo | null
  } & Record<AboutQuestion, string>
}
