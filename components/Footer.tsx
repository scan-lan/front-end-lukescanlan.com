/** @jsxImportSource @emotion/react */

import { Theme, css } from "@emotion/react";

const footerStyles = (theme: Theme) =>
  css({
    display: "grid",
    placeContent: "center",
    borderTop: "2px white dashed",
    marginTop: theme.spacing(3),
    height: "5rem",
    color: "#ffffff",
    backgroundColor: "#5c7b65",
    fontWeight: 500,
  });

const Footer = () => (
  <footer css={footerStyles}>
    &copy; Luke Scanlan 2021&ndash;{new Date().getFullYear()}
  </footer>
);

export default Footer;
