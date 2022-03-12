/** @jsxImportSource @emotion/react */

import NavButton from "./NavButton";
import NavPage from "../types/NavPage";
import Sitename from "./Sitename";
import { css } from "@emotion/react";
import { styled } from "@mui/system";
import { useContainerDimensions } from "../lib/useContainerDimensions";
import { useRef } from "react";

const navCss = css({
  display: "grid",
  gridTemplateColumns: "repeat(12, 1fr)",
  gridTemplateAreas: `
    "sitename sitename sitename sitename sitename sitename sitename sitename sitename sitename sitename sitename"
    ". navbar navbar navbar navbar navbar navbar navbar navbar navbar navbar ."
  `,
  paddingBottom: 8,
});

const ButtonsDiv = styled("div")(({ theme }) => ({
  gridArea: "navbar",
  display: "grid",
  gridTemplateColumns: "repeat(4, 1fr)",
  gap: 8,
  paddingTop: 8,
  [theme.breakpoints.down("lg")]: {
    gridTemplateColumns: "repeat(2, 1fr)",
    gridTemplateRows: "repeat(2, 1fr)",
  },
  [theme.breakpoints.down("sm")]: {
    gridTemplateRows: "repeat(4, 1fr)",
    gridTemplateColumns: "1fr",
  },
}));

const Nav = ({ navPages }: { navPages: NavPage[] }) => {
  const headerRef = useRef<HTMLElement>(null);
  const headerTextWidth = useContainerDimensions(headerRef).width;
  return (
    <nav css={navCss} ref={headerRef}>
      <Sitename textWidth={headerTextWidth} />
      <ButtonsDiv>
        {navPages.map((navPage, i) => {
          const href =
            navPage.attributes.slug === "about"
              ? "/about"
              : `/category/${navPage.attributes.slug}`;
          return (
            <NavButton text={navPage.attributes.name} href={href} key={i} />
          );
        })}
      </ButtonsDiv>
    </nav>
  );
};

export default Nav;
