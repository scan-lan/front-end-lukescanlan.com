/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { Button } from "@mui/material";

interface NavButtonProps {
  text: string;
}

const navButtonCss = css({
  textTransform: "none",
});

const NavButton = ({ text }: NavButtonProps) => {
  return (
    <Button variant="contained" css={navButtonCss}>
      {text}
    </Button>
  );
};

export default NavButton;
