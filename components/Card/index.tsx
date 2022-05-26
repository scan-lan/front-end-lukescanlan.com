import React, { useRef } from "react";
import { getMediaURL, mediaSize } from "../../lib/getMedia";

import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Image from "next/image";
import Link from "next/link";
import MUICard from "@mui/material/Card";
import Moment from "react-moment";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";
import StrapiMedia from "../../types/StrapiMedia";
import Typography from "@mui/material/Typography";
import { useContainerDimensions } from "../../lib/useContainerDimensions";

interface CardProps {
  cover: StrapiMedia | null;
  title: string;
  description: string;
  category: string | null;
  date: string;
  topics: string[];
  slug: string;
  dummyCard?: boolean;
  coverSize?: mediaSize;
}

const Card = ({
  cover,
  title,
  description,
  category,
  date,
  topics,
  slug,
  dummyCard = false,
  coverSize,
}: CardProps) => {
  const ref = useRef(null);

  const linkProps = dummyCard
    ? { href: "#", passHred: true }
    : {
        as: `/article/${slug}`,
        href: "/article/[slug]",
        passHref: true,
      };
  const cardDimensions = useContainerDimensions(ref);
  const imageHeight = cardDimensions.width * (5 / 7);

  // Other card media size options
  // const imageScale = cardDimensions.width / cardCover.width;
  // const imageHeight = imageScale * cardCover.height;
  // const imageHeight = 0.4 * cardDimensions.height;

  return (
    <>
      <Link {...linkProps}>
        <MUICard
          elevation={0}
          sx={{
            backgroundColor: "#fff",
            border: "3px dashed #444",
          }}
          ref={ref}
        >
          <CardActionArea>
            {(cover || dummyCard) && (
              <CardMedia
                sx={{ borderBottom: "2px dashed #888", height: imageHeight }}
              >
                <div
                  style={{
                    position: "relative",
                    width: "100%",
                    height: "100%",
                  }}
                >
                  {!cover ? (
                    <Skeleton
                      variant="rectangular"
                      width="100%"
                      height="100%"
                    />
                  ) : (
                    <Image
                      src={getMediaURL(cover, coverSize ? coverSize : "m")}
                      alt={cover.attributes.alternativeText}
                      layout="fill"
                      objectFit="cover"
                    />
                  )}
                </div>
              </CardMedia>
            )}
            <CardContent>
              <Stack width="100%" spacing={2}>
                {/* Category */}
                {dummyCard ? (
                  <Skeleton variant="text">
                    <Typography variant="caption">Non-Fiction</Typography>
                  </Skeleton>
                ) : (
                  <Typography variant="caption">
                    {category ? category : ""}
                  </Typography>
                )}
                {/* Title */}
                {dummyCard ? (
                  <Skeleton variant="text" width="100%">
                    <Typography
                      variant="h3"
                      sx={{
                        lineHeight: 0.9,
                        fontSize: "2.5rem",
                        paddingBottom: 0,
                      }}
                      component="h2"
                    >
                      .
                    </Typography>
                  </Skeleton>
                ) : (
                  <Typography
                    variant="h3"
                    sx={{
                      lineHeight: 0.9,
                      fontSize: "2.5rem",
                      paddingBottom: 0,
                    }}
                    className="no-break-out"
                    component="h2"
                  >
                    {title}
                  </Typography>
                )}
                {/* Description */}
                {dummyCard ? (
                  <Skeleton variant="text" width="100%">
                    <Typography variant="body1" sx={{ fontSize: "1.25rem" }}>
                      <br />
                      <br />
                      <br />
                    </Typography>
                  </Skeleton>
                ) : (
                  <Typography variant="body1" className="no-break-out">
                    {description}
                  </Typography>
                )}
                {/* Topics */}
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  spacing={2}
                >
                  {dummyCard ? (
                    <Skeleton variant="text" width="15ch">
                      <Typography variant="caption">.</Typography>
                    </Skeleton>
                  ) : (
                    <Typography variant="caption">
                      {topics ? topics.sort().join(", ") : ""}
                    </Typography>
                  )}
                  {/* Date */}
                  {dummyCard ? (
                    <Skeleton variant="text">
                      <Typography
                        variant="caption"
                        sx={{ alignSelf: "flex-end" }}
                      >
                        DD.MM.YYYY
                      </Typography>
                    </Skeleton>
                  ) : (
                    <Typography
                      variant="caption"
                      sx={{ alignSelf: "flex-end" }}
                    >
                      <Moment format="DD.MM.YYYY">{date}</Moment>
                    </Typography>
                  )}
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
