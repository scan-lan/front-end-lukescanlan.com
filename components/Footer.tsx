import React from "react";
import { styled } from "@mui/system";

const StyledFooter = styled("footer")(({ theme }) => ({
  display: "grid",
  placeContent: "center",
  borderTop: "2px white dashed",
  marginTop: theme.spacing(3),
  height: "5rem",
  color: "#ffffff",
  backgroundColor: "#5c7b65",
  fontWeight: 500,
}));

const Footer = () => (
  <StyledFooter>
    &copy; Luke Scanlan 2021&ndash;{new Date().getFullYear()}
  </StyledFooter>
);

export default Footer;
