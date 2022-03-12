import React from "react";
import { styled } from "@mui/system";

const StyledFooter = styled("footer")(({ theme }) => ({
  display: "grid",
  placeContent: "center",
  borderTop: "1px black dotted",
  marginTop: theme.spacing(3),
  height: "5rem",
}));

const Footer = () => (
  <StyledFooter>
    &copy; Luke Scanlan 2021&ndash;{new Date().getFullYear()}
  </StyledFooter>
);

export default Footer;
