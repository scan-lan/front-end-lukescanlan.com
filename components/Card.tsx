import React from "react";
import Link from "next/link";
import Image from "next/image";
import MUICard from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardActionArea from "@mui/material/CardActionArea";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import StrapiMedia from "../types/StrapiMedia";
import { getStrapiMedia } from "../lib/getMedia";
import Moment from "react-moment";

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
  const cardCover = cover.attributes.formats.medium;
  return (
    <>
      <Link as={`/article/${slug}`} href="/article/[slug]" passHref>
        <MUICard
          elevation={0}
          sx={{
            // maxWidth: "20em",
            backgroundColor: "#fff",
            border: "1px dashed #000",
          }}
        >
          <CardActionArea>
            <CardMedia
              sx={{ borderBottom: "2px dashed #444444", height: "12em" }}
            >
              <div
                style={{
                  position: "relative",
                  width: "100%",
                  height: "100%",
                }}
              >
                <Image
                  src={cardCover.url}
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
