import { number } from "prop-types";

export interface MediaFormat {
  ext: string;
  url: string;
  hash: string;
  mime: string;
  name: string;
  path: string | null;
  size: number;
  width: number;
  height: number;
}

export default interface StrapiMedia {
  id: number;
  attributes: {
    name: string;
    alternativeText: string;
    caption: string;
    width: number;
    height: number;
    formats: {
      large: MediaFormat;
      small: MediaFormat;
      medium: MediaFormat;
      xlarge: MediaFormat;
      xsmall: MediaFormat;
      thumbnail: MediaFormat;
    };
    hash: string;
    ext: string;
    mime: string;
    size: number;
    url: string;
    previewUrl?: string;
    provider: string;
    provider_metadata?: string;
    createdAt: Date;
    updatedAt: Date;
  };
}
