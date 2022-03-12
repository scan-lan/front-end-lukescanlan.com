/** @jsxImportSource @emotion/react */

import Button from "@mui/material/Button";
import Link from "next/link";
import { css } from "@emotion/react";

interface NavButtonProps {
  href: string;
  text: string;
}

const navButtonCss = css({
  "&:focus": {
    backgroundColor: "white",
    borderColor: "black",
    color: "black",
  },
  "&:hover": {
    backgroundColor: "white",
    borderColor: "black",
    color: "black",
  },

  ".MuiTouchRipple-child": {
    backgroundColor: "#666",
  },
});

const NavButton = ({ href, text }: NavButtonProps) => (
  <Link href={href} passHref>
    <Button variant="contained" css={navButtonCss} focusRipple={true}>
      {text}
    </Button>
  </Link>
);

export default NavButton;
