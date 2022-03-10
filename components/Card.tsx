import React, { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import MUICard from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import StrapiMedia from "../types/StrapiMedia";
import { getMedia } from "../lib/getMedia";
import Moment from "react-moment";
import { useContainerDimensions } from "../lib/useContainerDimensions";

interface CardProps {
  cover: StrapiMedia;
  title: string;
  description: string;
  category: string;
  date: string;
  topics: string[];
  slug: string;
}

const Card = ({
  cover,
  title,
  description,
  category,
  date,
  topics,
  slug,
}: CardProps) => {
  const ref = useRef(null);
  const cardCover = cover.attributes.formats.medium;

  const cardDimensions = useContainerDimensions(ref);
  const imageScale = cardDimensions.width / cardCover.width;

  const imageHeight = cardDimensions.width * (5 / 7);
  // const imageHeight = imageScale * cardCover.height;
  // const imageHeight = 0.4 * cardDimensions.height;

  return (
    <>
      <Link as={`/article/${slug}`} href="/article/[slug]" passHref>
        <MUICard
          elevation={0}
          sx={{
            backgroundColor: "#fff",
            border: "2px dashed #444",
          }}
          ref={ref}
        >
          <CardActionArea>
            <CardMedia
              sx={{ borderBottom: "1px dashed #555", height: imageHeight }}
            >
              <div
                style={{
                  position: "relative",
                  width: "100%",
                  height: "100%",
                }}
              >
                <Image
                  src={getMedia(cover, "m").url}
                  alt={cover.attributes.alternativeText}
                  layout="fill"
                  objectFit="cover"
                />
              </div>
            </CardMedia>
            <CardContent>
              <Stack width="100%" spacing={2}>
                <Typography variant="caption">{category}</Typography>
                <Typography variant="h3">{title}</Typography>
                <Typography variant="body1">{description}</Typography>
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  spacing={2}
                >
                  <Typography variant="caption">{topics}</Typography>
                  <Typography variant="caption" sx={{ alignSelf: "flex-end" }}>
                    <Moment format="DD.MM.YYYY">{date}</Moment>
                  </Typography>
                </Stack>
              </Stack>
            </CardContent>
          </CardActionArea>
        </MUICard>
      </Link>
    </>
  );
};

export default Card;
