/** @jsxImportSource @emotion/react */

import { Theme } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import { css } from "@emotion/react";
import { useContainerDimensions } from "../lib/useContainerDimensions";
import { useRef } from "react";

const titleStyles = (theme: Theme) =>
  css({
    backgroundColor: theme.palette.secondary.main,
    stroke: theme.palette.secondary.contrastText,
    fill: theme.palette.secondary.contrastText,
    overflow: "clip",
  });

const AboutTitle = ({ textLength }: { textLength: number }) => {
  const ref = useRef<HTMLHeadingElement>(null);
  const headingDimensions = useContainerDimensions(ref);
  const svgHeight = headingDimensions.height - 10;

  return (
    <Typography
      variant="h1"
      sx={{
        fontFamily: "Roboto, sans-serif",
        fontVariant: "none",
      }}
      ref={ref}
      id="title"
      css={titleStyles}
    >
      <svg
        height={svgHeight}
        width={textLength}
        css={{ marginBottom: `-${svgHeight / 3}px` }}
      >
        <text
          y={svgHeight * 0.8}
          textLength={textLength}
          lengthAdjust="spacingAndGlyphs"
          style={{ overflow: "clip" }}
        >
          about
        </text>
      </svg>
    </Typography>
  );
};

export default AboutTitle;
