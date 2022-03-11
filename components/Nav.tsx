/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import Link from "next/link";
import Typography from "@mui/material/Typography";
import NavPage from "../types/NavPage";
import NavButton from "./NavButton";
import { useRef } from "react";
import { useContainerDimensions } from "../lib/useContainerDimensions";

const navCss = css({
  display: "grid",
  gridTemplateColumns: "repeat(12, 1fr)",
  gridTemplateAreas: `
    "sitename sitename sitename sitename sitename sitename sitename sitename sitename sitename sitename sitename"
    ". navbar navbar navbar navbar navbar navbar navbar navbar navbar navbar ."
  `,
  paddingBottom: 8,

  "& .sitename": {
    // border: "2px black dashed",
    gridArea: "sitename",
    overflow: "hidden",
  },

  "& h1": {
    lineHeight: 0.9,
    fontWeight: 900,
  },

  "& .header-a": {
    stroke: "black",
    "&:hover, &:focus": {
      stroke: "white",
      backgroundColor: "black",
    },
  },

  "& .buttons": {
    gridArea: "navbar",
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
    gap: 8,
    paddingTop: 8,
    "@media (max-width: 800px)": {
      gridTemplateColumns: "repeat(2, 1fr)",
      gridTemplateRows: "repeat(2, 1fr)",
    },
    "@media (max-width: 400px)": {
      gridTemplateRows: "repeat(4, 1fr)",
      gridTemplateColumns: "1fr",
    },
  },
});

const Nav = ({ navPages }: { navPages: NavPage[] }) => {
  const headerRef = useRef();
  const headerTextWidth = useContainerDimensions(headerRef).width;
  return (
    <nav css={navCss} ref={headerRef}>
      <div className="sitename">
        <Typography variant="h1">
          <Link href="/" passHref>
            <a className="header-a">
              <svg
                height={82}
                width={headerTextWidth}
                style={{ overflow: "hidden" }}
              >
                <text
                  x="4"
                  y="80"
                  fill="none"
                  strokeDasharray="3,3"
                  textLength={headerTextWidth - 10}
                  lengthAdjust="spacingAndGlyphs"
                >
                  lukescanlan.com
                </text>
              </svg>
            </a>
          </Link>
        </Typography>
      </div>
      <div className="buttons">
        {navPages.map((navPage, i) => {
          const href =
            navPage.attributes.slug === "about"
              ? "/about"
              : `/category/${navPage.attributes.slug}`;
          return (
            <NavButton text={navPage.attributes.name} href={href} key={i} />
          );
        })}
      </div>
    </nav>
  );
};

export default Nav;
