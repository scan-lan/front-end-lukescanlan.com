import StrapiMedia, { MediaFormat } from "../types/StrapiMedia"

export type mediaSize = "xs" | "s" | "m" | "l" | "xl" | "original" | "thumbnail"

export const getMedia = (
  media: StrapiMedia,
  size: mediaSize = "original"
): MediaFormat => {
  switch (size) {
    case "xs":
      return media.attributes.formats?.xsmall
        ? media.attributes.formats.xsmall
        : media.attributes
    case "s":
      return media.attributes.formats.small
        ? media.attributes.formats.small
        : media.attributes
    case "m":
      return media.attributes.formats.medium
        ? media.attributes.formats.medium
        : media.attributes
    case "l":
      return media.attributes.formats.large
        ? media.attributes.formats.large
        : media.attributes
    case "xl":
      return media.attributes.formats.xlarge
        ? media.attributes.formats.xlarge
        : media.attributes
    case "thumbnail":
      return media.attributes.formats.thumbnail
    case "original":
      return media.attributes
  }
}

export const getMediaURL = (
  media: StrapiMedia,
  size: mediaSize = "original"
) => {
  const sizedMedia = getMedia(media, size)
  return sizedMedia.url
}
