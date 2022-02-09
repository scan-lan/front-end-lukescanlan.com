import { getStrapiMedia } from "../lib/getMedia";
import StrapiMedia from "../types/StrapiMedia";

interface ImageProps {
  image: StrapiMedia;
  style?: any;
}

const Image = ({ image, style }: ImageProps) => {
  const imageUrl = getStrapiMedia(image);

  return (
    <img
      src={imageUrl}
      alt={image.data.attributes.alternativeText || image.data.attributes.name}
      style={style}
    />
  );
};

export default Image;
