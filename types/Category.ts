import ApiArticle from "./Article"

export default interface ApiCategory {
  id: number
  attributes: {
    name: string
    slug: string
    createdAt: Date
    updatedAt: Date
    publishedAt: Date
    articles: {
      data: ApiArticle[]
    }
  }
}
