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
    overflow: "hidden",

    "& h1": {
      lineHeight: 0.9,
      fontWeight: 900,
    },

    "& .header-a": {
      borderColor: "black",
      stroke: "black",
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
        {/* <a className="header-a"> */}
        <Button className="header-a">
          <Typography variant="h1">
            <svg height={82} width={textWidth} style={{ overflow: "hidden" }}>
              <text
                x="4"
                y="80"
                fill="none"
                strokeDasharray="3,3"
                textLength={textWidth - 10}
                lengthAdjust="spacingAndGlyphs"
              >
                lukescanlan.com
              </text>
            </svg>
          </Typography>
        </Button>
        {/* </a> */}
      </Link>
    </div>
  );
};

export default Sitename;
