/** @jsxImportSource @emotion/react */

import Button from "@mui/material/Button";
import Link from "next/link";
import Typography from "@mui/material/Typography";
import { css } from "@emotion/react";

const sitenameCss = css({
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

interface SitenameProps {
  textWidth: number;
}

const Sitename = ({ textWidth }: SitenameProps) => {
  const svgWidth = textWidth < 10 ? textWidth : textWidth - 10;

  return (
    <div className="sitename" css={sitenameCss}>
      <Link href="/" passHref>
        <Button className="header-a">
          <Typography variant="h1">
            <svg height={90} width={svgWidth} style={{ overflow: "hidden" }}>
              <text
                x="0"
                y="87"
                fill="none"
                strokeDasharray="3,4"
                textLength={svgWidth}
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
