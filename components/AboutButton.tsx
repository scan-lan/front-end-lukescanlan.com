/** @jsxImportSource @emotion/react */

import { AboutPageState } from "../types/AboutPage"
import Button from "@mui/material/Button"
import { Theme } from "@mui/material/styles"
import Typography from "@mui/material/Typography"
import { css } from "@emotion/react"

interface AboutButtonProps {
  name: "what" | "where" | "why" | "who"
  className: string
  active: boolean
  setState: (state: AboutPageState) => void
}

const buttonStyles = (_: Theme) =>
  css({
    border: "none",
    textDecoration: "4px underline",
    textTransform: "none",
    fontWeight: 900,
    padding: 0,
    h3: {
      fontVariant: "none",
      fontFamily: "'Courier Prime', monospace",
      textTransform: "none",
    },

    ":hover": {
      textDecoration: "4px underline",
    },
  })

export const baseState = {
  what: false,
  where: false,
  why: false,
  who: false,
} as const

const AboutButton = ({
  name,
  className,
  active,
  setState,
}: AboutButtonProps) => (
  <Button
    id={name}
    className={`${className} ${active ? "active" : ""}`}
    color="secondary"
    variant="contained"
    css={buttonStyles}
    onClick={() =>
      setState(active ? baseState : { ...baseState, [name]: true })
    }
  >
    <Typography variant="h3" sx={{ padding: 0 }}>
      {`${name}?`}
    </Typography>
  </Button>
)

export default AboutButton
