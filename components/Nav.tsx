/** @jsxImportSource @emotion/react */

import { Theme, css } from "@emotion/react";

import NavButton from "./NavButton";
import NavPage from "../types/NavPage";
import Sitename from "./Sitename";
import useWindowDimensions from "../lib/useWindowDimensions";

interface NavProps {
  navPages: NavPage[] | null;
  spacing?: number;
}

const navStyles = (theme: Theme) =>
  css({
    display: "grid",
    gridTemplateColumns: "repeat(12, 1fr)",
    gridTemplateAreas: `
      "sitename sitename sitename sitename sitename sitename sitename sitename sitename sitename sitename sitename"
      ". navbar navbar navbar navbar navbar navbar navbar navbar navbar navbar ."
    `,

    "& .buttons": {
      gridArea: "navbar",
      display: "grid",
      gridTemplateColumns: "repeat(4, 1fr)",
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

const Nav = ({ navPages, spacing = 1 }: NavProps) => {
  const spacingStyles = (theme: Theme) =>
    css({
      "& .buttons": {
        gap: theme.spacing(spacing),
        paddingTop: theme.spacing(spacing),
      },
    });
  const windowDimensions = useWindowDimensions();

  return (
    <nav css={[navStyles, spacingStyles]}>
      <Sitename textWidth={windowDimensions.width} />
      <div className="buttons">
        {navPages
          ? navPages.map((navPage, i) => {
              const href =
                navPage.attributes.slug === "about"
                  ? "/about"
                  : `/category/${navPage.attributes.slug}`;
              return (
                <NavButton
                  text={navPage.attributes.name}
                  href={href}
                  key={i.toString()}
                />
              );
            })
          : Array.from<number>({ length: 4 }).map((_, i) => (
              <NavButton key={i.toString()} />
            ))}
      </div>
    </nav>
  );
};

export default Nav;
