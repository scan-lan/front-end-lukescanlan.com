/** @jsxImportSource @emotion/react */

import Button from "@mui/material/Button";
import Link from "next/link";
import { css } from "@emotion/react";

interface NavButtonProps {
  href: string;
  text: string;
}

const navButtonStyles = css({
  "&:hover": {
    backgroundColor: "white",
    borderColor: "black",
    color: "black",
  },

  ".MuiTouchRipple-child": {
    backgroundColor: "white",
  },
});

const NavButton = ({ href, text }: NavButtonProps) => (
  <Link href={href} passHref>
    <Button variant="contained" css={navButtonStyles} focusRipple={true}>
      {text}
    </Button>
  </Link>
);

export default NavButton;
