/** @jsxImportSource @emotion/react */

import { Theme, css } from "@emotion/react";

import NavButton from "./NavButton";
import NavPage from "../types/NavPage";
import Sitename from "./Sitename";
import { useContainerDimensions } from "../lib/useContainerDimensions";
import { useRef } from "react";

interface NavProps {
  navPages: NavPage[];
  spacing?: number;
}

const Nav = ({ navPages, spacing = 1 }: NavProps) => {
  const navStyles = (theme: Theme) =>
    css({
      display: "grid",
      gridTemplateColumns: "repeat(12, 1fr)",
      gridTemplateAreas: `
      "sitename sitename sitename sitename sitename sitename sitename sitename sitename sitename sitename sitename"
      ". navbar navbar navbar navbar navbar navbar navbar navbar navbar navbar ."
    `,
      paddingBottom: theme.spacing(spacing),

      "& .buttons": {
        gridArea: "navbar",
        display: "grid",
        gridTemplateColumns: "repeat(4, 1fr)",
        gap: theme.spacing(spacing),
        paddingTop: theme.spacing(spacing),
        [theme.breakpoints.down("lg")]: {
          gridTemplateColumns: "repeat(2, 1fr)",
          gridTemplateRows: "repeat(2, 1fr)",
        },
        [theme.breakpoints.down("sm")]: {
          gridTemplateRows: "repeat(4, 1fr)",
          gridTemplateColumns: "1fr",
        },
      },
    });

  const headerRef = useRef<HTMLElement>(null);
  const headerTextWidth = useContainerDimensions(headerRef).width;
  return (
    <nav css={navStyles} ref={headerRef}>
      <Sitename textWidth={headerTextWidth} />
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
