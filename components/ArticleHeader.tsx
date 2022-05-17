/** @jsxImportSource @emotion/react */

import { Theme, css } from "@emotion/react";

import Image from "next/image";
import { MediaFormat } from "../types/StrapiMedia";
import Skeleton from "@mui/material/Skeleton";
import Typography from "@mui/material/Typography";

interface ArticleImageProps {
  cover: {
    image: MediaFormat;
    altText: string;
  } | null;
  title: string | null;
}

const articleTitleStyles = (theme: Theme) =>
  css({
    padding: `${theme.spacing(1)} 0`,
    display: "grid",
    gridTemplateColumns: "repeat(12, 1fr)",

    ".title": {
      textAlign: "right",
      gridColumn: "3 / span 8",

      [theme.breakpoints.down("lg")]: {
        gridColumn: "2 / span 10",
      },

      [theme.breakpoints.down("md")]: {
        gridColumn: "span 12",
      },
    },
  });

const articleImageStyles = (theme: Theme) =>
  css({
    padding: `${theme.spacing(1)} 0`,
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

const ArticleHeader = ({ cover, title }: ArticleImageProps) => (
  <div css={cover ? articleImageStyles : articleTitleStyles}>
    {cover ? (
      <>
        <Image
          src={cover.image.url}
          alt={cover.altText}
          width={cover.image.width}
          height={cover.image.height}
          priority
        />
        <Typography variant="h1">
          <span
            style={{
              backgroundColor: "rgba(0%, 0%, 0%, 0.5)",
            }}
          >
            {title}
          </span>
        </Typography>
      </>
    ) : title ? (
      <Typography variant="h1" className="title">
        {title}
      </Typography>
    ) : (
      <Skeleton
        variant="text"
        width="65%"
        sx={{ justifySelf: "end" }}
        className="title"
      >
        <Typography variant="h1">.</Typography>
      </Skeleton>
    )}
  </div>
);

export default ArticleHeader;
