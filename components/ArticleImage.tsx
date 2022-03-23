/** @jsxImportSource @emotion/react */

import { Theme, css } from "@emotion/react";

import Image from "next/image";
import { MediaFormat } from "../types/StrapiMedia";
import Typography from "@mui/material/Typography";

interface ArticleImageProps {
  image: MediaFormat;
  title: string;
  altText: string;
}

const articleImageStyles = (theme: Theme) =>
  css({
    display: "grid",

    "& img": {
      zIndex: 0,
    },

    "& h1": {
      position: "absolute",
      zIndex: 1,
      placeSelf: "center",
      maxWidth: "66vw",
      lineHeight: 1.4,
      width: "100%",

      color: "white",
      fontSize: "clamp(2.5rem, 6vw + 1rem, 8rem)",
      fontFamily: "Roboto Slab, Roboto, serif",

      [theme.breakpoints.down("lg")]: {
        maxWidth: "80vw",
      },

      [theme.breakpoints.down("md")]: {
        maxWidth: "90vw",
      },

      [theme.breakpoints.down("sm")]: {
        maxWidth: "98vw",
      },
    },
  });

const ArticleImage = ({ image, title, altText }: ArticleImageProps) => (
  <div css={articleImageStyles}>
    <Image
      src={image.url}
      alt={altText}
      width={image.width}
      height={image.height}
      priority
    />
    <Typography variant="h1">
      <span style={{ backgroundColor: "rgba(0%, 0%, 0%, 0.5)" }}>{title}</span>
    </Typography>
  </div>
);

export default ArticleImage;
