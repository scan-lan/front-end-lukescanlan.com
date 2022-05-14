/** @jsxImportSource @emotion/react */

import Button from "@mui/material/Button";
import Link from "next/link";
import Skeleton from "@mui/material/Skeleton";
import { css } from "@emotion/react";

interface NavButtonProps {
  href?: string;
  text?: string;
}

const navButtonStyles = () =>
  css({
    // backgroundColor: theme.palette.secondary.main,
    backgroundColor: "black",

    "&:hover": {
      backgroundColor: "white",
      borderColor: "black",
      color: "black",
    },

    ".MuiTouchRipple-child": {
      backgroundColor: "white",
    },
  });

const NavButton = ({ href, text }: NavButtonProps) =>
  href && text ? (
    <Link href={href} passHref>
      <Button variant="contained" css={navButtonStyles} focusRipple={true}>
        {text}
      </Button>
    </Link>
  ) : (
    <Button variant="contained" css={navButtonStyles} focusRipple={true}>
      <Skeleton variant="text" width="100%" sx={{ bgcolor: "grey.800" }} />
    </Button>
  );

export default NavButton;
