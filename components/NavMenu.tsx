/** @jsxImportSource @emotion/react */

import { Theme, useTheme } from "@mui/material/styles"

import Collapse from "@mui/material/Collapse"
import { Sling as Hamburger } from "hamburger-react"
import NavButton from "./NavButton"
import NavPage from "../types/NavPage"
import { css } from "@emotion/react"
import useMediaQuery from "@mui/material/useMediaQuery"
import { useState } from "react"
import { useTimeout } from "usehooks-ts"

interface NavMenuProps {
  navPages: NavPage[] | null;
  spacing: number;
}

const NavMenu = ({ navPages, spacing }: NavMenuProps) => {
  const theme = useTheme()
  const [isOpen, setIsOpen] = useState(false)
  const [transitionsEnabled, setTransitionsEnabled] = useState(false)
  const showMenuButton = useMediaQuery(theme.breakpoints.down("sm"))
  useTimeout(() => setTransitionsEnabled(true), 100)

  const spacingStyles = (theme: Theme) =>
    css({
      ".MuiCollapse-wrapperInner": {
        gap: theme.spacing(spacing),
        padding: showMenuButton
          ? theme.spacing(0, 0, spacing)
          : theme.spacing(spacing, 0, 0),
      },
    })

  if (!navPages)
    return Array.from<number>({ length: 4 }).map((_, i) => (
      <NavButton key={i.toString()} />
    ))

  return (
    <div className="nav-menu">
      {/* Menu button */}
      <Collapse
        in={showMenuButton}
        css={{
          ".MuiCollapse-wrapperInner": {
            display: "grid",
            justifyContent: "center",
          },
        }}
        enter={transitionsEnabled}
        unmountOnExit
        timeout={theme.transitions.duration.standard}
      >
        <Hamburger
          toggled={isOpen}
          toggle={setIsOpen}
          easing={theme.transitions.easing.easeInOut}
          label="Show menu"
          hideOutline={false}
          size={30}
        />
      </Collapse>
      {/* Menu */}
      <Collapse
        in={isOpen || !showMenuButton}
        timeout={theme.transitions.duration.standard}
        exit={transitionsEnabled}
        unmountOnExit
        className="buttons"
        css={spacingStyles}
      >
        {navPages.map((navPage, i) => {
          const href =
            navPage.attributes.slug === "about"
              ? "/about"
              : `/category/${navPage.attributes.slug}`
          return (
            <NavButton
              text={navPage.attributes.name}
              href={href}
              key={i.toString()}
            />
          )
        })}
      </Collapse>
    </div>
  )
}

export default NavMenu
