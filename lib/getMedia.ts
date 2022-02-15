import StrapiMedia from "../types/StrapiMedia";

export const getStrapiMedia = (media: StrapiMedia) => {
  return media.attributes.url;
};
