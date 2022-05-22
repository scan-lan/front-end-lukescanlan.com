/** @jsxImportSource @emotion/react */

import { Theme, css, useTheme } from "@emotion/react";

import Collapse from "@mui/material/Collapse";
import { Sling as Hamburger } from "hamburger-react";
import NavButton from "./NavButton";
import NavPage from "../types/NavPage";
import Sitename from "./Sitename";
import { useMediaQuery } from "@mui/material";
import { useState } from "react";
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

    ".nav-menu": {
      gridArea: "navbar",
      display: "grid",
      justifyContent: "stretch",
    },

    ".buttons .MuiCollapse-wrapperInner": {
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
  const windowDimensions = useWindowDimensions();
  const theme = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const showMenuButton = useMediaQuery(theme.breakpoints.down("sm"));

  const spacingStyles = () =>
    css({
      ".buttons .MuiCollapse-wrapperInner": {
        gap: theme.spacing(spacing),
        paddingTop: theme.spacing(spacing),
      },
    });

  return (
    <nav css={[navStyles, spacingStyles]}>
      <Sitename textWidth={windowDimensions.width} />
      <div className="nav-menu">
        <Collapse
          in={showMenuButton}
          css={{
            ".MuiCollapse-wrapperInner": {
              display: "grid",
              justifyContent: "center",
            },
          }}
          unmountOnExit
          timeout={theme.transitions.duration.shortest}
        >
          <Hamburger
            toggled={isOpen}
            toggle={setIsOpen}
            easing={theme.transitions.easing.easeInOut}
            label="Show menu"
            hideOutline={false}
          />
        </Collapse>
        <Collapse
          in={isOpen || !showMenuButton}
          timeout={theme.transitions.duration.shortest}
          unmountOnExit
          className="buttons"
        >
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
        </Collapse>
      </div>
    </nav>
  );
};

export default Nav;
