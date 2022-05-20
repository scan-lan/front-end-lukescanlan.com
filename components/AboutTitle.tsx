/** @jsxImportSource @emotion/react */

import { Theme } from "@mui/material/styles";
import { css } from "@emotion/react";

const titleStyles = (theme: Theme) =>
  css({
    backgroundColor: theme.palette.secondary.main,
    stroke: theme.palette.secondary.contrastText,
    fill: theme.palette.secondary.contrastText,
    fontSize: "5rem",
    fontFamily: "sans-serif",
    fontWeight: 700,
  });

const AboutTitle = ({ textLength }: { textLength: number }) => (
  <div id="title" css={titleStyles}>
    <svg height={90} width={textLength} style={{ overflow: "clip" }}>
      <text
        x="0"
        y="87"
        textLength={textLength}
        lengthAdjust="spacingAndGlyphs"
        style={{ overflow: "clip" }}
      >
        about
      </text>
    </svg>
  </div>
);

export default AboutTitle;
