import StrapiMedia from "../types/StrapiMedia";

export const getStrapiMedia = (media: StrapiMedia) => {
  return media.data.attributes.url;
};
