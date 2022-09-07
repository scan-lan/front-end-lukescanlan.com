import StrapiMedia from "./StrapiMedia"

export default interface Seo {
  metaTitle?: string
  metaDescription?: string
  shareImage?:
    | string
    | {
        data: StrapiMedia
      }
}
