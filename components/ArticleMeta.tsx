/** @jsxImportSource @emotion/react */

import { Theme, css } from "@emotion/react";

import ApiCategory from "../types/Category";
import ApiTopic from "../types/Topic";
import ApiWriter from "../types/Writer";
import Link from "next/link";
import Moment from "react-moment";
import MuiLink from "@mui/material/Link";
import Typography from "@mui/material/Typography";

const articleMetaStyles = (theme: Theme) =>
  css({
    padding: theme.spacing(0, 0.5),
    fontSize: "1.4rem",
    maxWidth: "55ch",
    width: "100%",
    justifySelf: "center",
    gridColumn: "3 / span 8",

    display: "grid",
    gridTemplateColumns: "repeat(2, 1fr)",
    gridTemplateRows: "repeat(2, min-content)",
    gridTemplateAreas: `
    "date-one date-two"
    "category topics"
    `,
    alignItems: "center",

    "> span, > div": {
      padding: theme.spacing(1, 0),
    },

    "#date-one": {
      gridArea: "date-one",
    },

    ".right": {
      justifySelf: "end",
      textAlign: "right",
    },

    "#date-two": {
      gridArea: "date-two",
    },

    "#category": {
      gridArea: "category",
    },

    "#topics": {
      gridArea: "topics",
      lineHeight: "1.2",

      ".topic + .topic::before": {
        content: `", "`,
        fontWeight: 700,
      },
    },

    "#writer": {
      gridArea: "writer",
    },

    [theme.breakpoints.down("lg")]: {
      gridColumn: "2 / span 10",
      fontSize: "1.35rem",
    },

    [theme.breakpoints.down("sm")]: {
      padding: 0,
      gridTemplateColumns: "1fr",
      gridTemplateRows: "repeat(4, min-content)",
      gridTemplateAreas: `
        "date-one"
        "date-two"
        "category"
        "topics"
      `,
    },
  });

interface ArticleMetaProps {
  written: string;
  updated: string;
  category: ApiCategory | null;
  topics: ApiTopic[] | null;
  published: string;
  writer: ApiWriter | null;
}

const ArticleMeta = ({
  written,
  updated,
  category,
  topics,
}: ArticleMetaProps) => (
  <div className="twelve-column">
    <div css={articleMetaStyles}>
      {/* {writer && (
        <Typography variant="caption" id="writer">
          By {writer.attributes.name}
        </Typography>
      )} */}
      <Typography variant="caption" id="date-one">
        Written <Moment format="DD.MM.YYYY">{written}</Moment>
      </Typography>
      {updated !== written && (
        <Typography variant="caption" id="date-two" className="right">
          Updated <Moment format="DD.MM.YYYY">{updated}</Moment>
        </Typography>
      )}
      {category && (
        <Typography variant="caption" id="category">
          <Link href={`/category/${category.attributes.slug}`} passHref>
            <MuiLink>{category.attributes.name}</MuiLink>
          </Link>
        </Typography>
      )}
      {topics && (
        <div id="topics" className="right">
          {topics.sort().map((topic, i) => (
            <Typography variant="caption" key={i} className="topic">
              <Link href={`/topic/${topic.attributes.slug}`} passHref>
                <MuiLink>{topic.attributes.name}</MuiLink>
              </Link>
            </Typography>
          ))}
        </div>
      )}
    </div>
  </div>
);

export default ArticleMeta;
