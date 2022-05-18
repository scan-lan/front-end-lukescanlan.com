/** @jsxImportSource @emotion/react */

import { AboutState } from "../pages/about";
import Button from "@mui/material/Button";
import { Theme } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import { css } from "@emotion/react";

interface AboutButtonProps {
  name: "what" | "where" | "why" | "who";
  className: string;
  active: boolean;
  setState: (_: AboutState) => void;
}

const buttonStyles = (theme: Theme) =>
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
  });

const switchActive = (
  name: "what" | "where" | "why" | "who" | null,
  setState: (_: AboutState) => void
) => {
  const newState = {
    what: false,
    where: false,
    why: false,
    who: false,
  };
  if (name) newState[name] = true;

  setState(newState);
};

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
    onClick={
      active
        ? (event) => switchActive(null, setState)
        : (event) => switchActive(name, setState)
    }
  >
    <Typography variant="h3" sx={{ padding: 0 }}>
      {name}
    </Typography>
  </Button>
);

export default AboutButton;
