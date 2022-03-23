/** @jsxImportSource @emotion/react */

import { Theme, css } from "@emotion/react";

import ApiCategory from "../types/Category";
import ApiTopic from "../types/Topic";
import ApiWriter from "../types/Writer";
import Link from "next/link";
import Moment from "react-moment";
import MuiLink from "@mui/material/Link";
import Typography from "@mui/material/Typography";

const containerStyles = (theme: Theme) =>
  css({
    paddingTop: theme.spacing(3),
    display: "grid",
    gridTemplateColumns: "repeat(12, 1fr)",
  });

const articleMetaStyles = (theme: Theme) =>
  css({
    fontSize: "1.4rem",
    maxWidth: "55ch",
    width: "100%",
    justifySelf: "center",
    gridColumn: "3 / span 8",

    [theme.breakpoints.down("lg")]: {
      gridColumn: "2 / span 10",
      fontSize: "1.35rem",
    },

    [theme.breakpoints.down("md")]: {
      fontSize: "1.2rem",
    },

    display: "grid",
    gridTemplateColumns: "repeat(2, 1fr)",
    gridTemplateRows: "repeat(2, 1fr)",
    gridTemplateAreas: `
      "published updated"
      "category topics"
    `,
    alignItems: "center",

    "#published": {
      gridArea: "published",
    },

    "#updated": {
      gridArea: "updated",
      justifySelf: "end",
    },

    "#category": {
      gridArea: "category",
    },

    "#topics": {
      gridArea: "topics",
      justifySelf: "end",

      ".topic + .topic::before": {
        content: `", "`,
      },
    },

    "#writer": {
      gridArea: "writer",
    },
  });

interface ArticleMetaProps {
  category: ApiCategory | null;
  published: string;
  topics: ApiTopic[] | null;
  updated: string;
  writer: ApiWriter | null;
}

const ArticleMeta = ({
  category,
  published,
  updated,
  topics,
}: ArticleMetaProps) => (
  <div css={containerStyles}>
    <div css={articleMetaStyles}>
      {/* {writer ? (
        <Typography variant="caption" id="writer">
          By {writer.attributes.name}
        </Typography>
      ) : null} */}
      <Typography variant="caption" id="published">
        <Moment format="DD.MM.YYYY">{published}</Moment>
      </Typography>
      {updated !== published ? (
        <Typography variant="caption" id="updated">
          Updated <Moment format="DD.MM.YYYY">{updated}</Moment>
        </Typography>
      ) : null}
      {category ? (
        <Typography variant="caption" id="category">
          <Link href={`/category/${category.attributes.slug}`} passHref>
            <MuiLink>{category.attributes.name}</MuiLink>
          </Link>
        </Typography>
      ) : null}
      {topics ? (
        <div id="topics">
          {topics.sort().map((topic, i) => (
            <Typography variant="caption" key={i} className="topic">
              <Link href={`/topic/${topic.attributes.slug}`} passHref>
                <MuiLink>{topic.attributes.name}</MuiLink>
              </Link>
            </Typography>
          ))}
        </div>
      ) : null}
    </div>
  </div>
);

export default ArticleMeta;
