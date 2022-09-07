/** @jsxImportSource @emotion/react */

import { Theme, css } from "@emotion/react"

import NavMenu from "./NavMenu"
import NavPage from "../types/NavPage"
import Sitename from "./Sitename"
import useWindowDimensions from "../lib/useWindowDimensions"

interface NavProps {
  navPages: NavPage[] | null
  spacing?: number
}

const navStyles = (theme: Theme) =>
  css({
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
  })

const Nav = ({ navPages, spacing = 1 }: NavProps) => {
  const windowDimensions = useWindowDimensions()

  return (
    <nav css={navStyles} className="twelve-column">
      <Sitename textWidth={windowDimensions.width} />
      <NavMenu navPages={navPages} spacing={spacing} />
    </nav>
  )
}

export default Nav
