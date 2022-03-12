/** @jsxImportSource @emotion/react */

import Button from "@mui/material/Button";
import Link from "next/link";
import Typography from "@mui/material/Typography";
import { css } from "@emotion/react";

interface SitenameProps {
  textWidth: number;
}

const Sitename = ({ textWidth }: SitenameProps) => {
  const sitenameCss = css({
    // border: "2px black dashed",
    gridArea: "sitename",

    "& h1": {
      lineHeight: 0.9,
      fontWeight: 900,
    },

    "& .header-a": {
      borderColor: "black",
      stroke: "black",
      padding: 0,
      overflow: "hidden",
      width: "100%",

      "&:hover, &:focus": {
        borderColor: "white",
        stroke: "white",
        backgroundColor: "black",
      },

      ".MuiTouchRipple-child": {
        backgroundColor: "white",
      },
    },
  });
  return (
    <div className="sitename" css={sitenameCss}>
      <Link href="/" passHref>
        <Button className="header-a">
          <Typography variant="h1">
            <svg
              height={90}
              width={textWidth - 10}
              style={{ overflow: "hidden" }}
            >
              <text
                x="0"
                y="87"
                fill="none"
                strokeDasharray="3,4"
                textLength={textWidth - 10}
                lengthAdjust="spacingAndGlyphs"
              >
                lukescanlan.com
              </text>
            </svg>
          </Typography>
        </Button>
      </Link>
    </div>
  );
};

export default Sitename;
